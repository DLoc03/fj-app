import { Navigate } from "react-router-dom";

export function AuthProtect({ children }) {
  const adminToken = sessionStorage.getItem("adminToken");

  if (!adminToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
