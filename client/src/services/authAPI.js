import { SESSION_DATA } from "../common/enum/enum";
import userBaseRestRequest from "../config/rest";

const restRequest = userBaseRestRequest();

export const AuthAPI = {
  async login(data, cb) {
    await restRequest.post("/auth/login", data, (err, result) => {
      if (err) return cb(err);
      if (result?.data?.accessToken) {
        sessionStorage.setItem(
          SESSION_DATA.ACCESSTOKEN,
          result?.data?.accessToken
        );
        sessionStorage.setItem(SESSION_DATA.USERID, result?.data?.user.id);
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
    await restRequest.get("/auth/me?site=detail", {}, (err, result) => {
      if (err) return cb(err);
      if (typeof cb === "function") cb(null, result);
    });
  },

  async getCurrentCompany(cb) {
    await restRequest.get("/auth/me?site=company", {}, (err, result) => {
      if (err) return cb(err);
      if (typeof cb === "function") cb(null, result);
    });
  },

  async getAllJobs(cb) {
    await restRequest.get(`/auth/me?site=job`, {}, (err, result) => {
      if (err) return cb(err);
      if (typeof cb === "function") cb(null, result);
    });
  },

  async getCurrentJobList(page = 1, cb) {
    await restRequest.get(
      `/auth/me?site=job&page=${page}`,
      {},
      (err, result) => {
        if (err) return cb(err);
        if (typeof cb === "function") cb(null, result);
      }
    );
  },

  async updateUser(id, data, cb) {
    await restRequest.put(`/user/avatar`, data, (err, result) => {
      if (err) return cb(err);
      if (typeof cb === "function") cb(null, result);
    });
  },

  async logout(cb) {
    await restRequest.get("/auth/logout", {}, () => {
      sessionStorage.removeItem(SESSION_DATA.ACCESSTOKEN);
      if (typeof cb === "function") cb();
    });
  },

  async getCompany(cb) {
    await restRequest.get("/user/company", {}, (err, result) => {
      if (err) return cb(err);
      if (typeof cb === "function") cb(null, result);
    });
  },

  async uploadAvatar(data, cb) {
    await restRequest.postFormData(`/user/avatar`, data, (err, result) => {
      if (err) return cb(err);
      if (typeof cb === "function") cb(null, result);
    });
  },
};
