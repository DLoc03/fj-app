import Applicant from "../model/applicant.js";
import Company from "../model/company.js";
import Job from "../model/job.js";
import Package from "../model/package.js";
import Receipt from "../model/receipt.js";
import Test from "../model/test.js";
import User from "../model/user.js";
import { CompanyResponse } from "../response/company.response.js";
import { JobResponse } from "../response/job.response.js";
import { MasterResponse } from "../response/master.response.js";
import { ERROR_CODE, STATUS } from "../utils/enum.js";

const postJob = async (userId, body) => {
  const company = await Company.findOne({ recruiterId: userId }).lean();
  if (!company)
    return MasterResponse({
      status: STATUS.NOT_FOUND,
      errCode: ERROR_CODE.BAD_REQUEST,
      message: "You need create company first",
    });

  if (company.status !== "Authenticated")
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
  const { recruiterId } = await Company.findOne({ _id: job.companyId }).lean();
  const { phone } = await User.findById(recruiterId).lean();
  const validJob = JobResponse.Jobs(job);
  const { companyId, ...data } = validJob;
  const testId = await Test.findOne({ jobId: validJob.id })
    .select("_id")
    .lean();
  return MasterResponse({
    data: {
      ...data,
      hotline: phone,
      testId: testId,
    },
  });
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
    await Job.findOneAndUpdate({ companyId: company._id, _id: jobId }, body, {
      new: true,
    })
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
  const limit = 10;
  const filter = isDestroy === null ? { isDestroy: false } : { isDestroy };
  const companies = await Company.find({ isDestroy: false }).lean();
  const users = await User.find({
    _id: { $in: companies.map((c) => c.recruiterId) },
    isDestroy: false,
  });
  const pakages = await Package.find({ isDestroy: false });
  const receipts = await Receipt.find({
    isDestroy: false,
  });
  const total = await Job.countDocuments();
  const jobs = await Job.find(filter)
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();
  const validJobs = jobs.map((j) => JobResponse.Jobs(j));
  const paginatedJobs = validJobs.map(({ companyId, ...data }) => {
    const foundCompany = companies.find(
      (c) => c._id.toString() === companyId.toString()
    );
    const foundUser = users.find(
      (u) => u._id.toString() === foundCompany.recruiterId.toString()
    );
    const foundReceipt = receipts.find(
      (r) => r.userId.toString() === foundUser._id.toString()
    );
    const { code } = pakages.find(
      (p) => p._id.toString() === foundReceipt.packageId.toString()
    );
    return {
      ...data,
      code: code || null,
      company: CompanyResponse.Item(foundCompany || {}),
    };
  });
  return MasterResponse({
    data: {
      paginatedJobs,
      currentPage: page,
      total,
      totalPage: Math.ceil(total / limit),
    },
  });
};

const deleteJobDetail = async (userId, id) => {
  const user = await User.findById(userId).lean();
  if (user.role === "admin") {
    const job = await Job.findById(id).lean();
    if (job) {
      await Job.updateOne({ _id: job._id }, { isDestroy: true });
      await Applicant.updateMany(
        {
          jobId: job._id,
        },
        {
          isDestroy: true,
        }
      );
      return MasterResponse({
        message: "Job was deleted",
      });
    }
    return MasterResponse({
      status: STATUS.NOT_FOUND,
      errCode: ERROR_CODE.BAD_REQUEST,
      message: "Job not found",
    });
  }
  const company = await Company.findOne({
    recruiterId: userId,
    isDestroy: false,
  }).lean();
  if (!company)
    return MasterResponse({
      status: STATUS.NOT_FOUND,
      errCode: ERROR_CODE.BAD_REQUEST,
      message: "Company not found",
    });
  const job = await Job.findOne({
    _id: id,
    companyId: company._id,
    isDestroy: false,
  }).lean();
  if (job) {
    await Applicant.updateMany(
      {
        jobId: job._id,
      },
      {
        isDestroy: true,
      }
    );
    await Job.updateOne({ _id: job._id }, { isDestroy: true });
    return MasterResponse({
      message: "Job was deleted",
    });
  }
  return MasterResponse({
    status: STATUS.NOT_FOUND,
    errCode: ERROR_CODE.BAD_REQUEST,
    message: "Job not found",
  });
};

export const jobService = {
  postJob,
  getJob,
  updateJobById,
  getJobs,
  deleteJobDetail,
};
