import { useState, useEffect, useRef } from "react";
import Suggestions from "../../components/suggestions/Suggestions";
import "./chatbot.css";

function renderBotText(text) {
  if (!text) return null;

  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);

  return (
    <div style={{ whiteSpace: "pre-line" }}>
      {parts.map((part, index) => {
        const isLink = /^https?:\/\/[^\s]+$/.test(part);

        return isLink ? (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#004cff", fontWeight: "bold" }}
          >
            {part}
          </a>
        ) : (
          <span key={index}>{part}</span>
        );
      })}
    </div>
  );
}

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(text) {
    const messageText = text ?? input;

    if (!messageText.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: messageText }]);
    setInput("");
    setMenuOpen(false);

    try {
      const response = await fetch(
        "https://chatbot-biblioteca-backend.onrender.com/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: messageText }),
        }
      );

      const data = await response.json();

      setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Desculpe, erro ao tentar conectar ao servidor.",
        },
      ]);
    }
  }

  return (
    <div className="chat-container">
      <h2 className="chat-title">INDEXIA</h2>

      <div className="chat-layout">
        <div className="suggestions-desktop">
          <Suggestions onSelect={(question) => sendMessage(question)} />
        </div>

        <div className="chat-main">
          <button
            className="mobile-menu-button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir sugestões"
          >
            ?
          </button>

          <div className="chat-box">
            {messages.length === 0 && (
              <div className="chat-welcome">
                Olá, eu sou o IndexIA ! <br />
                Como posso te ajudar hoje?
              </div>
            )}

            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.sender === "bot" ? renderBotText(msg.text) : msg.text}
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

            <button className="send-button" onClick={() => sendMessage()}>
              Enviar
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <>
          <div className="mobile-overlay" onClick={() => setMenuOpen(false)} />

          <div className="mobile-suggestions-panel">
            <div className="mobile-suggestions-header">
              <h3>Pergunte-nos</h3>
              <button
                className="close-menu-button"
                onClick={() => setMenuOpen(false)}
                aria-label="Fechar sugestões"
              >
                ✕
              </button>
            </div>

            <Suggestions onSelect={(question) => sendMessage(question)} />
          </div>
        </>
      )}
    </div>
  );
}