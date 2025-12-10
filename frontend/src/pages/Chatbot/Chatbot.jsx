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
      text: "Olá! Eu sou o IndexIa, chatbot da biblioteca. Como posso te ajudar hoje?",
    };

    setMessages((prev) => [...prev, userMessage, botResponse]);

    setInput("");
  }

  return (
    <div style={styles.container}>
      <h2>INDEXIA</h2>

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

        <button 
        style={{fontSize:"15px", margin: 0, border: "none",borderRadius: "16px", color:"#ffffffff", background: "#8c0005", cursor:"pointer" }} onClick={sendMessage}>
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
    background: "#bb0000",
    padding: 0,
    margin: 0,
    fontFamily: "Montserrat', sans-serif",
    
    
  },

  // aqui é onde aparece as mensagens usuário x chat
  chatBox: {
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "20px",
    background: "#ffffffff",
    fontFamily: "Arial",
    
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
    background: "#ffffff73",
  },

  //a caixa onde o usuário digita
  input: {
    flex: 1,
    padding: "13px",
    borderRadius: "26px",
    background:"#6f70706c",
    border:"none"
  },

  //o botão de enviar
  button: {
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius:"20px",
    background:"#db0404fd",
    border:"none"
    
  
  },
};
