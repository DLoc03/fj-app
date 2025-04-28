import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useTheme } from "@mui/material/styles";

import { ApplicantAPI, JobsAPI } from "../../services";
import SpinningLoader from "../../components/common/SpinningLoading";
import { formatDate } from "../../utils/helper";
import PATHS from "../../routes/path";

function ApplicantDetail() {
  const { id } = useParams();
  const [applicant, setApplicant] = useState(null);
  const [exam, setExam] = useState([]);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    ApplicantAPI.getApplicantResult(id, (err, result) => {
      if (!err && result?.data) {
        setApplicant(result?.data);
        setExam(result?.data.exam);
      }
      setLoading(false);
    });
  }, [id]);

  useEffect(() => {
    if (applicant?.jobId) {
      JobsAPI.getJobById(applicant.jobId, (err, result) => {
        if (!err && result?.data) {
          setJob(result?.data?.jobName);
        }
      });
    }
  }, [applicant]);

  if (loading) return <SpinningLoader />;

  return (
    <Box
      sx={{
        background: "white",
        height: "100%",
        py: 4,
        px: 12,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid container>
        <Grid item size={12}>
          <Typography
            fontSize={{ xs: "12px", md: "16px" }}
            textAlign={"center"}
          >
            Ứng viên
          </Typography>
        </Grid>
        <Grid item size={12}>
          <Typography
            fontSize={{ xs: "16px", md: "20px" }}
            textAlign={"center"}
            fontWeight={500}
          >
            {applicant?.name}
          </Typography>
        </Grid>
        <Grid item size={12}>
          <Typography
            fontSize={{ xs: "12px", md: "14px" }}
            textAlign={"center"}
            fontWeight={700}
          >
            Vị trí ứng tuyển: {job || "Đang tải..."}
          </Typography>
        </Grid>
        <Grid item size={12}>
          <Divider orientation="horizontal" flexItem sx={{ my: 1 }} />
        </Grid>
        <Grid item size={{ xs: 12, md: 4 }}>
          <Typography fontSize={{ xs: "12px", md: "14px" }}>
            Email: {applicant?.email}
          </Typography>
        </Grid>
        <Grid item size={{ xs: 12, md: 4 }}>
          <Typography fontSize={{ xs: "12px", md: "14px" }}>
            Số điện thoại: {applicant?.phone}
          </Typography>
        </Grid>
        <Grid item size={{ xs: 12, md: 4 }}>
          <Typography fontSize={{ xs: "12px", md: "14px" }}>
            Ngày nộp hồ sơ: {formatDate(applicant?.createdAt)}
          </Typography>
        </Grid>

        <Grid item size={12} mt={3}>
          <Paper sx={{ p: 4, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)" }}>
            <Grid container>
              <Grid item size={12}>
                <Divider orientation="horizontal" flexItem sx={{ my: 1 }}>
                  <Typography
                    fontSize={{ xs: "16px", md: "20px" }}
                    textAlign={"center"}
                    fontWeight={500}
                  >
                    Kết quả trả lời phỏng vấn
                  </Typography>
                </Divider>
              </Grid>
              {applicant && exam.length > 0 ? (
                exam.map((item, index) => (
                  <Grid container my={1}>
                    <Grid item size={12}>
                      <Typography
                        fontSize={{ xs: "14px", md: "16px" }}
                        fontWeight={700}
                      >
                        Câu {index + 1}
                      </Typography>
                    </Grid>
                    <Grid item size={12}>
                      <Typography fontSize={{ xs: "12px", md: "14px" }}>
                        {item.question}
                      </Typography>
                    </Grid>
                    <Grid item size={{ xs: 2, sm: 2, md: 0.5 }}>
                      <PlayArrowIcon />
                    </Grid>
                    <Grid item size={{ xs: 10, sx: 10, md: 11.5 }}>
                      <Typography
                        fontSize={{ xs: "12px", md: "14px" }}
                        fontWeight={500}
                      >
                        Ứng viên đã trả lời: {item.answer}
                      </Typography>
                    </Grid>
                  </Grid>
                ))
              ) : (
                <Typography>Ứng viên chưa trả lời phỏng vấn</Typography>
              )}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Box
        width={"100%"}
        display={"flex"}
        flexDirection={{ xs: "column", md: "row" }}
        justifyContent={"space-around"}
      >
        <Button variant="contained" sx={{ width: "280px", mt: 2 }}>
          Duyệt hồ sơ
        </Button>
        <Button
          variant="outlined"
          sx={{ width: "280px", mt: 2 }}
          onClick={() => (window.location.href = PATHS.APPLICANT_LIST)}
        >
          Quay lại danh sách
        </Button>
      </Box>
    </Box>
  );
}

export default ApplicantDetail;
