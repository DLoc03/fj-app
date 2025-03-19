import express from "express";
import { verifyToken, authorizeAdmin } from "../../middleware/authToken.js";
import { companyController } from "../../controller/company.controller.js";

const Router = express.Router()

Router.route('/')
    .post(verifyToken, authorizeAdmin('user'), companyController.postCompany)

Router.route('/:id')
    .get(companyController.getCompanyById)

Router.route('/')
    .get(companyController.getCompanies)
export const companyRoute = Router