import React, { useState } from "react";
import "./ModalCompanyInfo.css";
import { postComopany } from "../../../services/company.service";

function ModalCompanyInfo({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    status: "Pending",
    avatar: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await postComopany(formData);
      onSubmit(formData);
      alert("Đăng ký thông tin cơ sở thành công!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      onClose();
    } catch (error) {
      console.error("Lỗi khi đăng ký công ty:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    }
  }

  if (!isOpen) return null;

  return (
    <div className="modal-compInfo">
      <form className="modal-form" onSubmit={handleSubmit}>
        <h1>Đăng ký thông tin cơ sở</h1>
        <label className="label-compInfo">Tên cơ sở:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label className="label-compInfo">Slogan:</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <label className="label-compInfo">Địa chỉ:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <label className="label-compInfo">Trạng thái đăng ký</label>

        <input
          type="text"
          name="address"
          value={formData.status}
          required
          disabled
          style={{ color: "gray" }}
        />

        <div className="modal-buttons">
          <button type="submit">Đăng ký</button>
          <button type="button" onClick={onClose}>
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModalCompanyInfo;
