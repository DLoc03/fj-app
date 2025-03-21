import React, { useState, useEffect, useRef } from "react";
import "../../global.css";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCustomNavigate } from "../../utils/utils";
import Logo from "../../assets/Logo FJ.png";
import { client_path } from "../../utils/constant";

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

  async function handleLogout() {
    logout();
    setIsDropdownOpen(false);
    setTimeout(() => {
      navigate(client_path.HOME);
      window.location.reload();
    }, 1000);
  }

  function handleDropdownClick() {
    setIsDropdownOpen(false);
  }

  return (
    <div className="nav-bar">
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="top-bar">
        <Link to={client_path.HOME}>Trang chủ</Link>
        <Link to={client_path.CANDIDATE}>Ứng tuyển</Link>
        <Link to={client_path.PROCEDURE}>Quy trình tuyển dụng</Link>
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
              Xin chào, {user.result.data.name} ▼
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <Link to={client_path.ACCOUNT} onClick={handleDropdownClick}>
                  Quản lý tài khoản
                </Link>
                <Link to={client_path.CVMANAGE} onClick={handleDropdownClick}>
                  Quản lý CV
                </Link>
                <Link
                  to={client_path.RECRUITMENT}
                  onClick={handleDropdownClick}
                >
                  Tuyển dụng nhân sự
                </Link>
                <button className="btn-logout" onClick={handleLogout}>
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to={client_path.LOGIN}
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
