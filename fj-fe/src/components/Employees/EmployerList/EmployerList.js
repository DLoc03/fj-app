import React from "react";
import "./EmployerList.css";
import EmployerBox from "../EmployerBox/EmployerBox";
import Button from "../../../commons/Button/Button";

function EmployerList() {
  return (
    <div className="employer-list">
      <div className="list-title">Tuyển dụng hàng đầu</div>
      <div className="employer-lstbody">
        <EmployerBox />
        <EmployerBox />
        <EmployerBox />
        <EmployerBox />
      </div>
      <div className="button-list">
        <Button btn_title="Xem thêm" path_navigate="candidate" />
      </div>
    </div>
  );
}

export default EmployerList;
