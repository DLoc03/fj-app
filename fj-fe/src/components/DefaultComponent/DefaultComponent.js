import React from "react";
import "./DefaultComponent.css";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import BannerHome from "../Banner/BannerHome/Banner";
import BannerEmploy from "../Banner/BannerEmploy/BannerEmploy";
import { useLocation } from "react-router-dom";

function DefaultComponent({ children }) {
  const location = useLocation();
  const getBanner = () => {
    if (location.pathname === "/") {
      return <BannerHome />;
    } else {
      return <BannerEmploy />;
    }
  };
  return (
    <div className="container">
      <div className="navBar">
        <NavBar />
      </div>
      <div className="bannerContainer">{getBanner()}</div>
      <div className="children-container">{children}</div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default DefaultComponent;
