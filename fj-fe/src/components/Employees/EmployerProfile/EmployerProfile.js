import React, { useEffect, useState } from "react";
import "./EmployerProfile.css";
import AvtEmploy from "../../../assets/employ.jpg";
import Modal from "../../Modals/UploadModals/UploadCV";
import "../../Modals/UploadModals/UploadCV.css";
import { useParams } from "react-router-dom";
import { ERROR_CODE, STATUS } from "../../../utils/enum";
import { getJobById, getJobs } from "../../../services/job.service";
import { formatSalary } from "../../../utils/utils";

function EmployerProfile() {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [company, setCompany] = useState();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobData = await getJobById(id);
        setCompany(jobData.result.data);
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
        <div className="employ-name">{company?.company}</div>
        <div className="employ-detail">
          <h2 className="employ-h2">Thông tin tuyển dụng</h2>
          <p>Vị trí tuyển: {company?.jobName}</p>
          <p>Số lượng tuyển: {company?.quantity}</p>
          <p>
            Mức lương: <span>{formatSalary(company?.salary)}</span>
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
