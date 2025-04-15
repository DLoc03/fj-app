import Applicant from '../model/applicant.js'
import Job from '../model/job.js'
import Question from '../model/question.js'
import { MasterResponse } from '../response/master.response.js'
import { ERROR_CODE, STATUS } from '../utils/enum.js'
import Answer from '../model/answer.js'

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
    return MasterResponse({ status: STATUS.CREATED, message: "Created new Applicant" })
}

const getApplicantWithResult = async (id) => {
    const applicant = await Applicant.findById(id).lean()
    const job = await Job.findById(applicant.jobId).lean()
    const questions = await Question.find({ jobId: job._id }).lean()
    const answers = await Answer.find({ applicantId: applicant._id })
    const { jobId, ...data } = applicant
    const examp = questions.map(q => ({
        question: q.question,
        answer: answers.find(a => a.questionId.toString() === q._id.toString())
    }))
    // console.log(examp);
    return examp
}

export const applicantService = {
    postApplicant,
    getApplicantWithResult
}