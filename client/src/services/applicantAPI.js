import userBaseRestRequest from "../config/rest";

const restRequest = userBaseRestRequest();

export const ApplicantAPI = {
  async postApplicant(id, data, cb) {
    await restRequest.post(`/applicant/${id}`, data, (err, result) => {
      if (err) return cb(err);
      if (typeof cb === "function") cb(null, result);
    });
  },

  async getApplicant(id, data, cb) {
    await restRequest.get(`/applicant/${id}`, data, (err, result) => {
      if (err) return cb(err);
      if (typeof cb === "function") cb(null, result);
    });
  },
};
