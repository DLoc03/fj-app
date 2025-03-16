import React from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import "./Login.css";

function Login() {
  const handleLogin = (data) => {
    console.log("Thông tin đăng nhập: ", data);
  };
  return (
    <div className="authForm">
      <AuthForm type="login" onSubmit={handleLogin} />
    </div>
  );
}

export default Login;
