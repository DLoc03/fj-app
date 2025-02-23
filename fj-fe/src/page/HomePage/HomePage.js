import React from "react";
import "./HomePage.css";
import Banner from "../../components/Banner/BannerHome/Banner";
import EmployerList from "../../components/Employees/EmployerList/EmployerList";
import BannerAdvers from "../../components/Banner/BannerAdvers/BannerAdvers";

function HomePage() {
  return (
    <div className="homePage">
      <div className="bannerBar">
        <Banner />
      </div>
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
