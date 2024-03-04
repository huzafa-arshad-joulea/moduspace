import { Grid } from "@mui/material";
import i18n from "i18n";

const Footer = () => {
  return (
    <footer className="footer">
      <Grid
        container
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          color: "#aaa",
          background: "black",
        }}
      >
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={6} p={1} md={2}>
            <a className="non-deco-url" href="https://www.moduspace.sg/terms/">
              <span>{i18n.t("common.termCondition")}</span>
            </a>
          </Grid>
          <Grid item xs={6} p={1} md={2}>
            <a
              className="non-deco-url"
              href="https://www.moduspace.sg/privacy/"
            >
              <span>{i18n.t("common.privacyPolicy")}</span>
            </a>
          </Grid>
          <Grid item xs={12} p={1} md={4}>
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
          <Grid xs={12} md={4} p={1}>
            &#169; {new Date().getFullYear()}{" "}
            {i18n.t("common.allRightReserved")}
          </Grid>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
