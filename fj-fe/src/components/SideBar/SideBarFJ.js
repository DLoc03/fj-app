import React from "react";
import Logo from "../../assets/Logo FJ.png";
import { NavLink } from "react-router-dom";
import { client_path } from "../../utils/constant";
import "./SideBarFJ.css";

function SideBarFJ() {
  return (
    <div className="sideBar-Container">
      <div className="logo-sidebar">
        <img src={Logo} alt="Logo FJ" />
      </div>
      <div className="sidebar-item">
        <NavLink to={client_path.ACCOUNT}>Hồ sơ cá nhân</NavLink>
        <NavLink to={client_path.CANDIDATE}>Thông tin cơ sở</NavLink>
        <NavLink to={client_path.CVMANAGE}>Quản lý CV</NavLink>
        <NavLink to={client_path.RECRUITMENT}>Tuyển dụng nhân sự</NavLink>
      </div>
    </div>
  );
}

export default SideBarFJ;
