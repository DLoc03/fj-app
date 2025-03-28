import { app } from "./app.js";
import 'dotenv/config'
import { CONNNECT_DB } from "./config/mongo.js";


const PORT = process.env.APP_PORT || 8080
const HOST = process.env.APP_HOST


async function START_SERVER() {

    app.listen(PORT, () => {
        console.log(`Server is running on http://${HOST}:${PORT}`);
    })
}

CONNNECT_DB().then(START_SERVER).catch(e => console.error(e))