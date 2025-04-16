import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { Button, Divider, Grid, Typography } from "@mui/material";

import { formatCurrency } from "../../utils/helper";
import PATHS from "../../routes/path";

import { QuestionAPI } from "../../services";

function JobCard({ id, jobName, quantity, jobDescription, salary }) {
  const [jobData, setJobData] = useState({
    id: "",
    jobName: "",
    quantity: "",
    jobDescription: "",
    salary: "",
  });
  const [questions, setQuestions] = useState([]);

  const defautFetch = "Đang tải...";

  useEffect(() => {
    setJobData({
      id: id || "",
      jobName: jobName || defautFetch,
      quantity: quantity || defautFetch,
      jobDescription: jobDescription || defautFetch,
      salary: salary || defautFetch,
    });
  }, [id, jobName, quantity, jobDescription, salary]);

  useEffect(() => {
    QuestionAPI.getQuestion(id, (err, result) => {
      if (!err && result?.data.length > 0) {
        setQuestions(result.data);
      }
    });
  }, [id]);

  console.log("Job id: ", id);

  console.log("Question data: ", questions);

  return (
    <Paper
      sx={{ padding: "12px 20px", border: "1px solid secondary.main", mb: 2 }}
    >
      <Typography variant="h6" fontWeight={500} color="primary.main">
        {jobData.jobName !== defautFetch
          ? `Cần tìm nhân sự cho vị trí ${jobName}`
          : defautFetch}
      </Typography>
      <Divider sx={{ my: 1 }} />
      <Grid container spacing={2}>
        <Grid item size={{ sx: 12, md: 3 }}>
          <Typography>Số lượng: {jobData.quantity}</Typography>
        </Grid>

        <Grid item size={{ sx: 12, md: 9 }}>
          <Typography>
            Mức lương dự kiến: {formatCurrency(jobData.salary)}
          </Typography>
        </Grid>
        <Grid item size={12}>
          <Typography>Mô tả công việc: {jobData.jobDescription}</Typography>
        </Grid>
      </Grid>
      {questions && questions.length > 0 ? (
        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={() => {
            window.location.href = PATHS.COMPANY_TEST.replace(":id", id);
          }}
        >
          Xem câu hỏi phỏng vấn
        </Button>
      ) : (
        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={() => {
            window.location.href = PATHS.COMPANY_TEST.replace(":id", id);
          }}
        >
          {questions.length > 0
            ? "Xem câu hỏi phỏng vấn"
            : "Tạo câu hỏi phỏng vấn"}
        </Button>
      )}
    </Paper>
  );
}

export default JobCard;
