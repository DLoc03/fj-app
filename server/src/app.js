import express from 'express'
import 'dotenv/config'
import { CONNNECT_DB } from './config/mongo.js'
import { API_ROUTE } from './routes/v1/index.js'
import { errorHandler } from './middleware/errorHandling.js'
import morgan from 'morgan'
// const app = express()
// const PORT = process.env.APP_PORT || 3000
// const HOST = process.env.APP_HOST

// CONNNECT_DB()

// app.listen(PORT, () => {
//     console.log(`Server is running on http://${HOST}:${PORT}`);
// })

const START_SERVER = () => {
    const app = express()
    const PORT = process.env.APP_PORT || 3000
    const HOST = process.env.APP_HOST
    app.use(morgan('dev'))
    app.use(express.json())
    app.use('/api/v1', API_ROUTE)
    app.use(errorHandler)
    app.listen(PORT, () => {
        console.log(`Server is running on http://${HOST}:${PORT}`);
    })
}

CONNNECT_DB()
    .then(START_SERVER)
    .catch((e) => {
        console.error(e);
    })