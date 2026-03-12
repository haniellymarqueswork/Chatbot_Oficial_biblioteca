import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function classificarIntentComGroq(message) {
  try {
    const prompt = `
Classifique a mensagem do usuário em apenas uma destas intents:

- saudacao
- agradecimento
- despedida
- horario
- emprestimo
- renovacao
- devolucao
- multa
- desconhecida

Regras:
- Responda com apenas uma palavra.
- Não explique.
- Não escreva frases.
- "oi", "olá", "bom dia", "boa tarde", "boa noite", "tudo bem" => saudacao
- "obrigado", "obrigada", "valeu", "agradeço" => agradecimento
- "tchau", "até mais", "até logo" => despedida
- Perguntas sobre funcionamento ou abrir/fechar => horario
- Perguntas sobre pegar livro emprestado => emprestimo
- Perguntas sobre renovar livro => renovacao
- Perguntas sobre devolver livro => devolucao
- Perguntas sobre multa ou atraso => multa
- Se não se encaixar, responda: desconhecida

Mensagem do usuário: "${message}"
    `;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0,
      max_tokens: 5
    });

    const intent = response.choices[0].message.content
      .trim()
      .toLowerCase()
      .replace(/[^a-z]/g, "");

    return intent;

  } catch (error) {
    console.error("Erro ao classificar intent com Groq:", error);
    return "desconhecida";
  }
}