import { config } from "../config/zalopay.config.js";
import { ORDER } from "../utils/constant.js";
import { SOCKET } from "../utils/enum.js";
import moment from "moment";
import axios from "axios";
import CryptoJS from "crypto-js";
import qs from 'qs'
export const handleSocket = (socket) => {
    socket.on(SOCKET.PAY, async (data) => {
        try {
            const { email, items, embed_data, price } = data;
            const order = ORDER(items, embed_data, email, price);
            const dataString = `${config.app_id}|${order.app_trans_id}|${order.app_user}|${order.amount}|${order.app_time}|${order.embed_data}|${order.item}`;
            order.mac = CryptoJS.HmacSHA256(dataString, config.key1).toString();
            console.log(dataString);

            const response = await axios.post(config.CREATE, null, { params: order });
            socket.emit(SOCKET.SUCCESS, { response: response.data });
        } catch (error) {
            console.error('Error in payment processing:', error.message);
            socket.emit(SOCKET.ERROR, { message: error.message });
        }
    });

    socket.on(SOCKET.QUERY, async (id) => {
        const { app_trans_id } = id

        let postData = {
            app_id: config.app_id,
            app_trans_id: `${app_trans_id}`
        }
        let data = postData.app_id + "|" + postData.app_trans_id + "|" + config.key1;
        postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
        console.log(postData.mac);

        let postConfig = {
            method: 'post',
            url: config.QUERY,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify(postData)
        };
        try {
            const reponse = await axios(postConfig)
            console.log(reponse.data);
            socket.emit(SOCKET.SUCCESS, { response: reponse.data })
        } catch (error) {
            socket.emit(SOCKET.ERROR, { message: error.message });
        }
    })

    socket.on(SOCKET.REFUND, async (info) => {
        const { zp_trans_id, amount } = info
        const timestamp = Date.now();
        const uid = `${timestamp}${Math.floor(111 + Math.random() * 999)}`;

        let params = {
            app_id: config.app_id,
            m_refund_id: `${moment().format('YYMMDD')}_${config.app_id}_${uid}`,
            timestamp: timestamp,
            zp_trans_id: `${zp_trans_id}`,
            amount: amount,
            description: 'ZaloPay Refund Demo',
        };
        console.log(params);
        let data = params.app_id + "|" + params.zp_trans_id + "|" + params.amount + "|" + params.description + "|" + params.timestamp;
        params.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
        try {
            const response = await axios.post(config.REFUND, null, { params })
            console.log(response.data);
            socket.emit(SOCKET.SUCCESS, { response: response.data })
        } catch (error) {
            socket.emit(SOCKET.ERROR, { message: error.message })
        }
    })
}