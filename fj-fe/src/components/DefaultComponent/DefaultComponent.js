import React from "react";
import "./DefaultComponent.css";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import BannerHome from "../Banner/BannerHome/Banner";
import BannerEmploy from "../Banner/BannerEmploy/BannerEmploy";
import Sidebar from "../SideBar/SideBarFJ";
import { useLocation } from "react-router-dom";
import { client_path } from "../../utils/constant";

function DefaultComponent({ children }) {
  const location = useLocation();
  const pathsWithSidebar = [
    client_path.ACCOUNT,
    client_path.CVMANAGE,
    client_path.RECRUITMENT,
    client_path.COMPANY,
    client_path.ADDJOB,
  ];
  const showSidebar = pathsWithSidebar.includes(location.pathname);
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
      {showSidebar ? (
        <div className="main-container">
          {showSidebar && <Sidebar />}
          <div className="children-container">{children}</div>
        </div>
      ) : (
        <div className="content">
          <div className="children-container">{children}</div>
        </div>
      )}
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default DefaultComponent;
