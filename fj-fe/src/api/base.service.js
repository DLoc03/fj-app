import axios from "axios";
import { API_URL, headersAuth } from "../authConfig/config";

export const getAccessToken = () =>
  sessionStorage.getItem("accessToken") || null;

export const getRefreshToken = async () => {
  try {
    const res = await axios.patch(`${API_URL}/auth/token`);
    sessionStorage.setItem("accessToken", res?.data?.result?.data);
    console.log("Refresh data get: ", res?.data?.result?.data);
    return res.data;
  } catch (error) {
    console.error(
      "Error when getting refresh token:",
      error.response?.data || error.message
    );
    return null;
  }
};

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
    const headers = await headersAuth();
    const res = await axios.get(`${API_URL}${path}`, { headers });
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
    const headers = useAuth
      ? await headersAuth()
      : { "Content-Type": "application/json" };
    const res = await axios.post(`${API_URL}${path}`, data, { headers });
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
    const headers = await headersAuth();
    const res = await axios.put(`${API_URL}/user/${id}`, data, { headers });
    console.log("Data updated:", res);
    return res.data;
  } catch (error) {
    console.error(
      "Error when updating data:",
      error.response?.data || error.message
    );
    return null;
  }
};
