import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chat.routes.js";
import suggestionsRoutes from "./routes/suggestions.js";



const app = express();

app.use(cors());

app.use(express.json());

app.use("/chat", chatRoutes);

app.use("/suggestions", suggestionsRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});