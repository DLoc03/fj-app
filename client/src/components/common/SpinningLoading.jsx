import React from "react";
import { CircularProgress, Box } from "@mui/material";

function SpinningLoader() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress sx={{ color: "white" }} />
    </Box>
  );
}

export default SpinningLoader;
