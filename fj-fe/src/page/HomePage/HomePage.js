import React from "react";
import "./HomePage.css";
import EmployerList from "../../components/Employees/EmployerList/EmployerList";
import BannerAdvers from "../../components/Banner/BannerAdvers/BannerAdvers";

function HomePage() {
  return (
    <div className="homePage">
      <div className="bannerAdBar">
        <BannerAdvers />
      </div>
      <div className="employList">
        <EmployerList />
      </div>
    </div>
  );
}

export default HomePage;
