import pool from "../config/database.js";
import { normalizeText } from "../utils/textUtils.js";

export async function chatController(req, res) {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        reply: "Nenhuma mensagem foi enviada.",
      });
    }

    const text = message.trim();

  const result = await pool.query(
  `
  SELECT i.resposta
  FROM public.perguntas p
  JOIN public.intents i ON i.id = p.intent_id
  WHERE
    unaccent(lower($1)) LIKE '%' || unaccent(lower(p.pergunta)) || '%'
    OR
    unaccent(lower(p.pergunta)) LIKE '%' || unaccent(lower($1)) || '%'
    ORDER BY length(p.pergunta) DESC

   LIMIT 1;
  `,
  [message]
);





    if (result.rows.length === 0) {
      return res.json({
        reply:
          "Não encontrei essa informação. Você pode perguntar sobre horário, empréstimo, multa, devolução ou renovação.",
      });
    }

    return res.json({
      reply: result.rows[0].resposta,
    });

  } catch (error) {
    console.error("Erro no chatController:", error);
    return res.status(500).json({
      reply: "Desculpe, ocorreu um erro interno.",
    });
  }
}
