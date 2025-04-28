import Company from "../model/company.js";
import { CompanyResponse } from "../response/company.response.js";
import { MasterResponse } from "../response/master.response.js";
import { ERROR_CODE, STATUS } from "../utils/enum.js";
import User from "../model/user.js";
import { UserResponse } from "../response/user.response.js";
import Job from "../model/job.js";
import Test from "../model/test.js";
import Applicant from "../model/applicant.js";
import Answer from "../model/answer.js";
import mongoose from "mongoose";
import Question from "../model/question.js";
const postCompany = async (id, data) => {
  const exitedComp = await Company.findOne({ recruiterId: id }).lean();
  if (exitedComp)
    return MasterResponse({
      errCode: ERROR_CODE.BAD_REQUEST,
      message: "You're already registered a company",
    });
  const newComp = new Company({
    ...data,
    recruiterId: id,
  });
  await newComp.save();
  return MasterResponse({
    message: "Company registered was succeed",
    data: CompanyResponse.CompanyFound(newComp),
  });
};

const getCompany = async (id) => {
  const company = await Company.findOne({ _id: id }).lean();
  const user = await User.findOne({ _id: company.recruiterId });
  const list = await Job.find({ companyId: company._id });
  const validCompany = CompanyResponse.CompanyFound(company);
  const { recruiterId, ...companyData } = validCompany;
  const result = {
    ...companyData,
    recruiter: UserResponse.UserInfo(user),
    jobList: list,
  };
  if (!company) {
    return MasterResponse({
      status: STATUS.NOT_FOUND,
      errCode: 1,
      message: "Company not found",
    });
  }
  return MasterResponse({ data: result });
};

const getCompanies = async (query) => {
  const companies = await Company.find({ isDestroy: query || false }).lean();
  const companiesInfo = companies.map((item) =>
    CompanyResponse.CompanyFound(item)
  );
  const users = await User.find().lean();
  const usersInfo = users.map((user) => UserResponse.UserLogin(user));
  const companyWithUser = companiesInfo.map(({ recruiterId, ...company }) => ({
    ...company,
    recruiter:
      usersInfo.find((user) => user.id.toString() === recruiterId.toString()) ||
      null,
  }));

  return MasterResponse({ data: [...companyWithUser] });
};

const updateCompany = async (id) => {
  const company = await Company.findOne({ _id: id }).lean();
  if (!company) {
    return MasterResponse({
      status: STATUS.NOT_FOUND,
      errCode: ERROR_CODE.BAD_REQUEST,
      message: "Company not found",
    });
  }
  const newData = await Company.findOneAndUpdate(
    company._id,
    { status: "Authenticated" },
    { new: true }
  );
  return MasterResponse({
    status: STATUS.CREATED,
    data: CompanyResponse.CompanyFound(newData),
  });
};

const uploadAvatar = async (id, avatar) => {
  const company = await Company.findOne({ recruiterId: id }).lean();
  if (!company) {
    return MasterResponse({
      status: STATUS.NOT_FOUND,
      errCode: ERROR_CODE.BAD_REQUEST,
      message: "Company not found",
    });
  }
  const newData = await Company.findOneAndUpdate(company._id, avatar, {
    new: true,
  });
  return MasterResponse({ data: CompanyResponse.CompanyFound(newData) });
};

const deleteCompany = async (companyId) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const company = await Company.findById(companyId).session(session).lean();
  if (!company || company.isDestroy) {
    await session.abortTransaction();
    session.endSession();
    return MasterResponse({
      status: STATUS.NOT_FOUND,
      errCode: ERROR_CODE.BAD_REQUEST,
      message: "Company not found or already deleted",
    });
  }

  const companyUpdate = await Company.updateOne(
    { _id: companyId, isDestroy: false },
    { $set: { isDestroy: true } },
    { session }
  );
  if (companyUpdate.modifiedCount === 0) {
    await session.abortTransaction();
    session.endSession();
    return MasterResponse({
      status: STATUS.NOT_FOUND,
      errCode: ERROR_CODE.BAD_REQUEST,
      message: "Company not found or already deleted",
    });
  }

  const jobs = await Job.find({ companyId, isDestroy: false }, { _id: 1 })
    .lean()
    .session(session);
  const jobIds = jobs.map((j) => j._id);

  if (jobIds.length > 0) {
    await Job.updateMany(
      { companyId, isDestroy: false },
      { $set: { isDestroy: true } },
      { session }
    );

    const tests = await Test.find(
      { jobId: { $in: jobIds }, isDestroy: false },
      { _id: 1 }
    )
      .lean()
      .session(session);
    const testIds = tests.map((t) => t._id);

    await Test.updateMany(
      { jobId: { $in: jobIds }, isDestroy: false },
      { $set: { isDestroy: true } },
      { session }
    );

    // Soft delete Questions
    await Question.updateMany(
      { testId: { $in: testIds }, isDestroy: false },
      { $set: { isDestroy: true } },
      { session }
    );

    // Tìm tất cả Applicant của Jobs
    const applicants = await Applicant.find(
      { jobId: { $in: jobIds }, isDestroy: false },
      { _id: 1 }
    )
      .lean()
      .session(session);
    const applicantIds = applicants.map((a) => a._id);

    // Soft delete Applicants
    await Applicant.updateMany(
      { jobId: { $in: jobIds }, isDestroy: false },
      { $set: { isDestroy: true } },
      { session }
    );

    // Soft delete Answers
    await Answer.updateMany(
      { applicantId: { $in: applicantIds }, isDestroy: false },
      { $set: { isDestroy: true } },
      { session }
    );
  }

  // Commit transaction
  await session.commitTransaction();
  session.endSession();
  return MasterResponse({
    status: STATUS.SUCCESS,
    message: "Company and related records deleted successfully",
  });
};

export const companyService = {
  postCompany,
  getCompany,
  getCompanies,
  updateCompany,
  uploadAvatar,
  deleteCompany,
};
