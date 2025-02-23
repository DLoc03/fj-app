import React, { useState } from "react";
import "./AuthForm.css";
import { useCustomNavigate } from "../../utils/utils";

function AuthForm({ type, onSubmit }) {
  const navigate = useCustomNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    businessName: "",
    hotline: "",
    address: "",
  });
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    const { email, password, username, businessName, hotline, address } =
      formData;
    if (type === "login") {
      onSubmit({ email, password });
    } else {
      onSubmit({ email, password, username, businessName, hotline, address });
    }
  }

  function handleLogin(data) {
    let user = { username: "Phuc Long", password: "123" };
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/");
    window.location.reload();
  }

  function handleRegister(e) {
    e.preventDefault();
    const { email, password, username, businessName, hotline, address } =
      formData;

    localStorage.setItem(
      "newUser",
      JSON.stringify({
        email,
        password,
        username,
        businessName,
        hotline,
        address,
      })
    );
    navigate("/login");
  }

  return (
    <div className="auth-form">
      <form onSubmit={handleSubmit}>
        <h4>
          {type === "login"
            ? "Đăng nhập cho nhà tuyển dụng"
            : "Đăng ký cho nhà tuyển dụng"}
        </h4>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {type === "register" && (
          <>
            <input
              type="text"
              name="username"
              placeholder="Tên người đăng ký"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="businessName"
              placeholder="Tên cơ sở"
              value={formData.businessName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="hotline"
              placeholder="Số điện thoại"
              value={formData.hotline}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Địa chỉ"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </>
        )}

        <button
          type="submit"
          className="btnLogin"
          onClick={type === "login" ? handleLogin : handleRegister}
        >
          {type === "login" ? "Đăng nhập" : "Đăng ký"}
        </button>
      </form>
      {type === "login" ? (
        <p className="title-switch">
          Chưa có tài khoản?{" "}
          <span onClick={() => navigate("/register")} className="switch-link">
            Đăng ký
          </span>
        </p>
      ) : (
        <p className="title-switch">
          Đã có tài khoản?{" "}
          <span onClick={() => navigate("/login")} className="switch-link">
            Đăng nhập
          </span>
        </p>
      )}
    </div>
  );
}

export default AuthForm;
