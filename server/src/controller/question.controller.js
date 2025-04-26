import { questionService } from "../service/question.service.js";
import { MasterResponse } from "../response/master.response.js";
import { STATUS, ERROR_CODE, STATUS_CODE } from "../utils/enum.js";
const postQuestion = async (req, res) => {
  try {
    const response = await questionService.createQuestion(
      req.user?.id,
      req.params?.id,
      req.body?.question
    );
    return res.status(STATUS_CODE.CREATED).json(response);
  } catch (error) {
    return res
      .status(500)
      .json(
        MasterResponse({ errCode: ERROR_CODE.FAILED, message: error.message })
      );
  }
};

export const questionController = {
  postQuestion,
};
