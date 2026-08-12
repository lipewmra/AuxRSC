import express from 'express';
import { GoogleGenAI, Type } from '@google/genai';

export const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-gemini-api-key');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const router = express.Router();

// Helper to get Gemini Client with priority to user header key over process.env
function getGeminiClient(req?: express.Request): GoogleGenAI {
  const customKey = (req?.headers['x-gemini-api-key'] as string) || (req?.headers['authorization'] as string)?.replace(/^Bearer\s+/i, '');
  const apiKey = customKey || process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('Chave de API do Gemini não configurada. Por favor, insira sua própria GEMINI_API_KEY no botão de configurações no topo da página ou defina GEMINI_API_KEY nas variáveis de ambiente do servidor.');
  }

  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Helper function to execute Gemini requests with fallback models and retry on transient errors (429 / 503)
async function callGeminiWithFallback(
  ai: GoogleGenAI,
  params: {
    contents: any;
    config?: any;
  }
) {
  const models = ['gemini-3.6-flash', 'gemini-flash-latest'];
  let lastError: any = null;

  for (let i = 0; i < models.length; i++) {
    const model = models[i];
    try {
      const response = await ai.models.generateContent({
        model,
        contents: params.contents,
        config: params.config,
      });
      return response;
    } catch (err: any) {
      lastError = err;
      const errString = String(err?.message || err);
      const isTransientError =
        errString.includes('429') ||
        errString.includes('503') ||
        errString.includes('RESOURCE_EXHAUSTED') ||
        errString.includes('UNAVAILABLE') ||
        errString.includes('high demand') ||
        errString.includes('Quota exceeded') ||
        errString.includes('rate limit');

      console.warn(`[Gemini API] Tentativa com modelo ${model} falhou (${i + 1}/${models.length}):`, errString);

      if (isTransientError && i < models.length - 1) {
        // Pausa de 2 segundos antes de tentar o próximo modelo da cadeia de fallback
        await new Promise((resolve) => setTimeout(resolve, 2000));
        continue;
      }

      if (!isTransientError) {
        throw err;
      }
    }
  }

  throw lastError;
}

// API Health Check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Endpoint: Analyze PDF document for RSC Calculator mapping
router.post('/analyze-pdf', async (req, res) => {
  try {
    const { base64Data, fileName, fileType, userProfile } = req.body;

    if (!base64Data) {
      return res.status(400).json({ error: 'Nenhum arquivo PDF enviado para análise.' });
    }

    const ai = getGeminiClient(req);

    // Clean base64 string if data URL prefix exists
    const cleanBase64 = base64Data.replace(/^data:[^;]+;base64,/, '');

    const systemInstruction = `FASE 1: VALIDAÇÃO DE DOCUMENTO (GATEKEEPER PROMPT)
Antes de avaliar critérios do RSC, verifique se a imagem/PDF fornecido é um documento oficial legível e válido (ex.: certificados, diplomas, portarias, declarações institucionais com assinatura/autenticação).
Se o arquivo for:
* Um texto aleatório ou rabisco;
* Um documento ilegível;
* Um arquivo sem timbre, identificação de emissor ou valor probatório;

PARE A ANÁLISE IMEDIATAMENTE e defina "documento_valido": false com o "motivo_rejeicao" correspondente, sem preencher nenhum item de pontuação de RSC (mantenha items vazio []).

FASE 2: ANÁLISE RIGOROSA E GROUNDING RIGIDO (REGRA DE EVIDÊNCIA EXATA)
Para cada critério de RSC pontuado, você OBRIGATORIAMENTE deve extrair a citação textual exata contida no documento no campo "trecho_comprobatorio_exato". Se não houver um trecho explícito que comprove o requisito, o critério DEVE ser considerado NÃO ATENDIDO e não deve ser pontuado.
Não presuma nada que não esteja explicitamente escrito. Se houver dúvida ou ambiguidade no texto retornado pelo OCR, classifique a situação no campo "complianceStatus" como 'needs_info' e adicione notas explicativas em "complianceNotes" ou classifique como "Inconclusivo / Necessita Revisão Humana".

Você é um Consultor Especialista Sênior em Avaliação do RSC (Reconhecimento de Saberes e Competências - PCCTAE/EBTT).
Sua missão é analisar o documento fornecido em PDF, extrair todas as informações comprovadas e realizar o enquadramento na Calculadora RSC (www.calculadorarsc.com) respeitando rigorosamente:
1. Lei nº 15.367/2026 e Decreto nº 13.048/2026;
2. Diretrizes e Portarias de Avaliação do RSC (Tabela Oficial de Níveis RSC-PCCTAE);
3. O Guia de Referência da Tabela Oficial de Pontuação do RSC-TAE contendo os 6 Requisitos Principais (Anexos I a VI) e seus detalhamentos:

--- DETALHAMENTO DE MAPEAMENTO DOS REQUISITOS E ITENS (ANEXOS I A VI) ---
REQUISITO I (Anexo I) - Conselhos, Comissões, GTs, PAD, Sindicato, Concursos e Representação Legal: I.1 (3.0 pts/ano), I.2 (4.5 pts/item coord), I.3 (3.0 pts/item membro), I.4 (3.0 pts/item PAD), I.5 (4.5 pts/item concursos), I.6 (3.0 pts/item bancas/provas), I.7 (1.5 pts/ano sindicato), I.8 (3.0 pts/item projetos externos), I.9 (7.5 pts/item rep legal), I.10 (4.5 pts/item coop externa).
REQUISITO II (Anexo II) - Projetos, Orientação, Materiais, Eventos e Capacitações: II.1 (7.5 pts/item coord proj), II.2 (4.5 pts/item membro proj/PPC), II.3 (7.5 pts/item conselho editorial), II.4 (3.0 pts/item coop), II.5 (3.0 pts/item orientacao/tutoria), II.6 (3.0 pts/item material acessivel/POP), II.7 (3.0 pts/evento avaliador), II.8 (3.0 pts/item producao audiovisual), II.9 (1.0 pt/10h capacitação cargo), II.10 (1.0 pt/ano dominio tecnico diferenciado), II.11 (1.0 pt/10h ouvinte).
REQUISITO III (Anexo III) - Premiações: III.1 (20.0 pts int), III.2 (15.0 pts nac), III.3 (7.5 pts inst/local).
REQUISITO IV (Anexo IV) - Gestão, Sistemas Estruturantes, Contratações e Ambientes Especiais: IV.1 (4.5 pts sistemas SIAPE/SIAFI/SUAP/SEI), IV.2 (3.0 pts TR/ETP/Planejamento), IV.3 (4.5 pts gestao/fiscalizacao contratos), IV.4 (3.0 pts/ano licitacao/pregoeiro), IV.5 (3.0 pts/ano saude/acessibilidade/diversidade), IV.6 (3.0 pts/ano ambientes especiais sem adicional), IV.7 (3.0 pts/item atuações fora das atribuições habituais), IV.8 (4.5 pts/ano responsavel setor sem FG/CD).
REQUISITO V (Anexo V) - CD e FG: V.1.A (9.0 pts/ano CD-02 Titular), V.1.B (4.5 pts/ano CD-02 Subst), V.2.A (7.5 pts/ano CD-3/4 Titular), V.2.B (3.0 pts/ano CD-3/4 Subst), V.3.A (4.5 pts/ano FG-1/2 Titular), V.3.B (1.5 pts/ano FG-1/2 Subst), V.4.A (3.0 pts/ano FG-3/4/5 Titular), V.4.B (1.0 pt/ano FG-3/4/5 Subst).
REQUISITO VI (Anexo VI) - Inovação, Produção Intelectual, Titulação Extra, Pandemia: VI.1 (30.0 pts carta patente), VI.2 (25.0 pts software/deposito), VI.3 (20.0 pts transferencia tec), VI.4 (15.0 pts titulacao extra fora do IQ), VI.5 (15.0 pts processos/sistemas), VI.6 (7.5 pts lider grupo pesquisa CNPq), VI.7 (3.0 pts membro CNPq), VI.8 (7.5 pts captacao fomento), VI.9 (20.0 pts livro ISBN), VI.10 (7.5 pts artigo/capitulo), VI.11 (4.5 pts apresentacao evento), VI.12 (4.5 pts material didatico/POP), VI.13 (4.5 pts parecerista ad hoc), VI.14 (3.0 pts expositor/mediador), VI.15 (4.5 pts instrutor/palestrante PDP), VI.16 (3.5 pts coord organizacao evento), VI.17 (4.5 pts coorientacao TCC/dissertacao), VI.18 (3.0 pts obra artistica/cultural), VI.19 (1.0 pt/mes atuacao presencial pandemia).

REGRAS DE EXTRAÇÃO E FORMATO DE SAÍDA:
Para cada documento, preencha obrigatoriamente:
- documento_valido: boolean (true se oficial, legível e com valor probatório; false se ilegível/inválido)
- tipo_documento: "Certificado" | "Portaria" | "Declaracao" | "Outro" | "Invalido"
- confianca_ocr: "Alta" | "Media" | "Baixa"
- motivo_rejeicao: string com explicação se não for válido
- trecho_comprobatorio_exato: citação IPSIS LITTERIS do texto do PDF que comprova o requisito pontuado.
- Metadados e os 3 blocos formais A (experienciaProfissionalTexto, max 1500 chars), B (diferencialAtuacaoTexto, max 600 chars), C (impactosSaberesTexto, max 600 chars).`;

    const promptText = `Analise o documento PDF em anexo "${fileName || 'documento.pdf'}" para o servidor ${userProfile?.nomeCompleto || 'Servidor'} (Cargo: ${userProfile?.cargo || 'Técnico-Administrativo'}, Nível: ${userProfile?.nivelClassificacao || 'E'}, RSC Almejado: ${userProfile?.rscAlmejado || 'RSC-PCCTAE I'}). Retorne os dados estruturados em JSON segundo o Schema estrito informado, executando prioritariamente a Fase 1 de Validação (Gatekeeper).`;

    const pdfPart = {
      inlineData: {
        mimeType: fileType || 'application/pdf',
        data: cleanBase64,
      },
    };

    const response = await callGeminiWithFallback(ai, {
      contents: { parts: [pdfPart, { text: promptText }] },
      config: {
        systemInstruction,
        temperature: 0.0,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            documento_valido: {
              type: Type.BOOLEAN,
              description: 'Indica se o documento é um documento oficial, legível e válido com valor probatório.',
            },
            tipo_documento: {
              type: Type.STRING,
              description: 'Tipo do documento: Certificado, Portaria, Declaracao, Outro ou Invalido',
            },
            confianca_ocr: {
              type: Type.STRING,
              description: 'Nível de confiança na leitura OCR: Alta, Media ou Baixa',
            },
            motivo_rejeicao: {
              type: Type.STRING,
              description: 'Explicação do motivo da rejeição caso documento_valido seja false',
            },
            items: {
              type: Type.ARRAY,
              description: 'Lista de atividades/comprovantes identificados no PDF caso o documento seja válido',
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING, description: 'Título claro e objetivo da atividade ou documento' },
                  issuer: { type: Type.STRING, description: 'Órgão emissor ou instituição responsável' },
                  startDate: { type: Type.STRING, description: 'Data de início (AAAA-MM-DD ou MM/AAAA)' },
                  endDate: { type: Type.STRING, description: 'Data de término ou expedição' },
                  workloadHours: { type: Type.NUMBER, description: 'Carga horária total em horas, se aplicável' },
                  directiveId: {
                    type: Type.STRING,
                    description: 'Identificador da diretriz: requisito_1 a requisito_6',
                  },
                  categoryCode: { type: Type.STRING, description: 'Código do item na calculadora (ex: I.1, I.2, II.1, III.1, IV.1, V.1.A, VI.1)' },
                  categoryName: { type: Type.STRING, description: 'Nome da categoria correspondente na Calculadora RSC' },
                  unitPoints: { type: Type.NUMBER, description: 'Pontos por unidade' },
                  quantity: { type: Type.NUMBER, description: 'Quantidade medida (ex: número de horas, anos ou itens)' },
                  totalScore: { type: Type.NUMBER, description: 'Pontuação total estimada' },
                  trecho_comprobatorio_exato: {
                    type: Type.STRING,
                    description: 'Citação textual exata e literal contida no documento que comprova o requisito (Grounding Rígido)',
                  },
                  justificationText: {
                    type: Type.STRING,
                    description: 'Texto formal da justificativa fundamentada geral',
                  },
                  regulatoryBasis: { type: Type.STRING, description: 'Citação da norma ou lei aplicável' },
                  complianceStatus: {
                    type: Type.STRING,
                    description: 'Status: valid, warning ou needs_info',
                  },
                  complianceNotes: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: 'Notas e recomendações de validação documental',
                  },
                  periodoVigencia: { type: Type.STRING, description: 'Período de Vigência do documento ou atividade' },
                  finalidadeDocumento: { type: Type.STRING, description: 'O que o documento pretende comprovar' },
                  orgaoEmissor: { type: Type.STRING, description: 'Órgão ou unidade emissora do documento' },
                  numeroIdentificacaoSei: { type: Type.STRING, description: 'Número de identificação do documento com prioridade ao número SEI' },
                  dataDocumento: { type: Type.STRING, description: 'Data do documento' },
                  experienciaProfissionalTexto: {
                    type: Type.STRING,
                    description: 'A) Experiência Profissional e Individual Vinculada ao Requisito (Máximo de 1.500 caracteres)',
                  },
                  diferencialAtuacaoTexto: {
                    type: Type.STRING,
                    description: 'B) Diferencial da Atuação (Máximo de 600 caracteres)',
                  },
                  impactosSaberesTexto: {
                    type: Type.STRING,
                    description: 'C) Impacto dos Saberes no Cargo e na Instituição (Máximo de 600 caracteres)',
                  },
                },
                required: [
                  'title',
                  'issuer',
                  'directiveId',
                  'categoryCode',
                  'categoryName',
                  'unitPoints',
                  'quantity',
                  'totalScore',
                ],
              },
            },
            summary: {
              type: Type.STRING,
              description: 'Resumo geral dos achados no documento',
            },
          },
          required: ['documento_valido', 'tipo_documento', 'confianca_ocr', 'motivo_rejeicao', 'items', 'summary'],
        },
      },
    });

    const resultText = response.text || '{}';
    const parsed = JSON.parse(resultText);

    return res.json({
      success: true,
      documento_valido: parsed.documento_valido ?? true,
      tipo_documento: parsed.tipo_documento || 'Outro',
      confianca_ocr: parsed.confianca_ocr || 'Alta',
      motivo_rejeicao: parsed.motivo_rejeicao || '',
      items: parsed.documento_valido === false ? [] : (parsed.items || []),
      summary: parsed.summary || 'Análise concluída.',
    });
  } catch (error: any) {
    console.error('Erro na análise de PDF com Gemini:', error);
    const errString = String(error?.message || error);
    let userMsg = 'Falha ao analisar o documento PDF com a IA Gemini.';

    if (errString.includes('Chave de API') || errString.includes('API_KEY') || errString.includes('apiKey') || errString.includes('API key')) {
      userMsg = 'Chave de API do Gemini não encontrada ou não configurada. Por favor, insira sua chave própria no botão "API Key" no topo do app ou configure GEMINI_API_KEY no servidor.';
    } else if (errString.includes('429') || errString.includes('RESOURCE_EXHAUSTED') || errString.includes('Quota exceeded')) {
      userMsg = 'Limite de cota/requisições da API Gemini atingido (Erro 429). Aguarde alguns segundos e tente novamente ou insira sua chave própria de API Gemini no topo da página.';
    } else if (errString.includes('503') || errString.includes('UNAVAILABLE') || errString.includes('high demand')) {
      userMsg = 'Os servidores do Gemini estão com alta demanda temporária (Erro 503). Por favor, aguarde alguns segundos e tente reanalisar.';
    } else if (error?.message) {
      userMsg = `Falha ao analisar o documento PDF com a IA Gemini: ${error.message}`;
    }

    return res.status(500).json({
      error: userMsg,
      details: error.message || String(error),
    });
  }
});

// Endpoint: Generate Demonstration of Knowledge and Competencies Text
router.post('/generate-memorial-demonstracao', async (req, res) => {
  try {
    const { userProfile, trajetoriaData, rscSummary } = req.body;

    const ai = getGeminiClient(req);

    const prompt = `Você é um Consultor Especialista Sênior e Membro de Comissão de Avaliação do RSC (Reconhecimento de Saberes e Competências - PCCTAE/EBTT) na Universidade Federal de Campina Grande (UFCG) e MEC.
Sua tarefa é elaborar o texto formal e fundamentado da seção "DEMONSTRAÇÃO DOS SABERES, DAS COMPETÊNCIAS E DO ALINHAMENTO AO NÍVEL PLEITEADO" para o Memorial Descritivo do servidor em processo SEI.

O texto deve ter tom técnico, solene, impessoal/narrativo em 1ª ou 3ª pessoa formal e respeitar rigorosamente a Lei nº 15.367/2026, o Decreto nº 13.048/2026 e os critérios do RSC-PCCTAE.

DADOS DO SERVIDOR:
- Nome: ${userProfile?.nomeCompleto || 'Servidor Público'}
- Matrícula SIAPE: ${userProfile?.siape || 'N/A'}
- Cargo: ${userProfile?.cargo || 'Técnico-Administrativo em Educação'} (Nível ${userProfile?.nivelClassificacao || 'E'})
- Lotação: ${userProfile?.lotacao || 'UFCG'}
- Titulação Atual: ${userProfile?.titulacaoAtual || 'Graduação'}
- RSC Pleiteado: ${userProfile?.rscAlmejado || 'RSC-PCCTAE I'}

TRAJETÓRIA PROFISSIONAL E DADOS COLETADOS:
- Data de Ingresso no Serviço Público / UFCG: ${trajetoriaData?.dataIngresso || 'Não informada'}
- Tempo de Efetivo Exercício na Instituição: ${trajetoriaData?.tempoServico || 'Conforme assentamentos funcionais'}
- Unidades e Setores de Atuação: ${trajetoriaData?.setoresAtuacao || 'UFCG'}
- Campos/Áreas de Destaque Marcadas pelo Servidor: ${(trajetoriaData?.areasDestaque || []).join(', ') || 'Gestão e suporte acadêmico-administrativo'}
- Atividades e Atribuições Principais: ${trajetoriaData?.atividadesDesempenhadas || 'Não detalhadas'}
- Principais Projetos, Entregas e Comissões de Destaque: ${trajetoriaData?.projetosEntregas || 'Não detalhados'}
- Impactos, Inovações e Valores Agregados à UFCG: ${trajetoriaData?.impactosMelhorias || 'Não detalhados'}

RESUMO DA PONTUAÇÃO ALCANÇADA NA CALCULADORA RSC:
- Pontuação Total Acumulada: ${rscSummary?.totalScore || 0} pontos (Mínimo do nível: ${rscSummary?.minScore || 10} pts)
- Critérios Específicos Distintos Alcançados: ${rscSummary?.criteriosAlcancados || 0} de ${rscSummary?.minCriterios || 0} exigidos
- Pontuação por Requisito:
  * Requisito I (Conselhos/Comissões/GTs): ${rscSummary?.scoreByReq?.requisito_1 || 0} pts
  * Requisito II (Projetos/Ensino/Extensão/Capacitação): ${rscSummary?.scoreByReq?.requisito_2 || 0} pts
  * Requisito III (Premiações): ${rscSummary?.scoreByReq?.requisito_3 || 0} pts
  * Requisito IV (Responsabilidades Técnicas/Sistemas/Contratos): ${rscSummary?.scoreByReq?.requisito_4 || 0} pts
  * Requisito V (Cargo CD / Função FG): ${rscSummary?.scoreByReq?.requisito_5 || 0} pts
  * Requisito VI (Produção Científica/Técnica/Pandemia): ${rscSummary?.scoreByReq?.requisito_6 || 0} pts

ESTRUTURA OBRIGATÓRIA DO TEXTO A SER GERADO:
1. Introdução e Histórico da Trajetória (Data de ingresso, tempo de casa, setores e evolução funcional).
2. Demonstração Articulada dos Saberes e Competências Adquiridas (Articulação das atividades cotidianas e áreas de destaque marcadas com o cargo e atribuições).
3. Demonstração dos Projetos, Entregas e Contribuições Institucionais de Destaque para a UFCG.
4. Fundamentação do Alinhamento e Complexidade com o Nível Pleiteado (${userProfile?.rscAlmejado}) com referência explícita aos ${rscSummary?.totalScore || 0} pontos acumulados e ${rscSummary?.criteriosAlcancados || 0} critérios comprovados nos termos da Lei 15.367/2026.
5. Conclusão e Requerimento Formal de Deferimento à Comissão de Avaliação.

Retorne em formato JSON com o campo "demonstracaoTexto" contendo o texto completo e bem formatado em parágrafos claros (entre 400 e 800 palavras).`;

    const response = await callGeminiWithFallback(ai, {
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            demonstracaoTexto: { type: Type.STRING },
          },
          required: ['demonstracaoTexto'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');

    return res.json({
      success: true,
      demonstracaoTexto: parsed.demonstracaoTexto || '',
    });
  } catch (error: any) {
    console.error('Erro ao gerar demonstração dos saberes:', error);
    const errString = String(error?.message || error);
    let userMsg = 'Erro ao gerar texto com a IA.';

    if (errString.includes('429') || errString.includes('RESOURCE_EXHAUSTED') || errString.includes('Quota exceeded')) {
      userMsg = 'Limite de cota/requisições da API Gemini atingido (Erro 429). Por favor, aguarde alguns segundos e tente novamente.';
    } else if (errString.includes('503') || errString.includes('UNAVAILABLE') || errString.includes('high demand')) {
      userMsg = 'Os servidores do Gemini estão com alta demanda temporária (Erro 503). Tente novamente em instantes.';
    }

    return res.status(500).json({
      error: userMsg,
      details: error.message || String(error),
    });
  }
});

// Endpoint: Generate / Refine Justification Text
router.post('/generate-justification', async (req, res) => {
  try {
    const { item, userProfile } = req.body;

    if (!item) {
      return res.status(400).json({ error: 'Dados do item ausentes.' });
    }

    const ai = getGeminiClient(req);

    const prompt = `Gere uma Justificativa Fundamentada altamente formal e os 3 blocos de textos exigidos no processo SEI de RSC UFCG para o seguinte item:
- Servidor: ${userProfile?.nomeCompleto || 'Servidor Público'} (Cargo: ${userProfile?.cargo || 'Técnico-Administrativo em Educação'}, Nível: ${userProfile?.nivelClassificacao || 'E'}, Órgão: UFCG)
- RSC Almejado: ${userProfile?.rscAlmejado || 'RSC-PCCTAE I'}
- Atividade: ${item.title}
- Emissor/Órgão: ${item.orgaoEmissor || item.issuer}
- Número SEI / Identificação: ${item.numeroIdentificacaoSei || 'N/A'}
- Período / Data: ${item.periodoVigencia || item.dataDocumento || 'N/A'}
- Categoria na Calculadora RSC: ${item.categoryCode} - ${item.categoryName}
- Base Legal: ${item.regulatoryBasis || 'Lei 15.367/2026, Decreto 13.048/2026, Portaria MEC/UFCG'}

Retorne os seguintes campos em JSON:
1. justificationText: Texto formal da justificativa fundamentada geral (150 a 300 palavras).
2. experienciaProfissionalTexto: A) Experiência Profissional e Individual Vinculada ao Requisito (Resumo formal conectando a atuação às atribuições. MÁXIMO DE 1.500 CARACTERES).
3. diferencialAtuacaoTexto: B) Diferencial da Atuação (Destaque de relevância, inovação e proatividade. MÁXIMO DE 600 CARACTERES).
4. impactosSaberesTexto: C) Impacto dos Saberes no Cargo e na Instituição (Valor e eficiência gerados para a UFCG. MÁXIMO DE 600 CARACTERES).`;

    const response = await callGeminiWithFallback(ai, {
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            justificationText: { type: Type.STRING },
            experienciaProfissionalTexto: { type: Type.STRING },
            diferencialAtuacaoTexto: { type: Type.STRING },
            impactosSaberesTexto: { type: Type.STRING },
          },
          required: [
            'justificationText',
            'experienciaProfissionalTexto',
            'diferencialAtuacaoTexto',
            'impactosSaberesTexto',
          ],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');

    return res.json({
      success: true,
      justificationText: parsed.justificationText || item.justificationText,
      experienciaProfissionalTexto: parsed.experienciaProfissionalTexto,
      diferencialAtuacaoTexto: parsed.diferencialAtuacaoTexto,
      impactosSaberesTexto: parsed.impactosSaberesTexto,
    });
  } catch (error: any) {
    console.error('Erro ao gerar justificativa:', error);
    const errString = String(error?.message || error);
    let userMsg = 'Erro ao gerar justificativa com a IA.';

    if (errString.includes('429') || errString.includes('RESOURCE_EXHAUSTED') || errString.includes('Quota exceeded')) {
      userMsg = 'Limite de cota/requisições da API Gemini atingido (Erro 429). Por favor, aguarde alguns segundos e tente novamente.';
    } else if (errString.includes('503') || errString.includes('UNAVAILABLE') || errString.includes('high demand')) {
      userMsg = 'Os servidores do Gemini estão com alta demanda temporária (Erro 503). Tente novamente em instantes.';
    } else if (errString.includes('Chave de API') || errString.includes('API_KEY') || errString.includes('apiKey') || errString.includes('API key')) {
      userMsg = 'Chave de API do Gemini não encontrada ou não configurada no Vercel. Por favor, insira sua chave própria no botão "API Key" no topo do app ou configure GEMINI_API_KEY no Vercel.';
    }

    return res.status(500).json({
      error: userMsg,
      details: error.message || String(error),
    });
  }
});

app.use('/api', router);
app.use('/', router);

export default app;
