import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { JobsAPI } from "../../services";
import CardDetail from "../common/Card";
import { Divider } from "@mui/material";

function SideBackground() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    JobsAPI.getJobs(1, (err, result) => {
      if (err) {
        return;
      } else {
        const lastThreeJobs = result.data.paginatedJobs.slice(-3);
        setJobs(lastThreeJobs);
      }
    });
  }, []);

  return (
    <Box py={4}>
      <Typography variant="h5" textAlign={"center"} fontWeight={500}>
        Top công việc tuyển dụng
      </Typography>
      <Divider orientation="horizontal" flexItem sx={{ my: 1 }} />
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <Box mt={2} display={"flex"} justifyContent={"center"} width={"100%"}>
            <CardDetail
              key={job.id}
              compName={job.company.name}
              jobName={job.jobName}
              quantity={job.quantity}
              salary={job.salary}
              avatar={job.company.avatar}
            />
          </Box>
        ))
      ) : (
        <Typography variant="body1" textAlign={"center"}>
          Không có công việc mới.
        </Typography>
      )}
    </Box>
  );
}

export default SideBackground;
