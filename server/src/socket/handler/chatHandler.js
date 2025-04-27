import streamDataResponse from "../../service/gemini.service.js";
import { SOCKET_ENUM } from "../../utils/enum.js";

export default function chatHandler(socket) {
  socket.on(SOCKET_ENUM.SEND_MESSAGE, (data) => {
    streamDataResponse(data, (result) => {
      console.log(result);
      socket.emit(SOCKET_ENUM.BOT_MESSAGE, { result });
    });
  });
}
