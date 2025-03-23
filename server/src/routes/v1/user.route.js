import express from "express";
import { verifyToken, authorizeAdmin, isOwnerId, } from "../../middleware/authToken.js";
import { userController } from "../../controller/user.controller.js";
import { upload } from '../../config/cloudinary.js'

const Router = express.Router();

Router.route("/")
  .get(verifyToken, authorizeAdmin('admin'), userController.getUsers);

Router.route("/:id")
  .get(verifyToken, authorizeAdmin('admin'), userController.getUserById);

Router.route("/:id")
  .delete(verifyToken, authorizeAdmin('admin'), userController.deleteUserById);

Router.route("/:id")
  .put(verifyToken, authorizeAdmin('user'), upload.single('avatar'), userController.updateUserById);

Router.route('/:id/avatar')
  .post(verifyToken, authorizeAdmin('user'), upload.single('avatar'), userController.uploadAvatarById)

Router.route('/:id/avatar')
  .delete(verifyToken, authorizeAdmin('user'), upload.single('avatar'), userController.deleteAvatarById)
export const userRoute = Router;
