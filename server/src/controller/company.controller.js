import { companyService } from "../service/company.service.js"
import { ERROR_CODE } from "../utils/enum.js"
import { MasterResponse } from "../response/master.response.js"
const postCompany = async (req, res) => {
    try {
        const userId = req.user.id
        const response = await companyService.postCompany(userId, req.body)
        if (response.result.errCode === ERROR_CODE.DONE) return res.status(201).json(response)
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
        const response = await companyService.getCompanies()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json(MasterResponse({ errCode: ERROR_CODE.FAILED, message: error.message }));
    }
}


export const companyController = {
    postCompany,
    getCompanyById,
    getCompanies
}