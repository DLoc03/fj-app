import React from "react";
import "./EmployerProfile.css";
import AvtEmploy from "../../../assets/employ.jpg";

function EmployerProfile() {
  return (
    <div className="employProfile">
      <div className="employAvt">
        <img src={AvtEmploy} alt="avt-employ" className="employImgAvt" />
      </div>
      <div className="employDetail">
        <div className="employ-name">PHUC LONG COFFEE & TEA</div>
        <div className="employ-detail">
          <p>Địa chỉ: 265/13 Bùi Thị Xuân, TP. Đà Lạt, Lâm Đồng</p>
          <p>Hotline: 1800 6779</p>
          <p>Vị trí tuyển: Pha chế</p>
        </div>
        <button className="btn-cv">Nộp hồ sơ ứng tuyển</button>
      </div>
    </div>
  );
}

export default EmployerProfile;
