import Company from "../model/company.js"
import Job from "../model/job.js"
import { CompanyResponse } from "../response/company.response.js"
import { JobResponse } from "../response/job.response.js"
import { MasterResponse } from "../response/master.response.js"
import { ERROR_CODE, STATUS } from "../utils/enum.js"

const postJob = async (userId, body) => {
    // const user = await User.findById(userId).lean()
    const company = await Company.findOne({ recruiterId: userId }).lean()
    if (!company) return MasterResponse({ status: STATUS.NOT_FOUND, errCode: ERROR_CODE.BAD_REQUEST, message: 'You need create company first' })
    const newJob = new Job({
        companyId: company._id,
        ...body
    })
    await newJob.save()
    return MasterResponse({ status: STATUS.CREATED, message: 'You were upload new job successfully', data: JobResponse.Jobs(newJob) })
}

const getJob = async (id) => {
    const job = await Job.findOne({ _id: id }).lean()
    const company = await Company.findOne({ _id: job.companyId }).lean()
    const validJob = JobResponse.Jobs(job)
    const { companyId, ...data } = validJob
    const result = {
        ...data,
        company: company.name
    }
    return MasterResponse({ message: 'OK', data: result })
}

const updateJobById = async (userId, body) => {
    const company = await Company.findOne({ recruiterId: userId }).lean()
    if (!company) return MasterResponse({ status: STATUS.NOT_FOUND, errCode: ERROR_CODE.BAD_REQUEST, message: 'You need create company first' })

    const job = await Job.findOne({ companyId: company._id }).lean()
    if (!job) return MasterResponse({ status: STATUS.NOT_FOUND, errCode: ERROR_CODE.BAD_REQUEST, message: 'Job not found' })

    const validJob = JobResponse.Jobs(await Job.findOneAndUpdate({ companyId: company._id }, body, { new: true }))
    const { companyId, ...data } = validJob
    const result = {
        ...data,
    }
    return MasterResponse({ status: STATUS.DONE, message: 'You were upload new job successfully', data: result })
}

const getJobs = async (isDestroy) => {
    const filter = isDestroy === null ? { isDestroy: false } : { isDestroy }
    const jobs = await Job.find(filter).lean()
    const companies = await Company.find().lean()
    const result = jobs.map(({ companyId, ...data }) => ({
        ...data,
        company: CompanyResponse.Companies(companies.find(company => company._id.toString() === companyId.toString() || null))
    }))
    return MasterResponse({ status: STATUS.DONE, message: 'OK', data: result })
}


export const jobService = {
    postJob,
    getJob,
    updateJobById,
    getJobs
}