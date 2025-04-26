import userBaseRestRequest from "../config/rest";

const restRequest = userBaseRestRequest();

export const AnswerAPI = {
  async postAnswer(id, data, cb) {
    console.log("data receive: ", data);
    await restRequest.post(`/answer/${id}`, data, (err, result) => {
      if (err) return cb(err);
      if (typeof cb === "function") cb(null, result);
    });
  },
};
