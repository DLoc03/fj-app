import React, { useState } from "react";
import "./PositonSection.css";
import Position from "../Position/Position";

function PositionSection({ jobName, quantity, salary, jobDescription }) {
  const [jobList, setJobList] = useState([]);

  return (
    <div className="position-container">
      <table className="position-table">
        <thead>
          <tr>
            <th>Vị trí</th>
            <th>Số lượng</th>
            <th>Mức lương</th>
            <th>Mô tả công việc</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{jobName}</td>
            <td>{quantity}</td>
            <td>{salary}</td>
            <td>{jobDescription}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PositionSection;
