import Company from "../model/company.js";
import Job from "../model/job.js";
import Question from "../model/question.js";
import { MasterResponse } from "../response/master.response.js";
import { JobResponse } from "../response/job.response.js";
import { ERROR_CODE, STATUS } from "../utils/enum.js";
import { QuestionResponse } from "../response/question.response.js";
import Test from "../model/test.js";
const createQuestion = async (userId, testId, question) => {
  const company = await Company.findOne({
    recruiterId: userId,
    isDestroy: false,
  }).lean();

  const job = await Job.findOne({
    companyId: company._id,
    isDestroy: false,
  }).lean();

  const test = await Test.findOne({
    _id: testId,
    jobId: job._id,
    isDestroy: false,
  }).lean();

  if (test) {
    const newQuestion = new Question({
      testId: test._id,
      question: question,
    });
    await newQuestion.save();
    return MasterResponse({
      status: STATUS.CREATED,
      message: "Question was created",
      data: QuestionResponse.Create(newQuestion),
    });
  }
  return MasterResponse({
    status: STATUS.NOT_FOUND,
    message: "Test not found",
    errCode: ERROR_CODE.BAD_REQUEST,
  });
};

export const questionService = {
  createQuestion,
};
