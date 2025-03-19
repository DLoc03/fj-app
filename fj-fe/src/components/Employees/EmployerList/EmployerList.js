import React, { useEffect } from "react";
import "./EmployerList.css";
import EmployerBox from "../EmployerBox/EmployerBox";
import Button from "../../../commons/Button/Button";
import { endpoint } from "../../../utils/constant";

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
        <Button btn_title="Xem thêm" path_navigate={endpoint.CANDIDATE} />
      </div>
    </div>
  );
}

export default EmployerList;
