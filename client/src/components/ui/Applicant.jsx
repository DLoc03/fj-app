import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import ReuseableModal from "../common/Modal";
import PopupAlert from "../common/PopUp";
import { ApplicantAPI } from "../../services";

function Applicant({ open, onClose, onSubmit, id }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cv: null,
  });
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

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (e) => {
    // const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      cv: "test",
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      setAlertStatus("error");
      handleShowAlert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    ApplicantAPI.postApplicant(id, formData, (err, result) => {
      if (err) {
        console.log("Có lỗi xảy ra khi gửi thông tin!", err);
        setAlertStatus("error");
        handleShowAlert("Có lỗi xảy ra khi gửi thông tin!");
      } else {
        console.log("Kết quả đăng ký: ", result);
        setAlertStatus("success");
        handleShowAlert("Hoàn tất!");
        onSubmit(formData);
      }
    });
  };

  const handleClose = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      setAlertStatus("error");
      handleShowAlert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    onClose();
  };

  return (
    <ReuseableModal
      open={open}
      onClose={handleClose}
      disableClose={!formData.name || !formData.email || !formData.phone}
      title="Thông tin ứng viên"
    >
      <PopupAlert
        open={alertOpen}
        message={alertMessage}
        onClose={handleAlertClose}
        severity={alertStatus}
      />
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Họ và tên"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          fullWidth
        />
        <TextField
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          fullWidth
        />
        <TextField
          label="Số điện thoại"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          fullWidth
        />
        <Button variant="outlined" component="label">
          Nộp CV
          <input
            type="file"
            hidden
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
          />
        </Button>
        {formData.cv && (
          <Typography variant="body2" color="text.secondary">
            Đã chọn: {formData.cv.name}
          </Typography>
        )}

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Hoàn tất
        </Button>
      </Box>
    </ReuseableModal>
  );
}

export default Applicant;
