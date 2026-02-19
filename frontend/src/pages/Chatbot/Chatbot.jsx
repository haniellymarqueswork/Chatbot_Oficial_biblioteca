import { useState, useEffect, useRef } from "react";
import Suggestions from "../../components/suggestions/Suggestions";
import "./chatbot.css";

function renderBotText(text) {
  if (!text) return null;

  const lines = text
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  if (lines.length <= 1) return <p>{text}</p>;

  const numbered = lines.filter((l) => /^\d+\.\s+/.test(l));
  const nonNumbered = lines.filter((l) => !/^\d+\.\s+/.test(l));

  const dashed = lines.filter((l) => /^-\s+/.test(l));
  const nonDashed = lines.filter((l) => !/^-\s+/.test(l));

  if (numbered.length >= 2) {
    const intro = nonNumbered.join(" ");
    return (
      <>
        {intro && <p>{intro}</p>}
        <ol>
          {numbered.map((item, i) => (
            <li key={i}>{item.replace(/^\d+\.\s+/, "")}</li>
          ))}
        </ol>
      </>
    );
  }

  if (dashed.length >= 2) {
    const intro = nonDashed.join(" ");
    return (
      <>
        {intro && <p>{intro}</p>}
        <ul>
          {dashed.map((item, i) => (
            <li key={i}>{item.replace(/^-+\s+/, "")}</li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <>
      {lines.map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </>
  );
}

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(text) {
    const messageText = text ?? input;

    if (!messageText.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: messageText }]);
    setInput("");

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
        <Suggestions onSelect={(question) => sendMessage(question)} />

        <div className="chat-main">
          <div className="chat-box">
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
    </div>
  );
}
