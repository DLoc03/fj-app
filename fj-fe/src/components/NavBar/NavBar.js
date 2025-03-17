import React, { useState, useEffect, useRef } from "react";
import "../../global.css";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCustomNavigate } from "../../utils/utils";
import Logo from "../../assets/Logo FJ.png";
import { endpoint } from "../../utils/constant";

function NavBar() {
  const navigate = useCustomNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="nav-bar">
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="top-bar">
        <Link to={endpoint.HOME}>Trang chủ</Link>
        <Link to={endpoint.CANDIDATE}>Ứng tuyển</Link>
        <Link to={endpoint.PROCEDURE}>Quy trình tuyển dụng</Link>
      </div>
      <div className="log-bar">
        {isAuthenticated ? (
          <div
            ref={dropdownRef}
            className={`dropdown ${isDropdownOpen ? "open" : ""}`}
          >
            <button
              className="dropdown-toggle"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Xin chào, {user.name} ▼
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <Link to={endpoint.ACCOUNT}>Quản lý tài khoản</Link>
                <Link to={endpoint.CVMANAGE}>Quản lý CV</Link>
                <Link to={endpoint.RECRUITMENT}>Tuyển dụng nhân sự</Link>
                <button
                  className="btn-logout"
                  onClick={() => {
                    logout();
                    navigate(endpoint.LOGIN);
                  }}
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to={endpoint.LOGIN}
            style={{
              textDecoration: "none",
              color: "white",
              fontFamily: "var(--main-font)",
              fontSize: "20px",
            }}
          >
            Đăng nhập/Đăng ký
          </Link>
        )}
      </div>
    </div>
  );
}

export default NavBar;
