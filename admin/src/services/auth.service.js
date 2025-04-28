import { SESSION_DATA } from "../common/enum/enum";
import userBaseRestRequest from "../config/rest";

const restRequest = userBaseRestRequest();

export const AuthAPI = {
  async login(data, cb) {
    await restRequest.post("/auth/login", data, (err, result) => {
      if (err) return cb(err);
      if (result?.data?.accessToken) {
        sessionStorage.setItem(
          SESSION_DATA.ADMINTOKEN,
          result?.data?.accessToken
        );
        sessionStorage.setItem(SESSION_DATA.ADMINID, result?.data?.user.id);
      }
      if (typeof cb === "function") cb(null, result);
    });
  },
  async getCurrentUser(cb) {
    await restRequest.get("/auth/me?site=detail", {}, (err, result) => {
      if (err) return cb(err);
      if (typeof cb === "function") cb(null, result);
    });
  },
  async logout(cb) {
    await restRequest.get("/auth/logout", {}, () => {
      sessionStorage.removeItem(SESSION_DATA.ADMINTOKEN);
      if (typeof cb === "function") cb();
    });
  },
};
