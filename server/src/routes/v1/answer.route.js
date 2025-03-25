import express from 'express'
import { answerController } from '../../controller/answer.controller.js'

const Router = express.Router()
Router.route('/:id')
    .post(answerController.postAnswer)

export const answerRoute = Router