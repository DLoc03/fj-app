import userBaseRestRequest from "../config/rest";

const restRequest = userBaseRestRequest();

export const ApplicantAPI = {
  postApplicant(id, data, cb) {
    restRequest.post(`/applicant/${id}`, data, (err, result) => {
      if (err) return cb(err);
      if (typeof cb === "function") cb(null, result);
    });
  },

  async getApplicant(id, cb) {
    await restRequest.get(`/applicant/${id}`, {}, (err, result) => {
      if (err) return cb(err);
      if (typeof cb === "function") cb(null, result);
    });
  },
};
