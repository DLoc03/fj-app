import express, { urlencoded } from 'express'
import morgan from 'morgan'
import { PAYMENT_API_V1 } from './routes/v1/index.js'
import { config } from './config/zalopay.config.js'
import axios from 'axios'
const app = express()

app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use('/api', PAYMENT_API_V1)
// app.post('/payment', async (req, res) => {
//     const embed_data = {};
//     const items = [{}];
//     const transID = Math.floor(Math.random() * 1000000);
//     const order = {
//         app_id: config.app_id,
//         app_trans_id: `${moment().format('YYMMDD')}_${transID}`,
//         app_user: "user123",
//         app_time: Date.now(),
//         item: JSON.stringify(items),
//         embed_data: JSON.stringify(embed_data),
//         amount: 50000,
//         description: `Lazada - Payment for the order #${transID}`,
//         bank_code: "zalopayapp",
//     };
//     const data = config.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
//     order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
//     try {
//         const reponse = await axios.post(config.endpoint, null, { params: order })
//         console.log(reponse.data);
//         return res.status(200).json(reponse.data)
//     } catch (error) {
//         console.error(`Something went wrong: ${error.message}`);
//     }
// })
// app.get('/demo', async (req, res) => {
//     res.json({ cd: 'hello' })
// })
export { app }