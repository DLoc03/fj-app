import React, { useState } from "react";
import "./EmployerProfile.css";
import AvtEmploy from "../../../assets/employ.jpg";
import Modal from "../../Modals/UploadModals/UploadCV";
import "../../Modals/UploadModals/UploadCV.css";

function EmployerProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div className="employProfile">
      <div className="employAvt">
        <img src={AvtEmploy} alt="avt-employ" className="employImgAvt" />
      </div>
      <div className="employDetail">
        <div className="employ-name">PHUC LONG COFFEE & TEA</div>
        <div className="employ-detail">
          <p>Địa chỉ: 265/13 Bùi Thị Xuân, TP. Đà Lạt, Lâm Đồng</p>
          <p>Hotline: 1800 6779</p>
          <p>Vị trí tuyển: Pha chế</p>
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
