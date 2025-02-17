import React from "react";
import "./BannerEmploy.css";
import Logo from "../../../assets/Logo FJ.png";

function BannerEmploy() {
  return (
    <div className="banner-employ">
      <div className="overlay-employ"></div>
      <div className="null-banner"></div>
      <div className="banner-slogan">
        <div className="slogan-title">TÌM CÔNG VIỆC THẬT DỄ DÀNG</div>
        <div className="slogan-content">
          <div className="slogan-logo">
            <img src={Logo} alt="logo-slogan" />
          </div>
          <div className="slogan-text">
            <p>
              Với FJ, các nhà tuyển dụng F&B có thể nhanh chóng và dễ dàng tìm
              kiếm được ứng viên tiềm năng.
            </p>
            <p>
              Hãy để FJ trở thành cầu nối giúp doanh nghiệp của bạn phát triển
              mạnh mẽ hơn!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BannerEmploy;
