import React from "react";
import "./EmployerList.css";
import EmployerBox from "../EmployerBox/EmployerBox";

function EmployerList() {
  return (
    <div className="employer-list">
      <div className="list-title">
        {/* <div className="list-line"></div> */}
        Tuyển dụng hàng đầu
      </div>
      <div className="employer-lstbody">
        <EmployerBox />
        <EmployerBox />
        <EmployerBox />
        <EmployerBox />
      </div>
      <div className="button-list">
        <button className="btn-more">Xem thêm</button>
      </div>
    </div>
  );
}

export default EmployerList;
