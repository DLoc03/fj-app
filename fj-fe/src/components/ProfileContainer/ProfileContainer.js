import React from "react";
import "./ProfileContainer.css";

function ProfileContainer() {
  return (
    <div className="profile-container">
      <div className="avt-profile"></div>
      <div className="info-profile">
        <h1>Phuc Long Coffee & Tea</h1>
        <p>Nguoi dai dien dang ky: Phuc Long</p>
        <p>Hotline: 09080800</p>
        <p>Dia chi</p>
        <p>Email lien he</p>
      </div>
    </div>
  );
}

export default ProfileContainer;
