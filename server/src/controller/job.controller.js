import { jobService } from "../service/job.service.js"

const postJob = async (req, res) => {
    try {
        const response = await jobService.postJob(req.user.id, req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json(MasterResponse({ errCode: ERROR_CODE.FAILED, message: error.message }));
    }
}

export const jobController = {
    postJob
}