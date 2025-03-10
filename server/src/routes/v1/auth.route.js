import express from "express";
import { authController } from "../../controller/auth.controller.js";
import { verifyToken } from "../../middleware/authToken.js";

const Router = express.Router()

Router.route('/register')
    .post(authController.registerUser)

Router.route('/login')
    .post(authController.loginUser)

Router.route('/token')
    .patch(authController.refreshAccessToken)

Router.route('/logout')
    .delete(authController.logout)

Router.route('/me')
    .get(verifyToken, authController.getMe)

export const authRoutes = Router