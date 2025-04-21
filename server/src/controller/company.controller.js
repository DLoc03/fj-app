import { companyService } from "../service/company.service.js"
import { ERROR_CODE } from "../utils/enum.js"
import { MasterResponse } from "../response/master.response.js"
import redis from "../config/redis.config.js"
const postCompany = async (req, res) => {
    try {
        const userId = req.user.id
        const response = await companyService.postCompany(userId, req.body)
        if (response.result.errCode === ERROR_CODE.DONE) return res.status(201).json(response)
        await redis.del('/api/v1/comp:{}')
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json(MasterResponse({ errCode: ERROR_CODE.FAILED, message: error.message }));
    }
}

const getCompanyById = async (req, res) => {
    try {
        const response = await companyService.getCompany(req.params.id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json(MasterResponse({ errCode: ERROR_CODE.FAILED, message: error.message }));
    }
}

const getCompanies = async (req, res) => {
    try {
        const response = await companyService.getCompanies(req.query.isDestroy)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json(MasterResponse({ errCode: ERROR_CODE.FAILED, message: error.message }));
    }
}


const uploadAvatar = async (req, res) => {
    try {
        const response = await companyService.uploadAvatar(req.user.id, {
            avatar: req.file.path
        })
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json(MasterResponse({ errCode: ERROR_CODE.FAILED, message: error.message }));
    }
}


export const companyController = {
    postCompany,
    getCompanyById,
    getCompanies,
    uploadAvatar
}