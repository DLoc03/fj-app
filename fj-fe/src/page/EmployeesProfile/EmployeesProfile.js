import React from "react";
import "./EmployeesProfile.css";
import EmployerProfile from "../../components/Employees/EmployerProfile/EmployerProfile";

function EmployeesProfile() {
  return (
    <div className="employPage">
      <div className="employContainer">
        <EmployerProfile />
      </div>
    </div>
  );
}

export default EmployeesProfile;
