import React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PayPal from "../../components/ui/PayPal";

import bg from "../../assets/background.jpg";

const CheckoutPage = () => {
  const handleSuccess = (details) => {
    console.log("Thanh toán thành công:", details);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      px={2}
      py={4}
      sx={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        width={{ xs: "100%", sm: "400px" }}
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
          Thanh toán gói dịch vụ
        </Typography>
        <PayPal amount={100} onSuccess={handleSuccess} />
      </Box>
    </Box>
  );
};

export default CheckoutPage;
