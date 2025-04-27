import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import ApplicantAvt from "../../assets/applicant.png";

import { JobsAPI } from "../../services";
import { formatDate } from "../../utils/helper";
import { Button, Divider } from "@mui/material";
import { SESSION_DATA } from "../../common/enum/enum";
import PATHS from "../../routes/path";

function ApplicantCard({ jobId, name, email, phone, date }) {
  const [jobName, setJobname] = useState("");
  const applicant = JSON.parse(sessionStorage.getItem(SESSION_DATA.APPLICANT));
  useEffect(() => {
    JobsAPI.getJobById(jobId, (err, result) => {
      if (!err && result?.data) {
        setJobname(result?.data?.jobName);
      }
    });
  }, [jobId]);
  return (
    <Paper>
      <Grid container p={2}>
        <Grid item size={{ xs: 12, md: 1.5 }}>
          <img
            src={ApplicantAvt}
            alt="applicant-avt"
            style={{ height: "80px", width: "80px", borderRadius: "50%" }}
          />
        </Grid>
        <Grid item size={8}>
          <Grid container spacing={1}>
            <Grid item size={{ xs: 12, md: 8 }}>
              <Typography
                fontSize={{ xs: "14px", md: "16px" }}
                fontWeight={700}
              >
                Hồ sơ ứng viên {name}
              </Typography>
            </Grid>
            <Grid item size={{ xs: 12, md: 4 }}>
              <Typography fontSize={{ xs: "10px", md: "12px" }}>
                Ngày nộp hồ sơ: {formatDate(date)}
              </Typography>
            </Grid>
            <Grid item size={12}>
              <Divider orientation="horizontal" flexItem />
            </Grid>
            <Grid item size={12}>
              <Typography
                fontSize={{ xs: "12px", md: "14px" }}
                fontWeight={700}
              >
                Ứng tuyển vị trí: {jobName}
              </Typography>
            </Grid>
            <Grid item size={{ xs: 12, md: 6 }}>
              <Typography fontSize={{ xs: "12px", md: "14px" }}>
                Email: {email}
              </Typography>
            </Grid>
            <Grid item size={{ xs: 12, md: 6 }}>
              <Typography fontSize={{ xs: "12px", md: "14px" }}>
                Phone: {phone}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item size={{ xs: 12, md: 1 }} px={2}>
          <Grid container spacing={1}>
            <Grid item size={12}>
              <Button
                variant="outlined"
                sx={{
                  height: "32px",
                  width: "160px",
                  mt: 1,
                  fontSize: "12px",
                }}
                onClick={() =>
                  (window.location.href = PATHS.APPLICANT_RESULT.replace(
                    ":id",
                    applicant.id
                  ))
                }
              >
                Kết quả
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ApplicantCard;
