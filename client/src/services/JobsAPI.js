import userBaseRestRequest from "../config/rest";

const restRequest = userBaseRestRequest();

export const JobsAPI = {
  async getJobs(page, cb) {
    restRequest.get(`/job?page=${page}`, {}, (err, result) => {
      if (err) return cb(err);
      if (typeof cb === "function") cb(null, result);
    });
  },
  async getJobById(jobId, cb) {
    await restRequest.get(`/job/${jobId}`, {}, (err, result) => {
      if (err) return cb(err);
      if (typeof cb === "function") cb(null, result);
    });
  },
  async postJob(data, cb) {
    await restRequest.post("/job", data, (err, result) => {
      if (err) return cb(err);
      if (typeof cb === "function") cb(null, result);
    });
  },
};
