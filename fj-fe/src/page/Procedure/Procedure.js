import React from "react";
import "./Procedure.css";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import BannerEmploy from "../../components/Banner/BannerEmploy/BannerEmploy";

function Procedure() {
  return (
    <div className="procedurePage">
      <div className="navBar">
        <NavBar />
      </div>
      <div className="bannerProduce">
        <BannerEmploy />
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Procedure;
