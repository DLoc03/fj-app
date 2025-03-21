import express from "express";
import { authRoutes } from "./auth.route.js";
import { userRoute } from "./user.route.js";
import { companyRoute } from "./company.route.js";
import { jobRoute } from "./job.route.js";
const Router = express.Router()

Router.use('/auth', authRoutes)
Router.use('/user', userRoute)
Router.use('/comp', companyRoute)
Router.use('/job', jobRoute)
export const API_ROUTE = Router