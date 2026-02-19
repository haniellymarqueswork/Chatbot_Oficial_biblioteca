Desenvolvido por Hnielly Marques 

# IndexIA

IndexIA é um assistente digital desenvolvido para otimizar o acesso às informações institucionais da Biblioteca Padre Joaquim Colaço Dourado.

O sistema fornece respostas rápidas, organizadas e estruturadas sobre regras, empréstimos, prazos e normas internas, através de uma interface moderna, responsiva e escalável.

---

## 🚀 Acesse a aplicação

🔗 https://indexia.onrender.com

---

## 🎯 Proposta de Valor

A IndexIA foi criada para:

- Reduzir dúvidas recorrentes
- Agilizar o atendimento institucional
- Facilitar o acesso à informação
- Melhorar a experiência do usuário

O sistema centraliza regras e orientações em uma interface simples e acessível.

---

## 🧠 Como Funciona

A aplicação opera com base em:

- Associação de perguntas a categorias (intents)
- Banco de dados relacional estruturado
- API REST para comunicação frontend ↔ backend
- Renderização dinâmica de respostas
- Conversão automática de listas numeradas em formato estruturado

---

## 🏗️ Arquitetura

### 🔹 Frontend
- React
- Vite
- CSS Responsivo

### 🔹 Backend
- Node.js
- Express
- API REST

### 🔹 Banco de Dados
- Supabase (PostgreSQL)
- Estrutura relacional:
  - `intents`
  - `perguntas`

---

## 📱 Experiência do Usuário

- Interface limpa e institucional
- Responsividade para desktop, tablet e mobile
- Menu lateral com perguntas sugeridas
- Tratamento de carregamento (cold start)
- Organização automática de respostas em listas

---

## 🔄 Escalabilidade e Evolução

A IndexIA foi desenvolvida com foco em extensibilidade, permitindo futuras integrações como:

- Inteligência Artificial
- Painel administrativo
- Autenticação de usuários
- Métricas de uso
- Expansão para múltiplas bibliotecas

---

## 🛠️ Execução Local

### Pré-requisitos
- Node.js instalado

### Backend

```bash
cd backend
npm install
npm run dev

# Frontend 
cd frontend
npm install
npm run dev
