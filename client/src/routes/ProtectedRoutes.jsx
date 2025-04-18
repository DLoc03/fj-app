import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth";

import SpinningLoader from "../components/common/SpinningLoading";

const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <SpinningLoader />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
