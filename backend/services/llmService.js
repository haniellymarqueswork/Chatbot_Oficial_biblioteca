import { gerarRespostaGemini } from "./geminiService.js";

export async function gerarRespostaComIA(pergunta, respostaOficial) {
  try {
    const resposta = await gerarRespostaGemini(pergunta, respostaOficial);
    return resposta;
  } catch (error) {
    console.error("Erro no serviço de IA:", error);

    if (error?.status === 429) {
      console.log("Limite da IA atingido. Usando resposta do banco.");
    }

    return respostaOficial;
  }
}

