import React from "react";
import "./EmployerList.css";
import EmployerBox from "../EmployerBox/EmployerBox";
import { useCustomNavigate } from "../../../utils/utils";

function EmployerList() {
  const navigate = useCustomNavigate();
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
        <button className="btn-more" onClick={() => navigate("/candidate")}>
          Xem thêm
        </button>
      </div>
    </div>
  );
}

export default EmployerList;
