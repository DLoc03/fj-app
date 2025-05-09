import React from "react";
import { Box, Button, Typography } from "@mui/material";

const PaginationButton = ({
  currentPage,
  totalPages,
  onPageChange,
  colorText,
}) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      my={2}
      gap={2}
      maxWidth={"400px"}
      mx={"auto"}
    >
      <Button
        variant="contained"
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        sx={{
          bgcolor: "primary.main",
          color: "white",
          "&:hover": {
            bgcolor: "secondary.main",
          },
          "&.Mui-disabled": {
            bgcolor: "primary.main",
            color: "white",
            opacity: 0.8,
          },
        }}
      >
        Trang trước
      </Button>

      <Typography
        variant="body1"
        mt={1.2}
        fontSize={{ xs: "14px", md: "16px" }}
        color={`${colorText}`}
        fontWeight={500}
        textAlign={"center"}
        m={"auto"}
      >
        Trang {currentPage} / {totalPages}
      </Typography>

      <Button
        variant="contained"
        onClick={() =>
          currentPage < totalPages && onPageChange(+currentPage + 1)
        }
        disabled={currentPage === totalPages}
        sx={{
          bgcolor: "primary.main",
          color: "white",
          "&:hover": {
            bgcolor: "secondary.main",
          },
          "&.Mui-disabled": {
            bgcolor: "primary.main",
            color: "white",
            opacity: 0.8,
          },
        }}
      >
        Trang sau
      </Button>
    </Box>
  );
};

export default PaginationButton;
