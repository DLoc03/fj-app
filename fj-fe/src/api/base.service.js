import axios from "axios";
import { API_URL, headersAuth } from "../authConfig/config";

export const getData = async (path) => {
  try {
    const res = await axios.get(`${API_URL}${path}`);
    return res.data;
  } catch (error) {
    console.error(
      "Error when fetching data:",
      error.response?.data || error.message
    );
    return null;
  }
};

export const getDataByToken = async (path) => {
  try {
    const res = await axios.get(`${API_URL}${path}`, {
      headers: headersAuth(),
    });
    return res.data.user || null;
  } catch (error) {
    console.error(
      "Error when fetching user data:",
      error.response?.data || error.message
    );
    return null;
  }
};

export const postData = async (path, data, useAuth = false) => {
  try {
    const res = await axios.post(`${API_URL}${path}`, data, {
      headers: headersAuth(),
    });
    console.log("Res data: ", res.data);
    if (res.data.errCode === 0) {
      sessionStorage.setItem("accessToken", res.data.accessToken);
    }
    return res.data;
  } catch (error) {
    console.error(
      "Error when posting data:",
      error.response?.data || error.message
    );
    return null;
  }
};

export const updateData = async (id, data) => {
  try {
    const res = await axios.put(`${API_URL}/user/${id}`, data, {
      headers: headersAuth(),
    });
    return res.data;
  } catch (error) {
    console.error(
      "Error when updating data:",
      error.response?.data || error.message
    );
    return null;
  }
};
