import Company from "../model/company.js"
import Job from "../model/job.js"
import { User } from "../model/user.js"
import { JobResponse } from "../response/job.response.js"
import { MasterResponse } from "../response/master.response.js"
import { ERROR_CODE, STATUS } from "../utils/enum.js"

const postJob = async (userId, body) => {
    const user = await User.findById(userId).lean()
    const company = await Company.findOne({ recruiterId: user._id }).lean()
    if (!company) return MasterResponse({ status: STATUS.NOT_FOUND, errCode: ERROR_CODE.BAD_REQUEST, message: 'You dont already a company, please create first' })
    const newJob = new Job({
        companyId: company._id,
        ...body
    })
    await newJob.save()
    return MasterResponse({ status: STATUS.CREATED, message: 'You were upload new job successfully', data: JobResponse.Jobs(newJob) })
}


export const jobService = {
    postJob
}