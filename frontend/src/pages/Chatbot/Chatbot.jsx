import { useState } from "react";
import "./chatbot.css";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");


  async function sendMessage() {
  if (!input.trim()) return;

  const userText = input;

  // 1️⃣ Mostra a mensagem do usuário
  const userMessage = { sender: "user", text: userText };
  setMessages(prev => [...prev, userMessage]);
  setInput("");

  try {
    // 2️⃣ Envia para o backend
    const response = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userText }),
    });

    const data = await response.json();

    // 3️⃣ Mostra a resposta do bot (vinda do backend)
    const botMessage = {
      sender: "bot",
      text: data.reply,
    };

    setMessages(prev => [...prev, botMessage]);

  } catch (error) {
    console.error("Erro ao conectar com o backend:", error);

    setMessages(prev => [
      ...prev,
      {
        sender: "bot",
        text: "❌ Não consegui me conectar ao servidor.",
      },
    ]);
  }
}


  return (
    <div style={styles.container}>
      <h2 style={{color:"white", textAlign:"center", fontSize:"36px"}}>Nexus

      </h2>

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
    background: "#5f1313ff",
    padding: 0,
    margin: 0,
    fontFamily: "Arial",
  },

  // aqui é onde aparece as mensagens usuário x chat
  chatBox: {
  flex: 1,
  overflowY: "auto",
  overflowX: "hidden",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  padding: "20px",
  background: "#fafafaff",
},


  //o estilo de cada bolha de mensagem
  message: {
  maxWidth: "70%",
  padding: "8px 12px",
  borderRadius: "16px",

  wordWrap: "break-word",
  overflowWrap: "break-word",
  whiteSpace: "pre-wrap",
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
    background:"#f0f0f0ff",
    border:"none"
  },

  //o botão de enviar
  button: {
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius:"20px",
    background:"#f0f0f0ff",
    border:"none"
  
  },
};
