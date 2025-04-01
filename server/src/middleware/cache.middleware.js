import redis from "../config/redis.config.js";
// import { MasterResponse } from '../response/master.response.js'
const cacheMiddleware = async (req, res, next) => {
    const cacheKey = `${req.originalUrl}:${JSON.stringify(req.query)}`
    console.log(cacheKey);
    try {
        const cachedData = await redis.get(cacheKey)
        if (cachedData) {
            return res.status(200).json(JSON.parse(cachedData))
        }

        res.sendResponse = res.json
        res.json = (body) => {
            redis.setex(cacheKey, 300, JSON.stringify(body))
            res.sendResponse(body)
        }
        next()
    } catch (error) {
        console.error(`Redis cached error: ${error}`);
        next()
    }
}

export default cacheMiddleware