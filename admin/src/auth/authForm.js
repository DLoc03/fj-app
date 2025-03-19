import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserLogin } from "../services/user.service";

function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await UserLogin({ email, password });
      if (response === "block" || response.errCode === 1) {
        setMessage("Bạn không có quyền đăng nhập quản trị viên!");
      } else if (response.errCode === 2) {
        setMessage("Sai mật khẩu");
      } else {
        setMessage("Đăng nhập thành công!");
        sessionStorage.setItem("adminToken", response.accessToken);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (error) {
      console.log("Error login for admin: ", error);
      setMessage("Đã có lỗi xảy ra! Vui lòng thử lại!");
    }

    // if (email === "admin@example.com" && password === "password") {
    //   sessionStorage.setItem("adminToken", "fake-jwt-token");
    //   navigate("/dashboard");
    // } else {
    //   alert("Sai tài khoản hoặc mật khẩu!");
    // }
  }

  return (
    <div>
      <h2>Đăng nhập</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Đăng nhập</button>
        <span>{message}</span>
      </form>
    </div>
  );
}

export default AuthForm;
