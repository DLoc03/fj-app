import axios from "axios";
import { server_path } from "../utils/constant";
import { postData, getDataByToken, updateData } from "../api/base.service";

export const UserLogin = async (data) => {
  return await postData(server_path.LOGIN_API, data);
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

// export const UserLogout = async () => {
//   const accessToken = sessionStorage.getItem("accessToken");
//   try {
//     const res = await axios.delete(
//       `${process.env.REACT_APP_API_URL}/auth/logout`,
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     return sessionStorage.removeItem("accessToken");
//   } catch (error) {
//     console.error("Error logout user:", error.response?.data || error.message);
//     throw error;
//   }
// };
