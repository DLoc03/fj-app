import express from "express";
import { authorizeAdmin, verifyToken } from "../../middleware/authToken.js";
import { jobController } from "../../controller/job.controller.js";

const Router = express.Router()

Router.route('/')
    .post(verifyToken, authorizeAdmin('user'), jobController.postJob)

export const jobRoute = Router