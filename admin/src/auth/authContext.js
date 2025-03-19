import { createContext, useContext, useState, useEffect } from "react";
import { GetUserInfo } from "../services/user.service";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);

  const fetchAdmin = async () => {
    const adminToken = sessionStorage.getItem("adminToken");
    if (adminToken) {
      const adminData = await GetUserInfo();
      if (adminData) {
        setAdmin(adminData);
      }
    }
  };

  useEffect(() => {
    fetchAdmin();
  }, []);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "adminToken") {
        if (event.newValue) {
          fetchAdmin();
        } else {
          setAdmin(null);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const login = async (token) => {
    sessionStorage.setItem("adminToken", token);
    await fetchAdmin();
  };

  const logout = () => {
    sessionStorage.removeItem("adminToken");
    setAdmin(null);
  };

  return (
    <AuthContext.Provider
      value={{ admin, isAuthenticated: !!admin, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
