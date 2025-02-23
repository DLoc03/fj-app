import React from "react";
import AuthForm from "../../components/AuthForm/AuthForm";

function Register() {
  const handleRegister = (data) => {
    console.log("Thông tin đăng ký: ", data);
  };
  return (
    <div className="authForm">
      <AuthForm type="register" onSubmit={handleRegister} />
    </div>
  );
}

export default Register;
