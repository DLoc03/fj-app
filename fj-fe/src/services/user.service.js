import { server_path } from "../utils/constant";
import {
  postData,
  getDataByToken,
  updateData,
  logout,
  getDataByID,
  uploadImage,
} from "../api/base.service";

export const UserLogin = async (data) => {
  const res = await postData(server_path.LOGIN_API, data);
  return res;
};

export const UserRegister = async (data) => {
  return await postData(server_path.REGISTER_API, data);
};

export const GetUserInfo = async () => {
  return await getDataByToken(server_path.USERINFO);
};

export const UserUpdate = async (id, data) => {
  return await updateData(id, data);
};

export const UserLogout = async () => {
  return await logout();
};

export const GetCompanyByUser = async () => {
  return getDataByToken(server_path.USER_COMPANY);
};

export const UploadAvatarUser = async (id, data) => {
  return uploadImage(id, data);
};
