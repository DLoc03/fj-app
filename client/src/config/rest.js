import { HTTP_METHOD, SESSION_DATA } from "../common/enum/enum";
import { SERVICE_URL, getHeaderConfig } from "./config";

const userBaseRestRequest = () => {
  const baseURL = SERVICE_URL;

  const refreshToken = async () => {
    const res = await fetch(`${SERVICE_URL}/auth/token`, {
      method: "PATCH",
      credentials: "include",
    });

    const data = await res.json();
    if (res.status === 200 && data?.result) {
      const newAccessToken = data.result.data;
      sessionStorage.setItem(SESSION_DATA.ACCESSTOKEN, newAccessToken);
      return newAccessToken;
    }

    throw new Error("Failed to refresh token");
  };

  const fetchAsync = async (url, config, cb) => {
    try {
      const response = await fetch(url, config);
      const result = await response.json();

      if (response.status === 200 || response.status === 201) {
        cb(null, result.result);
        return;
      }

      if (response.status === 401 || response.status === 403) {
        const newAccessToken = await refreshToken();

        const retryConfig = {
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${newAccessToken}`,
          },
        };

        const retryResponse = await fetch(url, retryConfig);
        const retryResult = await retryResponse.json();
        if (retryResponse.status === 200 || retryResponse.status === 201) {
          cb(null, retryResult.result);
        } else {
          cb(retryResult);
        }
      } else {
        cb(result);
      }
    } catch (error) {
      cb(error);
    }
  };
  const sendRequest = async (
    method,
    endpoint,
    data,
    cb,
    isFormData = false
  ) => {
    const config = {
      method,
      headers: getHeaderConfig(isFormData),
      credentials: "include",
    };

    if (method !== HTTP_METHOD.GET && data) {
      if (data instanceof FormData) {
        config.body = data;
      } else {
        config.body = JSON.stringify(data);
      }
    }

    const url = `${baseURL}${endpoint}`;
    await fetchAsync(url, config, cb);
  };

  const get = (endpoint, data, cb) =>
    sendRequest(HTTP_METHOD.GET, endpoint, data, cb);
  const post = (endpoint, data, cb) =>
    sendRequest(HTTP_METHOD.POST, endpoint, data, cb);
  const put = (endpoint, data, cb) =>
    sendRequest(HTTP_METHOD.PUT, endpoint, data, cb);
  const del = (endpoint, data, cb) =>
    sendRequest(HTTP_METHOD.DELETE, endpoint, data, cb);
  const postFormData = (endpoint, data, cb) =>
    sendRequest(HTTP_METHOD.POST, endpoint, data, cb, true);

  return {
    get,
    post,
    put,
    delete: del,
    postFormData,
  };
};

export default userBaseRestRequest;
