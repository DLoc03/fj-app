import { SESSION_DATA } from "../common/enum/enum";
import userBaseRestRequest from "../config/rest";

const restRequest = userBaseRestRequest();

export const ApplicantAPI = {
  async getApplicantList(cb) {
    await restRequest.get("/applicant", {}, (err, result) => {
      if (err) return cb(err);
      if (typeof cb === "function") cb(null, result);
    });
  },

  async getApplicantId(id, cb) {
    await restRequest.get(`applicant/${id}`, {}, (err, result) => {
      if (err) return cb(err);
      if (typeof cb === "function") cb(null, result);
    });
  },
};
