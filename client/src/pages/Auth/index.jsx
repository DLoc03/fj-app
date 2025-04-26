import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import { Button, Grid, IconButton } from "@mui/material";

import { AuthAPI } from "../../services/authAPI";
import PopupAlert from "../../components/common/PopUp";
import { useAuth } from "../../context/auth";
import { validateEmail, validatePhoneNumber } from "../../utils/helper";

import imgBg from "../../assets/bgJob.png";
import albumFJ from "../../assets/album-1.jpg";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DisabledVisibleIcon from "@mui/icons-material/DisabledVisible";
import SpinningLoader from "../../components/common/SpinningLoading";

function Auth() {
  const [isDisplay, setIsDisplay] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertStatus, setAlertStatus] = useState("");
  const { login } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentPath = window.location.pathname;
    setIsLoginPage(currentPath === "/login");
    setLoading(false);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setIsDisplay((prev) => !prev);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handleShowAlert = (message, callback) => {
    setAlertMessage(message);
    setAlertOpen(true);
    if (callback) {
      const timer = setTimeout(() => {
        setAlertOpen(false);
        callback();
      }, 2000);
      return () => clearTimeout(timer);
    }
  };

  const handleSubmit = () => {
    if (!validateEmail(form.email)) {
      showError("Email không hợp lệ!");
      return;
    }
    if (!form.password.trim()) {
      showError("Vui lòng nhập mật khẩu!");
      return;
    }

    if (!isLoginPage) {
      if (!form.name.trim()) {
        showError("Vui lòng nhập họ và tên!");
        return;
      }
      if (!validatePhoneNumber(form.phone)) {
        showError("Số điện thoại không hợp lệ!");
        return;
      }
    }

    if (isLoginPage) {
      AuthAPI.login(
        { email: form.email, password: form.password },
        (err, res) => {
          console.log("Res login: ", res.data);
          if (err || res.errCode !== 0) {
            showError("Đăng nhập thất bại! Vui lòng thử lại");
            return;
          }
          if (res?.user?.role === "admin") {
            showError("Tài khoản không hợp lệ!");
            return;
          }

          setAlertStatus("success");
          login(res?.data?.accessToken);
          handleShowAlert("Đăng nhập thành công!", () => {
            window.location.href = "/";
          });
        }
      );
    } else {
      AuthAPI.register(
        {
          email: form.email,
          password: form.password,
          name: form.name,
          phone: form.phone,
        },
        (err, res) => {
          console.log("Res result: ", res);
          if (err || res.errCode !== 0) {
            showError("Đăng ký thất bại! Vui lòng thử lại");
            return;
          }

          setAlertStatus("success");
          handleShowAlert("Đăng ký thành công!", () => {
            window.location.href = "/login";
          });
        }
      );
    }
  };

  const showError = (message) => {
    setAlertStatus("error");
    handleShowAlert(message);
  };

  if (loading) return <SpinningLoader />;

  return (
    <Box
      sx={{
        background: `white`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        px: 4,
      }}
    >
      <PopupAlert
        open={alertOpen}
        message={alertMessage}
        onClose={handleAlertClose}
        severity={alertStatus}
      />
      <Grid container spacing={4} py={8}>
        <Grid item size={{ xs: 12, md: 5 }}>
          <Paper
            sx={{
              backgroundColor: "white",
              p: 2,
              boxSizing: "border-box",
            }}
          >
            <Typography variant="h6" textAlign={"center"}>
              {isLoginPage
                ? "Đăng nhập nhà tuyển dụng"
                : "Đăng ký tài khoản nhà tuyển dụng"}
            </Typography>
            <Typography variant="body2" mt={2}>
              {isLoginPage ? "Email đăng nhập" : "Email đăng ký"}
            </Typography>
            <InputBase
              name="email"
              placeholder={isLoginPage ? "Email đăng nhập" : "Email đăng ký"}
              fullWidth
              value={form.email}
              onChange={handleChange}
              sx={{ border: "1px solid gray", p: 1, borderRadius: 1, mt: 1 }}
            />
            {!isLoginPage && (
              <>
                <Typography variant="body2" mt={2}>
                  Họ và tên
                </Typography>
                <InputBase
                  name="name"
                  placeholder="Nhập họ và tên"
                  fullWidth
                  value={form.name}
                  onChange={handleChange}
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
                  name="phone"
                  placeholder="Nhập số điện thoại"
                  fullWidth
                  value={form.phone}
                  onChange={handleChange}
                  sx={{
                    border: "1px solid gray",
                    p: 1,
                    borderRadius: 1,
                    mt: 1,
                  }}
                />
              </>
            )}
            <Typography variant="body2" mt={2}>
              Mật khẩu
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <InputBase
                name="password"
                placeholder="Nhập mật khẩu"
                fullWidth
                value={form.password}
                onChange={handleChange}
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
            <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
              {isLoginPage ? "Đăng nhập" : "Đăng ký"}
            </Button>
            <Typography sx={{ mt: 1 }}>
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

export default Auth;
