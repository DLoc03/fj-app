import React from "react";
import "./Procedure.css";
import BannerEmploy from "../../components/Banner/BannerEmploy/BannerEmploy";
import ProduceImage from "../../assets/recruitment.png";

function Procedure() {
  return (
    <div className="procedurePage">
      <div className="produceImage">
        <img src={ProduceImage} alt="produce-image" />
      </div>
    </div>
  );
}

export default Procedure;
