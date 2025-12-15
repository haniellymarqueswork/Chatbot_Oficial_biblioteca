import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import chatRoutes from "./routes/chat.routes.js";

dotenv.config();

const app = express();

// Permite comunicação entre Frontend e Backend
app.use(cors());

// Permite receber JSON no body
app.use(express.json());

// Rotas
app.use("/chat", chatRoutes);

// Inicializa o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});