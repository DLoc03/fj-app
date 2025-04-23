import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

import { useParams } from "react-router-dom";

import { JobsAPI, CompaniesAPI } from "../../services";

import HomeIcon from "@mui/icons-material/Home";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import GroupIcon from "@mui/icons-material/Group";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

import bgJob from "../../assets/bgJob.png";
import defaultAvt from "../../assets/jobBg.jpg";
import SlideCard from "../../components/common/SlideCard";
import { formatCurrency, formatDate } from "../../utils/helper";
import SpinningLoading from "../../components/common/SpinningLoading";
import PATHS from "../../routes/path";
import SpinningLoader from "../../components/common/SpinningLoading";

function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState();
  const [comp, setComp] = useState();
  const compDetail = sessionStorage.getItem("selectedCompany");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    JobsAPI.getJobById(id, (err, result) => {
      if (!err && result?.data) {
        setJob(result.data);
        setLoading(false);
      }
    });
  }, [id]);

  useEffect(() => {
    CompaniesAPI.getCompanyById(compDetail, (err, result) => {
      if (!err && result?.data) {
        console.log(err);
        setComp(result?.data);
        setLoading(false);
      }
    });
  }, [compDetail]);

  console.log(comp);

  if (loading) return <SpinningLoader />;

  return (
    <Box
      sx={{
        backgroundImage: `url(${bgJob})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {compDetail && job ? (
        <Grid
          container
          spacing={4}
          p={4}
          boxSizing={"border-box"}
          color={"white"}
          mb={2}
        >
          <Grid item size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                boxSizing: "border-box",
                backgroundImage: `url(${
                  comp.avatar ? comp.avatar : defaultAvt
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: { xs: "100%", md: "100%" },
                height: { xs: "200px", md: "100%" },
                borderRadius: "1px",
              }}
            ></Box>
          </Grid>
          <Grid item size={{ xs: 12, md: 7 }} gap={4}>
            <Grid
              container
              spacing={2}
              backgroundColor={"white"}
              borderRadius={1}
              color={"secondary.main"}
              py={2}
              px={3}
              sx={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)" }}
            >
              <Grid item size={12}>
                <Typography
                  fontSize={{ xs: "20px", md: "28px" }}
                  fontWeight={700}
                  textAlign={{ xs: "center", md: "left" }}
                >
                  {job.company}
                </Typography>
                <Typography
                  item
                  size={12}
                  fontSize={{ xs: "12px", md: "14px" }}
                  textAlign={{ xs: "center", md: "left" }}
                  fontStyle={"italic"}
                >
                  Ngày đăng tuyển: {formatDate(job.createdAt)}
                </Typography>
                <Divider orientation="horizontal" flexItem />
              </Grid>
              <Grid item size={{ xs: 12, md: 4 }}>
                <Box display="flex" alignItems="center">
                  <AttachMoneyIcon sx={{ mr: 1 }} />
                  <Typography fontSize={{ xs: "12px", md: "16px" }}>
                    Mức lương: ~ {formatCurrency(job.salary)}
                  </Typography>
                </Box>
              </Grid>
              <Grid item size={{ xs: 12, md: 4 }}>
                <Box display="flex" alignItems="center">
                  <AssignmentIndIcon sx={{ mr: 1 }} />
                  <Typography fontSize={{ xs: "12px", md: "16px" }}>
                    Vị trí tuyển: {job.jobName}
                  </Typography>
                </Box>
              </Grid>
              <Grid item size={{ xs: 12, md: 4 }}>
                <Box display="flex" alignItems="center">
                  <GroupIcon sx={{ mr: 1 }} />
                  <Typography fontSize={{ xs: "12px", md: "16px" }}>
                    Số lượng: {job.quantity} nhân sự
                  </Typography>
                </Box>
                <Typography fontSize={{ xs: "12px", md: "16px" }}></Typography>
              </Grid>
              <Grid item size={12}>
                <Divider />
                <Typography fontSize={{ xs: "12px", md: "14px" }} mt={1}>
                  Đã có 4 ứng viên quan tâm! Nộp hồ sơ ứng tuyển ngay để không
                  bỏ lỡ cơ hội này!
                </Typography>
              </Grid>
            </Grid>
            <Grid item size={12} mt={2}></Grid>
            <Grid
              item
              size={{ xs: 12, md: 12 }}
              mt={2}
              display={"flex"}
              justifyContent={{ xs: "center", md: "left" }}
            >
              <Button
                variant="contained"
                sx={{
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
                  fontSize: {
                    xs: "10px",
                    md: "14px",
                  },
                }}
                onClick={() => {
                  window.location.href = PATHS.ANSWER.replace(":id", id);
                }}
              >
                Nộp hồ sơ ứng tuyển
              </Button>
            </Grid>
          </Grid>
          <Grid
            item
            size={12}
            sx={{
              backgroundColor: "white",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
              p: 2,
              boxSizing: "border-box",
              color: "secondary.main",
            }}
          >
            <Typography
              fontSize={{ xs: "16px", md: "20px" }}
              mb={1}
              fontWeight={500}
            >
              Thông tin cơ sở
              <Divider />
            </Typography>
            <Typography fontSize={{ xs: "12px", md: "16px" }} mb={"4px"}>
              <span>Địa chỉ: {comp.address}</span>
            </Typography>
            <Typography fontSize={{ xs: "12px", md: "16px" }}>
              <span>Hotline: {comp.recruiter.phone}</span>
            </Typography>
          </Grid>
          <Grid
            item
            size={12}
            mb={1}
            sx={{
              backgroundColor: "white",
              p: 2,
              boxSizing: "border-box",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
              color: "secondary.main",
            }}
          >
            <Box my={1}>
              <Typography
                fontSize={{ xs: "16px", md: "20px" }}
                fontWeight={500}
              >
                Mô tả công việc
              </Typography>
              <Divider />
              <Typography fontSize={{ xs: "12px", md: "16px" }}>
                {job.jobDescription}
              </Typography>
            </Box>
            <Box my={1}>
              <Typography
                fontSize={{ xs: "16px", md: "20px" }}
                fontWeight={500}
              >
                Yêu cầu công việc
              </Typography>
              <Divider />
              <Typography
                fontSize={{ xs: "12px", md: "14px" }}
                fontStyle={"italic"}
              >
                Chưa đề cập
              </Typography>
            </Box>
            <Box my={1}>
              <Typography
                fontSize={{ xs: "16px", md: "20px" }}
                fontWeight={500}
              >
                Quyền lợi
              </Typography>
              <Divider />
              <Typography
                fontSize={{ xs: "12px", md: "14px" }}
                fontStyle={"italic"}
              >
                Chưa đề cập
              </Typography>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <SpinningLoading />
      )}
      <SlideCard />
    </Box>
  );
}

export default JobDetail;
