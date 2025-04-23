import { applicantService } from "../service/applicant.service.js";
import { MasterResponse } from "../response/master.response.js";
import { STATUS, ERROR_CODE, STATUS_CODE } from "../utils/enum.js";

const postApplicant = async (req, res) => {
  try {
    const result = await applicantService.postApplicant(
      req.params.id,
      req.body
    );
    return res.status(STATUS_CODE.CREATED).json(result);
  } catch (error) {
    return res.status(500).json(
      MasterResponse({
        status: STATUS.FAILED,
        errCode: ERROR_CODE.FAILED,
        message: error.message,
      })
    );
  }
};

const getApplicantWithResult = async (req, res) => {
  try {
    const result = await applicantService.getApplicantWithResult(req?.user.id, req.params.id);
    return res.status(STATUS_CODE.OK).json(result);
  } catch (error) {
    return res.status(500).json(
      MasterResponse({
        status: STATUS.FAILED,
        errCode: ERROR_CODE.FAILED,
        message: error.message,
      })
    );
  }
};
export const applicantController = {
  postApplicant,
  getApplicantWithResult,
};
