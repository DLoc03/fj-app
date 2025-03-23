import React from "react";
import "./CompanyInfo.css";

function CompanyInfo(isExist) {
  return (
    <div className="compInfo-container">
      {isExist ? (
        <div></div>
      ) : (
        <div>
          Chưa đăng ký cơ sở? <span>Đăng ký ngay</span>
        </div>
      )}
    </div>
  );
}

export default CompanyInfo;
