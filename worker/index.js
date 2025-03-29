import amqp from 'amqplib'
import { CONNECT_DB } from './configs/db.config.js'
import AuditLog from './models/audit.model.js'
import { QUEUE_NAME } from './utils/enum.js'

let auditLogBatch = []

const STARTWORKER = async () => {
    try {
        CONNECT_DB()
        const connection = await amqp.connect(process.env.RABBIT_MQ_URI)
        const channel = await connection.createChannel()

        await channel.assertQueue(QUEUE_NAME.AUDIT, { durable: true })


        setInterval(async () => {
            if (auditLogBatch.length > 0) {
                await AuditLog.insertMany(auditLogBatch)
                console.log(`Inserted ${auditLogBatch.length} logs into database`);
                auditLogBatch.length = 0
            }
        }, 5000)

        console.log("Worker is listening for messages...");

        channel.consume(QUEUE_NAME.AUDIT, async (msg) => {
            if (msg !== null) {
                const log = JSON.parse(msg.content.toString())
                auditLogBatch.push(log)
                channel.ack(msg)
            }
        })
    } catch (error) {
        console.error(`Worker failed: ${error}`);
        process.exit(1)
    }
}

STARTWORKER()