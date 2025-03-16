import React from "react";
import "./Recruitment.css";
import QuizSection from "../../components/Quiz/QuizSection/QuizSection";

function Recruitment() {
  return (
    <div className="recruitment-container">
      <h1>Tuyển dụng nhanh hơn với câu hỏi phỏng vấn trực tuyến!</h1>
      <QuizSection quiz_title="Phỏng vấn kinh nghiệm ứng viên" />
    </div>
  );
}

export default Recruitment;
