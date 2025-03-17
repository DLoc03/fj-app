import Company from "../model/company.js"

const postCompany = async (id, data) => {
    const exitedComp = await Company.findOne({ recruiterId: id })
    if (exitedComp) {
        return {
            errCode: 1,
            message: "You're already registered a company",
        }
    }
    const newComp = new Company({
        ...data,
        recruiterId: id
    })
    await newComp.save()
    return {
        errCode: 0,
        message: "Company registered was succeed",
        data: newComp
    }
}





export const companyService = {
    postCompany
}