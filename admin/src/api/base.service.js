import api from "../instance/axiosInstance";
import { headersAuth } from "../authConfig/config";

export const getData = async (path) => {
  try {
    const res = await api.get(`${path}`);
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
  const headers = await headersAuth();
  try {
    let adminToken = sessionStorage.getItem("adminToken");

    if (!adminToken) {
      await api
        .patch("/auth/token")
        .then((res) => {
          adminToken = res.data?.result?.data;
          sessionStorage.setItem("adminToken", adminToken);
        })
        .catch((error) => {
          console.error(
            "Error refreshing token:",
            error.response?.data || error.message
          );
          return null;
        });
    }
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

export const deleteDataById = async (path, id) => {
  try {
    const res = await api(`${path}/${id}`, {
      headers: headersAuth(),
    });
    return res.data;
  } catch (error) {
    console.error(
      "Error when deleting data:",
      error.response?.result.data || error.message
    );
    return null;
  }
};
