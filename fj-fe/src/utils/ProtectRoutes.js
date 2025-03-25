import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { client_path } from "./constant";

export function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user || user === null) {
    return <Navigate to={client_path.LOGIN} replace />;
  }

  return children;
}
