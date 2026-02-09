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
    intent: "tempo de emprestimo",
    keywords: ["limite", "tempo", "prazo"],
    reply: "O tempo de empréstimo funciona da seguinte forma: \n" +
    " - Para alunos da graduação o prazo é de 10 dias úteis\n" +
    " - Para alunos da Pós-Graduação o prazo é de 15 dias úteis \n"+
    " - Para professores, o prazo é de 30 dias \n" 
  },

  {
    intent: "atraso",
    keywords:["multa", "atraso", "atrasei", "valor"],
    reply: "Em caso de atraso na devolução, o usuário pagará uma multa no valor de R$ 2,00 reais por dia e por livro. Lembrando que a multa só para na devolução dos exemplares. "

  },

  {
    intent: "devolucao",
    keywords: ["devolução", "devolver", "entregar"],
    reply: "O livro precisa ser devolvido de forma presencial, mas caso o usuário não consiga devolver pessoalmente, outra pessoa pode devolver em seu lugar."

  },

  
 {
  intent: "renovacao",
  keywords: ["renovar", "renovacao", "prorrogar"],
  reply: `
Seja o usuário professor ou aluno (Graduação ou Pós-Graduação) a quantidade de renovações é a mesma.
Tendo disponíveis 3 renovações por empréstimo.

Para renovar, basta ir na área do usuário e digitar a matrícula e senha da biblioteca.

Para renovar, acesse a biblioteca:
<a href="https://biblioteca.iesp.edu.br/instituicao/detalhe/1/true" target="_blank" rel="noopener noreferrer">
Clique aqui
</a>
`
},


  {
    intent: "localizacao",
    keywords: ["onde fica", "endereco", "localizacao"],
    reply: "Rodovia BR 230, Km 14, s/n, Morada Nova. Cabedelo - PB. CEP 58109-303"
  },

  {
    intent: "IndexIA",
    keywords: ["finalidade", "o que pode fazer", "IndexIA"],
    reply: " O IndexIA é um assistente inteligente que entende o que você precisa. Ele localiza informações, interpreta dados e entrega respostas claras, otimizando tempo e reduzindo esforços."
  }
];
