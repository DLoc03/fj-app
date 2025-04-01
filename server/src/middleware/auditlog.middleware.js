import { connectRabbitMQ, getChannel } from "../config/rabbitmq.config.js";
import jwt from 'jsonwebtoken'
import { QUEUE_NAME } from "../utils/enum.js";
let isConnected = false

const initializeRabbitMQ = async () => {
    if (!isConnected) {
        try {
            await connectRabbitMQ()
            isConnected = true
            // console.log('RabbitMQ initialized for all queue');
        } catch (error) {
            console.error(`Failed while initialize RabbitMQ: ${error}`);
        }
    }
}
initializeRabbitMQ()
export const auditLogger = async (req, res, next) => {
    res.on('finish', async () => {
        let userId = null
        const url = new URL(req.originalUrl, `http:${req.headers.host}`)

        if (req.cookies.refreshToken) {
            try {
                const decoded = jwt.verify(req.cookies.refreshToken, process.env.JWT_REFRESH_SECRET)
                if (decoded && decoded.user && decoded.user.id) {
                    userId = decoded.user.id;
                }
            } catch (error) {
                console.error(`Invalid token: ${error.message}`);
            }
        }

        const logData = {
            userId: userId,
            action: `${req.method} ${url.pathname}`,
            entity: req.originalUrl.split('/')[3] || null,
            requestParams: req.params || {},
            requestQuery: req.query || null,
            requestData: req.body ? omitSensitiveData(req.body) : null,
            responseStatus: res.statusCode,
            ipAddress: req.ip,
            userAgent: req.headers['user-agent']
        }
        const channel = getChannel(QUEUE_NAME.AUDIT)
        if (channel) {
            try {
                channel.sendToQueue(QUEUE_NAME.AUDIT, Buffer.from(JSON.stringify(logData)), { persistent: true })
            } catch (error) {
                console.error(`Some thing went wrong: ${error}`);
            }
        } else {
            console.warn(`RabbitMQ channel not available for auditlogs, log didn't sent: ${logData}`);
        }
    })
    next()
}


function omitSensitiveData(data) {
    if (!data || typeof data !== "object") return data;
    const sensitiveKeys = ["password", "token", "accessToken", "refreshToken"];

    const filteredData = {};
    Object.keys(data).forEach((key) => {
        if (!sensitiveKeys.includes(key)) {
            filteredData[key] = data[key];
        }
    });
    return filteredData;
}