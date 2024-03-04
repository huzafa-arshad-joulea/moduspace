import { jwtDecode } from "jwt-decode";
import { Response } from "node-fetch";
import { ReportCounterfeitPayload } from "types/ReportCounterfeitPayload";
import { ModuspaceEndpoints } from "utils/constants";
import jsonFetch from "utils/json-fetch";

interface ResponseType extends Response {
  reason?: string;
  error?: string;
  message?: string;
  data?: any;
  json: any;
}

type GenericErrorType = {
  error: string | null;
  clientSecret?: any;
} | null;

async function genericReportError(
  response: ResponseType,
  type: string
): Promise<GenericErrorType> {
  console.error("Error on request:", { response });

  if (response.status === 401) {
    console.error("Unauthorized, session expired.");
    return { error: "Unauthorized, session expired.", [type]: null };
  }

  const responseJson = "json" in response ? response.json : null;
  const errorMessage =
    typeof responseJson?.data === "string"
      ? responseJson.data
      : responseJson?.data?.message ??
      responseJson?.data?.reason ??
      responseJson?.data?.error ??
      responseJson?.message ??
      responseJson?.reason ??
      responseJson?.error ??
      response.reason ??
      response.error ??
      response.message ??
      response.text ??
      (await response.text()) ??
      "Invalid request";

  console.error("Error on request:", { errorMessage });
  return { error: errorMessage, [type]: null };
}

async function refreshToken(): Promise<void> {
  const response: any = await jsonFetch(
    ModuspaceEndpoints.REFRESH_TOKEN_ENDPOINT()
  );
  if (response.ok) {
    const {
      json: {
        data: { token },
      },
    } = await response;
    if (process.env.REACT_APP_GUEST_TOKEN_KEY)
      localStorage.setItem(process.env.REACT_APP_GUEST_TOKEN_KEY, token);
  }
}

async function generateGuestSessionWithLocalStorage(): Promise<any> {
  if (!process.env.REACT_APP_APPLICATION_CLIENT)
    return genericReportError(
      {
        error: "REACT_APP_APPLICATION_CLIENT env var not set!",
      } as ResponseType,
      "message"
    );

  if (process.env.REACT_APP_GUEST_TOKEN_KEY) {
    const existingToken = localStorage.getItem(
      process.env.REACT_APP_GUEST_TOKEN_KEY
    );

    if (existingToken) {
      try {
        const decodedToken = jwtDecode(existingToken);
        if (decodedToken && decodedToken.exp) {
          const tokenTimeoutMs = decodedToken.exp * 1000 - Date.now();
          setTimeout(async () => {
            console.log("reseting token");
            if (process.env.REACT_APP_GUEST_TOKEN_KEY) await refreshToken();
          }, tokenTimeoutMs);

          if (tokenTimeoutMs > 0) {
            console.log("Token exist, skipped");
            return;
          } else {
            console.log("Token expired, request new token");
            // token expired, reset it
            if (process.env.REACT_APP_GUEST_TOKEN_KEY) await refreshToken();
          }
        }
      } catch (err) {
        // invalid token, request again
        localStorage.removeItem(process.env.REACT_APP_GUEST_TOKEN_KEY)
      }
    }
  }

  // @todo: add type for response
  const response: any = await jsonFetch(
    ModuspaceEndpoints.CREATE_NEW_SESSION_ENDPOINT(
      process.env.REACT_APP_APPLICATION_CLIENT
    ),
    {
      method: "post",
      body: {
        scope: "Guest",
      },
    }
  );
  if (!response.ok) {
    return genericReportError(response as ResponseType, "message");
  }
  const {
    json: {
      data: { token, expiredAt, expiredEpoch },
    },
  } = await response;

  if (token?.length && process.env.REACT_APP_GUEST_TOKEN_KEY) {
    localStorage.setItem(process.env.REACT_APP_GUEST_TOKEN_KEY, token);

    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken && decodedToken.exp) {
        const tokenTimeoutMs = decodedToken.exp * 1000 - Date.now();
        setTimeout(async () => {
          console.log("reseting token");
          if (process.env.REACT_APP_GUEST_TOKEN_KEY) await refreshToken();
        }, tokenTimeoutMs);

        if (tokenTimeoutMs > 0) {
          return;
        } else {
          // token expired, reset it
          console.error("Omg, token expiry time is configured too short on BE");
          if (process.env.REACT_APP_GUEST_TOKEN_KEY) await refreshToken();
        }
      }
    } catch (err) {
      console.error("Omg, token passed from BE is invalid", token);
      console.error(err);
      localStorage.removeItem(process.env.REACT_APP_GUEST_TOKEN_KEY);
    }
  }

  return { token };
}

async function verifyAntiCounterfeitTag(
  client: string,
  antiCounterfeitTag: string
): Promise<any> {
  let retryCount = 10;
  let retryIndex = 0;
  let isSuccess = false;

  // @todo: add type for response
  await generateGuestSessionWithLocalStorage();
  while (!isSuccess && retryIndex < retryCount) {
    const response: any = await jsonFetch(
      ModuspaceEndpoints.VERIFY_ANTICOUNTERFEIT_TAG_ENDPOINT(
        client,
        antiCounterfeitTag
      )
    );
    if (!response.ok) {
      if (response.status === 401) {
        retryCount++;
        if (process.env.REACT_APP_GUEST_TOKEN_KEY) {
          localStorage.removeItem(process.env.REACT_APP_GUEST_TOKEN_KEY)
          await generateGuestSessionWithLocalStorage();
        }
        return genericReportError(response as ResponseType, "message");
      }

      isSuccess = true;

      return {
        serial: null,
        valid: false,
      };
    }

    isSuccess = true;

    const {
      json: {
        data: { serial, valid },
      },
    } = await response;
    return { serial, valid };
  }
}

async function reportAntiCounterfeitTag(
  client: string,
  payload: ReportCounterfeitPayload
): Promise<any> {
  let retryCount = 10;
  let retryIndex = 0;
  let isSuccess = false;

  await generateGuestSessionWithLocalStorage();
  // @todo: add type for response
  while (!isSuccess && retryIndex < retryCount) {

    const response: any = await jsonFetch(
      ModuspaceEndpoints.REPORT_ANTICOUNTERFEIT_TAG_ENDPOINT(client),
      {
        method: "PUT",
        body: payload as any,
      }
    );
    if (!response.ok) {
      if (response.status === 401) {
        retryCount++;
        if (process.env.REACT_APP_GUEST_TOKEN_KEY) {
          localStorage.removeItem(process.env.REACT_APP_GUEST_TOKEN_KEY)
          await generateGuestSessionWithLocalStorage();
        }
        return genericReportError(response as ResponseType, "message");
      }

      isSuccess = true;

      return {
        serial: null,
        valid: false,
      };
    }

    isSuccess = true;

    const {
      json: { data },
    } = await response;
    return data;
  }
}

const ModuspaceService = {
  verifyAntiCounterfeitTag,
  reportAntiCounterfeitTag,
};

export default ModuspaceService;
