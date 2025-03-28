import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserLogin } from "../services/user.service";
import "./auth.css";
import { STATUS } from "../utils/enum";

function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await UserLogin({ email, password });
      if (
        response.status === STATUS.NOT_FOUND ||
        response.result.data.user.role !== "admin"
      ) {
        setMessage("Bạn không có quyền đăng nhập quản trị viên!");
        return;
      } else if (response.errCode === 2) {
        setMessage("Sai mật khẩu");
        return;
      } else {
        setMessage("Đăng nhập thành công!");
        sessionStorage.setItem("adminToken", response.result.data.accessToken);
        localStorage.setItem(
          "Admin",
          JSON.stringify(response.result.data.user.id)
        );

        setTimeout(() => {
          navigate("/dashboard");
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.log("Error login for admin: ", error);
      setMessage("Đã có lỗi xảy ra! Vui lòng thử lại!");
    }
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
