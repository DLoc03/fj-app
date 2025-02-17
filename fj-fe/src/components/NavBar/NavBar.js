import React from "react";
import "../../global.css";
import "./NavBar.css";
import { Link } from "react-router-dom";

import Logo from "../../assets/Logo FJ.png";

function NavBar() {
  return (
    <div className="nav-bar">
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="top-bar">
        <Link to="/">
          <p>Trang chủ</p>
        </Link>
        <Link to="/candidate">
          <p>Ứng tuyển</p>
        </Link>
        <Link to="/procedure">
          <p>Quy trình tuyển dụng</p>{" "}
        </Link>
      </div>
      <div className="log-bar">
        <p>Đăng nhập/Đăng ký</p>
      </div>
    </div>
  );
}

export default NavBar;
