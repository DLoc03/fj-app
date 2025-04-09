import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import slideBg from "../../assets/slide.jpg";
import CardDetail from "./Card";
import { Button, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useCustomNavigate } from "../../utils";
import PATHS from "../../routes/path";
import { JobsAPI } from "../../services";

function SlideCard() {
  const navigate = useCustomNavigate();
  const itemsPerPage = 4;

  const [jobList, setJobList] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    JobsAPI.getJobs((err, res) => {
      if (!err && res?.data) {
        const allJobs = res.data;
        const last8Jobs = allJobs.slice(-8);
        setJobList(last8Jobs);
      }
    });
  }, []);

  const handleNext = () => {
    setStartIndex((prev) =>
      prev + 1 < jobList.length - itemsPerPage + 1 ? prev + 1 : 0
    );
  };

  const handlePrev = () => {
    setStartIndex((prev) =>
      prev - 1 >= 0 ? prev - 1 : jobList.length - itemsPerPage
    );
  };

  function handleGoJob() {
    navigate(PATHS.JOB);
  }

  useEffect(() => {
    const interval = setInterval(handleNext, 3000);
    return () => clearInterval(interval);
  }, [startIndex, jobList]);

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

        <Box sx={{ width: "100%", overflow: "hidden" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              transition: "transform 0.5s ease-in-out",
              transform: `translateX(-${(startIndex * 100) / itemsPerPage}%)`,
              width: `${(jobList.length / itemsPerPage) * 100}%`,
            }}
          >
            {jobList.map((job, index) => (
              <Box
                key={job._id || index}
                sx={{
                  flex: `0 0 ${100 / jobList.length}%`,
                  padding: "0 10px",
                  boxSizing: "border-box",
                  display: { xs: "flex", md: "flex" },
                  justifyContent: { xs: "center", md: "none" },
                }}
              >
                <CardDetail
                  id={job._id}
                  jobName={job.jobName}
                  jobDesc={job.jobDescription}
                  quantity={job.quantity}
                  salary={job.salary}
                  company={job.company}
                />
              </Box>
            ))}
          </Box>
        </Box>

        <ArrowForwardIosIcon
          onClick={handleNext}
          sx={{
            cursor: "pointer",
            fontSize: { xs: "20px", md: "60px" },
            color:
              startIndex >= jobList.length - itemsPerPage ? "gray" : "white",
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
