import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";

import ReuseableModal from "../common/Modal";
import PopupAlert from "../common/PopUp";

import { JobsAPI } from "../../services";
import { formatCurrency } from "../../utils/helper";
function Recruitment() {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    jobName: "",
    quantity: "",
    jobDescription: "",
    salary: "",
  });

  const [selectedJob, setSelectedJob] = useState("");
  const [customJob, setCustomJob] = useState("");

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertStatus, setAlertStatus] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const jobPositions = [
    "Phục vụ",
    "Thu ngân",
    "Pha chế",
    "Quản lý",
    "Bếp chính",
    "Bếp phụ",
    "Tạp vụ",
    "Bảo vệ",
    "Khác",
  ];

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
    const { jobName, jobDescription, quantity, salary } = formData;
    setIsFormValid(
      jobName !== "" &&
        jobDescription !== "" &&
        quantity !== "" &&
        salary !== ""
    );
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSalaryChange = (e) => {
    const { value } = e.target;
    const formattedValue = formatCurrency(value);
    setFormData((prev) => ({ ...prev, salary: formattedValue }));
  };

  const handleSubmit = () => {
    JobsAPI.postJob(formData, (err, result) => {
      setAlertStatus("success");
      handleShowAlert("Tạo bài tuyển dụng thành công!", () => {
        window.location.reload();
      });
    });
  };

  return (
    <Box textAlign="center">
      <PopupAlert
        open={alertOpen}
        message={alertMessage}
        onClose={handleAlertClose}
        severity={alertStatus}
      />

      <Button variant="contained" onClick={() => setOpenModal(true)}>
        Tuyển dụng nhân sự
      </Button>

      <ReuseableModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title="Tuyển dụng nhân sự"
      >
        <Box display="flex" flexDirection="column" gap={2}>
          <FormControl fullWidth>
            <InputLabel>Vị trí tuyển</InputLabel>
            <Select
              value={selectedJob}
              label="Vị trí tuyển"
              onChange={(e) => {
                setSelectedJob(e.target.value);
                if (e.target.value !== "custom") {
                  setFormData((prev) => ({ ...prev, jobName: e.target.value }));
                } else {
                  setFormData((prev) => ({ ...prev, jobName: "" }));
                }
              }}
            >
              {jobPositions.map((position, index) => (
                <MenuItem key={index} value={position}>
                  {position}
                </MenuItem>
              ))}
              <MenuItem value="custom">
                <Typography fontWeight={700}>Thêm vị trí khác</Typography>
              </MenuItem>
            </Select>
          </FormControl>

          {selectedJob === "custom" && (
            <TextField
              label="Vị trí"
              value={customJob}
              onChange={(e) => {
                setCustomJob(e.target.value);
                setFormData((prev) => ({ ...prev, jobName: e.target.value }));
              }}
              fullWidth
            />
          )}

          <TextField
            label="Số lượng"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            fullWidth
            type="number"
          />
          <TextField
            label="Mức lương"
            name="salary"
            value={formData.salary}
            onChange={handleSalaryChange} // Use handleSalaryChange for formatted salary
            fullWidth
            type="text" // Change type to text to allow formatted value
            InputProps={{
              endAdornment: <InputAdornment position="end">VNĐ</InputAdornment>,
              inputProps: { min: 0 },
            }}
          />
          <TextField
            label="Mô tả công việc"
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
          />

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!isFormValid}
          >
            Đăng tuyển
          </Button>
        </Box>
      </ReuseableModal>
    </Box>
  );
}

export default Recruitment;
