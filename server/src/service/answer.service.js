import Answer from "../model/answer.js";
import Applicant from "../model/applicant.js";
import Question from "../model/question.js";
import Test from "../model/test.js";
import { MasterResponse } from "../response/master.response.js";
import { ERROR_CODE, STATUS } from "../utils/enum.js";

const postAnswer = async (applicantId, data) => {
  const applicant = await Applicant.findById(applicantId).lean();
  if (!applicant) {
    return MasterResponse({
      status: STATUS.FAILED,
      message: "Applicant not found",
      errCode: ERROR_CODE.NOT_FOUND,
    });
  }

  const test = await Test.findOne({
    jobId: applicant.jobId,
    isDestroy: false,
  }).lean();

  const questions = await Question.find({
    testId: test._id,
    isDestroy: false,
  }).lean();
  if (questions.length === 0) {
    return MasterResponse({
      status: STATUS.FAILED,
      message: "Questions not found",
      errCode: ERROR_CODE.NOT_FOUND,
    });
  }
  const answers = await Answer.find({
    applicantId: applicant._id,
    questionId: questions.find((q) => q._id),
  });

  if (answers.length === 0) {
    const saveAnswer = await Answer.insertMany(
      data.map((item) => ({
        applicantId: applicantId,
        questionId: questions.find(
          (q) => q._id.toString() === item.questionId.toString()
        ),
        answer: item.answer,
      }))
    );
    return MasterResponse({
      status: STATUS.SUCCESS,
      message: "Answers submitted successfully",
      data: saveAnswer,
    });
  }
  return MasterResponse({
    status: STATUS.FAILED,
    message: "Applicant was approved",
    errCode: ERROR_CODE.FAILED,
  });
};

export const answerService = {
  postAnswer,
};
