import userBaseRestRequest from "../config/rest";

const restRequest = userBaseRestRequest();

export const CompaniesAPI = {
  async getAllCopmanies(cb) {
    await restRequest.get("/comp", {}, (err, result) => {
      if (err) return cb(err);
      if (typeof cb === "function") cb(null, result);
    });
  },

  async getCompanyById(compId, cb) {
    await restRequest.get(`/comp/${compId}`, {}, (err, result) => {
      if (err) return cb(err);
      if (typeof cb === "function") cb(null, result);
    });
  },

  async postCompany(data, cb) {
    await restRequest.post("/company", data, (err, result) => {
      if (err) return cb(err);
      if (typeof cb === "function") cb(null, result);
    });
  },

  async postCompanyAvatar(data, cb) {
    await restRequest.postFormData("/company/avatar", data, (err, result) => {
      if (err) return cb(err);
      if (typeof cb === "function") cb(null, result);
    });
  },
};
