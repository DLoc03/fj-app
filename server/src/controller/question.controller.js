import { questionService } from "../service/question.service.js"
import { MasterResponse } from "../response/master.response.js";
import { STATUS, ERROR_CODE } from "../utils/enum.js";
const postQuestion = async (req, res) => {
    const { question } = req.body
    try {
        const response = await questionService.createQuestion(req.user?.id, req.params.id, question)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json(MasterResponse({ errCode: ERROR_CODE.FAILED, message: error.message }));
    }
}
const getQuestWithJob = async (req, res) => {
    try {
        const response = await questionService.getQuestWithJob(req.params.id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json(MasterResponse({ errCode: ERROR_CODE.FAILED, message: error.message }));
    }
}
export const questionController = {
    postQuestion,
    getQuestWithJob
}