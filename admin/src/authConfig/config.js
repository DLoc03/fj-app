export const getAccessToken = () =>
  sessionStorage.getItem("adminToken") || null;

export const headersAuth = () => {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};
