// import { Box, Grid, useMediaQuery } from "@mui/material";
// import { Athenticated } from "assest/svgComponents/Athenticated";
// import i18n from "i18n";
// import { AppLayout } from "layouts/components/AppLayout";

// const Authentic = () => {
//   const isSmallScreen = useMediaQuery("(max-width:600px)"); // Define your screen size breakpoint

//   return (
//     <>
//       <Grid item>
//         <div
//           style={{
//             paddingTop: !isSmallScreen ? "50px" : "20px",
//           }}
//         >
//           <Athenticated />
//         </div>
//       </Grid>
//       <Grid
//         item
//         mt={3}
//         style={{
//           fontWeight: 700,
//           color: "#23B502",
//           letterSpacing: 3,
//           textAlign: "center",
//           fontSize: "18px",
//           marginTop: !isSmallScreen ? "40px" : "24px",
//         }}
//       >
//         {i18n.t("scanTagResultScreen.certifiedTitle")}
//       </Grid>
//       <Grid
//         item
//         style={{
//           marginTop: !isSmallScreen ? "20px" : "5px",
//           fontWeight: 700,
//           color: "#707070",
//           letterSpacing: 3,
//           textAlign: "center",
//           fontSize: "18px",
//         }}
//       >
//         {i18n.t("scanTagResultScreen.certifiedNo")}
//       </Grid>
//       <Grid
//         item
//         style={{
//           marginTop: !isSmallScreen ? "20px" : "5px",
//           fontWeight: 700,
//           color: "rgba(112, 112, 112, 0.6)",
//           letterSpacing: 3,
//           textAlign: "center",
//           fontSize: "18px",
//         }}
//       >
//         MSa3b6a35130303034
//       </Grid>
//       <Grid
//         item
//         container
//         px={4}
//         mt={5}
//         rowGap={0.5}
//         sx={{
//           color: "rgba(99, 99, 102, 0.6)",
//           maxWidth: !isSmallScreen ? "900px" : "599px",
//           margin: !isSmallScreen ? "auto" : "",
//           paddingTop: !isSmallScreen ? "70px" : "",
//         }}
//       >
//         <Grid
//           item
//           xs={7}
//           md={7}
//           lg={7}
//           style={{
//             fontWeight: 400,
//             textAlign: "left",
//             fontSize: "16px",
//           }}
//         >
//           {i18n.t("scanTagResultScreen.productName")}
//         </Grid>

//         <Grid
//           item
//           xs={5}
//           md={5}
//           lg={5}
//           style={{
//             fontWeight: 400,
//             color: "#636366",
//             textAlign: "right",
//             fontSize: "16px",
//           }}
//         >
//           Moducase DF60{" "}
//         </Grid>
//         <Grid
//           item
//           xs={7}
//           md={7}
//           lg={7}
//           style={{
//             fontWeight: 400,
//             textAlign: "left",
//             fontSize: "16px",
//             paddingTop: !isSmallScreen ? "20px" : "",
//           }}
//         >
//           Produce Batch{" "}
//         </Grid>
//         <Grid
//           item
//           xs={5}
//           md={5}
//           lg={5}
//           style={{
//             fontWeight: 400,
//             color: "#636366",
//             textAlign: "right",
//             fontSize: "16px",
//             paddingTop: !isSmallScreen ? "20px" : "",
//           }}
//         >
//           Year 2024{" "}
//         </Grid>
//       </Grid>

//       <Grid item px={4}>
//         <div
//           style={{
//             paddingBottom: !isSmallScreen ? "50px" : "20px",
//             maxWidth: !isSmallScreen ? "900px" : "",
//             margin: !isSmallScreen ? "auto" : "",
//             paddingTop: !isSmallScreen ? "50px" : "30px",
//           }}
//         >
//           <p
//             style={{
//               textAlign: !isSmallScreen ? "center" : "justify",
//               fontSize: "16px",
//               fontWeight: "400",
//               color: "rgba(99, 99, 102, 0.6)",
//               marginLeft: !isSmallScreen ? "30px" : "",
//             }}
//           >
//             {i18n.t("scanTagResultScreen.certifiedStatement")}
//           </p>
//         </div>
//       </Grid>
//     </>
//   );
// };
// const AuthenticPage = () => {
//   const isSmallScreen = useMediaQuery("(max-width:600px)"); // Define your screen size breakpoint

//   return (
//     <AppLayout>
//       <Box
//         style={{
//           background: "#fff",
//           height: !isSmallScreen ? "84vh" : "auto",
//         }}
//       >
//         <Box
//           margin={1}
//           sx={{
//             padding: "5px",
//             height: !isSmallScreen ? "97%" : "auto",
//           }}
//           className="border-background"
//         >
//           <Box
//             style={{
//               background: "#fff",
//               height: !isSmallScreen ? "100%" : "auto",
//             }}
//           >
//             <Authentic />
//           </Box>
//         </Box>
//       </Box>
//     </AppLayout>
//   );
// };

// export default AuthenticPage;

import { Box, Grid, useMediaQuery } from "@mui/material";
import { Athenticated } from "assest/svgComponents/Athenticated";
import i18n from "i18n";
import { AppLayout } from "layouts/components/AppLayout";
import { Serial } from "types/Serial";

const Authentic = ({ serial = {} }: { serial: Serial }) => {
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
          Year 2024{" "}
        </Grid>
      </Grid>

      <Grid item px={4}>
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
const AuthenticPage = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)"); // Define your screen size breakpoint

  return (
    <AppLayout>
      <Box
        style={{
          background: "#fff",
          height: !isSmallScreen ? "84vh" : "auto",
        }}
      >
        <Box
          margin={1}
          sx={{
            padding: "5px",
            height: !isSmallScreen ? "97%" : "auto",
          }}
          className="border-background"
        >
          <Box
            style={{
              background: "#fff",
              height: !isSmallScreen ? "100%" : "auto",
            }}
          >
            {/* <Authentic /> */}
          </Box>
        </Box>
      </Box>
    </AppLayout>
  );
};

export default AuthenticPage;
