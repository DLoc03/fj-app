import express from "express";
import { authRoutes } from "./auth.route.js";
import { userRoute } from "./user.route.js";
import { companyRoute } from "./company.route.js";

const Router = express.Router()

Router.use('/auth', authRoutes)
Router.use('/user', userRoute)
Router.use('/comp', companyRoute)

export const API_ROUTE = Router