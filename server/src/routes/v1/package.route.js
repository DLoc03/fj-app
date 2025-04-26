import express from "express";
import {
  authorizeAdmin,
  verifyToken,
  checkBlackList,
} from "../../middleware/authToken.js";
import { packageController } from "../../controller/package.controller.js";
const Router = express.Router();

Router.route("/")
  .get(
    checkBlackList,
    verifyToken,
    authorizeAdmin("admin", "user"),
    packageController.getPackages
  )
  .post(
    checkBlackList,
    verifyToken,
    authorizeAdmin("admin"),
    packageController.createPackage
  );

Router.route("/:id")
  .put(
    checkBlackList,
    verifyToken,
    authorizeAdmin("admin"),
    packageController.updatePackage
  )
  .delete(
    checkBlackList,
    verifyToken,
    authorizeAdmin("admin"),
    packageController.deletePackage
  )
  .patch(
    checkBlackList,
    verifyToken,
    authorizeAdmin("admin"),
    packageController.recoveryPackage
  )
  .get(
    checkBlackList,
    verifyToken,
    authorizeAdmin("admin", "user"),
    packageController.getPackage
  );
export const packageRoute = Router;
