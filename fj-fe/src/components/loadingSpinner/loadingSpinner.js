import React from "react";
import "./loadingSpinner.css";

const LoadingSpinner = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="loading-overlay">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
