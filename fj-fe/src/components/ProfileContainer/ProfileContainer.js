import React, { useEffect, useState, useRef } from "react";
import "./ProfileContainer.css";
import { UserUpdate } from "../../services/userService";
import { useAuth } from "../../context/AuthContext";
function ProfileContainer() {
  const { user, login } = useAuth();
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
  });

  const nameInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.user.name,
        email: user.user.email,
        phone: user.user.phone,
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
      const response = await UserUpdate(user.user.id, formData);
      if (response.data.errCode === 0) {
        alert("Cập nhật thông tin thành công");

        const updatedUser = { ...user, user: { ...user.user, ...formData } };
        login(updatedUser);
        sessionStorage.setItem("User", JSON.stringify(updatedUser));

        setIsEdit(false);
      }
    } catch (error) {
      console.error("Cập nhật thất bại:", error);
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <div className="profile-container">
      <div className="user-container">
        <div className="user-avt">
          <div className="avt-profile"></div>
          <button className="btn-upload">Cập nhật ảnh đại diện</button>
        </div>
        <div className="user-info">
          <div className="user-infoLine">
            <h1>Thông tin người đại diện đăng ký cơ sở</h1>
            {user ? (
              <table className="userInfo-table">
                <tbody>
                  <tr>
                    <th>Họ và tên: </th>
                    <td>
                      <input
                        ref={nameInputRef}
                        className="userInfo-inp"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!isEdit}
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
            ) : (
              <p>Loading...</p>
            )}
          </div>
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
      <div className="shop-profile">
        <div className="shop-info">
          <h1>Thông tin cơ sở kinh doanh</h1>
          <p>Tên cơ sở: Phuc Long Coffee & Tea</p>
          <p>Địa chỉ: 265/13 Bùi Thị Xuân, Đà Lạt, Lâm Đồng</p>
          <p>Email liên hệ: phuclong@gmail.com</p>
          <p>Hotline: 19000000</p>
        </div>
        <button className="btn-info btn-shopInfo">Chỉnh sửa thông tin</button>
      </div>
    </div>
  );
}

export default ProfileContainer;
