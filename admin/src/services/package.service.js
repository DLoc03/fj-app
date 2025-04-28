import userBaseRestRequest from "../config/rest";

const restRequest = userBaseRestRequest();

export const PackageAPI = {
  async getAllPackage(cb) {
    await restRequest.get("/package", {}, (err, result) => {
      if (err) return cb(err);
      if (typeof cb === "function") cb(null, result);
    });
  },
  async getPackageByID(id, cb) {
    await restRequest.get(`/package/${id}`, {}, (err, result) => {
      if (err) return cb(err);
      if (typeof cb === "function") cb(null, result);
    });
  },
  async postPackage(data, cb) {
    await restRequest.post(`/package`, data, (err, result) => {
      if (err) return cb(err);
      if (typeof cb === "function") cb(null, result);
    });
  },
  async updatePackage(id, data, cb) {
    await restRequest.put(`/package/${id}`, data, (err, result) => {
      if (err) return cb(err);
      if (typeof cb === "function") cb(null, result);
    });
  },
};
