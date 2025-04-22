import userBaseRestRequest from "../config/rest";

const restRequest = userBaseRestRequest();

export const AnswerAPI = {
  async postAnswer(id, email, data, cb) {
    await restRequest.post(`/answer/${id}`, { email, data }, (err, result) => {
      if (err) return cb(err);
      if (typeof cb === "function") cb(null, result);
    });
  },
};
