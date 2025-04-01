import Company from "../model/company.js";
import { CompanyResponse } from "../response/company.response.js";
import { MasterResponse } from "../response/master.response.js";
import { ERROR_CODE, STATUS } from "../utils/enum.js";
import User from "../model/user.js";
import { UserResponse } from "../response/user.response.js";
import Job from "../model/job.js";
const postCompany = async (id, data) => {
  const exitedComp = await Company.findOne({ recruiterId: id }).lean();
  if (exitedComp)
    return MasterResponse({ errCode: ERROR_CODE.BAD_REQUEST, message: "You're already registered a company", });
  const newComp = new Company({
    ...data,
    recruiterId: id,
  });
  await newComp.save();
  return MasterResponse({ message: "Company registered was succeed", data: CompanyResponse.CompanyFound(newComp) });
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
  const companies = await Company.find({ isDestroy: query || false }).lean()
  const companiesInfo = companies.map((item) =>
    CompanyResponse.CompanyFound(item)
  );
  const users = await User.find().lean();
  const usersInfo = users.map((user) => UserResponse.UserLogin(user));
  const companyWithUser = companiesInfo.map(({ recruiterId, ...company }) => ({
    ...company,
    recruiter:
      usersInfo.find((user) => user.id.toString() === recruiterId.toString()) || null
  }));

  return MasterResponse({ data: [...companyWithUser] });
};

const updateCompany = async (id, data) => {
  const company = await Company.findOne({ recruiterId: id }).lean()
  if (!company) {
    return MasterResponse({ status: STATUS.NOT_FOUND, errCode: ERROR_CODE.BAD_REQUEST, message: "Company not found" })
  }
  const newData = await Company.findOneAndUpdate(company._id, data, { new: true })
  return MasterResponse({ status: STATUS.CREATED, data: CompanyResponse })
}

export const companyService = {
  postCompany,
  getCompany,
  getCompanies,
  updateCompany
};
