import express, { application, response } from "express";
import { config } from "../../config/zalopay.config.js";
import CryptoJS from 'crypto-js'
import axios from 'axios'
import moment from 'moment'
import qs from 'qs'
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
            amount: 150000,
            description: `Lazada - Payment for the order #${transID}`,
            bank_code: "zalopayapp",
            callback_url: "https://654d-1-52-93-59.ngrok-free.app/api/payment/callback"
        };
        const data = config.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
        order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
        try {
            const reponse = await axios.post(config.CREATE, null, { params: order })
            return res.status(200).json(reponse.data)
        } catch (error) {
            console.error(`Something went wrong: ${error.message}`);
        }
    })


Router.route('/callback')
    .post(async (req, res) => {
        let result = {};

        try {
            let dataStr = req.body.data;
            let reqMac = req.body.mac;

            let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
            console.log("mac =", mac);
            if (reqMac !== mac) {
                result.returncode = -1;
                result.returnmessage = "mac not equal";
            }
            else {

                let dataJson = JSON.parse(dataStr, config.key2);
                console.log(dataJson);

                console.log("update order's status = success where apptransid =", dataJson["app_trans_id"]);

                result.returncode = 1;
                result.returnmessage = "success";
            }
        } catch (ex) {
            result.returncode = 0;
            result.returnmessage = ex.message;
        }
        console.log(result);

        res.json(result);
    })

Router.route('/query')
    .post(async (req, res) => {
        let postData = {
            app_id: config.app_id,
            app_trans_id: "250403_795918"
        }
        let data = postData.app_id + "|" + postData.app_trans_id + "|" + config.key1;
        postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
        let postConfig = {
            method: 'post',
            url: config.QUERY,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify(postData)
        };
        try {
            const response = await axios(postConfig)
            return res.status(200).json(response.data)
        } catch (error) {
            console.error(`Something went wrong: ${error.message}`);
        }
    })

Router.route('/refund')
    .post(async (req, res) => {
        const timestamp = Date.now();
        const uid = `${timestamp}${Math.floor(111 + Math.random() * 999)}`;

        const params = {
            appid: config.app_id,
            mrefundid: `${moment().format('YYMMDD')}_${config.app_id}_${uid}`,
            timestamp, // miliseconds
            zptransid: '250403000015109',
            amount: 150000,
            description: 'ZaloPay Refund Demo',
        }
        let data = params.appid + "|" + params.zptransid + "|" + params.amount + "|" + params.description + "|" + params.timestamp;
        params.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
        console.log(params);

        try {
            const reponse = await axios.post(config.REFUND, null, { params })
            console.log(reponse.data);

            res.status(200).json(reponse.data)
        } catch (error) {
            console.error(error.message);
        }
    })

Router.route('/status')
    .get(async (req, res) => {
        const params = {
            appid: config.app_id,
            timestamp: Date.now(),
            mrefundid: "250403_2554_17436858190181073",
        };

        const data = config.app_id + "|" + params.mrefundid + "|" + params.timestamp; // appid|mrefundid|timestamp
        params.mac = CryptoJS.HmacSHA256(data, config.key1).toString()
        try {
            const reponse = await axios.get(config.STATUS, { params })
            return res.status(200).json(reponse.data)
        } catch (error) {
            console.error(error.message);
        }

    })
export const paymentRoute = Router