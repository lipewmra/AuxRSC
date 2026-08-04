# Calculadora RSC TAE - Guia de Implantação na Vercel

Este projeto foi configurado e otimizado para implantação direta na **Vercel** (Frontend React/Vite + Serverless Functions em Node.js para as rotas `/api`).

---

## 🚀 Como Implantar na Vercel

### Passo 1: Importar o Repositório na Vercel
1. Acesse o painel da [Vercel](https://vercel.com/) e clique em **"Add New..."** > **"Project"**.
2. Conecte sua conta do GitHub / GitLab e selecione este repositório.

### Passo 2: Configuração do Projeto
A Vercel detectará automaticamente o framework Vite. As configurações já estão prontas no arquivo `vercel.json`:
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Framework Preset:** Vite

### Passo 3: Variáveis de Ambiente (Environment Variables)
No painel de implantação da Vercel, acesse a seção **Environment Variables** e adicione:

| Nome da Variável | Descrição / Valor |
| :--- | :--- |
| `GEMINI_API_KEY` | Sua chave de API do Google Gemini (obtida no Google AI Studio) |

> ⚠️ **Importante:** Sem a chave `GEMINI_API_KEY`, as funcionalidades de IA (Análise de PDF com Gemini, Geração do Memorial e Justificativa) retornarão erro no backend.

---

## 🛠️ Estrutura da Aplicação para Vercel

- **`dist/`**: Contém a aplicação Single Page Application (SPA) compilada pelo Vite.
- **`api/index.ts`**: Ponto de entrada das funções serverless da Vercel para atender `/api/health`, `/api/analyze-pdf`, `/api/generate-memorial-demonstracao` e `/api/generate-justification`.
- **`vercel.json`**: Redireciona chamadas `/api/*` para as funções serverless e rotas de página para o SPA (`index.html`).

---

## 🧪 Testando Localmente
Para rodar a aplicação em ambiente de desenvolvimento local:

```bash
npm install
npm run dev
```
Acesse `http://localhost:3000`.
