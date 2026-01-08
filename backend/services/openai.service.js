import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function gerarResposta(mensagemUsuario) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "Você é um assistente virtual de uma biblioteca universitária.",
      },
      {
        role: "user",
        content: mensagemUsuario,
      },
    ],
  });

  return response.choices[0].message.content;
}
