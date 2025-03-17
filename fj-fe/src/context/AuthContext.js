import { createContext, useContext, useState, useEffect } from "react";
import { GetUserInfo } from "../services/userService";

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

      if (accessToken) {
        GetUserInfo().then(setUser);
      } else {
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
    setUser(null);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
