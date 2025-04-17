import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import aboutData from "../../data/about-us.json";
import SlideCard from "../../components/common/SlideCard";

import img1 from "../../assets/about-us/img-1.jpg";
import img2 from "../../assets/about-us/img-2.jpg";
import img3 from "../../assets/about-us/img-3.jpg";
import img4 from "../../assets/about-us/img-4.jpg";

const imageMap = {
  "image-1": img1,
  "image-2": img2,
  "image-3": img3,
  "image-4": img4,
};

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
          <Typography
            sx={{ fontSize: { xs: "12px", md: "16px" } }}
            fontWeight={"500"}
            textAlign={"center"}
          >
            {aboutData["about-us"].desc}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Typography
            sx={{ fontSize: { xs: "16px", md: "24px" } }}
            fontWeight={"700"}
            textAlign={{ xs: "center", md: "left" }}
          >
            {aboutData["about-us"].heading[0]}
          </Typography>
          <Typography
            sx={{ fontSize: { xs: "12px", md: "16px" } }}
            fontWeight={"500"}
            textAlign={"justify"}
          >
            {aboutData["about-us"].content[0]}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <img
            src={imageMap[aboutData["about-us"].image[0]]}
            alt="about-img"
            width="100%"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <img
            src={imageMap[aboutData["about-us"].image[1]]}
            alt="about-img"
            width="100%"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Typography
            fontWeight={"700"}
            textAlign={{ xs: "center", md: "right" }}
            sx={{ fontSize: { xs: "16px", md: "24px" } }}
          >
            {aboutData["about-us"].heading[1]}
          </Typography>
          <Typography
            sx={{ fontSize: { xs: "12px", md: "16px" } }}
            fontWeight={"500"}
            textAlign={"justify"}
          >
            {aboutData["about-us"].content[1]}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 12 }}>
          <Typography
            sx={{ fontSize: { xs: "16px", md: "24px" } }}
            fontWeight={"700"}
            textAlign={"center"}
          >
            {aboutData["about-us"].heading[2]}
          </Typography>
          <Typography
            sx={{ fontSize: { xs: "12px", md: "16px" } }}
            s
            fontWeight={"500"}
            textAlign={"center"}
          >
            {aboutData["about-us"].content[2]}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 12 }}>
          <img
            src={imageMap[aboutData["about-us"].image[2]]}
            alt="about-img"
            width="100%"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 12 }}>
          <Typography
            sx={{ fontSize: { xs: "16px", md: "24px" } }}
            fontWeight={"700"}
            textAlign={"center"}
          >
            {aboutData["about-us"].heading[3]}
          </Typography>
          <Typography
            sx={{ fontSize: { xs: "12px", md: "16px" } }}
            fontWeight={"500"}
            textAlign={"justify"}
          >
            {aboutData["about-us"].content[3]}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 12 }}>
          <img
            src={imageMap[aboutData["about-us"].image[3]]}
            alt="about-img"
            width="100%"
          />
        </Grid>
        <Grid size={12}>
          <Typography
            fontSize={{ xs: "16px", md: "20px" }}
            sx={{ fontStyle: "italic" }}
            textAlign={"center"}
            fontWeight={500}
          >
            Hãy thử tìm kiếm cơ hội của bản thân tại FJ - Food & Beverage Jobs
          </Typography>
        </Grid>
      </Grid>
      <SlideCard />
    </Box>
  );
}

export default AboutUs;
