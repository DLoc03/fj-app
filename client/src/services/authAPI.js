import userBaseRestRequest from "../config/rest";

const restRequest = userBaseRestRequest();

export const LoginAPI = {
  async login(data, cb) {
    await restRequest.post("auth/login", data, (err, result) => {
      if (err) return cb(err);
      if (result?.accessToken) {
        sessionStorage.setItem("accessToken", result.accessToken);
      }
      if (typeof cb === "function") cb(null, result);
    });
  },

  async register(data, cb) {
    await restRequest.post("auth/register", data, (err, result) => {
      if (err) return cb(err);
      if (typeof cb === "function") cb(null, result);
    });
  },

  async getCurrentUser(cb) {
    await restRequest.get("auth/me", {}, (err, result) => {
      if (err) return cb(err);
      if (typeof cb === "function") cb(null, result);
    });
  },
  async logout(cb) {
    await restRequest.get("auth/logout", {}, () => {
      sessionStorage.removeItem("accessToken");
      if (typeof cb === "function") cb();
    });
  },
};
