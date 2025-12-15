import { intents } from "../data/intents.js";
import { normalizeText } from "../utils/textUtils.js";

export async function chatController(req, res) {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        reply: "Nenhuma mensagem foi enviada.",
      });
    }

    const text = normalizeText(message);

    // 1️⃣ Verifica respostas fixas (biblioteca)
    for (const intent of intents) {
      if (intent.keywords.some(keyword => text.includes(keyword))) {
        return res.json({ reply: intent.reply });
      }
    }

    // 2️⃣ Caso não encontre intenção
    return res.json({
      reply:
        "🤖 Posso te ajudar apenas com assuntos relacionados à biblioteca e livros. Se quiser, pergunte sobre horário, empréstimos ou localização.",
    });

  } catch (error) {
    console.error("Erro no chatController:", error);
    return res.status(500).json({
      reply: "Ocorreu um erro interno. Tente novamente mais tarde.",
    });
  }
}
