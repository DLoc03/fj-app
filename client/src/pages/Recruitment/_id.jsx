import React, { useState } from "react";
import {
  Box,
  Paper,
  Button,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { QuestionAPI } from "../../services";
import PopupAlert from "../../components/common/PopUp";

function TestDetail() {
  const { id: jobId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([{ question: "" }]);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertStatus, setAlertStatus] = useState("");

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: "" }]);
  };

  const handleSaveQuestions = () => {
    console.log("Job ID:", jobId);
    QuestionAPI.postQuestion(jobId, questions, (err, res) => {
      if (err) {
        handleShowAlert("Có lỗi xảy ra khi lưu câu hỏi!", "error");
        return;
      }
      handleShowAlert("Lưu câu hỏi thành công!", "success");
      navigate("/company/jobs");
    });
  };

  const handleDeleteConfirm = (index) => {
    setDeleteIndex(index);
    setConfirmOpen(true);
  };

  const handleDeleteQuestion = () => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(deleteIndex, 1);
    setQuestions(updatedQuestions);
    setConfirmOpen(false);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handleShowAlert = (message, status) => {
    setAlertMessage(message);
    setAlertStatus(status);
    setAlertOpen(true);
  };

  return (
    <Box p={4}>
      <PopupAlert
        open={alertOpen}
        message={alertMessage}
        onClose={handleAlertClose}
        severity={alertStatus}
      />

      {questions.map((q, index) => (
        <Paper key={index} sx={{ p: 2, mb: 2 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Câu {index + 1}</Typography>
            <Button
              color="error"
              onClick={() => handleDeleteConfirm(index)}
              disabled={questions.length === 1}
            >
              Xóa
            </Button>
          </Box>
          <TextField
            label="Nội dung câu hỏi"
            fullWidth
            multiline
            value={q.question}
            onChange={(e) => handleQuestionChange(index, e.target.value)}
            sx={{ mt: 2 }}
          />
        </Paper>
      ))}

      <Button variant="contained" sx={{ mr: 2 }} onClick={handleAddQuestion}>
        Thêm câu hỏi
      </Button>
      <Button
        variant="contained"
        sx={{ backgroundColor: "secondary.main" }}
        onClick={handleSaveQuestions}
      >
        Lưu tất cả
      </Button>

      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        aria-labelledby="confirm-dialog-title"
      >
        <DialogTitle id="confirm-dialog-title">Xác nhận xóa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa câu hỏi này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Hủy</Button>
          <Button onClick={handleDeleteQuestion} color="error">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default TestDetail;
