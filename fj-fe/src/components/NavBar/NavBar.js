import React, { useState, useEffect, useRef } from "react";
import "../../global.css";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCustomNavigate } from "../../utils/utils";
import Logo from "../../assets/Logo FJ.png";
import { client_path } from "../../utils/constant";
import { GetUserInfo } from "../../services/user.service";

function NavBar() {
  const navigate = useCustomNavigate();
  const { user, setUser, isAuthenticated, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [token, setToken] = useState(sessionStorage.getItem("accessToken"));

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

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await GetUserInfo();
      if (userInfo) {
        setUser(userInfo);
      }
    };

    fetchUser();

    const tokenInterval = setInterval(() => {
      const newToken = sessionStorage.getItem("accessToken");
      if (newToken !== token) {
        setToken(newToken);
        fetchUser();
      }
    }, 1000);

    return () => clearInterval(tokenInterval);
  }, [token]);

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
              Xin chào, {user?.result?.data?.name || "Người dùng"} ▼
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <Link to={client_path.ACCOUNT} onClick={handleDropdownClick}>
                  Hồ sơ cá nhân
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
