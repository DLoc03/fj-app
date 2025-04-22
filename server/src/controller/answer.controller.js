import { MasterResponse } from "../response/master.response.js";
import { answerService } from "../service/answer.service.js";
import { ERROR_CODE, STATUS } from "../utils/enum.js";

const postAnswer = async (req, res) => {
  try {
    const result = await answerService.postAnswer(req.params.id, req.body);
    console.log(result);
    return res.status(200).json(result);
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

export const answerController = {
  postAnswer,
};
