import React, { useState } from "react";
import "./AuthForm.css";
import { useCustomNavigate } from "../../utils/utils";
import { UserLogin, UserRegister } from "../../services/user.service";
import { client_path } from "../../utils/constant";
import { ERROR_CODE, STATUS } from "../../utils/enum";

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
      if (
        response.result.errCode === ERROR_CODE.DONE &&
        response.status === STATUS.DONE
      ) {
        setMessage("Đăng nhập thành công!");
        setTimeout(() => {
          navigate(client_path.HOME);
          window.location.reload();
        }, 1000);
      } else if (response.status === STATUS.NOT_FOUND) {
        setMessage("Tài khoản tuyển dụng chưa đăng ký!");
      } else {
        setMessage("Sai mật khẩu! Vui lòng thử lại!");
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
      if (response.data.result.errCode !== ERROR_CODE.DONE) {
        setMessage("Thông tin đã có tài khoản đăng ký! Vui lòng thử lại!");
      } else {
        setMessage("Đăng ký thành công!");
        setTimeout(() => {
          navigate(client_path.LOGIN);
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
            onClick={() => navigate(client_path.REGISTER)}
            className="switch-link"
          >
            Đăng ký
          </span>
        </p>
      ) : (
        <p className="title-switch">
          Đã có tài khoản?{" "}
          <span
            onClick={() => navigate(client_path.LOGIN)}
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
