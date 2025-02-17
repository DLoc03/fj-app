import React from "react";
import "./Banner.css";

function Banner() {
  return (
    <div className="banner">
      <div className="overlay"></div>
      <div className="banner-title">Bạn là</div>
      <div className="bn-container candidate-bn">
        <div className="banner-txt candidate">Nhận sự tìm việc</div>
        <button className="bn-btn candidate-btn">Ứng tuyển ngay</button>
      </div>
      <div className="bn-container employer-bn">
        <div className="banner-txt employer">Nhà tuyển dụng</div>
        <button className="bn-btn employer-btn">Đăng ký ngay</button>
      </div>
    </div>
  );
}

export default Banner;
