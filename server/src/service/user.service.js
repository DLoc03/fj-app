import Company from "../model/company.js";
import Job from "../model/job.js";
import User from "../model/user.js";
import { CompanyResponse } from '../response/company.response.js'
import { JobResponse } from "../response/job.response.js";
import { MasterResponse } from "../response/master.response.js";
import { UserResponse } from "../response/user.response.js";
import { ERROR_CODE, STATUS } from "../utils/enum.js";
const getUserList = async () => {
    const list = await User.find({ isDestroy: false }).lean()
    const validUser = list.map((item) => UserResponse.UserInfo(item))
    return MasterResponse({ data: validUser })
}

const getUserById = async (id) => {
    const user = UserResponse.UserInfo(await User.findById(id).lean())
    if (!user || user.isDestroy === true) return MasterResponse({ status: STATUS.NOT_FOUND, errCode: ERROR_CODE.BAD_REQUEST, message: "User not found" })
    const company = CompanyResponse.CompanyFound(await Company.findOne({ recruiterId: user.id }).lean())
    if (!company || company.isDestroy === true) return MasterResponse({ status: STATUS.NOT_FOUND, errCode: ERROR_CODE.BAD_REQUEST, message: "Company not found" })
    const jobs = await Job.find({ companyId: company.id, isDestroy: false }).lean()
    if (!jobs) return MasterResponse({ status: STATUS.NOT_FOUND, errCode: ERROR_CODE.BAD_REQUEST, message: "Job not found" })
    const validJob = jobs.map(j => JobResponse.Jobs(j))
    const data = {
        ...user,
        company,
        jobList: [...validJob]
    }
    return MasterResponse({ data: data })
}

const deleteUserById = async (id) => {
    const user = await User.findById(id)
    if (!user || user.isDestroy === true) return MasterResponse({ status: STATUS.NOT_FOUND, errCode: ERROR_CODE.BAD_REQUEST, message: 'User not found' })
    await User.findByIdAndUpdate(user._id, { isDestroy: true }, { new: true })
    await Company.findOneAndUpdate({ recruiterId: user._id }, { isDestroy: true }, { new: true })
    return MasterResponse({
        message: "Deleted user successfully"
    })
}

const updateUserById = async (id, data) => {
    const user = await User.findById(id)
    if (!user || user.isDestroy === true) return MasterResponse({ status: STATUS.NOT_FOUND, errCode: ERROR_CODE.BAD_REQUEST })
    const newData = await User.findByIdAndUpdate(id, data, { new: true })
    return MasterResponse({ message: "Update successful", data: UserResponse.UserLogin(newData) })
}


export const userService = {
    getUserList,
    getUserById,
    deleteUserById,
    updateUserById,
}