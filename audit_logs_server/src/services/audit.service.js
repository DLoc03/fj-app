import AuditLog from "../models/audit.model.js";
import { ERROR_CODE, STATUS } from "../utils/enum.js";
import { MasterResponse } from "../utils/master.response.js";

export const AuditServices = {
  getAllAuditLog: async (query) => {
    const filter = {};
    if (query.userId) filter.userId = query.userId;
    if (query.action) filter.action = { $regex: query.action, $options: "i" };
    if (query.entity) filter.entity = query.entity;
    if (query.ipAddress) filter.ipAddress = query.ipAddress;
    if (query.responseStatus)
      filter.responseStatus = Number(query.responseStatus);

    const data = await AuditLog.find(filter).lean();
    if (!data || data.length === 0) {
      return MasterResponse({
        status: STATUS.NOT_FOUND,
        errCode: ERROR_CODE.BAD_REQUEST,
        message: "No audit logs found",
      });
    }
    return MasterResponse({ data });
  },
  countAuditLog: async () => {
    const count = await AuditLog.countDocuments();
    if (!count) {
      return MasterResponse({
        status: STATUS.NOT_FOUND,
        errCode: ERROR_CODE.BAD_REQUEST,
        message: "Can't get audit log",
      });
    }
    return MasterResponse({ data: count });
  },
};
