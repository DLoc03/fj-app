import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
  Box,
} from "@mui/material";
import PATHS from "../../routes/path";
import { Navigate } from "react-router-dom";

function PackageCard({ name, price, description, color }) {
  const navigate = useNavigate();
  const cardStyle = {
    cursor: "pointer",
    background: `linear-gradient(135deg, ${
      color || "#007bff"
    } 0%, #f0f0f0 100%)`,
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    maxWidth: "300px",
    margin: "10px",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
    position: "relative",
    overflow: "hidden",
  };

  const cardContentStyle = {
    paddingBottom: "50px",
  };

  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    width: "auto",
    maxWidth: "250px",
    margin: "0 auto",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    transition: "background-color 0.3s ease, box-shadow 0.3s ease",
    position: "absolute",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
  };

  const handleButtonClick = () => {
    navigate(PATHS.PAYPAL, {
      state: { price, name },
    });
  };

  return (
    <Card sx={cardStyle}>
      <CardContent sx={cardContentStyle}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"flex-end"}
          minHeight={"80px"}
        >
          <Typography
            fontSize={{ xs: "16px", md: "28px" }}
            fontWeight={500}
            textAlign={"center"}
            color="white"
          >
            Gói {name}
          </Typography>
        </Box>
        <Divider variant="horizontal" flexItem sx={{ my: 1 }} />
        <Typography fontSize={{ xs: "12px", md: "16px" }} textAlign={"center"}>
          <strong>Giá:</strong> ${price}
        </Typography>
        <Typography
          fontSize={{ xs: "10px", md: "14px" }}
          textAlign={"center"}
          mt={1}
        >
          Ưu đãi: {description}
        </Typography>
      </CardContent>
      <Button
        sx={{
          ...buttonStyle,
          background: `linear-gradient(135deg, ${
            color || "#007bff"
          } 0%, #f0f0f0 100%)`,
          "&:hover": {
            background: `linear-gradient(135deg, ${
              color || "#007bff"
            } 0%, #e0e0e0 100%)`,
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
          },
          fontSize: { xs: "8px", sm: "10px", md: "12px" },
        }}
        onClick={handleButtonClick}
      >
        Chọn gói
      </Button>
    </Card>
  );
}

export default PackageCard;
