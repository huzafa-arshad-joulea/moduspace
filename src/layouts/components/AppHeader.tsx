import { Grid } from "@mui/material";

export const AppHeader = () => {
  return (
    <header className="header">
      <Grid
        container
        display="flex"
        justifyContent="stretch"
        alignItems="stretch"
        sx={{
          color: "#aaa",
          background: "#1E1E1E",
        }}
      >
        <Grid item xs={12} p={1}>
          <a
            href="https://www.moduspace.sg"
            target="_blank"
            rel="noreferrer"
            className="logo"
          >
            <img
              src={`${process.env.PUBLIC_URL}/logo.png`}
              width={60}
              alt="Moduspace Logo"
            />
          </a>
        </Grid>
      </Grid>
    </header>
  );
};
