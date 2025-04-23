import React, { useEffect, useState, useRef } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

import { AuthAPI, CompaniesAPI } from "../../services";
import Authenticated from "../../components/ui/Authenticated";
import PATHS from "../../routes/path";
import SpinningLoader from "../../components/common/SpinningLoading";
import PopupAlert from "../../components/common/PopUp";

function UserCompany() {
  const [comp, setComp] = useState({
    name: "",
    address: "",
    description: "",
    phone: "",
    user: "",
    status: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertStatus, setAlertStatus] = useState("");

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

  useEffect(() => {
    AuthAPI.getCurrentUser((err, result) => {
      if (!err && result?.data) {
        setComp({
          name: result?.data?.company.name,
          address: result?.data?.company.address,
          description: result?.data?.company.description,
          status: result?.data?.company.status,
          phone: result?.data?.phone,
          user: result?.data?.name,
          avatar: result?.data?.company?.avatar,
        });
      }
      setLoading(false);
    });
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file || !file.type.startsWith("image/")) {
      setAlertStatus("error");
      handleShowAlert("Vui lòng chọn một ảnh hợp lệ");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    CompaniesAPI.postCompanyAvatar(formData, (err, result) => {
      if (err || !result.data) {
        setAlertStatus("error");
        handleShowAlert("Cập nhật ảnh thất bại!");
        return;
      }

      setAlertStatus("success");
      handleShowAlert("Cập nhật ảnh thành công!");

      setComp((prev) => ({
        ...prev,
        avatar: result.data.avatar,
      }));
      setPreviewImage(result.data.avatar);
    });
  };

  console.log("Comp data: ", comp);

  if (loading) return <SpinningLoader />;

  return (
    <>
      {comp.name ? (
        comp.status !== "Pending" ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              p: 4,
              mx: "auto",
              alignItems: "center",
              gap: 4,
              height: "100%",
              backgroundColor: "white",
            }}
          >
            <Grid container spacing={{ xs: 1, md: 4 }}>
              <Grid item size={12}>
                <Typography
                  className="profile__title"
                  variant="h5"
                  textAlign={"center"}
                  fontWeight={700}
                >
                  Thông tin cơ sở
                </Typography>
                <Divider sx={{ mt: 2 }} />
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
                  width={"100%"}
                  height={"320px"}
                  sx={{
                    mx: "auto",
                    cursor: "pointer",
                    borderRadius: "8px",
                    overflow: "hidden",
                    "&:hover .overlay": {
                      opacity: 1,
                    },
                    backgroundPosition: "center",
                  }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <img
                    src={comp.avatar || "https://via.placeholder.com/150"}
                    alt={previewImage ? "avatar" : ""}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
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
                    <Typography fontSize={{ xs: 30, md: 42 }}>+</Typography>
                    <Typography fontSize={{ xs: 12, md: 18 }}>
                      Cập nhật ảnh đại diện cơ sỏ
                    </Typography>
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
              <Grid
                item
                size={{ sx: 12, sm: 4, md: 3 }}
                display={"flex"}
                alignItems={"center"}
              >
                <Typography fontSize={{ xs: "12px", md: "16px" }}>
                  Tên cơ sở
                </Typography>
              </Grid>
              <Grid
                item
                size={{ sx: 12, sm: 8, md: 9 }}
                display={"flex"}
                alignItems={"center"}
              >
                <Typography
                  fontSize={{ xs: "12px", md: "16px" }}
                  fontWeight={700}
                >
                  {comp.name}
                </Typography>
              </Grid>
              <Grid
                item
                size={{ sx: 12, sm: 4, md: 3 }}
                display={"flex"}
                alignItems={"center"}
              >
                <Typography fontSize={{ xs: "12px", md: "16px" }}>
                  Địa chỉ
                </Typography>
              </Grid>
              <Grid
                item
                size={{ sx: 12, sm: 8, md: 9 }}
                display={"flex"}
                alignItems={"center"}
              >
                <Typography
                  fontSize={{ xs: "12px", md: "16px" }}
                  fontWeight={700}
                >
                  {comp.address}
                </Typography>
              </Grid>
              <Grid
                item
                size={{ sx: 12, sm: 4, md: 3 }}
                display={"flex"}
                alignItems={"center"}
              >
                <Typography fontSize={{ xs: "12px", md: "16px" }}>
                  Số điện thoại
                </Typography>
              </Grid>
              <Grid
                item
                size={{ sx: 12, sm: 8, md: 9 }}
                display={"flex"}
                alignItems={"center"}
              >
                <Typography
                  fontSize={{ xs: "12px", md: "16px" }}
                  fontWeight={700}
                >
                  {comp.phone}
                </Typography>
              </Grid>
              <Grid
                item
                size={{ sx: 12, sm: 4, md: 3 }}
                display={"flex"}
                alignItems={"center"}
              >
                <Typography fontSize={{ xs: "12px", md: "16px" }}>
                  Đại diện cơ sở
                </Typography>
              </Grid>
              <Grid
                item
                size={{ sx: 12, sm: 8, md: 9 }}
                display={"flex"}
                alignItems={"center"}
              >
                <Typography
                  fontSize={{ xs: "12px", md: "16px" }}
                  fontWeight={700}
                >
                  {comp.user}
                </Typography>
              </Grid>
              <Grid
                item
                size={{ sx: 12, sm: 4, md: 9 }}
                display={"flex"}
                alignItems={"center"}
              >
                <Typography fontSize={{ xs: "12px", md: "16px" }}>
                  Slogan
                </Typography>
              </Grid>
              <Grid
                item
                size={{ sx: 12, sm: 4, md: 9 }}
                display={"flex"}
                alignItems={"center"}
              >
                <Typography
                  fontSize={{ xs: "12px", md: "16px" }}
                  fontWeight={700}
                >
                  {comp.description}
                </Typography>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              onClick={() => (window.location.href = PATHS.COMPANY_JOBS)}
            >
              Đăng tuyển dụng nhân sự
            </Button>
            <PopupAlert
              open={alertOpen}
              message={alertMessage}
              onClose={handleAlertClose}
              severity={alertStatus}
            />
          </Box>
        ) : (
          <Authenticated
            message={"Đang chờ xác thực thông tin cơ sở..."}
            register={false}
          />
        )
      ) : (
        <Authenticated
          message={"Chưa đăng ký thông tin cơ sở?"}
          register={true}
        />
      )}
    </>
  );
}

export default UserCompany;
