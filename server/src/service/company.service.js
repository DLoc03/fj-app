import Company from "../model/company.js"
import { Companies, CompanyFound } from "../response/company.response.js"
import { MasterResponse } from "../response/master.response.js"
import { ERROR_CODE, STATUS } from "../utils/enum.js"
import { User } from '../model/user.js'
const postCompany = async (id, data) => {
    const exitedComp = await Company.findOne({ recruiterId: id })
    if (exitedComp) return MasterResponse({
        errCode: ERROR_CODE.BAD_REQUEST,
        message: "You're already registered a company"
    })
    const newComp = new Company({
        ...data,
        recruiterId: id
    })
    await newComp.save()
    return MasterResponse({
        message: "Company registered was succeed",
        data: CompanyFound(newComp)
    })
}

const getCompany = async (id) => {
    const company = await Company.findOne({ _id: id })

    if (!company) {
        return MasterResponse({
            status: STATUS.NOT_FOUND,
            errCode: 1,
            message: "Company not found"
        })
    }
    return MasterResponse({ data: CompanyFound(company) })
}

const getCompanies = async () => {
    const companies = await Company.find().populate('recruiterId', 'name email phone')
    console.log(companies);

    return MasterResponse({ data: [...companies] })
}




export const companyService = {
    postCompany,
    getCompany,
    getCompanies
}