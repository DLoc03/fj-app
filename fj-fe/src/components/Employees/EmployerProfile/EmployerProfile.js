import React, { useEffect, useState } from "react";
import "./EmployerProfile.css";
import AvtEmploy from "../../../assets/employ.jpg";
import Modal from "../../Modals/UploadModals/UploadCV";
import "../../Modals/UploadModals/UploadCV.css";
import { useParams } from "react-router-dom";
import { ERROR_CODE, STATUS } from "../../../utils/enum";
import { getJobById, getJobs } from "../../../services/job.service";
import { formatSalary } from "../../../utils/utils";
import { useCustomNavigate } from "../../../utils/utils";
import { client_path } from "../../../utils/constant";
import { getCompanyById } from "../../../services/company.service";

import { useLocation } from "react-router-dom";

function EmployerProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const { state } = useLocation();
  const { name, position, quantity, salary, companyID, recruiterID } =
    state || {};

  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCompanyById(companyID);
      const phoneData = response?.result?.data?.recruiter?.phone;
      const addressData = response?.result?.data?.address;
      setPhone(phoneData);
      setAddress(addressData);
    };
    fetchData();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  return (
    <div className="employProfile">
      <div className="employAvt">
        <img src={AvtEmploy} alt="avt-employ" className="employImgAvt" />
      </div>
      <div className="employDetail">
        <div className="employ-name">{name}</div>
        <div className="employ-detail">
          <div className="recruitment-detail">
            <h2 className="employ-h2">Thông tin liên hệ</h2>
            <p>Hotline: {phone}</p>
            <p>Địa chỉ: {address}</p>
          </div>
          <div
            className="recruitment-detail"
            style={{ paddingTop: "8px", borderTop: "1px solid white" }}
          >
            <h2 className="employ-h2">Thông tin tuyển dụng</h2>
            <p>Vị trí tuyển: {position}</p>
            <p>Số lượng tuyển: {quantity}</p>
            <p>
              Mức lương: <span>{formatSalary(salary)}</span>
            </p>
          </div>
        </div>
        <button className="btn-cv" onClick={() => setIsModalOpen(true)}>
          Nộp hồ sơ ứng tuyển
        </button>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h3>Nộp CV ứng tuyển</h3>
          <div className="file-upload">
            <label className="file-input">
              Chọn tệp
              <input type="file" hidden onChange={handleFileChange} />
            </label>
            {selectedFile && <p>📄 {selectedFile.name}</p>}
            <button
              className="upload-btn"
              onClick={() => setIsModalOpen(false)}
            >
              Gửi CV và bắt đầu phỏng vấn
            </button>
          </div>
          <button className="close-btn" onClick={() => setIsModalOpen(false)}>
            ×
          </button>
        </Modal>
      </div>
    </div>
  );
}

export default EmployerProfile;
