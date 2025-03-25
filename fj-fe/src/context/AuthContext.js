import { createContext, useContext, useState, useEffect } from "react";
import { GetUserInfo } from "../services/user.service";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const accessToken = sessionStorage.getItem("accessToken");

      if (accessToken) {
        const userData = await GetUserInfo();
        if (userData) {
          setUser(userData);
        }
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const accessToken = sessionStorage.getItem("accessToken");
      if (!accessToken) {
        setUser(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const logout = () => {
    sessionStorage.removeItem("accessToken");
    localStorage.removeItem("User");
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
