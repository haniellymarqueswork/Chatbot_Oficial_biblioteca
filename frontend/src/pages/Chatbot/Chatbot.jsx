import { useState } from "react";
import "./chatbot.css"

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  function sendMessage() {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };

    setMessages([...messages, newMessage]);
    setInput("");

   //chamar backend em node futuramente
    const botResponse = {
      sender: "bot",
      text: "Olá! Eu sou o chatbot da biblioteca. Como posso te ajudar hoje?",
    };

     setMessages((prev) => [...prev, botResponse]);
  }

   return (
    <div style={styles.container}>
      <h2>Chatbot da Biblioteca</h2>


     <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              background:
                msg.sender === "user" ? "#096292ff" : "#b91919ff",
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
        />
        <button style={styles.button} onClick={sendMessage}>
          Enviar
        </button>
      </div>
    </div>
  );
}


const styles = {
  container: {
    width: "700px",
    margin: "0 auto",
    marginTop: "40px",
    padding: "20px",
    border: "1px solid #ffffffff",
    borderRadius: "8px",
    fontFamily: "Arial",
   
  },


  chatBox: {
    height: "400px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "10px",
    background: "#f5f5f5ff",
    borderRadius: "5px",
    marginBottom: "10px",
    
  },
  message: {
    maxWidth: "70%",
    padding: "8px 12px",
    borderRadius: "8px",
  },
  inputArea: {
    display: "flex",
    gap: "8px",
  },
  input: {
    flex: 1,
    padding: "8px",
  },
  button: {
    padding: "8px 12px",
    cursor: "pointer",
  },
};