import userBaseRestRequest from "../config/rest";

const restRequest = userBaseRestRequest();

export const QuestionAPI = {
  async getQuestion(id, cb) {
    await restRequest.get(`/question/${id}`, {}, (err, result) => {
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
