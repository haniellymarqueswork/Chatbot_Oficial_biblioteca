import { useState } from "react";
import "./chatbot.css";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");


  function sendMessage() {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };

    const botResponse = {
      sender: "bot",
      text: "Olá! Eu sou o chatbot da biblioteca. Como posso te ajudar hoje?",
    };

    setMessages((prev) => [...prev, userMessage, botResponse]);

    setInput("");
  }

  return (
    <div style={styles.container}>
      <h2>Nexus</h2>

      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              background: msg.sender === "user" ? "#096292ff" : "#b91919ff",
              color: "white",
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div style={styles.inputArea}>
        <input
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua mensagem..."
          
          //responsavél por enviar pelo enter
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />

        <button style={styles.button} onClick={sendMessage}>
          Enviar
        </button>
      </div>
    </div>
  );
}

// isso aqui é responsável pelo layout geral do chat
const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    background: "#3a3a3aff",
    padding: 0,
    margin: 0,
    fontFamily: "Arial",
  },

  // aqui é onde aparece as mensagens usuário x chat
  chatBox: {
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "20px",
    background: "#5f1313ff",
  },

  //o estilo de cada bolha de mensagem
  message: {
    maxWidth: "70%",
    padding: "8px 12px",
    borderRadius: "16px",
  },

  //a barra onde fica o input + botão
  inputArea: {
    display: "flex",
    gap: "8px",
    padding: "20px",
    borderTop: "none",
    background: "#5f1313ff",
  },

  //a caixa onde o usuário digita
  input: {
    flex: 1,
    padding: "13px",
    borderRadius: "26px",
    background:"#d1d1d1ff",
    border:"none"
  },

  //o botão de enviar
  button: {
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius:"20px",
    background:"#a8a8a8",
    border:"none"
  
  },
};
