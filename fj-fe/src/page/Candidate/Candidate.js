import React from "react";
import "./Candidate.css";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import BannerEmploy from "../../components/Banner/BannerEmploy/BannerEmploy";
import EmployerList from "../../components/Employees/EmployerList/EmployerList";

function Candidate() {
  return (
    <div>
      <div className="navBar">
        <NavBar />
      </div>
      <div className="bannerEmploy">
        <BannerEmploy />
      </div>
      <div className="employContainer">
        <EmployerList />
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Candidate;
