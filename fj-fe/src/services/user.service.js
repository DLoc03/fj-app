import axios from "axios";
import { endpoint } from "../utils/constant";

export const UserLogin = async (data) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}${endpoint.LOGIN_API}`,
      data
    );

    if (res.data.errCode === 0) {
      sessionStorage.setItem("accessToken", res.data.accessToken);
    }

    console.log("Data user login: ", res.data);
    return res;
  } catch (error) {
    console.error("Error login: ", error);
    return null;
  }
};

export const UserRegister = async (data) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}${endpoint.REGISTER_API}`,
      data
    );
    return res;
  } catch (error) {
    console.error("Error register: ", error);
    return null;
  }
};

export const GetUserInfo = async () => {
  let accessToken = sessionStorage.getItem("accessToken");

  console.log("Access Token: ", accessToken);

  if (!accessToken) {
    console.error("Access token is missing");
    return null;
  }

  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}${endpoint.USERINFO}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("User info fetching from API:", res.data.user);
    return res.data.user || null;
  } catch (error) {
    console.error(
      "Error when fetching user data:",
      error.response?.data || error.message
    );
    return null;
  }
};

export const UserUpdate = async (id, data) => {
  let accessToken = sessionStorage.getItem("accessToken");
  if (!accessToken) {
    console.error("Access token is missing! User needs to log in.");
    return;
  }

  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/user/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (res.data.errCode === 0) {
      console.log("User data updated successfully:", data);
    }

    return res;
  } catch (error) {
    console.error(
      "Error updating user:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const UserLogout = async () => {
  const accessToken = sessionStorage.getItem("accessToken");
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_API_URL}/auth/logout`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return sessionStorage.removeItem("accessToken");
  } catch (error) {
    console.error("Error logout user:", error.response?.data || error.message);
    throw error;
  }
};
