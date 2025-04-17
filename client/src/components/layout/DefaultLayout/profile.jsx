import React from "react";
import Grid from "@mui/material/Grid";

import NavBar from "../NavBar";
import Footer from "../Footer";
import BannerAbout from "../../common/Banner";
import ProfileBar from "../../ui/ProfileBar";

import jobBg from "../../../assets/jobBg.jpg";

function DefaultProfile({ children }) {
  return (
    <div
      className="container"
      style={{
        backgroundImage: `url(${jobBg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <NavBar />
      <BannerAbout />
      <Grid container spacing={{ xs: 1, md: 2 }}>
        <Grid item size={3}>
          <ProfileBar />
        </Grid>
        <Grid item size={8} mt={4}>
          {children}
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default DefaultProfile;
