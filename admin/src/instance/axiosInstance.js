import axios from "axios";

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

        sessionStorage.setItem("adminToken", newAccessToken);

        const adminToken = sessionStorage.getItem("adminToken");

        originalRequest.headers["Authorization"] = `Bearer ${adminToken}`;

        return api(originalRequest);
      } catch (err) {
        console.error("Refresh token failed:", err);

        sessionStorage.removeItem("adminToken");
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
