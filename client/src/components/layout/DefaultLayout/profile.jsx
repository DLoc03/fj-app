import React from "react";
import Grid from "@mui/material/Grid";

import NavBar from "../NavBar";
import Footer from "../Footer";
import BannerAbout from "../../common/Banner";
import ProfileBar from "../../ui/ProfileBar";

import jobBg from "../../../assets/jobBg.jpg";
import Chatbot from "../../ui/Chatbot";

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
      <Grid container>
        <Grid item size={3}>
          <ProfileBar />
        </Grid>
        <Grid item size={9}>
          {children}
        </Grid>
      </Grid>
      <Footer />
      <Chatbot />
    </div>
  );
}

export default DefaultProfile;
