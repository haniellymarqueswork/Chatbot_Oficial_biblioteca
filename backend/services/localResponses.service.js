import { intents } from "../data/intents.js";
import { normalizeText } from "../utils/textUtils.js";

export async function gerarResposta(messages) {
    
    const ultimaMensagem = normalizeText(messages[messages.length - 1].content);

    for (const intent of intents) {
     if (intent.keywords.some(keyword => ultimaMensagem.includes(keyword))) {
      return intent.reply;
    }
  }

   return "Desculpe, não sei responder essa pergunta.";
}


