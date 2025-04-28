import userBaseRestRequest from "../config/rest";

const restRequest = userBaseRestRequest();

export const UserAPI = {
  async getAllUsers(cb) {
    await restRequest.get("/user", {}, (err, result) => {
      if (err) return cb(err);
      if (typeof cb === "function") cb(null, result);
    });
  },
  async getUserByID(id, cb) {
    await restRequest.get(`/user/${id}`, {}, (err, result) => {
      if (err) return cb(err);
      if (typeof cb === "function") cb(null, result);
    });
  },
};
