import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
import { client_path } from "./constant";

export function ProtectedRoute({ children }) {
  // const { isAuthenticated } = useAuth();
  const accessToken = sessionStorage.getItem("accessToken");

  if (!accessToken) {
    return <Navigate to={client_path.LOGIN} replace />;
  }

  return children;
}
