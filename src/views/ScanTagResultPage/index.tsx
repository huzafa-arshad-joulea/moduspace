import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import i18n from "i18n";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ModuspaceService from "services/moduspace.service";
import { Serial } from "types/Serial";
import ReportCounterfeitModal from "./components/ReportCounterfeitModal";
import { AppLayout } from "layouts/components/AppLayout";

const ScanSuccessContainer = ({ serial = {} }: { serial: Serial }) => {
  const isSmallScreen = useMediaQuery("(max-width:600px)"); // Define your screen size breakpoint

  return (
    <>
      <Grid item>
        <div
          style={{
            paddingTop: !isSmallScreen ? "50px" : "20px",
          }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/authentic_logo.png`}
            width={187}
            alt="authentic_logo"
          />
        </div>
      </Grid>
      <Grid
        item
        mt={3}
        style={{
          fontWeight: 700,
          color: "#23B502",
          letterSpacing: 3,
          textAlign: "center",
          fontSize: "18px",
          marginTop: !isSmallScreen ? "40px" : "24px",
        }}
      >
        {i18n.t("scanTagResultScreen.certifiedTitle")}
      </Grid>
      <Grid
        item
        style={{
          marginTop: !isSmallScreen ? "20px" : "5px",
          fontWeight: 700,
          color: "#707070",
          letterSpacing: 3,
          textAlign: "center",
          fontSize: "18px",
        }}
      >
        {i18n.t("scanTagResultScreen.certifiedNo")}
      </Grid>
      <Grid
        item
        style={{
          marginTop: !isSmallScreen ? "20px" : "5px",
          fontWeight: 700,
          color: "rgba(112, 112, 112, 0.6)",
          letterSpacing: 3,
          textAlign: "center",
          fontSize: "18px",
        }}
      >
        {serial.certificate ?? "-"}
      </Grid>
      <Grid
        item
        container
        px={4}
        mt={5}
        rowGap={0.5}
        sx={{
          color: "rgba(99, 99, 102, 0.6)",
          maxWidth: !isSmallScreen ? "900px" : "599px",
          margin: !isSmallScreen ? "auto" : "",
          paddingTop: !isSmallScreen ? "70px" : "",
        }}
      >
        <Grid
          item
          xs={7}
          md={7}
          lg={7}
          style={{
            fontWeight: 400,
            textAlign: "left",
            fontSize: "16px",
          }}
        >
          {i18n.t("scanTagResultScreen.productName")}
        </Grid>

        <Grid
          item
          xs={5}
          md={5}
          lg={5}
          style={{
            fontWeight: 400,
            color: "#636366",
            textAlign: "right",
            fontSize: "16px",
          }}
        >
          Moducase {serial.product}
        </Grid>
        <Grid
          item
          xs={7}
          md={7}
          lg={7}
          style={{
            fontWeight: 400,
            textAlign: "left",
            fontSize: "16px",
            paddingTop: !isSmallScreen ? "20px" : "",
          }}
        >
          Produce Batch{" "}
        </Grid>
        <Grid
          item
          xs={5}
          md={5}
          lg={5}
          style={{
            fontWeight: 400,
            color: "#636366",
            textAlign: "right",
            fontSize: "16px",
            paddingTop: !isSmallScreen ? "20px" : "",
          }}
        >
          {i18n.t("scanTagResultScreen.productBatchYear")}{" "}
          {serial.createdAt ? new Date(serial.createdAt).getFullYear() : "-"}
        </Grid>
      </Grid>

      <Grid item xs={12} px={4}>
        <div
          style={{
            paddingBottom: !isSmallScreen ? "50px" : "20px",
            maxWidth: !isSmallScreen ? "900px" : "",
            margin: !isSmallScreen ? "auto" : "",
            paddingTop: !isSmallScreen ? "50px" : "30px",
          }}
        >
          <p
            style={{
              textAlign: !isSmallScreen ? "center" : "justify",
              fontSize: "16px",
              fontWeight: "400",
              color: "rgba(99, 99, 102, 0.6)",
              marginLeft: !isSmallScreen ? "30px" : "",
            }}
          >
            {i18n.t("scanTagResultScreen.certifiedStatement")}
          </p>
        </div>
      </Grid>
    </>
  );
};

const ScanFailedContainer = () => {
  const [isReportButtonClicked, setIsReportButtonClicked] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:600px)"); // Define your screen size breakpoint

  return (
    <>
      <ReportCounterfeitModal
        open={isReportButtonClicked}
        onClose={() => {
          setIsReportButtonClicked(false);
        }}
      />
      <Grid item>
        <img
          src={`${process.env.PUBLIC_URL}/non_authentic_logo.png`}
          width={200}
        />
      </Grid>
      <Grid item mt={10}>
        <p
          style={{
            fontSize: "16px",
            color: "rgba(99, 99, 102, 0.6)",
            textAlign: "justify",
            maxWidth: "400px",
          }}
        >
          {i18n.t("scanTagResultScreen.nonCertifiedStatement")}
        </p>
      </Grid>
      <Grid item mt={10} justifyContent="center" alignItems="center">
        <Button
          fullWidth
          sx={{
            fontWeight: 700,
            lineHeight: "24px",
            color: "white",
            background: "#00A7E6",
            textTransform: "uppercase",
            height: "56px",
            width: "315px",
            marginBottom: !isSmallScreen ? "" : "30px",
          }}
          onClick={() => {
            setIsReportButtonClicked(true);
          }}
        >
          {i18n.t("scanTagResultScreen.reportButtonText")}
        </Button>
      </Grid>
    </>
  );
};

const ScanTagResultPage = () => {
  const client = process.env.REACT_APP_APPLICATION_CLIENT ?? "";
  const { antiCounterfeitTag = "" } = useParams();

  const [serial, setSerial] = useState<Serial>({});
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const isSmallScreen = useMediaQuery("(max-width:600px)"); // Define your screen size breakpoint

  useEffect(() => {
    setLoading(true);
    ModuspaceService.verifyAntiCounterfeitTag(client, antiCounterfeitTag).then(
      (data) => {
        setLoading(false);
        if (data.error) {
          toast.error(data.error);
          setError(data.error);
        }
        setSerial(data.serial);
        setIsValid(data.valid);
      }
    );
  }, [antiCounterfeitTag]);

  return (
    <AppLayout>
      <Box
        padding={1}
        style={{
          background: "#fff",

          minHeight: !isSmallScreen ? "80.2vh" : "auto",
        }}
      >
        <Grid
          container
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{
            padding: "5px",
            minHeight: !isSmallScreen ? "80.2vh" : "auto",
            width: "100%",
            background:
              !isValid || error || loading
                ? null
                : "linear-gradient(90deg, #F5BE4F 0%, #F4A44B 10.05%, #F37343 18.09%, #F16040 28.14%, #CC5783 37.19%, #8B54A2 46.23%, #5D4E9F 56.28%, #5F6DB3 65.33%, #539DB7 73.37%, #81B462 81.41%, #D0DF5B 91.46%, #F0EB56 100.5%)",
          }}
        >
          <Grid
            item
            container
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{
              textAlign: "justify",
              background: "#fff",
              minHeight: !isSmallScreen ? "80.2vh" : "auto",
            }}
          >
            {error ? (
              <>
                <Typography variant="h3" component="h3" mb={2}>
                  {error}
                </Typography>
              </>
            ) : loading ? (
              <Box
                mb={2}
                sx={{
                  height: "73vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress />
              </Box>
            ) : isValid ? (
              <ScanSuccessContainer serial={serial} />
            ) : (
              <ScanFailedContainer />
            )}
          </Grid>
        </Grid>
      </Box>
    </AppLayout>
  );
};

export default ScanTagResultPage;
