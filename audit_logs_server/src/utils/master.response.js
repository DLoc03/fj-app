import { ERROR_CODE, STATUS } from "../utils/enum.js"

export const MasterResponse = (result) => {
    const { status = STATUS.DONE, errCode = ERROR_CODE.DONE, message = 'OK', data = null } = result
    return {
        status,
        result: {
            errCode,
            message,
            data
        }
    }
}