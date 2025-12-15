export const intents = [
  {
    intent: "horario",
    keywords: ["horario", "abre", "fecha", "funciona"],
    reply: "📚 A biblioteca funciona de segunda a sexta, das 8h às 18h."
  },
  {
    intent: "emprestimo",
    keywords: ["emprestar", "emprestimo", "pegar livro", "retirar"],
    reply: "📖 Para emprestar um livro, é necessário estar cadastrado na biblioteca."
  },
  {
    intent: "devolucao",
    keywords: ["devolver", "devolucao", "prazo", "atraso"],
    reply: "⏰ O prazo padrão de devolução é de 7 dias, com possibilidade de renovação."
  },
  {
    intent: "localizacao",
    keywords: ["onde fica", "endereco", "localizacao"],
    reply: "📍 A biblioteca fica no prédio principal, próxima à secretaria."
  }
];
