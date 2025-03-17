import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { endpoint } from "./constant";

export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={endpoint.LOGIN} replace />;
  }

  return children;
}
