import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { useEffect } from "react";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const LazyLoading = () => {
  useEffect(() => {
    NProgress.start();
    return () => {
      NProgress.done();
    };
  }, []);

  return <></>;
};

export default LazyLoading;
