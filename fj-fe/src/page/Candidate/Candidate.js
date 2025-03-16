import React from "react";
import "./Candidate.css";
import BannerEmploy from "../../components/Banner/BannerEmploy/BannerEmploy";
import EmployerList from "../../components/Employees/EmployerList/EmployerList";

function Candidate() {
  return (
    <div className="employContainer">
      <EmployerList />
    </div>
  );
}

export default Candidate;
