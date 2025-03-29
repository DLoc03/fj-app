import React from "react";
import "./Account.css";
import ProfileContainer from "../../components/ProfileContainer/ProfileContainer";

function Account() {
  return (
    <div className="profileContainer">
      <div className="profileBar">
        <ProfileContainer />
      </div>
    </div>
  );
}

export default Account;
