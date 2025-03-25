import { getAccessToken } from "../api/base.service";

const API_URL = process.env.REACT_APP_API_URL;

export { API_URL };

export const headersAuth = async () => {
  let token = getAccessToken();
  return {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };
};
