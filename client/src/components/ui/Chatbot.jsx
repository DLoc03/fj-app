import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { Chat as ChatIcon } from "@mui/icons-material";
import io from "socket.io-client";
import { SOCKET_ENUM } from "../../common/enum/enum";
import Logo from "../../assets/logo.png";
import { formatTextChat } from "../../utils/helper";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Chào bạn! Bạn cần giúp gì hôm nay?" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_URL);
    setSocket(socket);

    socket.on(SOCKET_ENUM.BOT_MESSAGE, (data) => {
      const formattedText = formatTextChat(data.result);

      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];

        const lastMessage = updatedMessages[updatedMessages.length - 1];

        if (lastMessage && lastMessage.sender === "bot") {
          lastMessage.text = lastMessage.text + formattedText;
        } else {
          updatedMessages.push({ sender: "bot", text: formattedText });
        }

        return updatedMessages;
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleToggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && socket) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", text: newMessage },
      ]);
      setNewMessage("");

      socket.emit(SOCKET_ENUM.SEND_MESSAGE, newMessage);

      setMessages((prevMessages) => [...prevMessages]);
    }
  };

  return (
    <Box>
      <Button
        sx={{
          position: "fixed",
          zIndex: "8888",
          bottom: 16,
          right: 16,
          borderRadius: "50%",
          width: 56,
          height: 56,
          backgroundColor: "secondary.main",
          boxShadow: 3,
        }}
        onClick={handleToggleChat}
      >
        <ChatIcon sx={{ color: "white" }} />
      </Button>

      {isChatOpen && (
        <Paper
          sx={{
            zIndex: "8888",
            position: "fixed",
            bottom: 80,
            right: 16,
            width: 300,
            height: 420,
            borderRadius: 2,
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8)",
            padding: 2,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "background.paper",
          }}
        >
          <Box display={"flex"} justifyContent={"center"} width={"100%"}>
            <img
              src={Logo}
              alt="logo"
              height={"40px"}
              width={"40px"}
              style={{ border: "2px solid gray", borderRadius: "50%" }}
            />
          </Box>
          <Typography
            variant="h6"
            sx={{ mb: 2, textAlign: "center" }}
            fontWeight={700}
            color="primary.main"
          >
            FJ BOT
          </Typography>

          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              marginBottom: 2,
              padding: 1,
              backgroundColor: "#f1f1f1",
              borderRadius: 1,
            }}
          >
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent:
                    msg.sender === "bot" ? "flex-start" : "flex-end",
                  marginBottom: 1,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "12px",
                    backgroundColor:
                      msg.sender === "bot" ? "#d1f7c4" : "#cfe2ff",
                    padding: 1,
                    borderRadius: 2,
                    maxWidth: "80%",
                    wordBreak: "break-word",
                  }}
                >
                  {msg.text}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              fullWidth
              value={newMessage}
              onChange={handleMessageChange}
              variant="outlined"
              size="small"
              placeholder="Nhập tin nhắn..."
              sx={{ marginRight: 1 }}
              inputProps={{ style: { fontSize: "12px" } }}
            />
            <Button
              onClick={handleSendMessage}
              variant="contained"
              color="primary"
              size="small"
            >
              Gửi
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default Chatbot;
