import userBaseRestRequest from "../config/rest";

const restRequest = userBaseRestRequest();

export const CompanyAPI = {
  async getAllCompany(cb) {
    await restRequest.get("/company", {}, (err, result) => {
      if (err) return cb(err);
      if (typeof cb === "function") cb(null, result);
    });
  },
  async getCompanyByID(id, cb) {
    await restRequest.get(`/company/${id}`, {}, (err, result) => {
      if (err) return cb(err);
      if (typeof cb === "function") cb(null, result);
    });
  },
};
