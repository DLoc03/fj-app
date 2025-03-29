import React, { useEffect, useState } from "react";
import "./Position.css";

import { postJob } from "../../services/job.service";

function Position() {
  const [posSelect, setPosSelect] = useState("");
  const [formData, setFormData] = useState({
    quantity: "",
    jobDescription: "",
    salary: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handlePostJob = async () => {
    if (
      !posSelect ||
      !formData.quantity ||
      !formData.salary ||
      !formData.jobDescription
    ) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const jobData = {
      jobName: posSelect,
      quantity: formData.quantity,
      salary: formData.salary,
      jobDescription: formData.jobDescription,
    };

    try {
      const response = await postJob(jobData);
      alert("Công việc đã được đăng tải thành công!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Lỗi khi đăng công việc:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  return (
    <div className="pos-container">
      <div className="pos-choose">
        <span>Chọn vị trí tuyển dụng: </span>
        <select
          className="select-box"
          value={posSelect}
          onChange={(e) => setPosSelect(e.target.value)}
        >
          <option value="">-- Chọn --</option>
          <option value="Pha chế">Pha chế</option>
          <option value="Phục vụ">Phục vụ</option>
          <option value="Quản lý">Quản lý</option>
          <option value="Kế toán">Kế toán</option>
          <option value="Tiếp tân">Tiếp tân</option>
          <option value="Đầu bếp">Đầu bếp</option>
          <option value="Phụ bếp">Phụ bếp</option>
        </select>
      </div>
      <div className="pos-desc">
        <label>Số lượng tuyển</label>
        <input
          type="text"
          name="quantity"
          placeholder="Số lượng tuyển"
          value={formData.quantity}
          onChange={handleChange}
          required
        />

        <label>Mức lương dự kiến</label>
        <input
          type="text"
          name="salary"
          placeholder="Mức lương dự kiến"
          value={formData.salary}
          onChange={handleChange}
          required
        />

        <label>Mô tả công việc</label>
        <input
          type="text"
          name="jobDescription"
          placeholder="Mô tả công việc"
          value={formData.jobDescription}
          onChange={handleChange}
          required
        />
      </div>

      <button className="pos-submit" onClick={handlePostJob}>
        Cập nhật
      </button>
    </div>
  );
}

export default Position;
