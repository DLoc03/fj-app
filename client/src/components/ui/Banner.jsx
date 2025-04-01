import React from "react";
import { Box } from "@mui/material";
import bannerImage from "../../assets/Banner.jpg";

function Banner() {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "white",
        position: "relative",
      }}
    ></Box>
  );
}

export default Banner;
