import { createContext, useContext, useState, useEffect } from "react";
import { GetUserInfo, UserLogout } from "../services/user.service";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const adminToken = sessionStorage.getItem("adminToken");

      if (adminToken) {
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
      const adminToken = sessionStorage.getItem("adminToken");
      if (!adminToken) {
        setUser(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const logout = async () => {
    await UserLogout();
    sessionStorage.removeItem("adminToken");
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
