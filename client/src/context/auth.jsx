import { createContext, useContext, useEffect, useState } from "react";
import { AuthAPI } from "../services";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, []);

  const login = (token) => {
    sessionStorage.setItem("accessToken", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    AuthAPI.logout(() => {
      setIsAuthenticated(false);
      window.location.href = "/login";
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
