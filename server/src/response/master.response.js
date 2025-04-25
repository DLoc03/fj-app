import { ERROR_CODE, STATUS } from "../utils/enum.js";

export const MasterResponse = ({
  status = STATUS.DONE,
  errCode = ERROR_CODE.DONE,
  message = "OK",
  data = null,
}) => ({
  status,
  result: {
    errCode,
    message,
    data,
  },
});
