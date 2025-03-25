import React from "react";
import "./Account.css";
import ProfileContainer from "../../components/ProfileContainer/ProfileContainer";
import { useAuth } from "../../context/AuthContext";

function Account() {
  const { user, isAuthenticated } = useAuth();
  return (
    <div className="profileContainer">
      <div className="profileBar">
        <ProfileContainer />
      </div>
    </div>
  );
}

export default Account;
