import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chat.routes.js";
import suggestionsRoutes from "./routes/suggestions.js";
import pool from "./config/database.js";

const app = express();

app.use(cors({
  origin: "https://indexia.onrender.com",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));

app.use(express.json());

app.use("/chat", chatRoutes);
app.use("/suggestions", suggestionsRoutes);

app.get("/ping", (req, res) => {
  res.status(200).send("Servidor ativo");
});

pool.query("SELECT NOW()")
  .then(res => console.log("Banco conectado:", res.rows))
  .catch(err => console.error("Erro ao conectar:", err));

setInterval(async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log("Ping no banco executado");
  } catch (error) {
    console.error("Erro no ping do banco:", error);
  }
}, 600000); 

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);

  
});