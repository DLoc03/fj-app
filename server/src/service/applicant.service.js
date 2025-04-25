import Applicant from "../model/applicant.js";
import Job from "../model/job.js";
import Question from "../model/question.js";
import { MasterResponse } from "../response/master.response.js";
import { ERROR_CODE, STATUS } from "../utils/enum.js";
import Answer from "../model/answer.js";
import Company from "../model/company.js";
import { ApplicantResponse } from "../response/applicant.response.js";
const postApplicant = async (jobId, data) => {
  const { email, name, phone, cv } = data;

  const existingApplicant = await Applicant.findOne({
    email: email,
    jobId: jobId,
  }).lean();
  if (existingApplicant)
    return MasterResponse({
      status: STATUS.FAILED,
      message: `Your email: ${existingApplicant.email} is already for job`,
      errCode: ERROR_CODE.BAD_REQUEST,
    });

  const newApplicant = new Applicant({
    email,
    name,
    phone,
    cv,
    jobId: jobId,
  });
  await newApplicant.save();
  return MasterResponse({
    status: STATUS.CREATED,
    message: "Created new Applicant",
    data: ApplicantResponse.ApplicantCreate(newApplicant),
  });
};

const getApplicanDetail = async (userId, applicantId) => {
  const company = await Company.findOne({ recruiterId: userId }).lean();

  if (!company)
    return MasterResponse({
      status: STATUS.NOT_FOUND,
      message: "Company not found",
      errCode: ERROR_CODE.BAD_REQUEST,
    });

  const applicant = await Applicant.findById(applicantId).lean();

  if (!applicant)
    return MasterResponse({
      status: STATUS.NOT_FOUND,
      message: "Applicant not found",
      errCode: ERROR_CODE.BAD_REQUEST,
    });

  const job = await Job.findOne({
    companyId: company._id,
    _id: applicant.jobId,
  }).lean();

  if (!job)
    return MasterResponse({
      status: STATUS.NOT_FOUND,
      message: "Job not found",
      errCode: ERROR_CODE.BAD_REQUEST,
    });

  const questions = await Question.find({ jobId: job._id }).lean();

  const answers = await Answer.find({ applicantId: applicant._id }).lean();

  const validApplicant = ApplicantResponse.Create(applicant);

  const exam = questions.map((q) => ({
    question: q.question,
    answer: answers.reduce((acc, item) => {
      if (q._id.toString() === item.questionId.toString()) {
        return item.answer;
      }
      return acc;
    }, null),
  }));
  return MasterResponse({
    data: {
      ...validApplicant,
      exam,
    },
  });
};

const getApplicants = async (userId, page = 1) => {
  const limit = 10;
  const skip = (page - 1) * limit;
  const company = await Company.findOne({
    recruiterId: userId,
    isDestroy: false,
  }).lean();
  if (!company || company.isDestroy === true) {
    return MasterResponse({
      status: STATUS.NOT_FOUND,
      errCode: ERROR_CODE.BAD_REQUEST,
      message: "Company not found",
    });
  }
  const jobs = await Job.find({ companyId: company._id, isDestroy: false })
    .select("_id")
    .lean();
  const jobIds = jobs.map((j) => j._id);
  const total = await Applicant.countDocuments({
    isDestroy: false,
    jobId: { $in: jobIds },
  });

  const applicants = await Applicant.find({
    isDestroy: false,
    jobId: { $in: jobIds },
  })
    .skip(skip)
    .limit(limit)
    .lean();
  const pagedApplicant = applicants.map((a) => ApplicantResponse.Create(a));
  return MasterResponse({
    data: {
      pagedApplicant,
      currentPage: page,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
};

export const applicantService = {
  postApplicant,
  getApplicanDetail,
  getApplicants,
};
