import { SESSION_DATA } from "../common/enum/enum";

export const SERVICE_DOMAIN = import.meta.env.VITE_API_URL;
export const SERVICE_URL = `${SERVICE_DOMAIN}/api/v1`;
export const SOCKET_URL = `${SERVICE_DOMAIN}/socket`;

export const getHeaderConfig = (isFormData = false) => {
  const accessToken = sessionStorage.getItem(SESSION_DATA.ACCESSTOKEN);

  const headers = {};

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
};

export const SOCKET_CONFIG = {
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
};
