import { Alert, Snackbar, SnackbarOrigin } from "@mui/material";
import { AlertContext, IAlertContextState } from "context/AlertContext";
import { useContext, useEffect } from "react";

const CustomAlert = () => {
  const anchorOrigin: SnackbarOrigin = {
    vertical: "top",
    horizontal: "center",
  };

  const { show, message, severity, dispatchUpdateAlert } =
    useContext<IAlertContextState>(AlertContext);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (show)
      timeout = setTimeout(
        () => dispatchUpdateAlert({ show: false, message: "" }),
        3000,
      );
    return () => clearTimeout(timeout);
  }, [show]);

  if (show)
    return (
      <Snackbar
        anchorOrigin={anchorOrigin}
        open={show}
        key="unexpected_render_error">
        <Alert severity={severity ?? "error"}>{message}</Alert>
      </Snackbar>
    );

  return <></>;
};

export default CustomAlert;
