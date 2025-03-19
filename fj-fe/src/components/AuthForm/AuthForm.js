import React, { useState } from "react";
import "./AuthForm.css";
import { useCustomNavigate } from "../../utils/utils";
import { UserLogin, UserRegister } from "../../services/user.service";
import { endpoint } from "../../utils/constant";

function AuthForm({ type, onSubmit }) {
  const navigate = useCustomNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
  });

  const [message, setMessage] = useState("");

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    const { email, password, name, phone } = formData;
    if (type === "login") {
      onSubmit({ email, password });
    } else {
      onSubmit({ email, password, name, phone });
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    const { email, password } = formData;

    try {
      let response = await UserLogin({ email, password });
      if (response.data.errCode === 0) {
        setMessage(response.data.message);
        setTimeout(() => {
          navigate(endpoint.HOME);
          window.location.reload();
        }, 1000);
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage("Đã xảy ra lỗi. Vui lòng thử lại!");
      console.log(error);
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    console.log("Dữ liệu trước khi đăng ký: ", formData);
    const { email, password, name, phone } = formData;
    try {
      let response = await UserRegister({
        email,
        password,
        name,
        phone,
      });
      if (response.data.errCode === 1 || response.data.errCode === 2) {
        setMessage(response.data.message);
      } else {
        setMessage(response.data.message);
        setTimeout(() => {
          navigate(endpoint.LOGIN);
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
              name="name"
              placeholder="Tên người đăng ký"
              value={formData.name}
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
          <span
            onClick={() => navigate(endpoint.REGISTER)}
            className="switch-link"
          >
            Đăng ký
          </span>
        </p>
      ) : (
        <p className="title-switch">
          Đã có tài khoản?{" "}
          <span
            onClick={() => navigate(endpoint.LOGIN)}
            className="switch-link"
          >
            Đăng nhập
          </span>
        </p>
      )}
    </div>
  );
}

export default AuthForm;
