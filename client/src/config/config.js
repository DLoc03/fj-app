export const SERVICE_DOMAIN = "http://localhost:8080";
export const SERVICE_URL = `${SERVICE_DOMAIN}/api/v1`;
export const SOCKET_URL = `${SERVICE_DOMAIN}/socket`;

export const getHeaderConfig = () => {
  const accessToken = sessionStorage.getItem("accessToken");
  return {
    "Content-Type": "application/json",
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  };
};

export const SOCKET_CONFIG = {
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
};
