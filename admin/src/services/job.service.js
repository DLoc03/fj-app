import userBaseRestRequest from "../config/rest";

const restRequest = userBaseRestRequest();

export const JobAPI = {
  async getAllJob(cb) {
    await restRequest.get("/job", {}, (err, result) => {
      if (err) return cb(err);
      if (typeof cb === "function") cb(null, result);
    });
  },
  async getJobByID(id, cb) {
    await restRequest.get(`/job/${id}`, {}, (err, result) => {
      if (err) return cb(err);
      if (typeof cb === "function") cb(null, result);
    });
  },
};
