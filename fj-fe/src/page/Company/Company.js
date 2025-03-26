import React, { useEffect, useState } from "react";
import CompanyInfo from "../../components/CompanyInfo/CompanyInfo";
import { getAllCompanies } from "../../services/company.service";

function Company() {
  const [company, setCompany] = useState();
  const userId = localStorage.getItem("User");
  return (
    <div>
      <CompanyInfo />
    </div>
  );
}

export default Company;
