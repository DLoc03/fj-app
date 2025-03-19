import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LoadingSpinner from "../loadingSpinner/loadingSpinner";

const PageLoader = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return loading ? <LoadingSpinner loading={true} /> : null;
};

export default PageLoader;
