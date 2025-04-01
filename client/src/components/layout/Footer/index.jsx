import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Logo from "../../../assets/logo.png";

const clauses = [
  {
    title: "Liên hệ với FJ",
    item: ["2115232@dlu.edu.vn", "2115241@dlu.edu.vn"],
  },
  {
    title: "CSKH",
    item: ["Điều khoản bảo mật", "Khách hàng"],
  },
  {
    title: "Mạng xã hội",
    item: [<FacebookIcon />, <InstagramIcon />, <LinkedInIcon />],
  },
  {
    title: "",
    item: [
      <img
        key="logo"
        src={Logo}
        alt="Logo FJ"
        style={{ width: "100px", display: "block", margin: "0 auto" }}
      />,
    ],
  },
];

function Footer() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: 4,
        backgroundColor: "primary.main",
        color: "white",
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        {clauses.map((clause, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Box sx={{ textAlign: "center" }}>
              {clause.title && (
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    mb: 1,
                    pb: 1,
                    borderBottom: "1px solid white",
                  }}
                >
                  {clause.title}
                </Typography>
              )}
              {clause.item.map((content, i) => (
                <Typography key={i} sx={{ display: "block", mb: 0.5 }}>
                  {content}
                </Typography>
              ))}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Footer;
