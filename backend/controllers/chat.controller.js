import { intents } from "../data/intents.js";
import { normalizeText } from "../utils/textUtils.js";
import OpenAI from "openai";

// instancia uma vez (boa prática)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function chatController(req, res) {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        reply: "Nenhuma mensagem foi enviada.",
      });
    }

    const text = normalizeText(message);

    // 1️⃣ Verifica intents fixas
    for (const intent of intents) {
      if (intent.keywords.some(keyword => text.includes(keyword))) {
        return res.json({ reply: intent.reply });
      }
    }

    // 2️⃣ Se não achou intent → usa IA
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
Você é um assistente virtual de uma biblioteca.
Você pode indicar livros por área do conhecimento como tecnologia, programação, Java, banco de dados, saúde e educação.
Se a pergunta não tiver relação com livros, leitura ou biblioteca, responda educadamente que não pode ajudar.
          `,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    return res.json({
      reply: completion.choices[0].message.content,
    });

  } catch (error) {
    console.error("Erro no chatController:", error);
    return res.status(500).json({
      reply: "Ocorreu um erro interno. Tente novamente mais tarde.",
    });
  }
}
