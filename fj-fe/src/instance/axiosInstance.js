import axios from "axios";
import { client_path } from "../utils/constant";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const res = await api.patch("/auth/token");

        const newAccessToken = res.data?.result?.data;

        sessionStorage.setItem("accessToken", newAccessToken);

        const accessToken = sessionStorage.getItem("accessToken");

        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

        return api(originalRequest);
      } catch (err) {
        console.error("Refresh token failed:", err);

        sessionStorage.removeItem("accessToken");
        window.location.href = client_path.LOGIN;
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
