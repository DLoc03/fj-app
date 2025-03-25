import { applicantService } from "../service/applicant.service.js"

const postApplicant = async (req, res) => {
    try {
        const result = await applicantService.postApplicant(req.params.id, req.body)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(MasterResponse({ status: STATUS.FAILED, errCode: ERROR_CODE.FAILED, message: error.message }))
    }
}

const getApplicantWithResult = async (req, res) => {
    try {
        const result = await applicantService.getApplicantWithResult(req.params.id)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(MasterResponse({ status: STATUS.FAILED, errCode: ERROR_CODE.FAILED, message: error.message }))
    }
}
export const applicantController = {
    postApplicant,
    getApplicantWithResult
}