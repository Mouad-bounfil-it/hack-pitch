import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8000");

const ChatRoom = ({ room, setCurrentRoom }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit("joinRoom", room);

    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("receiveMessage");
      socket.emit("leaveRoom", room);
    };
  }, [room, socket]);

  const sendMessage = () => {
    if (message) {
      socket.emit("sendMessage", room, message);
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Room: {room}</h2>
      <button onClick={() => setCurrentRoom(null)}>Leave Room</button>
      <div>
        <h3>Messages:</h3>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatRoom;
