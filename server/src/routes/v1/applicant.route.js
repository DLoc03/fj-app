import express from 'express'
import { applicantController } from '../../controller/applicant.controller.js'
import { verifyToken, authorizeAdmin } from '../../middleware/authToken.js'
const Router = express.Router()

Router.route('/:id')
    .post(applicantController.postApplicant)
    .get(verifyToken, authorizeAdmin('user'), applicantController.getApplicantWithResult)


export const applicantRoute = Router