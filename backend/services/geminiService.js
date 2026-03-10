import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function gerarRespostaGemini(pergunta, respostaOficial = "") {
  const prompt = `
Você é um assistente virtual da biblioteca.

Responda de forma clara, educada e natural.
Use apenas a informação oficial fornecida.
Não invente regras ou informações novas.

Se a resposta não estiver no texto fornecido, diga:
"Não encontrei essa informação na base da biblioteca."

Informação oficial:
${respostaOficial}

Pergunta do usuário:
${pergunta}
`;

  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash",
    contents: prompt,
  });

  return response.text || "";
}