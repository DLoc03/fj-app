import React from "react";
import { Typography, Box, Button, Grid } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import albumFirst from "../../assets/album-1.jpg";
import albumSecond from "../../assets/album-2.jpg";
import albumThird from "../../assets/album-3.jpg";
import SlideCard from "../../components/common/SlideCard";
import slideSecond from "../../assets/slide-2.jpg";
import PATHS from "../../routes/path";
import { useAuth } from "../../context/auth";
import feedbacks from "../../data/feedback.json";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";

function Home() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="home-container">
      <Box
        sx={{
          display: "flex",
          px: 8,
          flexDirection: { xs: "column", md: "row" },
          justifyContent: { xs: "center", md: "center" },
          alignItems: { xs: "center", md: "normal" },
          textAlign: { xs: "center", md: "left" },
          gap: { xs: 4, md: 12 },
          my: 4,
        }}
      >
        <Box
          sx={{
            span: {
              color: "primary.main",
              fontWeight: "bold",
              cursor: "pointer",
            },
          }}
        >
          <Typography
            color="primary.main"
            fontWeight={700}
            mb={2}
            sx={{ fontSize: { xs: "20px", md: "32px" } }}
          >
            FJ HUB hỗ trợ tuyển dụng như thế nào?
          </Typography>
          <Typography sx={{ fontSize: { xs: "12px", md: "16px" } }}>
            <PlayArrowIcon fontSize="2px" sx={{ mr: 2 }} /> Với{" "}
            <span>Ứng viên tìm việc</span>, FJ sẽ giúp các bạn có thể tìm kiếm
            cơ hội việc làm từ danh sách các tuyển dụng các công việc như pha
            chế, phục vụ, quản lý,...v.v. Vậy nên ngay bây giờ, hãy{" "}
            <span>Nộp hồ sơ ứng tuyển ngay!</span>
          </Typography>
          <Typography sx={{ fontSize: { xs: "12px", md: "16px" }, mt: 1 }}>
            <PlayArrowIcon fontSize="2" sx={{ mr: 2 }} /> Với{" "}
            <span>Nhà tuyển dụng</span>, FJ sẽ hỗ trợ sàng lọc ứng viên, dễ dàng
            tìm kiếm ứng viên sáng giá, tiết kiệm thời gian và chi phí rất
            nhiều. <span>Đăng ký thông tin nhà tuyển dụng ngay!</span>
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => {
              window.location.href = PATHS.ABOUT;
            }}
          >
            Tìm hiểu thêm
          </Button>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box
            component="img"
            src={albumFirst}
            alt="album-1"
            sx={{
              margin: "auto 0",
              height: { xs: "200px", md: "260px" },
              width: { xs: "100px", md: "120px" },
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
          <Box
            component="img"
            src={albumThird}
            alt="album-2"
            sx={{
              height: { xs: "260px", md: "320px" },
              width: { xs: "140px", md: "200px" },
              borderRadius: "8px",
              objectFit: "cover",
            }}
          />
          <Box
            component="img"
            src={albumSecond}
            alt="album-3"
            sx={{
              margin: "auto 0",
              height: { xs: "200px", md: "260px" },
              width: { xs: "100px", md: "120px" },
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          backgroundImage: `url(${slideSecond})`,
          width: "100%",
          height: { xs: "200px", md: "400px" },
          backgroundSize: "cover",
          backgroundPosition: "center",
          mx: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          px: { xs: "8px", md: "80px" },
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "16px", md: "32px" },
          }}
          textAlign={"center"}
          fontWeight={700}
          color="white"
        >
          Kết nối ứng viên và nhà tuyển dụng ngành F&B
        </Typography>
        <Typography
          color="white"
          textAlign={"center"}
          display={{ xs: "none", md: "block" }}
          my={2}
        >
          FJ HUB đồng hành cùng bạn trên hành trình chinh phục ngành F&B. Dù là
          nhân viên pha chế, phục vụ hay quản lý nhà hàng, cơ hội luôn chờ đón
          bạn. Nhà tuyển dụng cũng sẽ nhanh chóng tìm được ứng viên phù hợp nhất
          cho vị trí cần tuyển.
        </Typography>
        <Box display={"flex"} gap={4} my={{ xs: 2, md: 0 }}>
          <Button
            variant="outlined"
            sx={{
              color: "white",
              borderColor: "white",
              width: { xs: "160px", md: "300px" },
              fontSize: { xs: "8px", md: "16px" },
            }}
            onClick={() => (window.location.href = PATHS.JOB)}
          >
            Tìm việc làm ngay
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: "white",
              borderColor: "white",
              width: { xs: "160px", md: "300px" },
              fontSize: { xs: "8px", md: "16px" },
            }}
            onClick={() => {
              window.location.href = isAuthenticated
                ? PATHS.PROFILE
                : PATHS.LOGIN;
            }}
          >
            Tuyển dụng ngay
          </Button>
        </Box>
      </Box>
      <Grid container spacing={4} justifyContent="center" sx={{ my: 4, px: 6 }}>
        <Grid item size={12}>
          <Typography
            fontSize={{ xs: "20px", md: "32px" }}
            textAlign={"center"}
            fontWeight={700}
          >
            Họ nói gì về FJ?
          </Typography>
        </Grid>
        {feedbacks.map((item, index) => (
          <Grid item size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Box
              sx={{
                background: "white",
                borderRadius: "16px",
                p: 3,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box
                component="img"
                src={item.avatar}
                alt={item.name}
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  objectFit: "cover",
                  mb: 2,
                  border: "2px solid #ddd",
                }}
              />
              <Typography fontWeight={600} mb={0.5}>
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                {item.role}
              </Typography>
              <Typography
                sx={{
                  fontStyle: "italic",
                  textAlign: "center",
                  fontSize: { xs: "12px", md: "14px" },
                }}
              >
                “{item.feedback}”
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      <SlideCard />
    </div>
  );
}

export default Home;
