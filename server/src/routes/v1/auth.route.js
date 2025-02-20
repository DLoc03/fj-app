import express from "express";
import { authController } from "../../controller/auth.controller.js";

const Router = express.Router()

Router.route('/register')
    .post(authController.registerUser)

Router.route('/login')
    .post(authController.loginUser)
export const authRoutes = Router