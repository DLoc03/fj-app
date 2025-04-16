import React from "react";
import QuestionCard from "../../components/ui/QuestionCard";
import { useParams } from "react-router-dom";
import { USER_TYPE } from "../../common/enum/enum";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import jobBg from "../../assets/jobBg.jpg";
import SideBackground from "../../components/ui/SideBackground";

function Answer() {
  const { id } = useParams();

  return (
    <Box
      sx={{
        backgroundImage: `url(${jobBg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        position: "relative",
        minHeight: "100vh",
        px: { xs: 4, md: 8 },
        py: 4,
        boxSizing: "border-box",
      }}
    >
      <Grid container spacing={4}>
        <Grid item size={{ xs: 12, md: 8 }}>
          <Paper>
            <QuestionCard id={id} type={USER_TYPE.USER} />
          </Paper>
        </Grid>
        <Grid
          item
          size={{ xs: 0, md: 4 }}
          sx={{ backgroundColor: "pink" }}
          display={{ xs: "none", md: "block" }}
        >
          <SideBackground />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Answer;
