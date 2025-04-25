import { AuditServices } from "../services/audit.service.js";
import { ERROR_CODE } from "../utils/enum.js";

export const AuditController = {
  getAllAuditLog: async (req, res) => {
    try {
      const respone = await AuditServices.getAllAuditLog(req.query);
      return res.status(200).json(respone);
    } catch (error) {
      return res
        .status(500)
        .json(
          MasterResponse({ errCode: ERROR_CODE.FAILED, message: error.message })
        );
    }
  },
  countAuditLogs: async (req, res) => {
    try {
      const respone = await AuditServices.countAuditLog();
      return res.status(200).json(respone);
    } catch (error) {
      return res
        .status(500)
        .json(
          MasterResponse({ errCode: ERROR_CODE.FAILED, message: error.message })
        );
    }
  },
};
