import { jobService } from "../service/job.service.js"
import { MasterResponse } from "../response/master.response.js"
import { STATUS_CODE } from "../utils/enum.js"
const postJob = async (req, res) => {
    try {
        const response = await jobService.postJob(req.user.id, req.body)
        return res.status(STATUS_CODE.CREATED).json(response)
    } catch (error) {
        return res.status(500).json(MasterResponse({ errCode: ERROR_CODE.FAILED, message: error.message }));
    }
}

const getJob = async (req, res) => {
    try {
        const response = await jobService.getJob(req.params.id)
        return res.status(STATUS_CODE.OK).json(response)
    } catch (error) {
        return res.status(500).json(MasterResponse({ errCode: ERROR_CODE.FAILED, message: error.message }));
    }
}

const updateJobById = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(200).json(MasterResponse({ status: STATUS.FAILED, errCode: ERROR_CODE.BAD_REQUEST, message: "No update data provided" }));
        }
        const response = await jobService.updateJobById(req.user.id, req.body)
        return res.status(STATUS_CODE.OK).json(response)
    } catch (error) {
        return res.status(500).json(MasterResponse({ errCode: ERROR_CODE.FAILED, message: error.message }));
    }
}

const getJobs = async (req, res) => {
    try {
        const isDestroy = req.query.isDestroy ? req.query.isDestroy === "true" : null;
        const response = await jobService.getJobs(isDestroy)
        return res.status(STATUS_CODE.OK).json(response)
    } catch (error) {
        return res.status(500).json(MasterResponse({ errCode: ERROR_CODE.FAILED, message: error.message }));
    }
}

export const jobController = {
    postJob,
    getJob,
    updateJobById,
    getJobs
}