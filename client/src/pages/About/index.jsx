import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import aboutData from "../../data/aboutUs.json";
import SlideCard from "../../components/common/SlideCard";

function AboutUs() {
  return (
    <Box>
      <Grid
        container
        spacing={{ xs: 2, md: 4 }}
        sx={{ my: 4, padding: { xs: "0 20px", md: "0 80px" } }}
      >
        <Grid size={12}>
          <Typography
            sx={{ fontSize: { xs: "28px", md: "40px" } }}
            fontWeight={"700"}
            textAlign={"center"}
          >
            {aboutData["about-us"].title}
          </Typography>
        </Grid>
        <Grid size={12}>
          <Typography variant="body1" fontWeight={"500"} textAlign={"center"}>
            {aboutData["about-us"].desc}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Typography
            variant="h5"
            fontWeight={"700"}
            textAlign={{ xs: "center", md: "left" }}
          >
            {aboutData["about-us"].heading[0]}
          </Typography>
          <Typography variant="body1" fontWeight={"500"} textAlign={"justify"}>
            {aboutData["about-us"].content[0]}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }} sx={{ backgroundColor: "pink" }}>
          <img
            src={aboutData["about-us"].image[0]}
            alt="img-1"
            width={"100%"}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }} sx={{ backgroundColor: "pink" }}>
          <img
            src={aboutData["about-us"].image[0]}
            alt="img-1"
            width={"100%"}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Typography
            variant="h5"
            fontWeight={"700"}
            textAlign={{ xs: "center", md: "right" }}
          >
            {aboutData["about-us"].heading[1]}
          </Typography>
          <Typography variant="body1" fontWeight={"500"} textAlign={"justify"}>
            {aboutData["about-us"].content[1]}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 12 }}>
          <Typography variant="h5" fontWeight={"700"} textAlign={"center"}>
            {aboutData["about-us"].heading[2]}
          </Typography>
          <Typography variant="body1" fontWeight={"500"} textAlign={"center"}>
            {aboutData["about-us"].content[2]}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 12 }} sx={{ backgroundColor: "pink" }}>
          <img
            src={aboutData["about-us"].image[2]}
            alt="img-1"
            width={"100%"}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 12 }}>
          <Typography variant="h5" fontWeight={"700"} textAlign={"center"}>
            {aboutData["about-us"].heading[3]}
          </Typography>
          <Typography variant="body1" fontWeight={"500"} textAlign={"justify"}>
            {aboutData["about-us"].content[3]}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 12 }} sx={{ backgroundColor: "pink" }}>
          <img
            src={aboutData["about-us"].image[3]}
            alt="img-1"
            width={"100%"}
          />
        </Grid>
      </Grid>
      <SlideCard />
    </Box>
  );
}

export default AboutUs;
