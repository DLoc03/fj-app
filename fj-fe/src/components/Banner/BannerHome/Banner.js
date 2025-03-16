import React from "react";
import "./Banner.css";
import { useCustomNavigate } from "../../../utils/utils";

function Banner() {
  const navigate = useCustomNavigate();
  return (
    <div className="banner">
      <div className="overlay"></div>
      <div className="banner-title">Bạn là</div>
      <div className="bn-container candidate-bn">
        <div className="banner-txt candidate">Nhận sự tìm việc</div>
        <button
          className="bn-btn candidate-btn"
          onClick={() => navigate("/candidate")}
        >
          Ứng tuyển ngay
        </button>
      </div>
      <div className="bn-container employer-bn">
        <div className="banner-txt employer">Nhà tuyển dụng</div>
        <button
          className="bn-btn employer-btn"
          onClick={() => navigate("/register")}
        >
          Đăng ký ngay
        </button>
      </div>
    </div>
  );
}

export default Banner;
