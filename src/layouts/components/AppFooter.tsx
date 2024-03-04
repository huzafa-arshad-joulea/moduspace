import { Grid, useMediaQuery } from "@mui/material";
import i18n from "i18n";

export const AppFooter = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)"); // Define your screen size breakpoint

  return (
    <footer
      className="footer"
      style={{
        backgroundColor: "#1E1E1E",
        color: "#aaa",
      }}
    >
      <div>
        <Grid container justifyContent="center" alignItems="center" mt={2}>
          <Grid
            item
            xs={6}
            p={1}
            md={2}
            sx={{
              textAlign: "end",
            }}
          >
            <a className="non-deco-url" href="https://www.moduspace.sg/terms/">
              <span>{i18n.t("common.termCondition")}</span>
            </a>
          </Grid>
          <Grid
            item
            xs={6}
            p={1}
            md={2}
            sx={{
              textAlign: "start",
            }}
          >
            <a
              className="non-deco-url"
              href="https://www.moduspace.sg/privacy/"
            >
              <span>{i18n.t("common.privacyPolicy")}</span>
            </a>
          </Grid>
          <Grid
            item
            xs={12}
            p={1}
            md={4}
            mt={1}
            sx={{
              marginBottom: !isSmallScreen ? "20PX" : "",
            }}
          >
            <Grid
              container
              item
              justifyContent="center"
              alignItems="center"
              alignContent="center"
            >
              <Grid
                item
                px={1.5}
                py={1}
                mx={0.5}
                style={{
                  color: "#1e1e1e",
                  borderRadius: "50%",
                  background: "#cfcfcf",
                }}
              >
                <a
                  className="non-deco-url"
                  href="https://www.facebook.com/Moduspacesg/"
                  target="_blank"
                >
                  <i
                    className="fab fa-facebook-f"
                    style={{ width: "100%", height: "100%", color: "#1e1e1e" }}
                  ></i>
                </a>
              </Grid>
              <Grid
                item
                px={1.2}
                py={1}
                mx={0.5}
                style={{
                  color: "#1e1e1e",
                  borderRadius: "50%",
                  background: "#cfcfcf",
                }}
              >
                <a
                  className="non-deco-url"
                  href="https://www.instagram.com/moduspacesg/"
                  target="_blank"
                >
                  <i
                    className="fab fa-instagram"
                    style={{ width: "100%", height: "100%", color: "#1e1e1e" }}
                  ></i>
                </a>
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={12} md={4} p={1} mb={1}>
            &#169; {new Date().getFullYear()}{" "}
            {i18n.t("common.allRightReserved")}
          </Grid>
        </Grid>
      </div>
    </footer>
  );
};
