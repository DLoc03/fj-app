const API_URL = process.env.REACT_APP_API_URL;

export { API_URL };

export const getAccessToken = () =>
  sessionStorage.getItem("accessToken") || null;

export const headersAuth = () => {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};
