import { receiptService } from "../service/receipt.service.js";
import { STATUS_CODE } from "../utils/enum.js";

export const receiptController = {
  createReceipt: async (req, res) => {
    try {
      const response = await receiptService.createReceipt(
        req.user.id,
        req.params.id
      );
      return res.status(STATUS_CODE.CREATED).json(response);
    } catch (error) {
      return res
        .status(500)
        .json(
          MasterResponse({ errCode: ERROR_CODE.FAILED, message: error.message })
        );
    }
  },
  getReceipts: async (req, res) => {
    try {
      const response = await receiptService.getReceipts();
      return res.status(STATUS_CODE.OK).json(response);
    } catch (error) {
      return res.status(500).json(
        MasterResponse({
          errCode: ERROR_CODE.FAILED,
          message: error.message,
        })
      );
    }
  },
  getReceipt: async (req, res) => {
    try {
      const response = await receiptService.getReceipt(req.params.id);
      return res.status(STATUS_CODE.OK).json(response);
    } catch (error) {
      return res.status(500).json(
        MasterResponse({
          errCode: ERROR_CODE.FAILED,
          message: error.message,
        })
      );
    }
  },
};
