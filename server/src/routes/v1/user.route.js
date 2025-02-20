import express from "express";
import { verifyToken, authorizeAdmin, isOwnerId } from "../../middleware/authToken.js";
import { userController } from "../../controller/user.controller.js";
const Router = express.Router()

Router.route('/')
    .get(verifyToken, authorizeAdmin('admin'), userController.getUsers)

Router.route('/:id')
    .get(verifyToken, authorizeAdmin('admin'), userController.getUserById)

Router.route('/:id')
    .delete(verifyToken, authorizeAdmin('admin'), userController.deleteUserById)

Router.route('/:id')
    .put(verifyToken, isOwnerId, userController.updateUserById)
export const userRoute = Router