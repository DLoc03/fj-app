import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PayPal from "../../components/ui/PayPal";
import { ReceiptAPI } from "../../services/receiptAPI";
import PopupAlert from "../../components/common/PopUp";

const CheckoutPage = () => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertStatus, setAlertStatus] = useState("");
  const location = useLocation();
  const { price, name, id } = location.state || {};

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handleShowAlert = (message, callback) => {
    setAlertMessage(message);
    setAlertOpen(true);
    if (callback) {
      const timer = setTimeout(() => {
        setAlertOpen(false);
        callback();
      }, 2000);
      return () => clearTimeout(timer);
    }
  };

  <PopupAlert
    open={alertOpen}
    message={alertMessage}
    onClose={handleAlertClose}
    severity={alertStatus}
  />;

  const handleSuccess = (details) => {
    if (details.status === "COMPLETED") {
      ReceiptAPI.postReceiptById(
        id,
        details.purchase_units[0].amount,
        (err, result) => {
          if (!err && result?.data) {
            setAlertStatus("success");
            handleShowAlert("Thanh toán thành công");
            return;
          }
          setAlertStatus("error");
          handleShowAlert("Đã có lỗi xảy ra khi thành toán!");
        }
      );
    }
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
