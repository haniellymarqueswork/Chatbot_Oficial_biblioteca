import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function gerarRespostaComGroq(message, respostaOficial) {
  try {
    console.log("Chamando Groq...");
    console.log("Pergunta:", message);
    console.log("Resposta oficial:", respostaOficial);

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 200,
      temperature: 0.4,
      messages: [
        {
          role: "system",
          content:
            "Você é a assistente virtual de uma biblioteca universitária. Sua função é reescrever respostas oficiais de forma humana, simpática, clara e objetiva, sem inventar informações novas.",
        },
        {
          role: "user",
          content: `
Pergunta do usuário: ${message}

Resposta oficial da biblioteca:
${respostaOficial}

Reescreva essa resposta de forma mais natural, acolhedora e clara, mas sem alterar o sentido e sem inventar nada.
          `,
        },
      ],
    });

    const respostaFinal = completion.choices[0].message.content;

    console.log("Resposta da Groq:", respostaFinal);

    return respostaFinal;
  } catch (error) {
    console.error("Erro na Groq:", error);
    return respostaOficial;
  }
}