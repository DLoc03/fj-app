import React from "react";
import "./Banner.css";
import { useCustomNavigate } from "../../../utils/utils";
import { useAuth } from "../../../context/AuthContext";
import { endpoint } from "../../../utils/constant";
function Banner() {
  const { user } = useAuth();
  const navigate = useCustomNavigate();
  return (
    <div className="banner">
      <div className="overlay"></div>
      <div className="banner-title">Bạn là</div>
      <div className="bn-container candidate-bn">
        <div className="banner-txt candidate">Nhận sự tìm việc</div>
        <button
          className="bn-btn candidate-btn"
          onClick={() => navigate(endpoint.CANDIDATE)}
        >
          Ứng tuyển ngay
        </button>
      </div>
      <div className="bn-container employer-bn">
        <div className="banner-txt employer">Nhà tuyển dụng</div>
        <button
          className="bn-btn employer-btn"
          onClick={() => {
            user ? navigate(endpoint.ACCOUNT) : navigate(endpoint.REGISTER);
          }}
        >
          Đăng ký ngay
        </button>
      </div>
    </div>
  );
}

export default Banner;
