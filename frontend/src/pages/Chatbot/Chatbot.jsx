import { useState, useEffect, useRef } from "react";
import "./chatbot.css";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim()) return;

    const userText = input;

    setMessages(prev => [...prev, { sender: "user", text: userText }]);
    setInput("");

    try {
      const response = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      const data = await response.json();

      setMessages(prev => [
        ...prev,
        { sender: "bot", text: data.reply },
      ]);

    } catch {
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: "❌ Erro ao tentar conectar ao servidor." },
      ]);
    }
  }

  return (
    <div className="chat-container">
      <h2 className="chat-title">IndexIA</h2>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}

        
        <div ref={messagesEndRef} />
      </div>

      <div className="input-area">
        <input
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua mensagem..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button className="send-button" onClick={sendMessage}>
          Enviar
        </button>
      </div>
    </div>
  );
}
