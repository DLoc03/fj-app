import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./HomePage.css";
import Banner from "../../components/Banner/BannerHome/Banner";
import EmployerList from "../../components/Employees/EmployerList/EmployerList";
import Footer from "../../components/Footer/Footer";
import BannerAdvers from "../../components/Banner/BannerAdvers/BannerAdvers";

function HomePage() {
  return (
    <div className="homePage">
      <div className="navBar">
        <NavBar />
      </div>
      <div className="bannerBar">
        <Banner />
      </div>
      <div className="bannerAdBar">
        <BannerAdvers />
      </div>
      <div className="employList">
        <EmployerList />
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default HomePage;
