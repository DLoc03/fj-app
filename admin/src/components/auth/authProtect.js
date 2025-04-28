import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

export function AuthProtect({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
