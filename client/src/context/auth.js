import { useEffect, useState } from "react";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    setIsAuthenticated(!!token);
  }, []);

  const login = (token) => {
    sessionStorage.setItem("accessToken", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    window.location.href = "/login";
  };

  return { isAuthenticated, login, logout };
};

export default useAuth;
