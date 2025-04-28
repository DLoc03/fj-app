import express from "express";
import { receiptController } from "../../controller/receipt.controller.js";
import {
  authorizeAdmin,
  checkBlackList,
  verifyToken,
} from "../../middleware/authToken.js";
const Router = express.Router();

Router.route("/").get(
  checkBlackList,
  verifyToken,
  authorizeAdmin("admin"),
  receiptController.getReceipts
);

Router.route("/:id")
  .get(
    checkBlackList,
    verifyToken,
    authorizeAdmin("admin"),
    receiptController.getReceipt
  )
  .post(
    checkBlackList,
    verifyToken,
    authorizeAdmin("user"),
    receiptController.createReceipt
  );
export const receiptRoute = Router;
