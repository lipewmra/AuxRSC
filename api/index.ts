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
// Prioriza o modelo mais econômico e rápido (gemini-3.1-flash-lite), com fallback sequencial para gemini-3.8-flash e gemini-flash-latest
async function callGeminiWithFallback(
  ai: GoogleGenAI,
  params: {
    contents: any;
    config?: any;
  }
): Promise<{ response: any; modelUsed: string }> {
  const models = ['gemini-3.1-flash-lite', 'gemini-3.8-flash', 'gemini-flash-latest'];
  const maxRetriesPerModel = 3;
  let lastError: any = null;

  for (let i = 0; i < models.length; i++) {
    const model = models[i];
    for (let attempt = 0; attempt < maxRetriesPerModel; attempt++) {
      try {
        console.log(`[Gemini API] Executando requisição com o modelo ${model} (tentativa ${attempt + 1}/${maxRetriesPerModel})...`);
        const response = await ai.models.generateContent({
          model,
          contents: params.contents,
          config: params.config,
        });
        return { response, modelUsed: model };
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

        console.warn(
          `[Gemini API] Modelo ${model} (tentativa ${attempt + 1}/${maxRetriesPerModel}) falhou:`,
          errString
        );

        if (isTransientError) {
          if (attempt < maxRetriesPerModel - 1) {
            // Exponential backoff: ~3s on 1st retry, ~6s on 2nd retry
            const backoffMs = Math.pow(2, attempt) * 3000 + Math.floor(Math.random() * 1000);
            console.log(
              `[Gemini API] Aguardando ${Math.round(backoffMs / 1000)}s antes de tentar novamente devido a cota/demanda...`
            );
            await new Promise((resolve) => setTimeout(resolve, backoffMs));
            continue;
          }
        } else {
          // Non-transient error: stop retrying this model and advance to next fallback
          break;
        }
      }
    }
    // Pause briefly before switching to fallback model if transient error persisted
    if (i < models.length - 1) {
      console.log(`[Gemini API] Alternando para o próximo modelo de fallback: ${models[i + 1]}...`);
      await new Promise((resolve) => setTimeout(resolve, 2000));
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
- finalidadeDocumento: O que o documento pretende comprovar perante a comissão do RSC e no processo SEI (ex: "Comprovar atuação como membro da Comissão Organizadora de Evento Científico..."). Campo obrigatório e fundamental para a instrução processual.
- Metadados e os 3 blocos formais A (experienciaProfissionalTexto, max 1500 chars), B (diferencialAtuacaoTexto, max 600 chars), C (impactosSaberesTexto, max 600 chars).`;

    const promptText = `Analise o documento PDF em anexo "${fileName || 'documento.pdf'}" para o servidor ${userProfile?.nomeCompleto || 'Servidor'} (Cargo: ${userProfile?.cargo || 'Técnico-Administrativo'}, Nível: ${userProfile?.nivelClassificacao || 'E'}, RSC Almejado: ${userProfile?.rscAlmejado || 'RSC-PCCTAE I'}). Retorne os dados estruturados em JSON segundo o Schema estrito informado, executando prioritariamente a Fase 1 de Validação (Gatekeeper).`;

    const pdfPart = {
      inlineData: {
        mimeType: fileType || 'application/pdf',
        data: cleanBase64,
      },
    };

    const { response, modelUsed } = await callGeminiWithFallback(ai, {
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

    const rawItems = parsed.documento_valido === false ? [] : (parsed.items || []);
    const items = rawItems.map((it: any) => {
      if (!it.finalidadeDocumento || it.finalidadeDocumento.trim() === '') {
        it.finalidadeDocumento = `Comprovação de atuação em "${it.title || 'atividade técnica'}" emitida por ${it.issuer || 'órgão competente'} para pontuação no item ${it.categoryCode || 'específico'} (${it.categoryName || 'critério RSC'}) perante o ${userProfile?.rscAlmejado || 'RSC-PCCTAE'}.`;
      }
      return it;
    });

    return res.json({
      success: true,
      documento_valido: parsed.documento_valido ?? true,
      tipo_documento: parsed.tipo_documento || 'Outro',
      confianca_ocr: parsed.confianca_ocr || 'Alta',
      motivo_rejeicao: parsed.motivo_rejeicao || '',
      items,
      summary: parsed.summary || 'Análise concluída.',
      modelUsed: modelUsed || 'gemini-3.1-flash-lite',
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

// Endpoint: Generate Demonstration of Knowledge and Competencies Text (Alinhamento da Trajetória - Item 2 do Memorial)
router.post('/generate-memorial-demonstracao', async (req, res) => {
  try {
    const { userProfile, trajetoriaData, rscSummary, rscItems = [] } = req.body;

    const ai = getGeminiClient(req);

    // Sintetizar atividades documentadas por requisito a partir dos itens reais do servidor
    const activeItems = Array.isArray(rscItems) ? rscItems.filter((it: any) => !it.isDiscarded) : [];

    const comissoes = activeItems
      .filter((it: any) => it.directiveId === 'requisito_1')
      .map((it: any) => it.title)
      .slice(0, 6);

    const projetosEnsinoExtensao = activeItems
      .filter((it: any) => it.directiveId === 'requisito_2')
      .map((it: any) => it.title)
      .slice(0, 6);

    const premiacoes = activeItems
      .filter((it: any) => it.directiveId === 'requisito_3')
      .map((it: any) => it.title)
      .slice(0, 3);

    const responsabilidadesTecnicas = activeItems
      .filter((it: any) => it.directiveId === 'requisito_4')
      .map((it: any) => it.title)
      .slice(0, 6);

    const cargosFuncoes = activeItems
      .filter((it: any) => it.directiveId === 'requisito_5')
      .map((it: any) => it.title)
      .slice(0, 4);

    const producoesInovacoes = activeItems
      .filter((it: any) => it.directiveId === 'requisito_6')
      .map((it: any) => it.title)
      .slice(0, 6);

    const prompt = `Você é o redator oficial do Memorial Descritivo de Reconhecimento de Saberes e Competências (RSC - PCCTAE/EBTT) para processo eletrônico no SEI, em estrita consonância com a Lei nº 15.367/2026 e o Decreto nº 13.048/2026.
Sua missão é redigir o texto contínuo do "Alinhamento da trajetória ao nível pleiteado (item 2 do memorial)", narrando com elegância, densidade e maturidade o histórico da pessoa, a vida e a carreira do servidor no serviço público.

DADOS FUNCIONAIS DO SERVIDOR (SEM DADOS SENSÍVEIS):
- Nome: ${userProfile?.nomeCompleto || 'Servidor(a)'}
- Cargo: ${userProfile?.cargo || 'Técnico-Administrativo em Educação'} (Nível ${userProfile?.nivelClassificacao || 'E'})
- Lotação: ${userProfile?.lotacao || 'Instituição Federal de Ensino (UFCG)'}
- RSC Pleiteado: ${userProfile?.rscAlmejado || 'RSC-PCCTAE I'}
- Ingresso no Serviço Público: ${trajetoriaData?.dataIngresso || 'Conforme registros funcionais'}
- Tempo de Efetivo Exercício: ${trajetoriaData?.tempoServico || 'Trajetória funcional consolidada'}
- Unidades e Setores de Atuação: ${trajetoriaData?.setoresAtuacao || userProfile?.lotacao || 'Unidades acadêmicas e administrativas'}
- Áreas de Destaque: ${(trajetoriaData?.areasDestaque || []).join('; ') || 'Gestão institucional e suporte acadêmico-administrativo'}

HISTÓRICO REAL DE ATIVIDADES E COMPROVANTES DO SERVIDOR (CALCULADORA RSC):
- Comissões, Colegiados e GTs: ${comissoes.length > 0 ? comissoes.join('; ') : 'Participação em comissões institucionais'}
- Projetos, Extensão, Ensino e Capacitações: ${projetosEnsinoExtensao.length > 0 ? projetosEnsinoExtensao.join('; ') : 'Engajamento em projetos de extensão e ações de qualificação'}
- Responsabilidades Técnicas e Gestão: ${responsabilidadesTecnicas.length > 0 ? responsabilidadesTecnicas.join('; ') : 'Gestão de processos, sistemas institucionais e suporte técnico'}
${premiacoes.length > 0 ? `- Premiações / Reconhecimentos: ${premiacoes.join('; ')}` : ''}
${cargosFuncoes.length > 0 ? `- Cargos de Direção / Funções Gratificadas: ${cargosFuncoes.join('; ')}` : ''}
${producoesInovacoes.length > 0 ? `- Inovações, POPs e Produção Técnica: ${producoesInovacoes.join('; ')}` : ''}
- Atividades Cotidianas Informadas: ${trajetoriaData?.atividadesDesempenhadas || 'Rotinas e atribuições técnicas de elevada complexidade'}
- Projetos / Entregas Informadas: ${trajetoriaData?.projetosEntregas || 'Projetos institucionais estratégicos'}
- Impactos e Melhorias Informadas: ${trajetoriaData?.impactosMelhorias || 'Otimização de fluxos de trabalho e redução significativa de prazos administrativos'}

PONTUAÇÃO E CONFORMIDADE:
- Total Acumulado: ${rscSummary?.totalScore || 0} pontos (Mínimo exigido: ${rscSummary?.minScore || 10} pts)
- Critérios Específicos Alcançados: ${rscSummary?.criteriosAlcancados || 0} critérios distintos nos termos da Lei 15.367/2026

DIRETRIZES DE REDAÇÃO E RESTRIÇÕES RIGOROSAS (DECRETO Nº 13.048/2026):
1. PRIVACIDADE TOTAL (DECRETO Nº 13.048/2026): Não inclua CPF, RG, endereço residencial, telefone pessoal, dados de saúde, senhas, informações sigilosas ou dados pessoais desnecessários de terceiros, pois este Memorial poderá ser publicado no sítio eletrônico institucional antes da decisão da comissão.
2. TOM DE HISTÓRICO DE VIDA E CARREIRA: O texto deve soar orgânico, contínuo e fluído, como uma narrativa biográfica-funcional da pessoa. Descreva o ingresso, a adaptação às rotinas do cargo, o acúmulo de saberes e responsabilidades técnicas, a consolidação como referência no setor, a participação em comissões organizadoras e projetos de extensão/ensino, e a implementação de inovações procedimentais que resultaram na otimização de fluxos de trabalho e na redução significativa de prazos administrativos, garantindo celeridade processual, integridade dos registros e observância aos princípios de eficiência e probidade da administração pública.
3. ALINHAMENTO AO NÍVEL PLEITEADO: Conclua demonstrando que a maturidade profissional e a densidade da produção fundamentam plenamente o deferimento do ${userProfile?.rscAlmejado || 'RSC-PCCTAE'}.
4. LIMITE DE CARACTERES DO SISTEMA SEI: O campo no SEI tem limite máximo estrito de 3.000 caracteres. Redija um texto completo, profundo e substancial que tenha ENTRE 2.000 E 2.800 CARACTERES (NUNCA ULTRAPASSE 2.950 CARACTERES).
5. TEMPO DE SERVIÇO BASEADO EXCLUSIVAMENTE NO INGRESSO: O tempo de serviço público e anos de trabalho devem ser narrados em estrita concordância com a data de ingresso no serviço público informada (${trajetoriaData?.dataIngresso}) e o tempo de efetivo exercício decorrente (${trajetoriaData?.tempoServico}), sem alterar nem extrapolar esse cômputo temporal.

Retorne em formato JSON com o campo "demonstracaoTexto" contendo o texto contínuo e fundamentado pronto para o campo "Alinhamento da trajetória ao nível pleiteado (item 2 do memorial)".`;

    const { response } = await callGeminiWithFallback(ai, {
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

    const { response } = await callGeminiWithFallback(ai, {
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

// Endpoint: Consolidar Textos Complementares A, B e C para itens da mesma Família (Requisito + Item)
router.post('/consolidate-family-texts', async (req, res) => {
  try {
    const { items, userProfile, categoryCode, categoryName, directiveId } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Nenhum item fornecido para consolidação.' });
    }

    const ai = getGeminiClient(req);

    const itemsSummary = items
      .map(
        (it, idx) =>
          `[Documento ${idx + 1}] Título: ${it.title} | Emissor: ${it.orgaoEmissor || it.issuer} | Vigência/Data: ${it.periodoVigencia || it.dataDocumento || 'N/A'} | Carga Horária: ${it.workloadHours || 'N/A'}h | Texto A original: ${it.experienciaProfissionalTexto || 'N/A'} | Texto B original: ${it.diferencialAtuacaoTexto || 'N/A'} | Texto C original: ${it.impactosSaberesTexto || 'N/A'}`
      )
      .join('\n\n');

    const prompt = `Você é um Consultor Especialista em RSC-PCCTAE na UFCG.
O servidor possui ${items.length} comprovantes/documentos pertencentes à MESMA FAMÍLIA (Requisito: ${directiveId}, Critério/Item: ${categoryCode} - ${categoryName}).
Sua missão é realizar a ANÁLISE e UNIFICAÇÃO dos TEXTOS COMPLEMENTARES A, B e C, unindo todos os comprovantes desta mesma família de forma coesa, formal e sem repetições redundantes, respeitando rigorosamente os limites máximos de caracteres exigidos pelo processo SEI da UFCG:

DADOS DO SERVIDOR:
- Nome: ${userProfile?.nomeCompleto || 'Servidor Público'}
- Cargo: ${userProfile?.cargo || 'Técnico-Administrativo em Educação'} (${userProfile?.nivelClassificacao || 'E'})
- Lotação: ${userProfile?.lotacao || 'UFCG'}
- RSC Almejado: ${userProfile?.rscAlmejado || 'RSC-PCCTAE I'}

DOCUMENTOS E COMPROVANTES DA MESMA FAMÍLIA:
${itemsSummary}

REQUISITOS ESTRITOS DOS TEXTOS:
1. experienciaProfissionalTexto (Bloco A): A) Experiência Profissional e Individual Vinculada ao Requisito.
   - Deve sintetizar cronologicamente todas as atividades e comprovantes listados, demonstrando a evolução contínua da atuação do servidor no critério ${categoryCode}.
   - LIMITE ABSOLUTO: MÁXIMO DE 1.500 CARACTERES.

2. diferencialAtuacaoTexto (Bloco B): B) Diferencial da Atuação.
   - Deve evidenciar como o conjunto dessas atividades gerou excelência técnica, liderança, inovação ou proatividade funcional.
   - LIMITE ABSOLUTO: MÁXIMO DE 600 CARACTERES.

3. impactosSaberesTexto (Bloco C): C) Impacto dos Saberes no Cargo e na Instituição.
   - Deve sintetizar os reflexos positivos gerados na rotina, ensino, pesquisa, extensão ou governança pública da instituição.
   - LIMITE ABSOLUTO: MÁXIMO DE 600 CARACTERES.

Retorne em formato JSON estrito conforme o schema.`;

    const { response } = await callGeminiWithFallback(ai, {
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            experienciaProfissionalTexto: {
              type: Type.STRING,
              description: 'Bloco A unificado (máximo 1.500 caracteres)',
            },
            diferencialAtuacaoTexto: {
              type: Type.STRING,
              description: 'Bloco B unificado (máximo 600 caracteres)',
            },
            impactosSaberesTexto: {
              type: Type.STRING,
              description: 'Bloco C unificado (máximo 600 caracteres)',
            },
            justificationText: {
              type: Type.STRING,
              description: 'Justificativa fundamentada unificada',
            },
          },
          required: [
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
      experienciaProfissionalTexto: parsed.experienciaProfissionalTexto || '',
      diferencialAtuacaoTexto: parsed.diferencialAtuacaoTexto || '',
      impactosSaberesTexto: parsed.impactosSaberesTexto || '',
      justificationText: parsed.justificationText || '',
    });
  } catch (error: any) {
    console.error('Erro na consolidação de textos da família:', error);
    return res.status(500).json({
      error: 'Falha ao consolidar textos com a IA.',
      details: error.message || String(error),
    });
  }
});

app.use('/api', router);
app.use('/', router);

export default app;
