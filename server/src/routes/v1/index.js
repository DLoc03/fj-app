import express from "express";
import { authRoutes } from "./auth.route.js";
import { userRoute } from "./user.route.js";
import { companyRoute } from "./company.route.js";
import { jobRoute } from "./job.route.js";
import { questionRoute } from "./question.route.js";
import { applicantRoute } from "./applicant.route.js";
import { answerRoute } from "./answer.route.js";
import { packageRoute } from "./package.route.js";
import { receiptRoute } from "./receipt.route.js";
const Router = express.Router()

Router.use('/auth', authRoutes)
Router.use('/user', userRoute)
Router.use('/comp', companyRoute)
Router.use('/job', jobRoute)
Router.use('/question', questionRoute)
Router.use('/applicant', applicantRoute)
Router.use('/answer', answerRoute)
Router.use('/package', packageRoute)
Router.use('/receipt', receiptRoute)
export const API_ROUTE = Router