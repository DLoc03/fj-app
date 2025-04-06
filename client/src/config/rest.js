import HTTP_METHOD from "../common/enum/httpMethodEnum";
import { SERVICE_URL, getHeaderConfig } from "./config";

const userBaseRestRequest = () => {
  const baseURL = SERVICE_URL;

  const handleResponse = async (response, originalRequest, cb) => {
    if (response && response.status === 200) {
      const data = await response.json();
      cb(null, data.result);
    } else {
      const errorResult = await response.json();

      if (errorResult.statusCode === 401 || errorResult.statusCode === 403) {
        try {
          const refreshRes = await fetch(`${SERVICE_URL}/token`, {
            method: "PATCH",
            credentials: "include",
          });

          const refreshData = await refreshRes.json();
          const newAccessToken = refreshData?.result;

          if (refreshRes.status === 200 && newAccessToken) {
            sessionStorage.setItem("accessToken", newAccessToken);

            const retryResponse = await fetch(originalRequest.url, {
              ...originalRequest.config,
              headers: getHeaderConfig(),
            });
            const retryData = await retryResponse.json();
            cb(null, retryData.result);
          } else {
            handleError(errorResult, cb);
          }
        } catch (refreshErr) {
          handleError(refreshErr, cb);
        }
      } else {
        handleError(errorResult, cb);
      }
    }
  };

  const fetchAsync = async (url, config, cb) => {
    try {
      const response = await fetch(url, config);
      await handleResponse(response, { url, config }, cb);
    } catch (error) {
      handleError(error, cb);
    }
  };

  const handleError = async (error, cb) => {
    cb(error);
  };

  const sendRequest = async (method, endpoint, data, cb) => {
    const config = {
      method,
      headers: getHeaderConfig(),
    };

    if (method !== HTTP_METHOD.GET && data) {
      config.body = JSON.stringify(data);
    }
    await fetchAsync(`${baseURL}${endpoint}`, config, cb);
  };

  const get = async (endpoint, data, cb) =>
    await sendRequest(HTTP_METHOD.GET, endpoint, data, cb);
  const post = async (endpoint, data, cb) =>
    await sendRequest(HTTP_METHOD.POST, endpoint, data, cb);
  const put = async (endpoint, data, cb) =>
    await sendRequest(HTTP_METHOD.PUT, endpoint, data, cb);
  const del = async (endpoint, data, cb) =>
    await sendRequest(HTTP_METHOD.DELETE, endpoint, data, cb);

  return {
    get,
    post,
    put,
    delete: del,
  };
};

export default userBaseRestRequest;
