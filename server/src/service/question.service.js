import Company from "../model/company.js";
import Job from "../model/job.js";
import Question from "../model/question.js";
import { MasterResponse } from "../response/master.response.js";
import { JobResponse } from "../response/job.response.js";
import { ERROR_CODE, STATUS } from "../utils/enum.js";
import { QuestionResponse } from "../response/question.response.js";
const createQuestion = async (userId, jobId, question) => {
  const company = await Company.findOne({ recruiterId: userId }).lean();
  if (!company)
    return MasterResponse({
      status: STATUS.NOT_FOUND,
      message: "Company not found",
      errCode: ERROR_CODE.BAD_REQUEST,
    });
  const job = await Job.findOne({ companyId: company._id, _id: jobId }).lean();
  if (!job)
    return MasterResponse({
      status: STATUS.NOT_FOUND,
      message: "Job not found",
      errCode: ERROR_CODE.BAD_REQUEST,
    });

  const newQuestion = new Question({
    jobId: job._id,
    question: question,
  });
  await newQuestion.save();
  return MasterResponse({
    status: STATUS.CREATED,
    message: "Question was created",
    data: newQuestion,
  });
};

const getQuestWithJob = async (id) => {
  const existedJob = await Job.findOne({ _id: id }).lean();
  if (!existedJob)
    return MasterResponse({
      status: STATUS.NOT_FOUND,
      message: "Job not found",
      errCode: ERROR_CODE.BAD_REQUEST,
    });

  const validJob = JobResponse.Jobs(existedJob);
  const questions = await Question.find({ jobId: validJob.id }).lean();
  const validQuestion = questions.map((q) => QuestionResponse.Create(q));
  const result = validQuestion.map(({ jobId, ...data }) => ({
    ...data,
    // job: validJob
  }));
  return MasterResponse({ data: result });
};
export const questionService = {
  createQuestion,
  getQuestWithJob,
};
