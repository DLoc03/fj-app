import userBaseRestRequest from "../config/rest";

const restRequest = userBaseRestRequest();

export const ReceiptAPI = {
  async postReceiptById(id, data, cb) {
    await restRequest.post(`/receipt/${id}`, {}, (err, result) => {
      if (err) return cb(err);
      if (typeof cb === "function") cb(null, result);
    });
  },
};
