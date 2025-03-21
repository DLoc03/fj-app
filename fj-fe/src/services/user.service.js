import { server_path } from "../utils/constant";
import { postData, getDataByToken, updateData } from "../api/base.service";

export const UserLogin = async (data) => {
  const res = await postData(server_path.LOGIN_API, data);
  localStorage.setItem("User", JSON.stringify(res.result.data.user));
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
