import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CardDetail from "../../components/common/Card/Card";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import jobBg from "../../assets/jobBg.jpg";
import Sidebar from "../../components/ui/Sidebar";

function Job() {
  const itemPerPage = 8;
  const totalItems = 30;
  const totalPages = Math.ceil(totalItems / itemPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;

  const currentItems = Array.from({ length: totalItems }).slice(
    startIndex,
    endIndex
  );

  return (
    <Box>
      <Grid
        container
        spacing={10}
        sx={{
          backgroundImage: `url(${jobBg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          position: "relative",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
        />
        <Sidebar />
        <Grid
          item
          size={{ xs: 12, md: 9 }}
          sx={{ position: "relative", zIndex: 2 }}
        >
          <Grid container spacing={4} py={4}>
            <Grid item size={12}>
              <Typography
                variant="h4"
                fontWeight={"700"}
                color="white"
                textAlign={"center"}
              >
                Tuyển dụng nhân sự
              </Typography>
            </Grid>
            {currentItems.map((_, index) => (
              <Grid
                item
                key={index}
                size={{ xs: 12, md: 3 }}
                sx={{
                  display: { xs: "flex", md: "flex" },
                  justifyContent: { xs: "center", md: "none" },
                }}
              >
                <CardDetail />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid
          item
          size={12}
          zIndex={99}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Stack
            spacing={2}
            zIndex={99}
            backgroundColor={"white"}
            p={1}
            borderRadius={1}
            mb={4}
          >
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              renderItem={(item) => (
                <PaginationItem
                  slots={{
                    previous: ArrowBackIosIcon,
                    next: ArrowForwardIosIcon,
                  }}
                  {...item}
                />
              )}
            />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Job;
