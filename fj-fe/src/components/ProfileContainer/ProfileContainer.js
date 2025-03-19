import React, { useEffect, useState, useRef } from "react";
import "./ProfileContainer.css";
import { useAuth } from "../../context/AuthContext";
import { UserUpdate } from "../../services/user.service";

function ProfileContainer(profileType) {
  const { user, isAuthenticated } = useAuth();
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.email || "",
    name: user?.name || "",
    phone: user?.phone || "",
  });

  const nameInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email,
        name: user.name,
        phone: user.phone,
      });
    }
  }, [user]);

  function handleEditUser() {
    setIsEdit((prev) => {
      if (!prev) setTimeout(() => nameInputRef.current?.focus(), 100);
      return !prev;
    });
  }

  async function handleUpdateUser() {
    try {
      const response = await UserUpdate(user._id, formData);
      if (response.errCode === 0) {
        alert("Cập nhật thông tin thành công");
        setIsEdit(false);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error("Cập nhật thất bại:", error);
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  if (!isAuthenticated) {
    return (
      <h1 style={{ textAlign: "center", color: "var(--strong-brown)" }}>
        Vui lòng đăng nhập để xem thông tin cá nhân
      </h1>
    );
  }

  return (
    <div className="profile-container">
      <div className="user-container">
        <div className="user-avt">
          <div className="avt-profile"></div>
          <button className="btn-upload">Cập nhật ảnh đại diện</button>
        </div>
        <div className="user-info">
          <h1>Thông tin người đại diện đăng ký cơ sở</h1>
          <table className="userInfo-table">
            <tbody>
              <tr>
                <th>Tên người dùng:</th>
                <td>
                  <input
                    ref={nameInputRef}
                    className="userInfo-inp"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEdit}
                    placeholder="Tối đa 18 ký tự"
                    maxLength={18}
                  />
                </td>
              </tr>
              <tr>
                <th>Email:</th>
                <td>
                  <input
                    className="userInfo-inp"
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEdit}
                  />
                </td>
              </tr>
              <tr>
                <th>Số điện thoại:</th>
                <td>
                  <input
                    className="userInfo-inp"
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEdit}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button
            className="btn-info btn-userInfo"
            onClick={() => {
              if (isEdit) {
                handleUpdateUser();
              }
              handleEditUser();
            }}
          >
            {isEdit ? "Lưu thông tin" : "Chỉnh sửa thông tin"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileContainer;
