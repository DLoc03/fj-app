import express from 'express'
import 'dotenv/config'
import { API_ROUTE } from './routes/v1/index.js'
import { errorHandler } from './middleware/errorHandling.js'
import morgan from 'morgan'
import cors from 'cors'
import { corsOption } from './config/cors.js'
import cookieParser from 'cookie-parser'
import { auditLogger } from './middleware/auditlog.middleware.js'


const app = express()

app.use(cors(corsOption))
app.use(cookieParser())
app.use(morgan('dev'))
app.use(express.json())
app.use(auditLogger)

app.use('/api/v1', API_ROUTE)
app.use(errorHandler)

export { app }