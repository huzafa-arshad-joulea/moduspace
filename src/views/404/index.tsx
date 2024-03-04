import { Grid } from "@mui/material";
import i18n from "i18n";
import BaseLayout from "layouts/components/BaseLayout";

const Page404 = () => (
  <BaseLayout>
    <Grid
      container
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item>
        <img src="/logo.png" alt="Moduspace Logo" />
      </Grid>
      <Grid item>
        <h1>{i18n.t("404.title")}</h1>
      </Grid>
      <Grid item>{i18n.t("404.message", { url: window.location.href })}
      </Grid>
    </Grid>
  </BaseLayout>
);

export default Page404;
