import { testService } from "../service/test.service.js";
import { STATUS_CODE } from "../utils/enum.js";
export const testController = {
  createTest: async (req, res) => {
    try {
      const response = await testService.createTest(
        req.user.id,
        req.params.id,
        req.body
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
  getTest: async (req, res) => {
    try {
      const response = await testService.getTest(req.params.id);
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
  updateTest: async (req, res) => {
    try {
      const response = await testService.updateTest(
        req.user.id,
        req.params.id,
        req.body
      );
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
  deleteTest: async (req, res) => {
    try {
      const response = await testService.deleteTest(req.user.id, req.params.id);
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
  recoveryTest: async (req, res) => {
    try {
      const response = await testService.recoveryTest(
        req.user.id,
        req.params.id
      );
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
