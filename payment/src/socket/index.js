import { Server } from "socket.io";
import { handleSocket } from "./handleSocket.js";
import { SOCKET } from "../utils/enum.js";

export const socketServer = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
            allowedHeaders: '*',
            credentials: true
        },
    });
    io.on(SOCKET.CONNECT, (socket) => {
        handleSocket(socket)
        console.log(`Socket connected: ${socket.id}`);
        socket.emit(SOCKET.SUCCESS, { message: "Socket connected successfully" });
        socket.on(SOCKET.DISCONNECT, () => {
            console.log(`Socket disconnected: ${socket.id}`);
        })
    });
}