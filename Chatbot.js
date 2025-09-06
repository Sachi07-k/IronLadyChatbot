import React, { useState, useRef, useEffect } from "react";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Auto scroll 
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    try {
      
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      
      setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error: Could not connect to server." },
      ]);
    }
  };

  return (
    <div className="chat-container">
    <div className="chat-header">
  <div className="chat-header-content">
    <img
      src="https://img.icons8.com/color/48/robot-2.png"
      alt="chatbot"
      className="chat-avatar"
    />
    <h2 className="chat-title">Iron Lady Chatbot</h2>
  </div>
  <h3 className="chat-subtitle">Your Leadership Program Assistant</h3>
</div>

      <div className="chat-box">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={msg.sender === "user" ? "user-msg" : "bot-msg"}
          >
            {msg.text}
          </div>
        ))}
        {}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me about Iron Lady..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chatbot;
