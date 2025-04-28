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
  Divider,
} from "@mui/material";
import { useParams, useLocation } from "react-router-dom";
import { QuestionAPI } from "../../services";
import PopupAlert from "../../components/common/PopUp";
import QuestionCard from "../../components/ui/QuestionCard";
import PATHS from "../../routes/path";
import { TransitionGroup } from "react-transition-group";
import { USER_TYPE } from "../../common/enum/enum";

import SpinningLoader from "../../components/common/SpinningLoading";

function TestDetail() {
  const { id } = useParams();
  const location = useLocation();
  const [questions, setQuestions] = useState([{ question: "" }]);
  const [questionList, setQuestionList] = useState([]);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertStatus, setAlertStatus] = useState("");
  const [loading, setLoading] = useState(true);

  const testTitle = location.state?.title || "Bài phỏng vấn vị trí tuyển mới";

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
            QuestionAPI.postQuestion(id, q, (err, res) => {
              if (err) {
                reject(
                  err || new Error(res?.result?.message || "Unknown error")
                );
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
        return;
      })
      .catch((err) => {
        console.error("Lỗi khi lưu câu hỏi:", err);
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
    QuestionAPI.getTest(id, (err, result) => {
      if (!err && result?.data) {
        setQuestionList(result.data.questions);
      }
      setLoading(false);
    });
  }, [id]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (questions.some((q) => q.question.trim() === "")) {
        const message =
          "Bạn chưa lưu các câu hỏi. Bạn chắc chắn muốn rời khỏi trang?";
        e.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [questions]);

  if (loading) return <SpinningLoader />;

  return (
    <Box p={4} sx={{ backgroundColor: "white", height: "100%" }}>
      <PopupAlert
        open={alertOpen}
        message={alertMessage}
        onClose={handleAlertClose}
        severity={alertStatus}
      />

      {questionList.length > 0 ? (
        <QuestionCard id={id} type={USER_TYPE.EMPLOYER} />
      ) : (
        <>
          <Typography
            variant="h5"
            mb={2}
            color="secondary.main"
            fontWeight={500}
          >
            {testTitle}
          </Typography>

          <Divider orientation="horizontal" flexItem sx={{ my: 1 }} />

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
