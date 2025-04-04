import { createContext, useContext, useState, useEffect } from "react";
import { GetUserInfo, UserLogout } from "../services/user.service";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("userData");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    const fetchUser = async () => {
      const accessToken = sessionStorage.getItem("accessToken");

      if (accessToken) {
        const userData = await GetUserInfo();
        if (userData) {
          setUser(userData);
          localStorage.setItem("userData", JSON.stringify(userData));
        }
      }
    };

    if (!user) fetchUser();
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const accessToken = sessionStorage.getItem("accessToken");
      if (!accessToken) {
        setUser(null);
        localStorage.removeItem("userData");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const logout = async () => {
    await UserLogout();
    sessionStorage.removeItem("accessToken");
    localStorage.removeItem("userData");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuthenticated: !!user, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
