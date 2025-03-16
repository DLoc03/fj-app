import { companyService } from "../service/company.service.js"
const postCompany = async (req, res) => {
    try {
        const userId = req.user.id
        const result = await companyService.postCompany(userId, req.body)
        if (result.errCode === 1) return res.status(400).json({ ...result })
        return res.status(201).json({ ...result })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


export const companyController = {
    postCompany
}