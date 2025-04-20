import { createContext, useContext, useEffect, useState } from "react";
import { AuthAPI } from "../services";
import { SESSION_DATA } from "../common/enum/enum";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = () => {
    const token = sessionStorage.getItem(SESSION_DATA.ADMINTOKEN);
    setIsAuthenticated(!!token);
  };

  useEffect(() => {
    checkAuth();
    setIsLoading(false);

    const handleTokenRefreshed = (e) => {
      const token = e.detail;
      sessionStorage.setItem(SESSION_DATA.ADMINTOKEN, token);
      setIsAuthenticated(true);
    };

    window.addEventListener("tokenRefreshed", handleTokenRefreshed);

    const handleStorageChange = () => {
      checkAuth();
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("tokenRefreshed", handleTokenRefreshed);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const login = (token) => {
    sessionStorage.setItem(SESSION_DATA.ADMINTOKEN, token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    AuthAPI.logout(() => {
      sessionStorage.removeItem(SESSION_DATA.ADMINTOKEN);
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
