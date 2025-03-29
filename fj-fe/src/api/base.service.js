import api from "../instance/axiosInstance";
import { API_URL, headersAuth } from "../authConfig/config";

export const getData = async (path) => {
  try {
    const res = await api.get(`${API_URL}${path}`);
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
    const res = await api.get(`${path}/${id}`);
    return res.data || null;
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
    let accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
      await api
        .patch("/auth/token")
        .then((res) => {
          accessToken = res.data?.result?.data;
          sessionStorage.setItem("accessToken", accessToken);
        })
        .catch((error) => {
          console.error(
            "Error refreshing token:",
            error.response?.data || error.message
          );
          return null;
        });
    }

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
    const res = await api.get(`${path}`, { headers });
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
      ? headersAuth()
      : { "Content-Type": "application/json" };
    const res = await api.post(`${path}`, data, { headers });
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
    const headers = headersAuth();
    const res = await api.put(`/user/${id}`, data, { headers });
    return res.data;
  } catch (error) {
    console.error(
      "Error when updating data:",
      error.response?.data || error.message
    );
    return null;
  }
};

export const logout = async () => {
  try {
    const headers = headersAuth();
    const res = await api.delete(`auth/logout`, { headers });
    return res.data;
  } catch (error) {
    console.error(
      "Error when updating data:",
      error.response?.data || error.message
    );
    return null;
  }
};

export const uploadImage = async (id, data) => {
  try {
    const headers = headersAuth();
    const res = await api.post(`user/${id}/avatar`, data, { headers });
    return res.data;
  } catch (error) {
    console.error(
      "Error when updating data:",
      error.response?.data || error.message
    );
    return null;
  }
};
