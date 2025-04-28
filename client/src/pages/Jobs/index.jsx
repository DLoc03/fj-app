import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CardDetail from "../../components/common/Card";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

import Stack from "@mui/material/Stack";

import { JobsAPI } from "../../services";
import bgJob from "../../assets/bgJob.png";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import Sidebar from "../../components/ui/Sidebar";
import SpinningLoader from "../../components/common/SpinningLoading";
import PaginationButton from "../../components/common/PaginationButton";
import { Divider } from "@mui/material";

function Job() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    JobsAPI.getJobs(currentPage, (err, result) => {
      if (!err && result?.data) {
        const sortedJobs = result.data.paginatedJobs.sort((a, b) => {
          const priority = (job) => {
            if (job.code === "fj-premium") return 0;
            if (job.code === "fj-starter") return 1;
            return 2;
          };

          if (priority(a) !== priority(b)) {
            return priority(a) - priority(b);
          }

          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        setJobs(sortedJobs);
        setTotalPages(result.data.totalPage);
        setCurrentPage(result.data.currentPage);
      }
      setLoading(false);
    });
  }, [currentPage]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setCurrentPage(currentPage);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [currentPage]);

  // if (loading) return <SpinningLoader />;

  return (
    <Box>
      <Grid
        container
        sx={{
          backgroundImage: `url(${bgJob})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          minHeight: "100vh",
        }}
      >
        <Grid item size={{ xs: 12, sm: 12, md: 2.5 }}>
          <Sidebar />
        </Grid>
        <Grid
          item
          size={{ xs: 12, sm: 12, md: 9.5 }}
          sx={{
            position: "relative",
            zIndex: 2,
          }}
        >
          <Grid
            container
            spacing={4}
            py={{ xs: 1, md: 4 }}
            display={"flex"}
            justifyContent={"center"}
          >
            {jobs.map((job, jobIndex) => (
              <Grid
                item
                key={jobIndex}
                size={{ xs: 6, sm: 4, md: 3 }}
                sx={{
                  display: { xs: "flex", md: "flex" },
                  justifyContent: { xs: "center", md: "none" },
                }}
              >
                <CardDetail
                  id={job.id}
                  jobName={job.jobName}
                  avatar={job.company.avatar}
                  jobDesc={job.jobDescription}
                  quantity={job.quantity}
                  salary={job.salary}
                  compName={job.company.name}
                  company={job.company.id}
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
          <PaginationButton
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            colorText={"secondary.main"}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Job;
