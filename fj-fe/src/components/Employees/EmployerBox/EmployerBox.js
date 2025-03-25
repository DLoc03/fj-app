import React from "react";
import "./EmployerBox.css";
import AvtEmploy from "../../../assets/employ.jpg";
import { useNavigate } from "react-router-dom";
import { client_path } from "../../../utils/constant";
import { formatSalary } from "../../../utils/utils";

function EmployerBox({ name, position, quantity, salary, id }) {
  const navigate = useNavigate();
  function handleNavigateEmpProfile(path) {
    navigate(path);
  }
  return (
    <div
      className="employ-box"
      onClick={() => handleNavigateEmpProfile(`${client_path.CANDIDATE}/${id}`)}
    >
      <div className="employ-avt">
        <img src={AvtEmploy} alt="avt-employ" />
      </div>
      <div className="employ-info">
        <div className="store-name">{name}</div>
        <div className="employ-pos">Vị trí tuyển: {position}</div>
        <div className="employ-sal">
          Mức lương: <span>{formatSalary(salary)}</span>
        </div>
      </div>
    </div>
  );
}

export default EmployerBox;
