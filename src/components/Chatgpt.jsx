import React, { useState } from "react";
import axios from "axios";
import './Chatgpt.css'
const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (input.trim() === "") return;

    // Add user message to the chat
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");

    // Send message to the backend API
    try {
      const response = await axios.post("http://localhost:5000/api/chat", {
        message: input,
      });
      const botMessage = response.data.response;

      // Add bot response to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, sender: "user" },
        { text: botMessage, sender: "bot" },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatApp;