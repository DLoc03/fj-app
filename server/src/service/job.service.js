import Applicant from "../model/applicant.js";
import Company from "../model/company.js";
import Job from "../model/job.js";
import { ApplicantResponse } from "../response/applicant.response.js";
import { CompanyResponse } from "../response/company.response.js";
import { JobResponse } from "../response/job.response.js";
import { MasterResponse } from "../response/master.response.js";
import { ERROR_CODE, STATUS } from "../utils/enum.js";

const postJob = async (userId, body) => {
  // const user = await User.findById(userId).lean()
  const company = await Company.findOne({ recruiterId: userId }).lean();
  if (!company)
    return MasterResponse({
      status: STATUS.NOT_FOUND,
      errCode: ERROR_CODE.BAD_REQUEST,
      message: "You need create company first",
    });

  if (company.status !== 'Authenticated')
    return MasterResponse({
      status: STATUS.NOT_FOUND,
      errCode: ERROR_CODE.BAD_REQUEST,
      message: "Your company still not authenticated yet",
    });
  const newJob = new Job({
    companyId: company._id,
    ...body,
  });
  await newJob.save();
  return MasterResponse({
    status: STATUS.CREATED,
    message: "You were upload new job successfully",
    data: JobResponse.Jobs(newJob),
  });
};

const getJob = async (id) => {
  const job = await Job.findOne({ _id: id }).lean();
  const validJob = JobResponse.Jobs(job);
  const total = await Applicant.countDocuments({ jobId: validJob.id })
  const { companyId, ...data } = validJob;
  const result = {
    ...data,
    total
  };
  return MasterResponse({ message: "OK", data: result });
};

const updateJobById = async (userId, jobId, body) => {
  const company = await Company.findOne({ recruiterId: userId }).lean();
  if (!company)
    return MasterResponse({
      status: STATUS.NOT_FOUND,
      errCode: ERROR_CODE.BAD_REQUEST,
      message: "You need create/authenticated company first",
    });

  const job = await Job.findOne({ _id: jobId, companyId: company._id }).lean();
  if (!job)
    return MasterResponse({
      status: STATUS.NOT_FOUND,
      errCode: ERROR_CODE.BAD_REQUEST,
      message: "Job not found",
    });

  const validJob = JobResponse.Jobs(
    await Job.findOneAndUpdate({ companyId: company._id, _id: jobId }, body, { new: true })
  );
  const { companyId, ...data } = validJob;
  const result = {
    ...data,
  };
  return MasterResponse({
    status: STATUS.DONE,
    message: "You were upload new job successfully",
    data: result,
  });
};

const getJobs = async (isDestroy, page = 1) => {
  const limit = 10
  const filter = isDestroy === null ? { isDestroy: false } : { isDestroy };
  const companies = await Company.find({ isDestroy: false }).lean()
  const total = await Job.countDocuments()
  const jobs = await Job.find(filter)
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();
  const validJobs = jobs.map(j => JobResponse.Jobs(j))
  const paginatedJobs = validJobs.map(({ companyId, ...data }) => {
    const foundCompany = companies.find(c => c._id.toString() === companyId.toString())
    return {
      ...data,
      company: CompanyResponse.Item(foundCompany || {})
    }
  })
  return MasterResponse({
    data: {
      paginatedJobs,
      currentPage: page,
      total,
      totalPage: Math.ceil(total / limit)
    }
  });
};

export const jobService = {
  postJob,
  getJob,
  updateJobById,
  getJobs,
};
