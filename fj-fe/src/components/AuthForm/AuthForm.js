import React, { useState } from "react";
import "./AuthForm.css";
import { useCustomNavigate } from "../../utils/utils";
import { UserLogin, UserRegister } from "../../services/userService";

function AuthForm({ type, onSubmit }) {
  const navigate = useCustomNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    phone: "",
  });

  const [message, setMessage] = useState("");

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

  async function handleLogin(e) {
    e.preventDefault();
    const { email, password } = formData;

    try {
      let response = await UserLogin({ email, password });
      if (response.data.loggedUser.errCode === 0) {
        const { accessToken, refreshToken } = response.data.loggedUser;

        sessionStorage.setItem("accessToken", accessToken);

        setMessage(response.data.loggedUser.message);

        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1000);
      } else {
        setMessage(response.data.loggedUser.message);
      }
    } catch (error) {
      setMessage("Đã xảy ra lỗi. Vui lòng thử lại!");
      console.log(error);
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    const { email, password, username, phone, address } = formData;
    try {
      let response = await UserRegister({
        email,
        password,
        username,
        phone,
        address,
      });
      if (response.data.errCode === 1 || response.data.errCode === 2) {
        setMessage(response.data.message);
      } else {
        setMessage(response.data.message);
        setTimeout(() => {
          navigate("/login");
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      setMessage("Đã xảy ra lỗi. Vui lòng thử lại!");
      console.log(error);
    }
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
              name="phone"
              placeholder="Số điện thoại"
              value={formData.phone}
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
        <p className="abort-detail">{message}</p>
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
