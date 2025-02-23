import React from "react";
import "./EmployeesProfile.css";
import BannerEmploy from "../../components/Banner/BannerEmploy/BannerEmploy";
import EmployerProfile from "../../components/Employees/EmployerProfile/EmployerProfile";

function EmployeesProfile() {
  return (
    <div className="employPage">
      <div className="bannerEmploy">
        <BannerEmploy />
      </div>
      <div className="employContainer">
        <EmployerProfile />
      </div>
    </div>
  );
}

export default EmployeesProfile;
