import React, { useState } from "react";
import "./Recruitment.css";
import QuizSection from "../../components/Quiz/QuizSection/QuizSection";
import { getJobs, getJobById } from "../../services/job.service";

function Recruitment() {
  const [jobList, setJobList] = useState([]);

  return (
    <div className="recruitment-container">
      <h1>Tuyển dụng nhanh hơn với câu hỏi phỏng vấn trực tuyến!</h1>
      <div className="positon-container"></div>
      <QuizSection quiz_title="Phỏng vấn kinh nghiệm ứng viên" />
    </div>
  );
}

export default Recruitment;
