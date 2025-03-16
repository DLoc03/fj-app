import React from "react";
import "./ProfileContainer.css";

function ProfileContainer() {
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
            <p>Họ và tên: Nguyễn Phúc Long</p>
            <p>Email: phuclong@gmail.com</p>
            <p>Số điện thoại: 0999999999</p>
          </div>
          <button className="btn-info btn-userInfo">Chỉnh sửa thông tin</button>
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
