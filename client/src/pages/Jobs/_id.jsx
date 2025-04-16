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

import imgBg from "../../assets/jobBg.jpg";
import SlideCard from "../../components/common/SlideCard";
import { formatCurrency } from "../../utils/helper";
import SpinningLoading from "../../components/common/SpinningLoading";
import PATHS from "../../routes/path";

function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState();
  const [comp, setComp] = useState();
  const compDetail = sessionStorage.getItem("selectedCompany");

  useEffect(() => {
    JobsAPI.getJobById(id, (err, result) => {
      if (!err && result?.data) {
        setJob(result.data);
      }
    });
  }, [id]);

  useEffect(() => {
    CompaniesAPI.getCompanyById(compDetail, (err, result) => {
      if (!err && result?.data) {
        console.log(err);
        setComp(result?.data);
      }
    });
  }, [compDetail]);

  console.log("Company detail: ", comp);

  return (
    <Box
      sx={{
        backgroundImage: `url(${imgBg})`,
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
          <Grid item size={{ xs: 12, md: 3 }}>
            <Box
              sx={{
                boxSizing: "border-box",
                backgroundColor: "white",
                width: { xs: "100%", md: "100%" },
                height: { xs: "160px", md: "100%" },
                borderRadius: "1px",
              }}
            ></Box>
          </Grid>
          <Grid item size={{ xs: 12, md: 9 }} gap={4}>
            <Typography variant="h4" fontWeight={700} mb={1}>
              {job.company}
            </Typography>
            <Grid
              container
              spacing={2}
              backgroundColor={"white"}
              borderRadius={1}
              color={"secondary.main"}
              p={1}
            >
              <Grid item size={{ xs: 12, md: 4 }}>
                <Box display="flex" alignItems="center">
                  <AttachMoneyIcon sx={{ mr: 1 }} />
                  <Typography variant="body1">
                    Mức lương: ~ {formatCurrency(job.salary)}
                  </Typography>
                </Box>
              </Grid>
              <Grid item size={{ xs: 12, md: 4 }}>
                <Box display="flex" alignItems="center">
                  <AssignmentIndIcon sx={{ mr: 1 }} />
                  <Typography variant="body1">
                    Vị trí tuyển: {job.jobName}
                  </Typography>
                </Box>
              </Grid>
              <Grid item size={{ xs: 12, md: 4 }}>
                <Box display="flex" alignItems="center">
                  <GroupIcon sx={{ mr: 1 }} />
                  <Typography variant="body1">
                    Số lượng: {job.quantity} nhân sự
                  </Typography>
                </Box>
                <Typography variant="body1"></Typography>
              </Grid>
              <Grid item size={12}>
                <Divider />
                <Typography variant="body2" mt={1}>
                  Đã có 4 ứng viên quan tâm! Nộp hồ sơ ứng tuyển ngay để không
                  bỏ lỡ cơ hội này!
                </Typography>
              </Grid>
            </Grid>
            <Grid item size={12} mt={2}></Grid>
            <Grid item size={{ xs: 12, md: 3 }} mt={2}>
              <Button
                variant="contained"
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
              backgroundColor: "primary.light",
              p: 2,
              boxSizing: "border-box",
              color: "secondary.main",
            }}
          >
            <Typography variant="h5" mb={1}>
              Thông tin cơ sở
              <Divider />
            </Typography>
            <Typography variant="body2" mb={"4px"}>
              <span>Địa chỉ: {comp.address}</span>
            </Typography>
            <Typography variant="body2">
              <span>Hotline: {comp.recruiter.phone}</span>
            </Typography>
          </Grid>
          <Grid
            item
            size={12}
            mb={1}
            sx={{
              backgroundColor: "primary.light",
              p: 2,
              boxSizing: "border-box",
              color: "secondary.main",
            }}
          >
            <Box my={1}>
              <Typography variant="h5">Mô tả công việc</Typography>
              <Divider />
              <Typography variant="body2">{job.jobDescription}</Typography>
            </Box>
            <Box my={1}>
              <Typography variant="h5">Yêu cầu công việc</Typography>
              <Divider />
              <Typography variant="body2">...</Typography>
            </Box>
            <Box my={1}>
              <Typography variant="h5">Quyền lợi</Typography>
              <Divider />
              <Typography variant="body2">...</Typography>
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
