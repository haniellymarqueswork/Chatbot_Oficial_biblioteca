import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function chamarGroq(messages, options = {}) {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: options.max_tokens ?? 320,
      temperature: options.temperature ?? 0.6,
      messages,
    });

    console.log("finish_reason:", completion.choices[0].finish_reason);
    console.log("usage:", completion.usage);

    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.error("Erro na Groq:", error);
    throw error;
  }
}

export async function responderMensagemCurta(texto, tipo) {
  let instrucao = "";

  if (tipo === "saudacao") {
    instrucao = `
Você é o IndexIA, assistente virtual de uma biblioteca universitária.
Responda de forma simpática, breve, natural e acolhedora.
Dê boas-vindas e diga que pode ajudar com horário, empréstimos, renovação, devolução e multas.
Mantenha a resposta curta.
Responda em português do Brasil.
`;
  }

  if (tipo === "agradecimento") {
    instrucao = `
Você é o IndexIA, assistente virtual de uma biblioteca universitária.
Responda ao agradecimento do usuário de forma simpática, breve e natural.
Mantenha a resposta curta.
Responda em português do Brasil.
`;
  }

  if (tipo === "despedida") {
    instrucao = `
Você é o IndexIA, assistente virtual de uma biblioteca universitária.
Responda à despedida do usuário de forma simpática, breve e natural.
Mantenha a resposta curta.
Responda em português do Brasil.
`;
  }

  if (!instrucao) {
    return texto;
  }

  return await chamarGroq(
    [
      {
        role: "system",
        content: instrucao,
      },
      {
        role: "user",
        content: texto,
      },
    ],
    {
      temperature: 0.6,
      max_tokens: 80,
    }
  );
}

export async function humanizarRespostaBiblioteca(pergunta, respostaOficial) {
  try {
    console.log("Humanizando resposta oficial com Groq...");
    console.log("Pergunta:", pergunta);
    console.log("Resposta oficial:", respostaOficial);

    const resposta = await chamarGroq(
      [
        {
          role: "system",
          content: `
Você é o IndexIA, assistente virtual de uma biblioteca universitária.

Sua tarefa é reescrever uma resposta oficial de forma mais clara, natural e humana.

Regras obrigatórias:
- Não invente informações.
- Não altere regras, prazos, horários, quantidades, contatos ou procedimentos.
- Não acrescente fatos novos.
- Não contradiga a resposta oficial.
- Apenas reorganize e melhore a explicação.
- Responda em português do Brasil.
- Seja objetiva.
- Não adicione saudação.
- Não adicione introdução longa.
- Não adicione comentários extras.
- Quando houver vários itens, use tópicos curtos.
- Preserve todas as informações importantes da resposta oficial.
- Finalize a resposta de forma completa.
`,
        },
        {
          role: "user",
          content: `
Pergunta do usuário:
${pergunta}

Resposta oficial da biblioteca:
${respostaOficial}

Reescreva a resposta de forma objetiva, acolhedora e organizada.
`,
        },
      ],
      {
        temperature: 0.3,
        max_tokens: 320,
      }
    );

    console.log("Resposta humanizada:", resposta);
    return resposta;
  } catch (error) {
    console.error("Erro ao humanizar resposta da biblioteca:", error);
    return respostaOficial;
  }
}

export async function responderPerguntaLiteraria(pergunta) {
  try {
    console.log("Respondendo pergunta literária com Groq...");
    console.log("Pergunta:", pergunta);

    const resposta = await chamarGroq(
      [
        {
          role: "system",
          content: `
Você é o IndexIA, assistente virtual de uma biblioteca universitária.

Você pode:
- conversar sobre autores
- explicar ideias centrais de livros
- falar sobre gêneros literários
- comentar temas de leitura

Regras:
- Responda de forma natural, simpática e clara.
- Responda em português do Brasil.
- Vá direto ao ponto.
- Prefira resposta curta ou média.
- Não faça introduções longas.
- Não invente regras internas da biblioteca.
- Se a pergunta for sobre funcionamento da biblioteca e você não tiver resposta oficial, diga isso com honestidade.
- Se não souber algo com segurança, admita isso com naturalidade.
- Finalize a resposta de forma completa, sem interromper no meio.
`,
        },
        {
          role: "user",
          content: pergunta,
        },
      ],
      {
        temperature: 0.5,
        max_tokens: 260,
      }
    );

    console.log("Resposta literária:", resposta);
    return resposta;
  } catch (error) {
    console.error("Erro ao responder pergunta literária:", error);
    return "Não encontrei essa informação específica da biblioteca, mas posso conversar com você sobre autores, livros e leitura.";
  }
}