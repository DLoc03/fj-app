import express from "express";
import { verifyToken, authorizeAdmin } from "../../middleware/authToken.js";
import { userController } from "../../controller/user.controller.js";
const Router = express.Router()

Router.route('/all')
    .get(verifyToken, authorizeAdmin('admin'), userController.getUsers)


export const userRoute = Router