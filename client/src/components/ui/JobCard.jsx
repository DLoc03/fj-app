import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Paper from "@mui/material/Paper";
import { Button, Divider, Grid, Typography } from "@mui/material";

import { formatCurrency } from "../../utils/helper";
import PATHS from "../../routes/path";

import { QuestionAPI, JobsAPI } from "../../services";
import SpinningLoader from "../common/SpinningLoading";
import PopupAlert from "../common/PopUp";

function JobCard({ id }) {
  const [jobData, setJobData] = useState({
    id: "",
    jobName: "",
    quantity: "",
    jobDescription: "",
    salary: "",
    testId: "",
  });
  const [testData, setTestData] = useState({
    id: "",
    title: "",
    description: "",
  });
  const [test, setTest] = useState();
  const [loading, setLoading] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    JobsAPI.getJobById(id, (err, result) => {
      if (!err && result?.data) {
        const job = result.data;
        setJobData({
          id: job.id,
          jobName: job.jobName,
          quantity: job.quantity,
          jobDescription: job.jobDescription,
          salary: job.salary,
          testId: job.testId,
        });
        return;
      }
    });
  }, [id]);

  useEffect(() => {
    if (jobData.id && jobData.jobName && jobData.jobDescription) {
      setTestData({
        id: jobData.testId?._id || "",
        title: `Phỏng vấn vị trí: ${jobData.jobName}`,
        description: `Mô tả: ${jobData.jobDescription}`,
      });
    }
  }, [jobData]);

  useEffect(() => {
    if (testData.id) {
      QuestionAPI.getTest(testData.id, (err, result) => {
        if (!err && result?.data) {
          setTest(result.data);
        } else {
          setTest(null);
        }
      });
    }
  }, [testData.id]);

  const handleButtonClick = () => {
    setLoading(true);
    if (test) {
      setTimeout(() => {
        navigate(PATHS.COMPANY_TEST.replace(":id", testData.id), {
          state: { title: testData.title },
        });
        setLoading(false);
      }, 1000);
    } else {
      QuestionAPI.postTest(id, testData, (err, result) => {
        if (!err && result?.data?.id) {
          setTestData((prevState) => ({
            ...prevState,
            id: result.data.id,
          }));

          setTimeout(() => {
            navigate(PATHS.COMPANY_TEST.replace(":id", result.data.id), {
              state: { title: testData.title },
            });
            setLoading(false);
          }, 1000);
        }
      });
    }
  };

  if (loading) return <SpinningLoader />;

  return (
    <Paper
      sx={{
        padding: "12px 20px",
        border: "1px solid secondary.main",
        mb: 2,
        display: { xs: "flex", md: "block" },
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        fontSize={{ xs: "16px", md: "20px" }}
        fontWeight={500}
        color="primary.main"
      >
        Tuyển dụng vị trí: {jobData.jobName}
      </Typography>
      <Divider sx={{ my: 1 }} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Typography fontSize={{ xs: "12px", md: "14px" }}>
            Số lượng: {jobData.quantity}
          </Typography>
        </Grid>

        <Grid item xs={12} md={9}>
          <Typography fontSize={{ xs: "12px", md: "14px" }}>
            Mức lương dự kiến: {formatCurrency(jobData.salary)}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography fontSize={{ xs: "12px", md: "14px" }}>
            Mô tả công việc: {jobData.jobDescription}
          </Typography>
        </Grid>
      </Grid>

      <Button
        variant="outlined"
        sx={{ mt: 2, fontSize: { xs: "8px", sm: "8px", md: "12px" } }}
        onClick={handleButtonClick}
      >
        {test ? "Xem bài test phỏng vấn" : "Tạo bài test phỏng vấn"}
      </Button>
    </Paper>
  );
}

export default JobCard;
