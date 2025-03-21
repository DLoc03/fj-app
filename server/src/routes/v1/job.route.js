import express from "express";
import { authorizeAdmin, verifyToken } from "../../middleware/authToken.js";
import { jobController } from "../../controller/job.controller.js";

const Router = express.Router()

Router.route('/')
    .post(verifyToken, authorizeAdmin('user'), jobController.postJob)
Router.route('/:id')
    .get(jobController.getJob)
Router.route('/:id')
    .put(verifyToken, authorizeAdmin('user'), jobController.updateJobById)
Router.route('/')
    .get(jobController.getJobs)
export const jobRoute = Router