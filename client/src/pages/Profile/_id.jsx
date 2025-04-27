import React, { useEffect, useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Grid";

import { AuthAPI } from "../../services";
import { useAuth } from "../../context/auth";

import PopupAlert from "../../components/common/PopUp";
import { Divider, Link } from "@mui/material";
import { SESSION_DATA } from "../../common/enum/enum";
import PATHS from "../../routes/path";
import SpinningLoader from "../../components/common/SpinningLoading";
import LoadingOverlay from "../../components/common/LoadingOverlay";

function Profile() {
  const { isAuthenticated } = useAuth();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertStatus, setAlertStatus] = useState("");
  const userId = sessionStorage.getItem(SESSION_DATA.USERID);
  const [isEditing, setIsEditing] = useState(false);
  const nameInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState("");
  const [form, setForm] = useState({
    email: "",
    name: "",
    phone: "",
    avatar: "",
  });
  const [comp, setComp] = useState();
  const [jobs, setJobs] = useState();
  const [applicants, setApplicants] = useState();
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState();

  useEffect(() => {
    if (isAuthenticated) {
      AuthAPI.getCurrentUser((err, result) => {
        if (!err && result?.data) {
          setForm({
            email: result.data.email,
            name: result.data.name,
            phone: result.data.phone,
            avatar: result.data.avatar,
          });
          setPreviewImage(result.data.avatar);
        }
        setLoading(false);
      });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      AuthAPI.getCurrentCompany((err, result) => {
        if (!err && result?.data) {
          setComp(result?.data);
        }
        setLoading(false);
      });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      AuthAPI.getAllJobs((err, result) => {
        if (!err && result?.data) {
          setJobs(result?.data?.paginatedJobs);
        }
        setLoading(false);
      });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      AuthAPI.getAllApplicant((err, result) => {
        if (!err && result?.data) {
          setApplicants(result?.data?.paginatedApplicants);
        }
        setLoading(false);
      });
    }
  }, [isAuthenticated]);

  console.log(applicants);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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

  const handleToggleEdit = () => {
    if (isEditing) {
      const updateData = {
        name: form.name,
        email: form.email,
        phone: form.phone,
      };

      AuthAPI.updateUser(userId, updateData, (err, result) => {
        if (err) {
          setAlertStatus("error");
          handleShowAlert("Cập nhật thất bại");
          return;
        }
        setAlertStatus("success");
        handleShowAlert("Cập nhật thành công");
        setIsEditing(false);
      });
    } else {
      setIsEditing(true);
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 0);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      setAlertStatus("error");
      handleShowAlert("Vui lòng chọn một ảnh hợp lệ");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);
    setUploading(true);

    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);

    AuthAPI.uploadAvatar(formData, (err, result) => {
      setUploading(false);

      if (err || !result.data) {
        setAlertStatus("error");
        handleShowAlert("Cập nhật ảnh thất bại!");
        return;
      }

      setAlertStatus("success");
      handleShowAlert("Cập nhật ảnh thành công!");

      setForm((prev) => ({ ...prev, avatar: result.data.avatar }));
    });
  };

  if (loading) return <SpinningLoader />;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: { xs: "27px", md: " 27px 0" },
        boxSizing: "border-box",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <LoadingOverlay open={uploading} />
      <Grid container spacing={4}>
        <Grid item size={12}>
          <Typography
            fontSize={{ xs: "20px", md: "24px" }}
            textAlign={"center"}
            fontWeight={700}
          >
            Thông tin nhà tuyển dụng
          </Typography>
          <Divider sx={{ mt: 1 }} />
        </Grid>
        <Grid
          item
          size={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            position="relative"
            width={200}
            height={200}
            sx={{
              mx: "auto",
              cursor: "pointer",
              borderRadius: "50%",
              overflow: "hidden",
              "&:hover .overlay": {
                opacity: 1,
              },
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            <img
              src={previewImage || "https://via.placeholder.com/150"}
              alt={previewImage ? "avatar" : ""}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <Box
              className="overlay"
              position="absolute"
              top={0}
              left={0}
              width="100%"
              height="100%"
              bgcolor="rgba(0, 0, 0, 0.5)"
              color="white"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              opacity={0}
              transition="opacity 0.3s ease"
            >
              <Typography fontSize={30}>+</Typography>
              <Typography fontSize={12}>Cập nhật ảnh đại diện</Typography>
            </Box>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </Box>
        </Grid>
        <Grid item size={{ xs: 12, md: 7 }}>
          <Grid
            container
            spacing={{ xs: 1, md: 4 }}
            sx={{ px: { xs: 0, sm: 1, md: 8 } }}
          >
            <Grid item size={4} display={"flex"} alignItems={"center"}>
              <Typography fontSize={{ xs: "12px", md: "16px" }}>
                Họ và tên
              </Typography>
            </Grid>
            <Grid item size={8} display={"flex"} alignItems={"center"}>
              <InputBase
                name="name"
                fullWidth
                value={form.name}
                onChange={handleChange}
                disabled={!isEditing}
                inputRef={nameInputRef}
                sx={{
                  borderBottom: "1px solid gray",
                  p: 1,
                  flexGrow: 1,
                  fontSize: { xs: "12px", md: "16px" },
                }}
              />
            </Grid>
            <Grid item size={4} display={"flex"} alignItems={"center"}>
              <Typography fontSize={{ xs: "12px", md: "16px" }}>
                Email
              </Typography>
            </Grid>
            <Grid item size={8} display={"flex"} alignItems={"center"}>
              <InputBase
                name="email"
                fullWidth
                value={form.email}
                onChange={handleChange}
                disabled={!isEditing}
                sx={{
                  borderBottom: "1px solid gray",
                  p: 1,
                  flexGrow: 1,
                  fontSize: { xs: "12px", md: "16px" },
                }}
              />
            </Grid>
            <Grid item size={4} display={"flex"} alignItems={"center"}>
              <Typography fontSize={{ xs: "12px", md: "16px" }}>
                Số điện thoại
              </Typography>
            </Grid>
            <Grid item size={8} display={"flex"} alignItems={"center"}>
              <InputBase
                name="phone"
                fullWidth
                value={form.phone}
                onChange={handleChange}
                disabled={!isEditing}
                sx={{
                  borderBottom: "1px solid gray",
                  p: 1,
                  flexGrow: 1,
                  fontSize: { xs: "12px", md: "16px" },
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid
          item
          size={{ xs: 12, md: 4 }}
          display={{ xs: "none", md: "block" }}
        >
          {comp ? (
            comp.status !== "Pending" ? (
              <Grid container>
                <Grid item size={12}>
                  <Typography fontSize={"12px"}>Đại diện của cơ sở</Typography>
                </Grid>
                <Grid item size={12}>
                  <Typography
                    fontSize={{ xs: "12px", md: "20px" }}
                    fontWeight={500}
                    mb={2}
                  >
                    {comp.name}
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                </Grid>
                <Grid item size={12} mb={1}>
                  <Typography>
                    Đang tuyển {jobs.length} vị trí.{" "}
                    <Link
                      component={RouterLink}
                      to={PATHS.COMPANY_JOBS}
                      sx={{
                        color: "blue",
                        fontSize: "16px",
                        textDecoration: "none",
                      }}
                    >
                      Xem thêm
                    </Link>
                  </Typography>
                </Grid>
                <Grid item size={12}>
                  <Typography>
                    {applicants.length > 0
                      ? `Đã có ${applicants.length} ứng viên ứng tuyển.`
                      : `Hiện chưa có ứng viên nộp hồ sơ!`}{" "}
                    <Link
                      component={RouterLink}
                      to={PATHS.COMPANY_TEST}
                      sx={{
                        color: "blue",
                        fontSize: "16px",
                        textDecoration: "none",
                      }}
                    >
                      Xem thêm
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            ) : (
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                sx={{ height: "100%", width: "100%" }}
              >
                <Typography>Đang chờ xác thực cơ sở</Typography>
              </Box>
            )
          ) : (
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              sx={{ height: "100%", width: "100%" }}
              flexDirection={"column"}
            >
              <Typography>Hiện chưa có thông tin cơ sở</Typography>
              <Button
                variant="outlined"
                sx={{ mt: 1 }}
                onClick={() => (window.location.href = PATHS.COMPANY_INFO)}
              >
                Đăng ký thông tin cơ sở ngay
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>
      <Button
        variant="contained"
        sx={{
          width: "fit-content",
          mt: { xs: 0, md: 4 },
          fontSize: { xs: "12px", md: "14px" },
        }}
        onClick={handleToggleEdit}
      >
        <EditIcon /> {isEditing ? "Cập nhật" : "Chỉnh sửa thông tin cá nhân"}
      </Button>
      <PopupAlert
        open={alertOpen}
        message={alertMessage}
        onClose={handleAlertClose}
        severity={alertStatus}
      />
    </Box>
  );
}

export default Profile;
