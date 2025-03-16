import React, { useState } from "react";
import "./QuizSection.css";
import QuizChild from "../QuizChild/QuizChild";

function QuizSection() {
  const [quizList, setquizList] = useState([]);
  function handleAddQuiz() {
    setquizList([...quizList, { id: Date.now() }]);
  }

  function handleDeleteQuiz(id) {
    setquizList(quizList.filter((quiz) => quiz.id !== id));
  }

  function handleSaveQuiz() {
    alert("Đã lưu bộ câu hỏi");
  }

  return (
    <div className="quiz-container">
      <div className="quiz-list">
        {quizList.map((quiz) => (
          <QuizChild key={quiz.id} id={quiz.id} onDelete={handleDeleteQuiz} />
        ))}
      </div>
      <div className="quiz-btnAct">
        <button className="quizBtn add-quiz" onClick={handleAddQuiz}>
          Thêm câu hỏi
        </button>
        <button className="quizBtn save-quiz" onClick={handleSaveQuiz}>
          Lưu bộ câu hỏi
        </button>
      </div>
    </div>
  );
}

export default QuizSection;
