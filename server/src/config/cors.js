import { WHITE_LIST } from "../utils/constant.js";
import 'dotenv/config'
export const corsOption = {
    origin: WHITE_LIST,
    optionsSuccessStatus: 200,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}
