import React from "react";
import { Box, Button, Typography } from "@mui/material";
import bannerImage from "../../assets/Banner.jpg";
import PATHS from "../../routes/path";

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
        padding: { xs: "0 20px", md: "0" },
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          textShadow: "shadown.main",
        }}
      >
        <Typography
          sx={{ fontWeight: 700, fontSize: { xs: "28px", md: "48px" } }}
        >
          FJ Hub - Food & Beverage Job Hubs
        </Typography>
        <Typography mb={4} sx={{ fontSize: { xs: "16px", md: "32px" } }}>
          Giải pháp tuyển dụng thông minh cho đội ngũ nhân sự
        </Typography>
        <Button
          variant="outlined"
          color="white"
          onClick={() => {
            window.location.href = PATHS.ABOUT;
          }}
        >
          Tìm hiểu thêm
        </Button>
      </Box>
    </Box>
  );
}

export default Banner;
