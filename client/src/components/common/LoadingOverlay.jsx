import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

function LoadingOverlay({ open }) {
  if (!open) return null;

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
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 99999999,
        gap: 2,
      }}
    >
      <Typography sx={{ fontSize: { xs: "16px", md: "24px" } }} color="white">
        Đang tải ảnh lên
      </Typography>
      <CircularProgress sx={{ color: "white" }} />
    </Box>
  );
}

export default LoadingOverlay;
