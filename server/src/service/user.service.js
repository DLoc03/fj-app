import mongoose from "mongoose";
import Company from "../model/company.js";
import Job from "../model/job.js";
import User from "../model/user.js";
import Question from "../model/question.js";
import Applicant from "../model/applicant.js";
import { CompanyResponse } from "../response/company.response.js";
import { JobResponse } from "../response/job.response.js";
import { MasterResponse } from "../response/master.response.js";
import { UserResponse } from "../response/user.response.js";
import { ERROR_CODE, SITE_ENUM, STATUS } from "../utils/enum.js";
import Answer from "../model/answer.js";
import { ApplicantResponse } from "../response/applicant.response.js";
const getUserList = async (isDestroy) => {
  const filter = isDestroy === null ? { isDestroy: false } : { isDestroy };
  const list = await User.find(filter).lean();
  const validUser = list.map((item) => UserResponse.UserInfo(item));
  return MasterResponse({ data: validUser });
};

const getUserById = async (id, site, page = 1) => {
  const limit = 10;
  const skip = (page - 1) * limit;
  const user = await User.findById(id).lean();
  const company = await Company.findOne({
    recruiterId: user._id,
    isDestroy: false,
  }).lean();
  const total = await Job.countDocuments({
    isDestroy: false,
    companyId: company._id,
  });
  const job = await Job.find({
    companyId: company._id,
    isDestroy: false,
  })
    .skip(skip)
    .limit(limit)
    .lean();
  const jobIds = await Job.find({
    companyId: company._id,
    isDestroy: false,
  })
    .select("_id")
    .lean();
  const applicants = await Applicant.find({
    jobId: {
      $in: jobIds,
    },
    isDestroy: false,
  })
    .skip(skip)
    .limit(limit)
    .lean();
  const totalApplicant = await Applicant.countDocuments({
    jobId: {
      $in: jobIds,
    },
    isDestroy: false,
  });
  const paginatedApplicants = applicants.map((a) =>
    ApplicantResponse.Create(a)
  );
  const paginatedJobs = job.map((j) => JobResponse.Jobs(j));
  switch (site) {
    case SITE_ENUM.COMPANY:
      return MasterResponse({
        data: company ? CompanyResponse.CompanyFound(company) : {},
      });
    case SITE_ENUM.JOB:
      return MasterResponse({
        data: {
          paginatedJobs,
          currentPage: page,
          total,
          totalPages: Math.ceil(total / limit),
        },
      });
    case SITE_ENUM.APPLICANT:
      return MasterResponse({
        data: {
          paginatedApplicants,
          currentPage: page,
          total: totalApplicant,
          totalPages: Math.ceil(totalApplicant / limit),
        },
      });
    case SITE_ENUM.DETAIL:
    default:
      return MasterResponse({
        data: user ? UserResponse.UserLogin(user) : {},
      });
  }
};

const deleteUserById = async (id) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const user = await User.findById(id).session(session);
  if (!user || user.isDestroy === true) {
    await session.abortTransaction();
    session.endSession();
    return MasterResponse({
      status: STATUS.NOT_FOUND,
      errCode: ERROR_CODE.BAD_REQUEST,
      message: "User not found",
    });
  }

  const company = await Company.findOne({ recruiterId: user._id }).session(
    session
  );
  if (company) {
    await Company.updateOne(
      { recruiterId: user._id },
      { isDestroy: true },
      { session }
    );
    const jobs = await Job.find({ companyId: company._id }).session(session);

    if (jobs.length > 0) {
      const jobIds = jobs.map((j) => j._id);

      await Job.updateMany(
        { companyId: company._id },
        { isDestroy: true },
        { session }
      );
      await Question.updateMany(
        { jobId: { $in: jobIds } },
        { isDestroy: true },
        { session }
      );
      await Applicant.updateMany(
        { jobId: { $in: jobIds } },
        { isDestroy: true },
        { session }
      );

      const applicants = await Applicant.find({
        jobId: { $in: jobIds },
      }).session(session);
      if (applicants.length > 0) {
        const applicantIds = applicants.map((a) => a._id);
        await Answer.updateMany(
          { applicantId: { $in: applicantIds } },
          { isDestroy: true },
          { session }
        );
      }
    }
  }

  await User.findByIdAndUpdate(user._id, { isDestroy: true }, { session });

  await session.commitTransaction();
  session.endSession();

  return MasterResponse({ message: "Deleted user successfully" });
};

const updateUserById = async (id, data) => {
  const user = await User.findById(id);
  if (!user || user.isDestroy === true)
    return MasterResponse({
      status: STATUS.NOT_FOUND,
      message: "User not found",
      errCode: ERROR_CODE.BAD_REQUEST,
    });
  const newData = await User.findByIdAndUpdate(id, data, { new: true });
  return MasterResponse({
    message: "Update successful",
    data: UserResponse.UserLogin(newData),
  });
};

export const userService = {
  getUserList,
  getUserById,
  deleteUserById,
  updateUserById,
};
