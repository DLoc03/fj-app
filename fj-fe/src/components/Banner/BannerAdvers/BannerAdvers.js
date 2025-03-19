import React from "react";
import "./BannerAdvers.css";
import Manager from "../../../assets/employees-photo.png";
import Serving from "../../../assets/serving-photo.png";
import Button from "../../../commons/Button/Button";
import { client_path, server_path } from "../../../utils/constant";
function BannerAdvers() {
  return (
    <div className="bannerAd-container">
      <div className="img-manager">
        <img src={Manager} alt="manager-photo" />
      </div>
      <div className="candidate-section">
        <h3>Quy trình tuyển dụng của chúng tôi</h3>
        <Button
          btn_title="Tìm hiểu thêm"
          path_navigate={client_path.PROCEDURE}
        />
      </div>
      <div className="ad-section">
        <div className="bubble-ad">Nhanh chóng</div>
        <div className="bubble-ad">Tiện lợi</div>
        <div className="bubble-ad">Dễ dàng</div>
      </div>
      <div className="serving-section">
        <div className="img-serving">
          <img src={Serving} alt="serving-photo" />
        </div>
        <div className="serving-content">
          <p>
            FJ là ứng dụng hỗ trợ tuyển dụng F&B nhanh chóng và tiện lợi. Đăng
            ký ngay!
          </p>
        </div>
      </div>
    </div>
  );
}

export default BannerAdvers;
