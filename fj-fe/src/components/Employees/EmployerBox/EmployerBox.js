import React from "react";
import "./EmployerBox.css";
import AvtEmploy from "../../../assets/employ.jpg";

function EmployerBox() {
  return (
    <div className="employ-box">
      <div className="employ-avt">
        <img src={AvtEmploy} alt="avt-employ" />
      </div>
      <div className="employ-info">
        <div className="store-name">Phuc Long Coffee & Tea</div>
        <div className="employ-pos">
          Vị trí tuyển: Pha chế, Phục vụ, Quản lý, qừaasgaklasdlgldgnlsdmnndsgbd
        </div>
      </div>
    </div>
  );
}

export default EmployerBox;
