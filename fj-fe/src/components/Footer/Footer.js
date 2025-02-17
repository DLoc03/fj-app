import React from "react";
import "./Footer.css";
import Logo from "../../assets/Logo FJ.png";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-info">
        <div className="footer-title detail" style={{ border: 0 }}>
          <h2>Liên hệ với FJ</h2>
          <p>2115232@dlu.edu.vn</p>
          <p>2115241@dlu.edu.vn</p>
          <p>0908357756</p>
        </div>
        <div className="footer-title cus">
          <h2>CSKH</h2>
          <p>Điều khoản bảo mật</p>
          <p>Khách hàng</p>
        </div>
        <div className="footer-title social">
          <h2>Mạng xã hội</h2>
          <div className="social-icon">
            <i class="fa-brands fa-facebook"></i>
            <i class="fa-brands fa-instagram"></i>
            <i class="fa-brands fa-linkedin"></i>
          </div>
        </div>
        <div className="footer-logo">
          <img src={Logo} alt="Logo" />
        </div>
      </div>
      <div className="footer-copyright">
        © 2025 FJ.COM.VN. All rights reserved
      </div>
    </div>
  );
}

export default Footer;
