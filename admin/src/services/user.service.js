import { server_path } from "../api/path.service";
import {
  getData,
  postData,
  getDataByToken,
  getDataByID,
  updateData,
  deleteDataById,
  logout,
} from "../api/base.service";

export const GetUsers = async () => {
  return await getData(server_path.GETUSERS);
};

export const UserLogin = async (data) => {
  const res = await postData(server_path.LOGIN_API, data);
  if (res.user && res.user.role !== "admin") {
    return "block";
  }
  return res;
};

export const GetUserInfo = async () => {
  return await getDataByToken(server_path.USERINFO);
};

export const GetUserByID = async (id) => {
  return await getDataByID(server_path.GETUSERS, id);
};

export const UserUpdate = async (id, data) => {
  return await updateData(id, data);
};

export const UserDelete = async (id) => {
  return await deleteDataById(server_path.GETUSERS, id);
};

export const UserLogout = async () => {
  return await logout();
};
