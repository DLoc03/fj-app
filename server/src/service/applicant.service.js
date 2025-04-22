import Applicant from '../model/applicant.js'
import Job from '../model/job.js'
import Question from '../model/question.js'
import { MasterResponse } from '../response/master.response.js'
import { ERROR_CODE, STATUS } from '../utils/enum.js'
import Answer from '../model/answer.js'
import Company from '../model/company.js'
import { ApplicantResponse } from '../response/applicant.response.js'
const postApplicant = async (jobId, data) => {
    const { email, name, phone, cv } = data

    const exitedApplicant = await Applicant.findOne({ email: email, jobId: jobId }).lean()
    if (exitedApplicant) return MasterResponse({ status: STATUS.FAILED, message: `Your email: ${exitedApplicant.email} is already for job`, errCode: ERROR_CODE.BAD_REQUEST })

    const newApplicant = new Applicant({
        email,
        name,
        phone,
        cv,
        jobId: jobId
    })
    await newApplicant.save()
    return MasterResponse({ status: STATUS.CREATED, message: "Created new Applicant", data: ApplicantResponse.ApplicantCreate(newApplicant) })
}

const getApplicantWithResult = async (userId, applicantId) => {
    const company = await Company.findOne({ recruiterId: userId }).lean()

    if (!company) return MasterResponse({ status: STATUS.NOT_FOUND, message: 'Company not found', errCode: ERROR_CODE.BAD_REQUEST })

    const applicant = await Applicant.findById(applicantId).lean()

    if (!applicant) return MasterResponse({ status: STATUS.NOT_FOUND, message: 'Applicant not found', errCode: ERROR_CODE.BAD_REQUEST })

    const job = await Job.findOne({ companyId: company._id, _id: applicant.jobId }).lean()

    if (!job) return MasterResponse({ status: STATUS.NOT_FOUND, message: 'Job not found', errCode: ERROR_CODE.BAD_REQUEST })

    const questions = await Question.find({ jobId: job._id }).lean()

    const answers = await Answer.find({ applicantId: applicant._id }).lean()

    const validApplicant = ApplicantResponse.Create(applicant)

    const exam = questions.map(q => ({
        question: q.question,
        answer: answers.reduce((acc, item) => {
            if (q._id.toString() === item.questionId.toString()) {
                return item.answer
            }
            return acc
        }, null)
    }))
    return MasterResponse({
        data: {
            ...validApplicant,
            exam
        }
    })
}

export const applicantService = {
    postApplicant,
    getApplicantWithResult
}