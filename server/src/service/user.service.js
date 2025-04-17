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
import { ERROR_CODE, STATUS } from "../utils/enum.js";
import Answer from "../model/answer.js";
const getUserList = async (isDestroy) => {
  const filter = isDestroy === null ? { isDestroy: false } : { isDestroy };
  const list = await User.find(filter).lean();
  const validUser = list.map((item) => UserResponse.UserInfo(item));
  return MasterResponse({ data: validUser });
};

const getUserById = async (id) => {
  const userRaw = await User.findById(id).lean();
  if (!userRaw || userRaw.isDestroy) {
    return MasterResponse({
      status: STATUS.NOT_FOUND,
      errCode: ERROR_CODE.BAD_REQUEST,
      message: "User not found",
    });
  }

  const validUser = UserResponse.UserInfo(userRaw);

  const existedCompany = await Company.findOne({
    recruiterId: userRaw._id,
  }).lean();
  if (!existedCompany || existedCompany.isDestroy) {
    return MasterResponse({
      data: {
        ...validUser,
        company: null,
        jobs: [],
      },
    });
  }

  const company = CompanyResponse.CompanyFound(existedCompany);

  const jobsOfComp = await Job.find({
    companyId: existedCompany._id,
    isDestroy: false,
  }).lean();
  const jobs = jobsOfComp.map((j) => JobResponse.Jobs(j));

  const data = {
    ...validUser,
    company,
    jobs,
  };

  return MasterResponse({ data });
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
