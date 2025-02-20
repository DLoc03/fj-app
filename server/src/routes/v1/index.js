import express from "express";
import { authRoutes } from "./auth.route.js";
import { userRoute } from "./user.route.js";

const Router = express.Router()

Router.use('/auth', authRoutes)
Router.use('/user', userRoute)

export const API_ROUTE = Router