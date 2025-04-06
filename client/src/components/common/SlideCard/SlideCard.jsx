import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import slideBg from "../../../assets/slide.jpg";
import CardDetail from "../Card/Card";
import { Button, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useCustomNavigate } from "../../../utils";
import PATHS from "../../../routes/path";

function SlideCard() {
  const navigate = useCustomNavigate();
  const totalItems = 10;
  const itemsPerPage = 4;
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1 < totalItems ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 >= 0 ? prev - 1 : totalItems - 1));
  };

  function handleGoJob() {
    navigate(PATHS.JOB);
  }

  useEffect(() => {
    const interval = setInterval(handleNext, 3000);
    return () => clearInterval(interval);
  }, [startIndex]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "440px",
        backgroundImage: `url(${slideBg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        padding: "28px 20px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Typography
        variant="h4"
        sx={{ color: "white", fontWeight: "700", textAlign: "center" }}
      >
        Gợi ý cho bạn
      </Typography>

      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          width: "80%",
        }}
      >
        <ArrowBackIosIcon
          onClick={handlePrev}
          sx={{
            cursor: "pointer",
            fontSize: { xs: "20px", md: "60px" },
            color: startIndex === 0 ? "gray" : "white",
            zIndex: 2,
          }}
        />

        <Box
          sx={{
            width: "100%",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              transition: "transform 0.5s ease-in-out",
              transform: `translateX(-${(startIndex * 100) / totalItems}%)`,
              width: {
                xs: `${(totalItems / 1) * 100}%`,
                md: `${(totalItems / itemsPerPage) * 100}%`,
              },
            }}
          >
            {Array.from({ length: totalItems }).map((_, index) => (
              <Box
                key={index}
                sx={{
                  flex: `0 0 ${100 / totalItems}%`,
                  padding: "0 10px",
                  boxSizing: "border-box",
                  display: { xs: "flex", md: "flex" },
                  justifyContent: { xs: "center", md: "none" },
                }}
              >
                <CardDetail />
              </Box>
            ))}
          </Box>
        </Box>

        <ArrowForwardIosIcon
          onClick={handleNext}
          sx={{
            cursor: "pointer",
            fontSize: { xs: "20px", md: "60px" },
            color: startIndex >= totalItems - 1 ? "gray" : "white",
            zIndex: 2,
          }}
        />
      </Box>

      <Button
        variant="outlined"
        onClick={handleGoJob}
        sx={{
          width: "200px",
          color: "white",
          borderColor: "white",
          "&:hover": { backgroundColor: "white", color: "black" },
        }}
      >
        Xem thêm
      </Button>
    </Box>
  );
}

export default SlideCard;
