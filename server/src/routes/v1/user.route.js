import express from "express";
import { verifyToken, authorizeAdmin } from "../../middleware/authToken.js";
import { userController } from "../../controller/user.controller.js";
import { upload } from '../../config/cloudinary.js'
import cacheMiddleware from "../../middleware/cache.middleware.js";

const Router = express.Router();

Router.route("/")
  .get(verifyToken, authorizeAdmin('admin'), cacheMiddleware, userController.getUsers)

Router.route('/avatar')
  .put(verifyToken, authorizeAdmin('user'), upload.single('avatar'), userController.updateUserById)
  .post(verifyToken, authorizeAdmin('user'), upload.single('avatar'), userController.uploadAvatarById)
  .delete(verifyToken, authorizeAdmin('user'), userController.deleteAvatarById)

Router.route("/:id")
  .get(verifyToken, authorizeAdmin('admin'), userController.getUserById)
  .delete(verifyToken, authorizeAdmin('admin'), userController.deleteUserById)



export const userRoute = Router;
