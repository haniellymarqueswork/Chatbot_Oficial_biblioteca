export const intents = [
  {
    intent: "horario",
    keywords: ["horario", "abre", "fecha", "funciona"],
    reply: "A biblioteca Padre Joaquim Colaço Dourado funciona de segunda a sexta, das 8h às 21h, e aos sábados, das 8h às 12h."
  },
  {
    intent: "emprestimo",
    keywords: ["emprestar", "emprestimo", "pegar livro", "retirar"],
    reply: "Para pegar um livro emprestado, é necessário estar devidamente matriculado e ter cadastro na biblioteca. O empréstimo acontece apenas de forma presencial."
  },
  {
    intent: "devolucao",
    keywords: ["devolver", "devolucao", "prazo", "atraso"],
    reply: "A devolução funciona da seguinte forma: \n" +
    "Para alunos da graduação o prazo é de 10 dias úteis\n" +
    "Para alunos da Pós-Graduação o prazo é de 15 dias úteis \n"+
    "Para professores, o prazo é de 30 dias \n" 
  },

  {
    intent: "renovacao",
    keywords: ["renovar", "renovacao", "prorrogar"],
    reply: "Seja o usuário professor ou aluno (Graduação ou Pós-Graduação) a quantidade de renovação é a mesma. Tendo disponíveis 3 renovações por empréstimo."
  },

  {
    intent: "localizacao",
    keywords: ["onde fica", "endereco", "localizacao"],
    reply: "Rodovia BR 230, Km 14, s/n, Morada Nova. Cabedelo - PB. CEP 58109-303"
  }
];
