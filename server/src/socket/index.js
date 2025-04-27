import { Server } from "socket.io";
import { SOCKET_ENUM } from "../utils/enum.js";
import chatHandler from "./handler/chatHandler.js";

export function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-type"],
    },
  });
  io.on(SOCKET_ENUM.CONNECT, (socket) => {
    console.log(`User join room with id: ${socket.id}`);
    chatHandler(socket);
  });
}
