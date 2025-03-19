import { createContext, useContext, useState, useEffect } from "react";
import { GetUserInfo } from "../services/user.service";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      const adminToken = sessionStorage.getItem("adminToken");
      if (adminToken) {
        const adminData = await GetUserInfo();
        if (adminData) {
          setAdmin(adminData);
        }
      }
    };
    fetchAdmin();
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const adminToken = sessionStorage.getItem("adminToken");
      if (!adminToken) {
        setAdmin(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const logout = () => {
    sessionStorage.removeItem("adminToken");
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, isAuthenticated: !!admin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
