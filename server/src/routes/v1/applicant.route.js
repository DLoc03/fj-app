import express from 'express'
import { applicantController } from '../../controller/applicant.controller.js'
import { answerController } from '../../controller/answer.controller.js'

const Router = express.Router()

Router.route('/:id')
    .post(applicantController.postApplicant)
    .get(applicantController.getApplicantWithResult)


export const applicantRoute = Router