import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

import JobCard from "../../components/ui/JobCard";
import { AuthAPI } from "../../services/authAPI";
import Authenticated from "../../components/ui/Authenticated";
import Recruitment from "../../components/ui/Recruitment";
import SpinningLoader from "../../components/common/SpinningLoading";

function CompanyJobs() {
  const [jobList, setJobList] = useState([]);
  const [status, setStatus] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AuthAPI.getCurrentUser((err, result) => {
      if (!err && result?.data) {
        setJobList(result.data.jobs);
        setStatus(result.data.company.status);
      }
      setLoading(false);
    });
  }, []);

  if (loading) return <SpinningLoader />;

  return (
    <Box sx={{ height: "100%" }}>
      {status !== "Pending" ? (
        jobList.length > 0 ? (
          <Box m={2}>
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
          <Box
            sx={{
              backgroundColor: "white",
              p: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Typography variant="h5" gutterBottom color="primary">
              Danh sách tuyển dụng của bạn hiện đang trống
            </Typography>
            <Box textAlign="center" mt={2}>
              <Recruitment />
            </Box>
          </Box>
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
