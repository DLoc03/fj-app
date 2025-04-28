import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

import Logo from "../../assets/logo.png";

function SpinningLoader() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "white",
        zIndex: 99999999,
        gap: 2,
      }}
    >
      <img
        src={Logo}
        alt="Loading-logo"
        width={"120px"}
        height={"120px"}
        style={{ border: "4px solid orange", borderRadius: "50%" }}
      />
      <Typography sx={{ fontSize: { xs: "16px", md: "24px" } }}>
        Đang tải
      </Typography>
      <CircularProgress sx={{ color: "primary.main" }} />
    </Box>
  );
}

export default SpinningLoader;
