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
];

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        color: "white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1200px",
          margin: "0 auto",
          gap: { md: 2 },
          padding: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: { xs: 2, md: 0 },
            flex: 1,
          }}
        >
          <img src={Logo} alt="Logo FJ" style={{ width: "100px" }} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            flexGrow: 1,
            flex: 4,
          }}
        >
          {clauses.map((clause, index) => (
            <Box
              key={index}
              sx={{ textAlign: { xs: "center", md: "left" }, flex: 1 }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  mb: 1,
                  pb: 1,
                  borderBottom: "1px solid white",
                  display: "inline-block",
                }}
              >
                {clause.title}
              </Typography>
              {clause.item.map((content, i) => (
                <Typography key={i} sx={{ mb: 0.5 }}>
                  {content}
                </Typography>
              ))}
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: "secondary.main",
          padding: 1,
          textAlign: "center",
          mt: 2,
        }}
      >
        <Typography variant="body2">
          © 2025 FJ.COM.VN. All rights reserved
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
