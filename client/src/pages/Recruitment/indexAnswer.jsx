import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";

import { ApplicantAPI, AuthAPI } from "../../services";

import Authenticated from "../../components/ui/Authenticated";
import ResultCard from "../../components/ui/ResultCard";

function ApplicantAnswer() {
  const [applicant, setApplicant] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    AuthAPI.getCurrentUser((err, result) => {
      if (!err && result.data) {
        console.log(result.data.job);
        setJobs(result?.data?.jobs);
        return;
      }
    });
  }, []);

  return (
    <Box sx={{ backgroundColor: "white", height: "100%", width: "100%" }}>
      {jobs.length > 0 ? (
        jobs.map((job, index) => (
          <ResultCard
            key={index}
            name={job.name}
            salary={job.salary}
            quantity={job.quantity}
            applicant={0}
            date={job.createdAt}
          />
        ))
      ) : (
        <Authenticated message={"Hiện chưa có công việc được đăng tuyển"} />
      )}
    </Box>
  );
}

export default ApplicantAnswer;
