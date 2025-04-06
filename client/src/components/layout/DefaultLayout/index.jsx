import React from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../NavBar";
import Footer from "../Footer";
import BannerHome from "../../ui/Banner";
import BannerAbout from "../../common/Banner/Banner";

function DefaultLayout({ children }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  return (
    <div className="container">
      <NavBar />
      {isHomePage ? <BannerHome /> : <BannerAbout />}
      {children}
      <Footer />
    </div>
  );
}

export default DefaultLayout;
