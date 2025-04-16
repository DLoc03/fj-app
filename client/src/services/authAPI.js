import userBaseRestRequest from "../config/rest";

const restRequest = userBaseRestRequest();

export const AuthAPI = {
  async login(data, cb) {
    await restRequest.post("/auth/login", data, (err, result) => {
      if (err) return cb(err);
      if (result?.data?.accessToken) {
        sessionStorage.setItem("accessToken", result?.data?.accessToken);
        sessionStorage.setItem("UserId", result?.data?.user.id);
      }
      if (typeof cb === "function") cb(null, result);
    });
  },

  async register(data, cb) {
    await restRequest.post("/auth/register", data, (err, result) => {
      if (err) return cb(err);
      if (typeof cb === "function") cb(null, result);
    });
  },

  async getCurrentUser(cb) {
    await restRequest.get("/auth/me", {}, (err, result) => {
      if (err) return cb(err);
      if (typeof cb === "function") cb(null, result);
    });
  },

  async updateUser(id, data, cb) {
    await restRequest.put(`/user/${id}`, data, (err, result) => {
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

  async getCompany(cb) {
    await restRequest.get("user/company", {}, (err, result) => {
      if (err) return cb(err);
      if (typeof cb === "function") cb(null, result);
    });
  },
};
