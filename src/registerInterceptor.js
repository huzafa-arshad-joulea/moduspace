import fetchIntercept from "fetch-intercept";
import { toast } from "react-toastify";

const DEFAULT_TIMEOUT = 30000; // 30 seconds request timeout

function registerFetchInterceptor() {
  fetchIntercept.register({
    request: async function (url, config) {
      if (config) config.signal = AbortSignal.timeout(DEFAULT_TIMEOUT);

      const token = localStorage.getItem(process.env.REACT_APP_GUEST_TOKEN_KEY);

      // Modify the url or config here
      if (config && token && token?.length) {
        config.headers.authorization = `Bearer ${token}`;
      }

      return [url, config];
    },

    requestError: function (error) {
      // Called when an error occured during another 'request' interceptor call
      return Promise.reject(error);
    },

    response: function (response) {
      // Modify the reponse object
      return response;
    },

    responseError: function (error) {
      // Handle an fetch error
      if (error instanceof DOMException && error.name === "AbortError") {
        toast.error("Timeout");
        return Promise.reject(new Error("Timeout"));
      } else toast.error(error?.message ?? "Unknown Error");

      return Promise.reject(error);
    },
  });
}

export default registerFetchInterceptor;
