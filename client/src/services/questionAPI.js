import userBaseRestRequest from "../config/rest";

const restRequest = userBaseRestRequest();

export const QuestionAPI = {
  async getTest(id, cb) {
    await restRequest.get(`/test/${id}`, {}, (err, result) => {
      if (err) return cb(err);
      if (typeof cb === "function") cb(null, result);
    });
  },
  async postTest(id, data, cb) {
    await restRequest.post(`/test/${id}`, data, (err, result) => {
      if (err) return cb(err);
      if (typeof cb === "function") cb(null, result);
    });
  },
  async postQuestion(id, data, cb) {
    await restRequest.post(`/question/${id}`, data, (err, result) => {
      if (err) return cb(err);
      if (typeof cb === "function") cb(null, result);
    });
  },
};
