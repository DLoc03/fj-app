import React from "react";
import { useLocation } from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PayPal from "../../components/ui/PayPal";

const CheckoutPage = () => {
  const location = useLocation();
  const { price, name } = location.state || {};

  const handleSuccess = (details) => {
    console.log("Thanh toán thành công:", details);

    //write API storing receipt here
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      px={2}
      py={4}
      sx={{
        height: "100%",
      }}
    >
      <Box
        width={{ xs: "100%", sm: "600px" }}
        px={2}
        py={4}
        sx={{
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Typography
          fontSize={{ xs: "16px", md: "20px" }}
          textAlign={"center"}
          mb={2}
        >
          Thanh toán gói dịch vụ {name}
        </Typography>
        <PayPal amount={price} onSuccess={handleSuccess} />
      </Box>
    </Box>
  );
};

export default CheckoutPage;
