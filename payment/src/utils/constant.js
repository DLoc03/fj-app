import { config } from "../config/zalopay.config.js";
import moment from "moment";

export const ORDER = (items, embed_data, email, price) => {
    const TRANSID = Math.floor(Math.random() * 1000000);
    return {
        app_id: config.app_id,
        app_trans_id: `${moment().format('YYMMDD')}_${TRANSID}`,
        app_user: `${email}`,
        app_time: Date.now(),
        item: JSON.stringify(items),
        embed_data: JSON.stringify(embed_data),
        amount: price,
        description: `Lazada - Payment for the order #${TRANSID}`,
        bank_code: "zalopayapp",
        callback_url: "https://2fda-42-119-13-112.ngrok-free.app/api/payment/callback"
    }
};