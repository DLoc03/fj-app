import express from "express";
import { config } from "../../config/zalopay.config.js";
import CryptoJS from 'crypto-js'
import axios from 'axios'
import moment from 'moment'
const Router = express.Router()

Router.route('/')
    .post(async (req, res) => {
        const embed_data = {};
        const items = [{}];
        const transID = Math.floor(Math.random() * 1000000);
        const order = {
            app_id: config.app_id,
            app_trans_id: `${moment().format('YYMMDD')}_${transID}`,
            app_user: "user123",
            app_time: Date.now(),
            item: JSON.stringify(items),
            embed_data: JSON.stringify(embed_data),
            amount: 50000,
            description: `Lazada - Payment for the order #${transID}`,
            bank_code: "zalopayapp",
        };
        const data = config.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
        order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
        try {
            const reponse = await axios.post(config.endpoint, null, { params: order })
            console.log(reponse.data);
            return res.status(200).json(reponse.data)
        } catch (error) {
            console.error(`Something went wrong: ${error.message}`);
        }
    })

export const paymentRoute = Router