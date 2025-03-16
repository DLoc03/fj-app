import React from "react";
import "./QuizChild.css";

function QuizChild({ id, onDelete }) {
  function handleDeleteQuiz() {
    onDelete(id);
  }
  return (
    <div className="quiz-child">
      <div className="quiz-part">
        <div className="ipQuiz-title">
          <input
            className="quizTitle"
            placeholder="Nhập tiêu đề bộ câu hỏi"
          ></input>
        </div>
        <div className="quiz-ans">
          <textarea
            className="ipQuiz input-quiz"
            placeholder="Nhập câu hỏi phỏng vấn"
          ></textarea>
          <textarea
            className="ipQuiz input-answer"
            placeholder="Câu trả lời của ứng viên"
          ></textarea>
        </div>
      </div>
      <button className="delete-quiz" onClick={handleDeleteQuiz}>
        Xoá câu hỏi
      </button>
    </div>
  );
}

export default QuizChild;
