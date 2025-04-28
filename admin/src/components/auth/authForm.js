import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";

import { AuthAPI } from "../../services";
import { useAuth } from "../../context/auth";

function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleLogin(e) {
    e.preventDefault();
    AuthAPI.login({ email, password }, (err, result) => {
      if (err || result.errCode !== 0) {
        setMessage("Đăng nhập thất bại, vui lòng thử lại.");
        return;
      }
      if (result?.data.user?.role !== "admin") {
        setMessage("Bạn không có quyền đăng nhập!");
        return;
      }
      login(result?.data?.accessToken);
      navigate("/dashboard");
    });
  }

  return (
    <div className="auth-container">
      <h2 className="auth-title">Đăng nhập</h2>
      <form className="auth-form" onSubmit={handleLogin}>
        <input
          className="auth-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="auth-input"
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="auth-button" type="submit">
          Đăng nhập
        </button>
        <span className="auth-message">{message}</span>
      </form>
    </div>
  );
}

export default AuthForm;
