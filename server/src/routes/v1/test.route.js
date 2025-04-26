import { testController } from "../../controller/test.controller.js";
import express from "express";
import {
  authorizeAdmin,
  checkBlackList,
  verifyToken,
} from "../../middleware/authToken.js";
const Router = express.Router();
Router.route("/:id")
  .post(
    checkBlackList,
    verifyToken,
    authorizeAdmin("user"),
    testController.createTest
  )
  .get(testController.getTest);
export const testRoute = Router;
