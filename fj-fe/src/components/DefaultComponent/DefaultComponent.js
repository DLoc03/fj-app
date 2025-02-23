import React from "react";
import "./DefaultComponent.css";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

function DefaultComponent({ children }) {
  return (
    <div>
      <div className="navBar">
        <NavBar />
      </div>
      {children}
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default DefaultComponent;
