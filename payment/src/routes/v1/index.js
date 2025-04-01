import express from 'express'
import { paymentRoute } from './payment.route.js'

const Router = express.Router()

Router.use('/payment', paymentRoute)

export const PAYMENT_API_V1 = Router