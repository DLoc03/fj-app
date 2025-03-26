import express from "express";
import { authorizeAdmin, verifyToken } from '../../middleware/authToken.js'
import { questionController } from "../../controller/question.controller.js";
const Route = express.Router()
Route.route('/:id')
    .post(verifyToken, authorizeAdmin('user'), questionController.postQuestion)
    .get(questionController.getQuestWithJob)

export const questionRoute = Route