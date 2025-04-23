import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CardDetail from "../../components/common/Card";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

import Stack from "@mui/material/Stack";
import { useMediaQuery } from "react-responsive";

import { JobsAPI } from "../../services";
import bgJob from "../../assets/bgJob.png";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import Sidebar from "../../components/ui/Sidebar";
import SpinningLoader from "../../components/common/SpinningLoading";
import { Divider } from "@mui/material";

function Job() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const itemPerPage = isMobile ? 3 : 8;
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = parseInt(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(pageParam);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    JobsAPI.getJobs((err, result) => {
      if (!err && result?.data) {
        const sortedJobs = result.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setJobs(sortedJobs);
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setCurrentPage(pageParam);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [pageParam]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handlePageChange = (event, page) => {
    setSearchParams({ page: page.toString() });
  };

  const totalItems = jobs.length;
  const totalPages = Math.ceil(totalItems / itemPerPage);
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const currentItems = jobs.slice(startIndex, endIndex);

  if (loading) return <SpinningLoader />;

  return (
    <Box>
      <Grid
        container
        spacing={10}
        sx={{
          backgroundImage: `url(${bgJob})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          minHeight: "100vh",
        }}
      >
        <Sidebar />
        <Grid
          item
          size={{ xs: 12, md: 9 }}
          sx={{ position: "relative", zIndex: 2 }}
        >
          <Grid container spacing={4} py={{ xs: 1, md: 4 }}>
            {currentItems.map((job, jobIndex) => (
              <Grid
                item
                key={jobIndex}
                size={{ xs: 12, md: 3 }}
                sx={{
                  display: { xs: "flex", md: "flex" },
                  justifyContent: { xs: "center", md: "none" },
                }}
              >
                <CardDetail
                  id={job._id}
                  jobName={job.jobName}
                  avatar={job.company.avatar}
                  jobDesc={job.jobDescription}
                  quantity={job.quantity}
                  salary={job.salary}
                  company={job.company}
                />
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
