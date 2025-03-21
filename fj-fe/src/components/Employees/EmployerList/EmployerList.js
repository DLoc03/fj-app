import React, { useEffect, useState } from "react";
import "./EmployerList.css";
import EmployerBox from "../EmployerBox/EmployerBox";
import Button from "../../../commons/Button/Button";
import { client_path } from "../../../utils/constant";
import { getAllCompanies } from "../../../services/company.service";

function EmployerList() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCompanies();
        console.log(response.result.data);
        setCompanies(response.result.data);
      } catch (err) {
        setError("Dữ liệu không hợp lệ!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="employer-list">
      <div className="list-title">Tuyển dụng hàng đầu</div>
      <div className="employer-lstbody">
        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : error ? (
          <p style={{ color: "red" }}>Lỗi: {error}</p>
        ) : companies.length > 0 ? (
          companies.map((company, compIndex) => (
            <EmployerBox
              key={compIndex}
              name={company.name}
              position={company.position}
              id={company.id}
            />
          ))
        ) : (
          <p>Không có dữ liệu</p>
        )}
      </div>
      <div className="button-list">
        <Button btn_title="Xem thêm" path_navigate={client_path.CANDIDATE} />
      </div>
    </div>
  );
}

export default EmployerList;
