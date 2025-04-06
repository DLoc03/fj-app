import React from "react";

import bannerAbout from "../../../assets/Banner-About.jpg";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function Banner() {
  return (
    <Box
      sx={{
        height: "400px",
        backgroundImage: `url(${bannerAbout})`,
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
    >
      <Box
        sx={{
          textAlign: "center",
          textShadow: "shadown.main",
        }}
      >
        <Typography
          variant="h2"
          sx={{ fontWeight: 700, fontSize: { xs: "28px", md: "48px" } }}
        >
          FJ Hub - Food & Beverage Job Hubs
        </Typography>
        <Typography
          variant="h4"
          mb={4}
          sx={{ fontSize: { xs: "16px", md: "32px" } }}
        >
          Đồng hành cùng tìm đồng đội sáng giá
        </Typography>
      </Box>
    </Box>
  );
}

export default Banner;
