import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

import HomeIcon from "@mui/icons-material/Home";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import GroupIcon from "@mui/icons-material/Group";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

import imgBg from "../../assets/jobBg.jpg";
import SlideCard from "../../components/common/SlideCard/SlideCard";

function JobDetail({ id }) {
  return (
    <Box
      sx={{
        backgroundImage: `url(${imgBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
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
            Shop name
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
                <Typography variant="body1">Mức lương: ~ 5.000.000đ</Typography>
              </Box>
            </Grid>
            <Grid item size={{ xs: 12, md: 4 }}>
              <Box display="flex" alignItems="center">
                <AssignmentIndIcon sx={{ mr: 1 }} />
                <Typography variant="body1">Vị trí tuyển: Phục vụ</Typography>
              </Box>
            </Grid>
            <Grid item size={{ xs: 12, md: 4 }}>
              <Box display="flex" alignItems="center">
                <GroupIcon sx={{ mr: 1 }} />
                <Typography variant="body1">Số lượng: 3 nhân sự</Typography>
              </Box>
              <Typography variant="body1"></Typography>
            </Grid>
            <Grid item size={12}>
              <Divider />
              <Typography variant="body2" mt={1}>
                Đã có 4 ứng viên quan tâm! Nộp hồ sơ ứng tuyển ngay để không bỏ
                lỡ cơ hội này!
              </Typography>
            </Grid>
          </Grid>
          <Grid item size={12} mt={2}></Grid>
          <Grid item size={{ xs: 12, md: 3 }} mt={2}>
            <Button variant="contained">Nộp hồ sơ ứng tuyển</Button>
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
            <span>Địa chỉ: </span>
          </Typography>
          <Typography variant="body2">
            <span>Hotline: </span>
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
            <Typography variant="body2">Description...</Typography>
          </Box>
          <Box my={1}>
            <Typography variant="h5">Yêu cầu công việc</Typography>
            <Divider />
            <Typography variant="body2">Description...</Typography>
          </Box>
          <Box my={1}>
            <Typography variant="h5">Quyền lợi</Typography>
            <Divider />
            <Typography variant="body2">Description...</Typography>
          </Box>
        </Grid>
      </Grid>
      <SlideCard />
    </Box>
  );
}

export default JobDetail;
