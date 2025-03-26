import React, { useEffect, useState, useRef } from "react";
import "./CompanyInfo.css";
import { GetCompanyByUser } from "../../services/user.service";
import ModalCompanyInfo from "../Modals/MocalCompanyInfo/ModalCompanyInfo";
import Logo from "../../assets/Logo FJ.png";

function CompanyInfo() {
  const [isEdit, setIsEdit] = useState(false);
  const [company, setCompany] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    status: "",
    avatar: "",
  });

  const nameInputRef = useRef(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await GetCompanyByUser();
        if (response?.result?.data?.company) {
          const companyData = response.result.data.company;
          setCompany(companyData);
          setFormData({
            name: companyData.name || "",
            description: companyData.description || "",
            address: companyData.address || "",
            status: companyData.status || "",
            avatar: companyData.avatar || "",
          });
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin công ty:", error);
      }
    };

    fetchCompany();
  }, []);

  function handleEditCompany() {
    setIsEdit((prev) => {
      if (!prev) setTimeout(() => nameInputRef.current?.focus(), 100);
      return !prev;
    });
  }
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleRegister(formData) {
    console.log("Dữ liệu đăng ký:", formData);
  }

  return (
    <div className="company-container">
      {company ? (
        <>
          <h1>Thông tin công ty</h1>
          <table className="company-table">
            <tbody>
              <tr>
                <th>Tên cơ sở:</th>
                <td>
                  <input
                    ref={nameInputRef}
                    className="company-inp"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEdit}
                  />
                </td>
              </tr>
              <tr>
                <th>Slogan:</th>
                <td>
                  <input
                    className="company-inp"
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    disabled={!isEdit}
                  />
                </td>
              </tr>
              <tr>
                <th>Địa chỉ:</th>
                <td>
                  <input
                    className="company-inp"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    disabled={!isEdit}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button
            className="btn-info btn-companyInfo"
            onClick={handleEditCompany}
          >
            {isEdit ? "Lưu thông tin" : "Chỉnh sửa thông tin"}
          </button>
        </>
      ) : (
        <div className="post-company">
          <img src={Logo} alt="Logo FJ" className="logo-post" />
          <p>
            Chưa đăng ký cơ sở của bạn?{" "}
            <span
              onClick={() => setIsModalOpen(true)}
              className="post-compInfo"
            >
              Đăng ký thông tin ngay
            </span>
          </p>
        </div>
      )}
      <ModalCompanyInfo
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleRegister}
      />
    </div>
  );
}

export default CompanyInfo;
