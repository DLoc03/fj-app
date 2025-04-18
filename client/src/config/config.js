import { SESSION_DATA } from "../common/enum/enum";

export const SERVICE_DOMAIN = import.meta.env.VITE_API_URL;
export const SERVICE_URL = `${SERVICE_DOMAIN}/api/v1`;
export const SOCKET_URL = `${SERVICE_DOMAIN}/socket`;

export const getHeaderConfig = () => {
  const accessToken = sessionStorage.getItem(SESSION_DATA.ACCESSTOKEN);

  if (accessToken) {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
  }

  return {
    "Content-Type": "application/json",
  };
};

export const SOCKET_CONFIG = {
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
};
