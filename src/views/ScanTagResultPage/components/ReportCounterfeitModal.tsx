import { EmailOutlined } from "@mui/icons-material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  InputAdornment,
  TextField,
  Typography
} from "@mui/material";
import i18n from "i18n";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ModuspaceService from "services/moduspace.service";
import { ReportCounterfeitPayload } from "types/ReportCounterfeitPayload";
import { isEmailValid } from "utils/base";


const ReportCounterfeitModal = ({
  open = false,
  onClose,
}: {
  open: boolean;
  onClose: any;
}) => {

  const client = process.env.REACT_APP_APPLICATION_CLIENT ?? "";

  const { antiCounterfeitTag = "" } = useParams();

  const [formData, setFormData] = useState<ReportCounterfeitPayload>({
    antiCounterfeitTag,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isReportDone, setIsReportDone] = useState(false);

  const shouldDisableSubmit = isLoading ||
    !formData.reporterName ||
    !formData.reporterEmail ||
    !formData.antiCounterfeitTag ||
    !formData.reason ||
    !formData.storeName ||
    !isEmailValid(formData.reporterEmail)

  useEffect(() => {
    setFormData({
      ...formData,
      antiCounterfeitTag,
    });
  }, [antiCounterfeitTag]);

  const submit = () => {
    setIsLoading(true);
    // call api
    ModuspaceService.reportAntiCounterfeitTag(client, formData).then((data) => {
      setIsLoading(false);
      setFormData({
        antiCounterfeitTag,
      });
      if (data.error) toast.error(data.error);
      else {
        setIsReportDone(true);
      }
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      style={{
        display: "flex",
        minWidth: "80vw",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <DialogContent
        style={{
          overflowY: "auto",
        }}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          rowGap={3}
          sx={{
            textAlign: "left"
          }}
        >
          <Grid item xs={12}>
            <Box width="100%">
              <Typography
                textAlign="center"
                style={{
                  fontSize: "24px",
                  fontWeight: 700,
                  letterSpacing: 3
                }}
              >
                {i18n.t("reportCounterfeitScreen.title")}
              </Typography>
            </Box>
          </Grid>
          {isReportDone ? (
            <>
              <Grid item>
                <CheckCircleOutlineIcon
                  sx={{ color: "#19a731", fontSize: "15rem" }}
                />
              </Grid>
              <Grid item>
                <p
                  style={{
                    fontSize: "14px",
                  }}
                >
                  {i18n.t("reportCounterfeitScreen.receivedSubmission")}
                </p>
              </Grid>
            </>
          ) : (
            <Grid
              item
              container
              rowGap={2}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12}>
                <span style={{ fontWeight: 700, fontSize: 14 }}>{i18n.t("label.name")} *</span>
                <TextField
                  required
                  fullWidth
                  size="small"
                  placeholder="e.g. John Smith"
                  inputProps={{ style: { fontSize: 16 } }} // font size of input text
                  InputLabelProps={{ style: { fontSize: 16 } }} // font size of input label
                  value={formData.reporterName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      reporterName: e.target.value,
                    })
                  }
                // helperText={
                //   !formData.reporterName
                //     ? i18n.t("textFieldEmptyError.name")
                //     : null
                // }
                // error={!formData.reporterName ? true : false}
                />
                <span style={{ color: "#C53D23" }}>{i18n.t("label.nameDescription")}</span>
              </Grid>
              <Grid item xs={12}>
                <span style={{ fontWeight: 700, fontSize: 14 }}>{i18n.t("label.email")} *</span>
                <TextField
                  required
                  fullWidth
                  size="small"
                  placeholder="e.g. address@email.com"
                  inputProps={{ style: { fontSize: 16 } }} // font size of input text
                  InputLabelProps={{ style: { fontSize: 16 } }} // font size of input label
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlined />
                      </InputAdornment>
                    ),
                  }}
                  value={formData.reporterEmail}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      reporterEmail: e.target.value,
                    })
                  }
                // helperText={
                //   !formData.reporterEmail
                //     ? i18n.t("textFieldEmptyError.email")
                //     : !isEmailValid(formData.reporterEmail)
                //       ? i18n.t("common.error.invalidEmail")
                //       : null
                // }
                // error={
                //   !formData.reporterName ||
                //     !isEmailValid(formData.reporterEmail)
                //     ? true
                //     : false
                // }
                />
                <span style={{ color: "#C53D23" }}>{i18n.t("label.emailDescription")}</span>
              </Grid>
              <Grid item xs={12}>
                <span style={{ fontWeight: 700, fontSize: 14 }}>{i18n.t("label.storeName")} *</span>
                <TextField
                  required
                  fullWidth
                  size="small"
                  placeholder="e.g. Store Name"
                  inputProps={{ style: { fontSize: 16 } }} // font size of input text
                  InputLabelProps={{ style: { fontSize: 16 } }} // font size of input label
                  value={formData.storeName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      storeName: e.target.value,
                    })
                  }
                // helperText={
                //   !formData.storeName
                //     ? i18n.t("textFieldEmptyError.storeName")
                //     : null
                // }
                // error={!formData.storeName ? true : false}
                />
                <span style={{ color: "#C53D23" }}>{i18n.t("label.storeNameDescription")}</span>
              </Grid>
              <Grid item xs={12}>
                <span style={{ fontWeight: 700, fontSize: 14 }}>{i18n.t("label.reason")} *</span>
                <TextField
                  required
                  fullWidth
                  size="small"
                  multiline
                  placeholder="Enter a description..."
                  inputProps={{ style: { fontSize: 16 } }} // font size of input text
                  InputLabelProps={{ style: { fontSize: 16 } }} // font size of input label
                  rows={3}
                  value={formData.reason}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      reason: e.target.value,
                    })
                  }
                // helperText={
                //   !formData.reason
                //     ? i18n.t("textFieldEmptyError.reason")
                //     : null
                // }
                // error={!formData.reason ? true : false}
                />
                <span style={{ color: "#C53D23" }}>{i18n.t("label.reasonDescription")}</span>
              </Grid>
              <Grid item xs={12}>
                <Button

                  style={{
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "white",
                    background: shouldDisableSubmit ? "#bbb" : "#00A7E6",
                    textTransform: "uppercase",
                    width: "100%",
                    height: "56px",
                  }}
                  onClick={submit}
                  disabled={shouldDisableSubmit
                  }
                >
                  {i18n.t("common.submit")}
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ReportCounterfeitModal;
