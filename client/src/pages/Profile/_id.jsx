import React, { useEffect, useRef, useState } from "react";
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
import { Divider } from "@mui/material";

function Profile() {
  const { isAuthenticated } = useAuth();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertStatus, setAlertStatus] = useState("");
  const userId = sessionStorage.getItem("UserId");
  const [isEditing, setIsEditing] = useState(false);
  const nameInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState("");
  const [form, setForm] = useState({
    email: "",
    name: "",
    phone: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      AuthAPI.getCurrentUser((err, result) => {
        if (!err && result?.data) {
          setForm({
            email: result.data.email,
            name: result.data.name,
            phone: result.data.phone,
          });
        }
      });
    }
  }, [isAuthenticated]);

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
      AuthAPI.updateUser(userId, form, (err, result) => {
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
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);

      // uploadAvatarToCloudinary(file);
    }
  };

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        p: 4,
        alignItems: "center",
        backgroundColor: "secondary.second",
      }}
    >
      <Grid container spacing={4}>
        <Grid item size={12}>
          <Typography variant="h5" textAlign={"center"} fontWeight={700}>
            Thông tin nhà tuyển dụng
          </Typography>
          <Divider sx={{ mt: 1 }} />
        </Grid>
        <Grid
          item
          size={{ sx: 12, md: 4 }}
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
              alt="avatar"
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
        <Grid item size={{ sx: 12, md: 8 }}>
          <Grid container spacing={4}>
            <Grid
              item
              size={{ sx: 12, md: 4 }}
              display={"flex"}
              alignItems={"center"}
            >
              <Typography variant="body1">Họ và tên</Typography>
            </Grid>
            <Grid
              item
              size={{ sx: 12, md: 8 }}
              display={"flex"}
              alignItems={"center"}
            >
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
                }}
              />
            </Grid>
            <Grid
              item
              size={{ sx: 12, md: 4 }}
              display={"flex"}
              alignItems={"center"}
            >
              <Typography variant="body1">Email</Typography>
            </Grid>
            <Grid
              item
              size={{ sx: 12, md: 8 }}
              display={"flex"}
              alignItems={"center"}
            >
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
                }}
              />
            </Grid>
            <Grid
              item
              size={{ sx: 12, md: 4 }}
              display={"flex"}
              alignItems={"center"}
            >
              <Typography variant="body1">Số điện thoại</Typography>
            </Grid>
            <Grid
              item
              size={{ sx: 12, md: 8 }}
              display={"flex"}
              alignItems={"center"}
            >
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
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        sx={{ width: "240px", mt: 4 }}
        onClick={handleToggleEdit}
      >
        <EditIcon /> {isEditing ? "Cập nhật" : "Chỉnh sửa thông tin"}
      </Button>
      <PopupAlert
        open={alertOpen}
        message={alertMessage}
        onClose={handleAlertClose}
        severity={alertStatus}
      />
    </Paper>
  );
}

export default Profile;
