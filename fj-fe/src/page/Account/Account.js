import React from "react";
import "./Account.css";
import ProfileContainer from "../../components/ProfileContainer/ProfileContainer";
import { useAuth } from "../../context/AuthContext";
import CompanyInfo from "../../components/CompanyInfo/CompanyInfo";

function Account() {
  const { user, isAuthenticated } = useAuth();
  return (
    <div className="profileContainer">
      <ProfileContainer />
    </div>
  );
}

export default Account;
