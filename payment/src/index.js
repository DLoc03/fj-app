import { app } from "./app.js";
import { createServer } from 'http';
import { socketServer } from "./socket/index.js";

const httpServer = createServer(app);
socketServer(httpServer)
httpServer.listen(3030, () => {
    console.log(`Payment server is running on: http://localhost:3030`);
})