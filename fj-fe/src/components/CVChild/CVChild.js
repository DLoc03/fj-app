import React from "react";
import "./CVChild.css";
import Button from "../../commons/Button/Button";

function CVChild() {
  return (
    <div className="cv-child">
      <div className="cv-avt"></div>
      <div className="cdd-data">
        <div className="cdd cdd-name">Nguyễn Đức Đại Lộc</div>
        <div className="cdd cdd-score">Điểm đánh giá: 89</div>
      </div>
      <button className="cv-submit">Nhận hồ sơ</button>
    </div>
  );
}

export default CVChild;
