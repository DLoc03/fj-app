import userBaseRestRequest from "../config/rest";

const restRequest = userBaseRestRequest();

export const ReceiptAPI = {
  async getAllReceipt(cb) {
    await restRequest.get("/receipt", {}, (err, result) => {
      if (err) return cb(err);
      if (typeof cb === "function") cb(null, result);
    });
  },
  async getReceiptById(id, cb) {
    await restRequest.get(`/receipt/${id}`, {}, (err, result) => {
      if (err) return cb(err);
      if (typeof cb === "function") cb(null, result);
    });
  },
};
