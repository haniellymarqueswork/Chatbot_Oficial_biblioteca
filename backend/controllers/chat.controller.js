import pool from "../config/database.js";
import { gerarRespostaComGroq } from "../services/groqService.js";
import { classificarIntentComGroq } from "../services/classificarIntentGroq.js";

export async function chatController(req, res) {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        reply: "Nenhuma mensagem foi enviada.",
      });
    }

    const texto = message.trim();

    console.log("Mensagem recebida:", texto);

    if (texto.length <= 15) {
      const intentCurta = await classificarIntentComGroq(texto);
      console.log("Intent curta classificada:", intentCurta);

      if (intentCurta === "saudacao") {
        const resposta = await gerarRespostaComGroq(
          texto,
          "Responda de forma simpática e breve como assistente virtual da biblioteca, dando boas-vindas e dizendo que pode ajudar com horário, empréstimos, renovação, devolução e multas."
        );

        return res.json({ reply: resposta });
      }

      if (intentCurta === "agradecimento") {
        const resposta = await gerarRespostaComGroq(
          texto,
          "Responda de forma simpática e breve ao agradecimento do usuário, como assistente virtual da biblioteca."
        );

        return res.json({ reply: resposta });
      }

      if (intentCurta === "despedida") {
        const resposta = await gerarRespostaComGroq(
          texto,
          "Responda de forma simpática e breve à despedida do usuário, como assistente virtual da biblioteca."
        );

        return res.json({ reply: resposta });
      }
    }

    let result = await pool.query(
      `
      SELECT i.resposta, i.nome
      FROM public.perguntas p
      JOIN public.intents i ON i.id = p.intent_id
      WHERE
        unaccent(lower($1)) LIKE '%' || unaccent(lower(p.pergunta)) || '%'
        OR
        unaccent(lower(p.pergunta)) LIKE '%' || unaccent(lower($1)) || '%'
      ORDER BY length(p.pergunta) DESC
      LIMIT 1;
      `,
      [texto]
    );

    console.log("Resultados da busca inicial:", result.rows.length);

    if (result.rows.length > 0) {
      const respostaOficial = result.rows[0].resposta;

      return res.json({
        reply: respostaOficial,
      });
    }

    console.log("Entrou na classificação por intent");

    const intent = await classificarIntentComGroq(texto);
    console.log("Intent classificada pela Groq:", intent);

    if (intent && intent !== "desconhecida") {
      result = await pool.query(
        `
        SELECT resposta, nome
        FROM public.intents
        WHERE unaccent(lower(nome)) = unaccent(lower($1))
        LIMIT 1;
        `,
        [intent]
      );

      console.log("Resultados da busca por intent:", result.rows.length);

      if (result.rows.length > 0) {
        const respostaOficial = result.rows[0].resposta;

        return res.json({
          reply: respostaOficial,
        });
      }
    }

    return res.json({
      reply:
        "Não encontrei essa informação. Você pode perguntar sobre horário, empréstimo, multa, devolução ou renovação.",
    });
  } catch (error) {
    console.error("Erro no chatController:", error);
    return res.status(500).json({
      reply: "Desculpe, ocorreu um erro interno.",
    });
  }
}