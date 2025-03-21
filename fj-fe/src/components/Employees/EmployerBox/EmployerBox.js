import React from "react";
import "./EmployerBox.css";
import AvtEmploy from "../../../assets/employ.jpg";
import { useNavigate } from "react-router-dom";
import { client_path } from "../../../utils/constant";

function EmployerBox({ name, position, id }) {
  const navigate = useNavigate();
  function handleNavigateEmpProfile(path) {
    navigate(path);
  }
  return (
    <div
      className="employ-box"
      onClick={() => handleNavigateEmpProfile(`/candidate/${id}`)}
    >
      <div className="employ-avt">
        <img src={AvtEmploy} alt="avt-employ" />
      </div>
      <div className="employ-info">
        <div className="store-name">{name}</div>
        <div className="employ-pos">
          Vị trí tuyển: {position ? position : "Pha chế, phục vụ"}
        </div>
      </div>
    </div>
  );
}

export default EmployerBox;
