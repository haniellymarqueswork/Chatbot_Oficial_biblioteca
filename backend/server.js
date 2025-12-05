import express from "express";
import cors from "cors";
import dotevn from "dotenv";
import OpenAI from "openai";

dotevn.config();

const app = express();

// anotando para lembrar: permite que o F acesse o B
app.use(cors());

//deixa receber JSON no body da requisição 
app.use(express.json());

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

//rota de teste
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  const response = await client.chat.completions.create({
    model: "gpt-4.1",
    messages: [
      { role: "system", content: "Você é o chatbot da biblioteca…" },
      { role: "user", content: message },
    ],
  });

  res.json({ reply: response.choices[0].message.content });
});

//vamos iniciar essa beleza no servidor 
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});