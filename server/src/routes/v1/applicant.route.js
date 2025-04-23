import express from 'express'
import { applicantController } from '../../controller/applicant.controller.js'
import { verifyToken, authorizeAdmin, checkBlackList } from '../../middleware/authToken.js'
const Router = express.Router()

Router.route('/:id')
    .post(applicantController.postApplicant)
    .get(checkBlackList, verifyToken, authorizeAdmin('user'), applicantController.getApplicantWithResult)


export const applicantRoute = Router