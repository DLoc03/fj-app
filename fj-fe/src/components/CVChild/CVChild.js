import React from "react";
import "./CVChild.css";

function CVChild() {
  return (
    <div className="cv-child">
      <div className="cv-avt"></div>
      <div className="cdd-data">
        <div className="cdd cdd-name">Nguyen Duc Dai Loc</div>
        <div className="cdd cdd-score">Diem danh gia: 89</div>
      </div>
      <button className="cv-submit">Nhan ho so</button>
    </div>
  );
}

export default CVChild;
