import express from "express";
import {
  verifyToken,
  authorizeAdmin,
  checkBlackList,
} from "../../middleware/authToken.js";
import { companyController } from "../../controller/company.controller.js";
import cacheMiddleware from "../../middleware/cache.middleware.js";
import { uploadCompanyImage } from "../../config/cloudinary.js";
const Router = express.Router();

Router.route("/")
  .post(
    checkBlackList,
    verifyToken,
    authorizeAdmin("user"),
    companyController.postCompany
  )
  .get(cacheMiddleware, companyController.getCompanies);

Router.route("/avatar").post(
  checkBlackList,
  verifyToken,
  authorizeAdmin("user"),
  uploadCompanyImage.single("avatar"),
  companyController.uploadAvatar
);

Router.route("/:id")
  .get(companyController.getCompanyById)
  .put(
    checkBlackList,
    verifyToken,
    authorizeAdmin("admin"),
    companyController.updateCompany
  );

export const companyRoute = Router;
