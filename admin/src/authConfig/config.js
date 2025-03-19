const API_URL = process.env.REACT_APP_API_URL;

export { API_URL };

export const getAccessToken = () => {
  return sessionStorage.getItem("adminToken") || null;
};

export const headersAuth = () => {
  const token = getAccessToken();
  return token
    ? {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    : {
        "Content-Type": "application/json",
      };
};
