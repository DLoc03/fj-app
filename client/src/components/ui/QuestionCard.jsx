import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { QuestionAPI, AnswerAPI, ApplicantAPI } from "../../services";
import { Button, Divider, TextField } from "@mui/material";
import { USER_TYPE } from "../../common/enum/enum";

import SpinningLoader from "../common/SpinningLoading";
import PopupAlert from "../common/PopUp";
import Applicant from "./Applicant";
import Authenticated from "./Authenticated";
import SlideCard from "../common/SlideCard";

function QuestionCard({ id, type }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertStatus, setAlertStatus] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const applicant = JSON.parse(sessionStorage.getItem("Applicant"));
  const [applicantResult, setApplicantResult] = useState();
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
    QuestionAPI.getQuestion(id, (err, result) => {
      if (!err && result.data.length > 0) setQuestions(result.data);
    });
    const applicantInfo = sessionStorage.getItem("Applicant");
    if (!applicantInfo && type !== USER_TYPE.EMPLOYER) {
      setOpenModal(true);
    }
  }, [id, type]);

  useEffect(() => {
    if (applicant && applicant._id) {
      ApplicantAPI.getApplicant(applicant._id, (err, result) => {
        if (result.errCode === 0) {
          console.log("Result: ", result);

          const hasEmptyAnswer = result.data.some(
            (item) => item.answer.answer === ""
          );

          if (hasEmptyAnswer) {
            setApplicantResult([]);
          } else {
            setApplicantResult(result.data);
          }
        }
      });
    }
  }, []);

  const handleAnswerChange = (index, value) => {
    setAnswers((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const handleSubmit = () => {
    const id = applicant._id;
    const data = questions.map((question, index) => ({
      questionId: question.id,
      answer: answers[index] || "",
    }));
    AnswerAPI.postAnswer(id, data, (err, result) => {
      if (err && result?.errCode !== 0) {
        setAlertStatus("error");
        handleShowAlert("Có lỗi khi gửi câu trả lời!");

        return;
      }
      setAlertStatus("success");
      handleShowAlert("Hoàn tất!");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    });
  };

  const handleApplySubmit = (data) => {
    sessionStorage.setItem("Applicant", JSON.stringify(data));
    setOpenModal(false);
  };

  return (
    <Box>
      {applicantResult?.length > 0 ? (
        <Authenticated message={"Đã gửi hồ sơ ứng tuyển"} />
      ) : (
        <Paper sx={{ py: 4, px: { xs: 4, md: 8 } }}>
          <Typography
            sx={{ textAlign: "center", fontSize: { xs: "18px", md: "28px" } }}
          >
            {questions.length > 0
              ? "Câu hỏi phỏng vấn"
              : "Chưa có bài phỏng vấn! Vui lòng quay lại sau!"}
          </Typography>
          <Divider sx={{ my: 1 }} />

          {type === USER_TYPE.EMPLOYER ? (
            questions.length > 0 ? (
              questions.map((question, index) => (
                <Box key={index} sx={{ my: 4 }}>
                  <Typography
                    fontWeight={700}
                    color="secondary.main"
                    sx={{ fontSize: { xs: "12px", md: "16px" } }}
                  >
                    Câu {index + 1}
                  </Typography>
                  <Typography sx={{ fontSize: { xs: "12px", md: "16px" } }}>
                    {question.question}
                  </Typography>
                </Box>
              ))
            ) : (
              <Box display={"flex"} justifyContent={"center"}>
                <SpinningLoader />
              </Box>
            )
          ) : questions.length > 0 ? (
            <Box>
              {questions.map((question, index) => (
                <Box key={index} my={2}>
                  <Typography
                    variant="body1"
                    fontWeight={700}
                    color="secondary.main"
                    sx={{ fontSize: { xs: "12px", md: "16px" } }}
                  >
                    Câu {index + 1}
                  </Typography>
                  <Typography
                    sx={{ fontSize: { xs: "12px", md: "16px" } }}
                    mb={1}
                  >
                    {question.question}
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Nhập câu trả lời..."
                    value={answers[index] || ""}
                    sx={{
                      fontSize: { xs: "12px", md: "16px" },
                      "& .MuiInputBase-input": {
                        fontSize: { xs: "12px", md: "16px" },
                        padding: { xs: "10px 12px", md: "14px 16px" },
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "grey.400",
                        },
                        "&:hover fieldset": {
                          borderColor: "secondary.main",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "primary.main",
                          borderWidth: "2px",
                        },
                      },
                    }}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                  />
                </Box>
              ))}
              <Box display={"flex"} justifyContent={"center"}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={handleSubmit}
                >
                  Gửi câu trả lời
                </Button>
              </Box>
            </Box>
          ) : (
            <Box>
              <Authenticated
                message={"Hiện chưa có bài phỏng vấn. Vui lòng quay lại sau!"}
                register={false}
              />
            </Box>
          )}

          <PopupAlert
            open={alertOpen}
            message={alertMessage}
            onClose={handleAlertClose}
            severity={alertStatus}
          />

          <Applicant
            open={openModal}
            onClose={() => setOpenModal(false)}
            onSubmit={handleApplySubmit}
            id={id}
          />
        </Paper>
      )}
      {questions.length === 0 && <SlideCard />}
    </Box>
  );
}

export default QuestionCard;
