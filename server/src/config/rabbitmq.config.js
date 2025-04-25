import amqp from "amqplib";
import { QUEUE_NAME, RABBIT_EVENTS } from "../utils/enum.js";
import "dotenv/config";
const channels = {};
export const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(process.env.RABBIT_MQ_URI);
    for (const q of Object.values(QUEUE_NAME)) {
      const channel = await connection.createChannel();
      await channel.assertQueue(q, { durable: true });
      channels[q] = channel;
    }
    connection.on(RABBIT_EVENTS.ERROR, (e) => {
      console.error(`RabbitMQ get some error: ${e}`);
    });

    connection.on(RABBIT_EVENTS.CLOSE, () => {
      for (const q of Object.values(QUEUE_NAME)) {
        channels[q] = null;
      }
    });
  } catch (error) {
    console.error(`Failed while connected to RabbitMQ: ${error}`);
    throw error;
  }
};

export const getChannel = (queueName) => {
  if (!Object.values(QUEUE_NAME).includes(queueName)) {
    throw new Error(`Unknow queue with name: ${queueName}`);
  }
  return channels[queueName];
};
