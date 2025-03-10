import React, { useState, useEffect, useRef } from "react";
import "../../global.css";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { useCustomNavigate } from "../../utils/utils";
import Logo from "../../assets/Logo FJ.png";

function NavBar() {
  const navigate = useCustomNavigate();
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("accessToken");
    if (storedUser) {
      // setUser(JSON.parse(storedUser));
      setUser({
        name: "Loc",
        password: "123",
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    setIsDropdownOpen(false);
    navigate("/");
  };

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
        <Link to="/">Trang chủ</Link>
        <Link to="/candidate">Ứng tuyển</Link>
        <Link to="/procedure">Quy trình tuyển dụng</Link>
      </div>
      <div className="log-bar">
        {user ? (
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
                <Link to="/account">Quản lý tài khoản</Link>
                <Link to="/cv">Quản lý CV</Link>
                <Link to="/recruitment">Tuyển dụng nhân sự</Link>
                <button className="btn-logout" onClick={handleLogout}>
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
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
