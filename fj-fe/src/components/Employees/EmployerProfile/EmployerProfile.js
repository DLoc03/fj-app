import React, { useEffect, useState } from "react";
import "./EmployerProfile.css";
import AvtEmploy from "../../../assets/employ.jpg";
import Modal from "../../Modals/UploadModals/UploadCV";
import "../../Modals/UploadModals/UploadCV.css";
import { getCompanyById } from "../../../services/company.service";
import { useParams } from "react-router-dom";
import { ERROR_CODE, STATUS } from "../../../utils/enum";
import { GetUserInfo } from "../../../services/user.service";

function EmployerProfile() {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [company, setCompany] = useState({ jobList: [] });

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCompanyById(id);
        if (
          response.status === STATUS.DONE &&
          response.result.errCode === ERROR_CODE.DONE
        ) {
          console.log(response.result.data);
          setCompany(response.result.data);
        } else {
          console.error("Lỗi lấy dữ liệu cơ sở:", response.result);
        }
      } catch (error) {
        console.error("Lỗi gọi API:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <div className="employProfile">
      <div className="employAvt">
        <img src={AvtEmploy} alt="avt-employ" className="employImgAvt" />
      </div>
      <div className="employDetail">
        <div className="employ-name">{company.name}</div>
        <div className="employ-detail">
          <p>Địa chỉ: {company.address}</p>
          <p>Hotline: {company.phone}</p>
          <p>
            Vị trí tuyển:{" "}
            {company.jobList.map((job, jobIndex) => (
              <span key={jobIndex}>
                {job}
                {jobIndex < company.jobList.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
        </div>
        <button className="btn-cv" onClick={() => setIsModalOpen(true)}>
          Nộp hồ sơ ứng tuyển
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3>Nộp CV ứng tuyển</h3>
        <div className="file-upload">
          <label className="file-input">
            Chọn tệp
            <input type="file" hidden onChange={handleFileChange} />
          </label>
          {selectedFile && <p>📄 {selectedFile.name}</p>}
          <button className="upload-btn" onClick={() => setIsModalOpen(false)}>
            Gửi CV và bắt đầu phỏng vấn
          </button>
        </div>
        <button className="close-btn" onClick={() => setIsModalOpen(false)}>
          ×
        </button>
      </Modal>
    </div>
  );
}

export default EmployerProfile;
