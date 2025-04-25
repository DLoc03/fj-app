import express from "express";
import {
  verifyToken,
  authorizeAdmin,
  checkBlackList,
} from "../../middleware/authToken.js";
import { userController } from "../../controller/user.controller.js";
import { uploadUserAvatar } from "../../config/cloudinary.js";
import cacheMiddleware from "../../middleware/cache.middleware.js";

const Router = express.Router();

Router.route("/").get(
  checkBlackList,
  verifyToken,
  authorizeAdmin("admin"),
  cacheMiddleware,
  userController.getUsers
);

Router.route("/avatar")
  .put(
    checkBlackList,
    verifyToken,
    authorizeAdmin("user"),
    uploadUserAvatar.single("avatar"),
    userController.updateUserById
  )
  .post(
    checkBlackList,
    verifyToken,
    authorizeAdmin("user"),
    uploadUserAvatar.single("avatar"),
    userController.uploadAvatarById
  )
  .delete(
    checkBlackList,
    verifyToken,
    authorizeAdmin("user"),
    userController.deleteAvatarById
  );

Router.route("/:id")
  .get(
    checkBlackList,
    verifyToken,
    authorizeAdmin("admin"),
    userController.getUserById
  )
  .delete(
    checkBlackList,
    verifyToken,
    authorizeAdmin("admin"),
    userController.deleteUserById
  );

export const userRoute = Router;
