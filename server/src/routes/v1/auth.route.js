import express from "express";
import { authController } from "../../controller/auth.controller.js";
import { verifyToken, checkBlackList } from "../../middleware/authToken.js";

const Router = express.Router()

Router.route('/register')
    .post(authController.registerUser)

Router.route('/login')
    .post(authController.loginUser)

Router.route('/token')
    .patch(authController.refreshAccessToken)

Router.route('/logout')
    .delete(checkBlackList, verifyToken, authController.logout)

Router.route('/me')
    .get(checkBlackList, verifyToken, authController.getMe)

export const authRoutes = Router