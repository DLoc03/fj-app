import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";

import { ApplicantAPI, AuthAPI } from "../../services";

import Authenticated from "../../components/ui/Authenticated";
import ResultCard from "../../components/ui/ResultCard";
import SpinningLoader from "../../components/common/SpinningLoading";

function ApplicantAnswer() {
  const [applicant, setApplicant] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AuthAPI.getAllJobs((err, result) => {
      if (!err && result.data) {
        setJobs(result?.data?.paginatedJobs);
        setLoading(false);
        return;
      }
      setJobs([]);
      setLoading(false);
    });
  }, []);

  if (loading) return <SpinningLoader />;

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      {jobs.length > 0 ? (
        <Box sx={{ height: "100%", width: "100%", p: 4 }}>
          {jobs.map((job) => (
            <ResultCard
              key={job.id}
              name={job.jobName}
              salary={job.salary}
              quantity={job.quantity}
              applicant={""}
              date={job.createdAt}
            />
          ))}
        </Box>
      ) : (
        <Authenticated message={"Hiện chưa có công việc được đăng tuyển"} />
      )}
    </Box>
  );
}

export default ApplicantAnswer;
