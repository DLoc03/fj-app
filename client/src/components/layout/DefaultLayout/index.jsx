import React from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../NavBar";
import Footer from "../Footer";
import BannerHome from "../../ui/Banner";
import BannerAbout from "../../common/Banner";
import PATHS from "../../../routes/path";
import Chatbot from "../../ui/Chatbot";

function DefaultLayout({ children }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isAnswerPage = location.pathname === PATHS.ANSWER;
  return (
    <div className="container">
      <NavBar />
      {isHomePage ? <BannerHome /> : <BannerAbout />}
      {children}
      <Footer />
      {!isAnswerPage && <Chatbot />}
    </div>
  );
}

export default DefaultLayout;
