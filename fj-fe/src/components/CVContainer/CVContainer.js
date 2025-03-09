import React from "react";
import "./CVContainer.css";
import CVChild from "../CVChild/CVChild";

function CVContainer() {
  return (
    <div className="cv-container">
      <h1 style={{ color: "white" }}>Danh sách nhân sự ứng tuyển</h1>
      <div className="cv-section">
        <div className="cv-list">
          <CVChild />
          <CVChild />
          <CVChild />
          <CVChild />
          <CVChild />
        </div>
        <div className="cv-data">
          <h1>Dữ liệu thống kê</h1>
          <p>Số ứng viên ứng tuyển: 10</p>
          <p>Số ứng viên đạt yêu cầu cao: 2</p>
          <p>Số ứng viên đã nhận: 2</p>
        </div>
      </div>
    </div>
  );
}

export default CVContainer;
