import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function testarGemini() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Responda apenas: conexão funcionando.",
    });

    console.log("Resposta da Gemini:");
    console.log(response.text);
  } catch (error) {
    console.error("Erro ao conectar com Gemini:", error);
  }
}

testarGemini();