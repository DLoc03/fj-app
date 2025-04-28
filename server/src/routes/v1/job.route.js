import express from "express";
import {
  authorizeAdmin,
  verifyToken,
  checkBlackList,
} from "../../middleware/authToken.js";
import { jobController } from "../../controller/job.controller.js";
import cacheMiddleware from "../../middleware/cache.middleware.js";
const Router = express.Router();

Router.route("/")
  .get(cacheMiddleware, jobController.getJobs)

  .post(
    checkBlackList,
    verifyToken,
    authorizeAdmin("user"),
    jobController.postJob
  );

Router.route("/:id")
  .get(jobController.getJob)
  .put(
    checkBlackList,
    verifyToken,
    authorizeAdmin("user"),
    jobController.updateJobById
  );

export const jobRoute = Router;
