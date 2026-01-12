import { intents } from "../data/intents.js";
import { normalizeText } from "../utils/textUtils.js";
import { gerarResposta } from "../services/openai.service.js";

export async function chatController(req, res) {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        reply: "Nenhuma mensagem foi enviada.",
      });
    }

    const text = normalizeText(message);

    // 1️⃣ Intents diretos (sem IA)
    for (const intent of intents) {
      if (intent.keywords.some(keyword => text.includes(keyword))) {
        return res.json({ reply: intent.reply });
      }
    }

    // 2️⃣ System base (STRING)
    const systemBase = {
      role: "system",
      content: `
Você é um assistente virtual de uma biblioteca universitária.
Ajude apenas com assuntos relacionados a livros, leitura, estudo, biblioteca, autores e faça resumo quando solicitado.
Indique livros por área do conhecimento quando solicitado.
Se a pergunta não for relacionada à biblioteca, responda educadamente que não pode ajudar.
Se não souber a resposta, diga que não sabe.
      `,
    };

    const messages = [
      systemBase,
      {
        role: "user",
        content: message,
      },
    ];

    // 3️⃣ IA
    const resposta = await gerarResposta(messages);

    return res.json({ reply: resposta });

  } catch (error) {
    console.error("Erro no chatController:", error);
    return res.status(500).json({
      reply: "Ocorreu um erro interno. Tente novamente mais tarde.",
    });
  }
}
