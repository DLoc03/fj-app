import React, { useEffect, useState, useRef } from "react";
import "./ProfileContainer.css";
import { useAuth } from "../../context/AuthContext";
import { ERROR_CODE, STATUS } from "../../utils/enum";
import { UserUpdate, UploadAvatarUser } from "../../services/user.service";

function ProfileContainer() {
  const { user, setUser, isAuthenticated } = useAuth();
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.result?.data?.email || "",
    name: user?.result?.data?.name || "",
    phone: user?.result?.data?.phone || "",
    avatar: user?.result?.data?.avatar || "",
  });
  const id = JSON.parse(localStorage.getItem("User"));

  const nameInputRef = useRef(null);

  useEffect(() => {
    if (user?.result?.data) {
      setFormData({
        email: user.result.data.email || "",
        name: user.result.data.name || "",
        phone: user.result.data.phone || "",
        avatar: user.result.data.avatar || "",
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
      const response = await UserUpdate(id, formData);
      if (
        response.status === STATUS.DONE &&
        response.result.errCode === ERROR_CODE.DONE
      ) {
        alert("Cập nhật thông tin thành công");
        setIsEdit(false);

        setUser((prevUser) => ({
          ...prevUser,
          result: { data: { ...prevUser.result.data, ...formData } },
        }));
      }
    } catch (error) {
      console.error("Cập nhật thất bại:", error);
    }
  }

  async function handleUploadAvatar(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await UploadAvatarUser(id, formData);
      if (response.status === STATUS.DONE) {
        alert("Cập nhật ảnh đại diện thành công!");
        setUser((prevUser) => ({
          ...prevUser,
          result: {
            data: { ...prevUser.result.data, avatar: response.data.url },
          },
        }));
      }
    } catch (error) {
      console.error("Lỗi upload ảnh:", error);
    }
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
          <div
            className="avt-profile"
            style={{
              backgroundImage: `url(${formData.avatar || ""})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <input
            type="file"
            accept="image/*"
            onChange={handleUploadAvatar}
            style={{ display: "none" }}
            id="avatarInput"
          />
          <button
            className="btn-upload"
            onClick={() => document.getElementById("avatarInput").click()}
          >
            Cập nhật ảnh đại diện cơ sở
          </button>
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
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
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
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
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
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
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
