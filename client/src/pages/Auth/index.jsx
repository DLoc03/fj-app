import React, { useState, useEffect } from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import { Button, Grid, IconButton } from "@mui/material";

import imgBg from "../../assets/jobBg.jpg";
import albumFJ from "../../assets/album-1.jpg";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DisabledVisibleIcon from "@mui/icons-material/DisabledVisible";

function Index() {
  const [isDisplay, setIsDisplay] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState(false);

  useEffect(() => {
    const currentPath = window.location.pathname;
    setIsLoginPage(currentPath === "/login");
  }, []);

  const togglePasswordVisibility = () => {
    setIsDisplay((prev) => !prev);
  };

  const handleSubmit = () => {
    if (isLoginPage) {
      window.location.href = "/";
    } else {
      window.location.href = "/login";
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${imgBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        px: 4,
      }}
    >
      <Grid container spacing={4} py={8}>
        <Grid item size={{ xs: 12, md: 5 }}>
          <Paper
            sx={{ backgroundColor: "white", p: 2, boxSizing: "border-box" }}
          >
            <Typography variant="h5" textAlign={"center"}>
              {isLoginPage
                ? "Đăng nhập nhà tuyển dụng"
                : "Đăng ký tài khoản nhà tuyển dụng"}
            </Typography>

            {/* Email Input */}
            <Typography variant="body2" mt={2}>
              {isLoginPage ? "Email đăng nhập" : "Email đăng ký"}
            </Typography>
            <InputBase
              placeholder={isLoginPage ? "Email đăng nhập" : "Email đăng ký"}
              fullWidth
              sx={{ border: "1px solid gray", p: 1, borderRadius: 1, mt: 1 }}
            />

            {/* Conditional inputs for register page */}
            {!isLoginPage && (
              <>
                <Typography variant="body2" mt={2}>
                  Họ và tên
                </Typography>
                <InputBase
                  placeholder="Nhập họ và tên"
                  fullWidth
                  sx={{
                    border: "1px solid gray",
                    p: 1,
                    borderRadius: 1,
                    mt: 1,
                  }}
                />
                <Typography variant="body2" mt={2}>
                  Số điện thoại
                </Typography>
                <InputBase
                  placeholder="Nhập số điện thoại"
                  fullWidth
                  sx={{
                    border: "1px solid gray",
                    p: 1,
                    borderRadius: 1,
                    mt: 1,
                  }}
                />
              </>
            )}

            {/* Password Input */}
            <Typography variant="body2" mt={2}>
              Mật khẩu
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <InputBase
                placeholder="Nhập mật khẩu"
                fullWidth
                type={isDisplay ? "text" : "password"}
                sx={{
                  border: "1px solid gray",
                  p: 1,
                  borderRadius: 1,
                  mt: 1,
                  flexGrow: 1,
                }}
              />
              <IconButton onClick={togglePasswordVisibility}>
                {isDisplay ? <RemoveRedEyeIcon /> : <DisabledVisibleIcon />}
              </IconButton>
            </Box>

            {/* Submit Button */}
            <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
              {isLoginPage ? "Đăng nhập" : "Đăng ký"}
            </Button>

            {/* Redirect Link */}
            <Typography>
              {isLoginPage ? (
                <>
                  Chưa có tài khoản?{" "}
                  <Button
                    variant="text"
                    onClick={() => (window.location.href = "/register")}
                  >
                    Đăng ký ngay
                  </Button>
                </>
              ) : (
                <>
                  Đã có tài khoản?{" "}
                  <Button
                    variant="text"
                    onClick={() => (window.location.href = "/login")}
                  >
                    Đăng nhập ngay
                  </Button>
                </>
              )}
            </Typography>
          </Paper>
        </Grid>
        <Grid item size={7} display={{ xs: "none", md: "block" }}>
          <Paper backgroundColor={"white"} style={{ padding: "20px" }}>
            <Typography variant="h4" mb={1}>
              FJ Hub - Food & Beverage Hub
            </Typography>
            <Grid container spacing={2}>
              <Grid item size={8}>
                <Typography variant="body1">
                  FJ Hub là nền tảng chuyên hỗ trợ ban tuyển dụng trong ngành
                  F&B với quy trình tuyển dụng thông minh, giúp doanh nghiệp
                  nhanh chóng tìm kiếm và tuyển chọn nhân sự phù hợp. Chúng tôi
                  cung cấp một lộ trình tuyển dụng rõ ràng, chuyên nghiệp và
                  hiệu quả.
                </Typography>
                <Typography variant="body1">
                  Tìm kiếm ứng viên phù hợp giữa hàng trăm hồ sơ là một công
                  việc mất nhiều thời gian. FJ Hub hỗ trợ nhà tuyển dụng thông
                  qua: Bộ lọc thông minh giúp sàng lọc ứng viên theo tiêu chí
                  như kinh nghiệm, kỹ năng, vị trí mong muốn,... Điều này giúp
                  nhà tuyển dụng rút ngắn thời gian tìm kiếm ứng viên và tập
                  trung vào những hồ sơ tiềm năng nhất.
                </Typography>
              </Grid>
              <Grid
                item
                size={4}
                height={"300px"}
                sx={{
                  backgroundImage: `url(${albumFJ})`,
                  backgroundSize: "cover",
                }}
              ></Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Index;
