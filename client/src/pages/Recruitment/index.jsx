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
  const [company, setCompany] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AuthAPI.getCurrentJobList((err, result) => {
      if (!err && result?.data) {
        setJobList(result.data.paginatedJobs);
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    AuthAPI.getCurrentCompany((err, result) => {
      if (!err && result?.data) {
        setCompany(result.data);
      }
      setLoading(false);
    });
  }, []);

  console.log("Job list: ", jobList);
  console.log("Company data: ", company);

  if (loading) return <SpinningLoader />;

  return (
    <Box sx={{ height: "100%" }}>
      {company ? (
        company.status !== "Pending" ? (
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
        )
      ) : (
        <Authenticated
          message="Cơ sở của bạn chưa được đăng ký, vui lòng đăng ký thông tin!"
          register={false}
        />
      )}
    </Box>
  );
}

export default CompanyJobs;
