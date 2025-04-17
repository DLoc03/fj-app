import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

import JobCard from "../../components/ui/JobCard";
import { AuthAPI } from "../../services/authAPI";
import Authenticated from "../../components/ui/Authenticated";
import Recruitment from "../../components/ui/Recruitment";

function CompanyJobs() {
  const [jobList, setJobList] = useState([]);
  const [status, setStatus] = useState();

  useEffect(() => {
    AuthAPI.getCurrentUser((err, result) => {
      if (!err && result?.data) {
        setJobList(result.data.jobs);
        setStatus(result.data.company.status);
      }
    });
  }, []);

  return (
    <Box>
      {status !== "Pending" ? (
        jobList.length > 0 ? (
          <Box>
            {jobList.map((job) => (
              <JobCard
                key={job.id}
                jobName={job.jobName}
                id={job.id}
                jobDescription={job.jobDescription}
                quantity={job.quantity}
                salary={job.salary}
              />
            ))}

            <Box textAlign="center" mt={2}>
              <Recruitment />
            </Box>
          </Box>
        ) : (
          <Paper
            sx={{
              backgroundColor: "white",
              p: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              mt: 4,
            }}
          >
            <Typography variant="h5" gutterBottom color="primary">
              Danh sách tuyển dụng của bạn hiện đang trống
            </Typography>
            <Box textAlign="center" mt={2}>
              <Recruitment />
            </Box>
          </Paper>
        )
      ) : (
        <Authenticated
          message="Chúng tôi đang xác thực thông tin cơ sở của bạn! Vui lòng đợi!"
          register={false}
        />
      )}
    </Box>
  );
}

export default CompanyJobs;
