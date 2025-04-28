import Package from "../model/package.js";
import Receipt from "../model/receipt.js";
import { MasterResponse } from "../response/master.response.js";
import { ReceiptResponse } from "../response/receipt.response.js";
import { ERROR_CODE, STATUS } from "../utils/enum.js";

export const receiptService = {
  createReceipt: async (userId, packageId) => {
    console.log("Package id received: ", packageId);
    const pkg = await Package.findById(packageId).select("_id price").lean();
    const newReceipt = new Receipt({
      userId: userId,
      packageId: pkg._id,
      amount: pkg.price,
    });
    await newReceipt.save();
    return MasterResponse({
      status: STATUS.CREATED,
      data: ReceiptResponse.Client(newReceipt),
    });
  },
  getReceipts: async () => {
    const receipts = await Receipt.find({ isDestroy: false }).lean();
    return MasterResponse({
      data: receipts.map((r) => ReceiptResponse.Client(r)),
    });
  },
  getReceipt: async (receiptId) => {
    const receipt = await Receipt.findById(receiptId).lean();
    if (!receipt)
      return MasterResponse({
        status: STATUS.NOT_FOUND,
        errCode: ERROR_CODE.BAD_REQUEST,
        message: "Receipt not found",
      });
    return MasterResponse({
      data: ReceiptResponse.Client(receipt),
    });
  },
};
