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
  content: `
Você é um assistente virtual de uma biblioteca universitária.
Seu papel é ajudar usuários com:

- Informações sobre a biblioteca (horários, empréstimos, renovação, localização)
- Indicação de livros por área do conhecimento (tecnologia, saúde, direito, educação, etc.)
- Orientação sobre leitura e pesquisa acadêmica

Quando o usuário pedir indicação de livros por área, responda normalmente.
Caso o assunto não tenha relação com livros, leitura, estudo ou biblioteca,
explique educadamente que você só responde assuntos relacionados a esses temas.
`
},

      {
        role: "user",
        content: mensagemUsuario,
      },
    ],
  });

  return response.choices[0].message.content;
}
