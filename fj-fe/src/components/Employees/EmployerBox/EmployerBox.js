import React from "react";
import "./EmployerBox.css";
import AvtEmploy from "../../../assets/employ.jpg";
import { useNavigate } from "react-router-dom";
import { endpoint } from "../../../utils/constant";

function EmployerBox() {
  const navigate = useNavigate();
  function handleNavigateEmpProfile(path) {
    navigate(path);
  }
  return (
    <div
      className="employ-box"
      onClick={() => handleNavigateEmpProfile(endpoint.JOBDECS)}
    >
      <div className="employ-avt">
        <img src={AvtEmploy} alt="avt-employ" />
      </div>
      <div className="employ-info">
        <div className="store-name">Phuc Long Coffee & Tea</div>
        <div className="employ-pos">
          Vị trí tuyển: Pha chế, Phục vụ, Quản lý
        </div>
      </div>
    </div>
  );
}

export default EmployerBox;
