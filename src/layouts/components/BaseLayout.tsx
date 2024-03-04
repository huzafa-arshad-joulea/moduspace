import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import Alert from "./Alert";
import Footer from "./Footer";
import Header from "./Header";

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid
      display="flex"
      flexDirection="column"
      style={{
        background: "#262626",
        minHeight: "100vh",
        width: "100vw",
        overflow: "hidden"
      }}
    >
      <Grid item>
        <Header />
      </Grid>
      <Grid
        item
        container
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        {Alert()}
        <Grid item className="main-container">
          {children}
        </Grid>
      </Grid>
      <Grid item>
        <Footer />
      </Grid>

    </Grid>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BaseLayout;
