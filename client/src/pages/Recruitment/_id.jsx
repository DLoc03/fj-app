import React, { useState, useEffect } from "react";
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
  Fade,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { QuestionAPI } from "../../services";
import PopupAlert from "../../components/common/PopUp";
import QuestionCard from "../../components/ui/QuestionCard";
import PATHS from "../../routes/path";
import { TransitionGroup } from "react-transition-group";
import { USER_TYPE } from "../../common/enum/enum";

function TestDetail() {
  const { id: jobId } = useParams();
  const [questions, setQuestions] = useState([{ question: "" }]);
  const [questionList, setQuestionList] = useState([]);
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
    Promise.all(
      questions.map(
        (q) =>
          new Promise((resolve, reject) => {
            QuestionAPI.postQuestion(jobId, q, (err, res) => {
              if (err) {
                reject(err);
              } else {
                resolve(res);
              }
            });
          })
      )
    )
      .then(() => {
        handleShowAlert("Lưu tất cả câu hỏi thành công!", "success");
        setTimeout(() => {
          window.location.href = PATHS.COMPANY_JOBS;
        }, 1000);
      })
      .catch((err) => {
        console.error(err);
        handleShowAlert("Có lỗi xảy ra khi lưu câu hỏi!", "error");
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

  useEffect(() => {
    QuestionAPI.getQuestion(jobId, (err, result) => {
      if (!err && result?.data.length > 0) {
        setQuestionList(result.data);
      }
    });
  }, [jobId]);

  return (
    <Box p={4}>
      <PopupAlert
        open={alertOpen}
        message={alertMessage}
        onClose={handleAlertClose}
        severity={alertStatus}
      />

      {questionList.length > 0 ? (
        <QuestionCard id={jobId} type={USER_TYPE.EMPLOYER} />
      ) : (
        <>
          <Typography variant="h5" mb={2} color="white" fontWeight={500}>
            Tạo bộ câu hỏi mới
          </Typography>

          <TransitionGroup>
            {questions.map((q, index) => (
              <Fade key={index} in timeout={500}>
                <Paper sx={{ p: 2, mb: 2 }}>
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
                    onChange={(e) =>
                      handleQuestionChange(index, e.target.value)
                    }
                    sx={{ mt: 2 }}
                  />
                </Paper>
              </Fade>
            ))}
          </TransitionGroup>
        </>
      )}

      {questionList.length === 0 && (
        <Box>
          <Button
            variant="contained"
            sx={{ mr: 2, my: 1 }}
            onClick={handleAddQuestion}
          >
            Thêm câu hỏi
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "secondary.main" }}
            onClick={handleSaveQuestions}
          >
            Lưu tất cả
          </Button>
        </Box>
      )}

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
