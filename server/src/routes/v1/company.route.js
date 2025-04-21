import express from "express";
import { verifyToken, authorizeAdmin } from "../../middleware/authToken.js";
import { companyController } from "../../controller/company.controller.js";
import cacheMiddleware from "../../middleware/cache.middleware.js";
import { uploadCompanyImage } from '../../config/cloudinary.js'
const Router = express.Router()

Router.route('/')
    .post(verifyToken, authorizeAdmin('user'), companyController.postCompany)
    .get(cacheMiddleware, companyController.getCompanies)

Router.route('/avatar')
    .post(verifyToken, authorizeAdmin('user'), uploadCompanyImage.single('avatar'), companyController.uploadAvatar)

Router.route('/:id')
    .get(companyController.getCompanyById)

export const companyRoute = Router