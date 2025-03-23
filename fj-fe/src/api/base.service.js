import axios from "axios";
import { API_URL, headersAuth } from "../authConfig/config";
import { ERROR_CODE } from "../utils/enum";

export const getData = async (path) => {
  try {
    const res = await axios.get(`${API_URL}${path}`);
    return res.data;
  } catch (error) {
    console.error(
      "Error when fetching data:",
      error.response?.result || error.message
    );
    return null;
  }
};

export const getDataByID = async (path, id) => {
  try {
    const res = await axios.get(`${API_URL}${path}/${id}`);
    return res.data || null;
  } catch (error) {
    console.error(
      "Error when fetching user data:",
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
    return res.data || null;
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
    if (res.data.result.errCode === ERROR_CODE.DONE) {
      sessionStorage.setItem("accessToken", res.data.result.data.accessToken);
      localStorage.setItem("User", JSON.stringify(res.data.result.data.user));
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
    console.log("Data update: ", res);
    return res.data;
  } catch (error) {
    console.error(
      "Error when updating data:",
      error.response?.result.data || error.message
    );
    return null;
  }
};
