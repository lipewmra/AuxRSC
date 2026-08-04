import express from 'express';
import { GoogleGenAI, Type } from '@google/genai';

export const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

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

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Endpoint: Analyze PDF document for RSC Calculator mapping
app.post('/api/analyze-pdf', async (req, res) => {
  try {
    const { base64Data, fileName, fileType, userProfile } = req.body;

    if (!base64Data) {
      return res.status(400).json({ error: 'Nenhum arquivo PDF enviado para análise.' });
    }

    const ai = getGeminiClient(req);

    // Clean base64 string if data URL prefix exists
    const cleanBase64 = base64Data.replace(/^data:[^;]+;base64,/, '');

    const systemInstruction = `Você é um Consultor Especialista Sênior em Avaliação do RSC (Reconhecimento de Saberes e Competências - PCCTAE/EBTT).
Sua missão é analisar o documento fornecido em PDF, extrair todas as informações comprovadas e realizar o enquadramento na Calculadora RSC (www.calculadorarsc.com) respeitando rigorosamente:
1. Lei nº 15.367/2026 e Decreto nº 13.048/2026;
2. Diretrizes e Portarias de Avaliação do RSC (Tabela Oficial de Níveis RSC-PCCTAE);
3. Os 6 Requisitos Principais da Tabela Oficial do RSC (Anexos I a VI):
   - requisito_1: Requisito I - Atuação em Conselhos, Comissões, GTs, PAD, Sindicato, Concursos e Representação Legal (Anexo I - Itens I.1 a I.10)
   - requisito_2: Requisito II - Projetos Institucionais (Ensino, Pesquisa, Extensão, Gestão, Inovação), Orientação, Manuais, Eventos e Capacitação (Anexo II - Itens II.1 a II.11)
   - requisito_3: Requisito III - Recebimento de Premiação em Eventos de Reconhecimento Público Internacional, Nacional ou Local (Anexo III - Itens III.1 a III.3)
   - requisito_4: Requisito IV - Operação de Sistemas Estruturantes, Termos de Referência, Gestão de Contratos, Licitações, Saúde/Acessibilidade e Chefias sem Remuneração (Anexo IV - Itens IV.1 a IV.8)
   - requisito_5: Requisito V - Exercício de Cargo de Direção (CD-02, CD-03/04) e Função Gratificada (FG-01/02, FG-03+) Titular ou Substituto (Anexo V - Itens V.1 a V.4)
   - requisito_6: Requisito VI - Cartas Patentes, Protótipos, Artigos, Livros, Cursos, Captação de Recursos, Grupos de Pesquisa, TCCs e Atuação em Pandemia (Anexo VI - Itens VI.1 a VI.19)

Para CADA ITEM/DOCUMENTO identificado no PDF, você DEVE extrair e gerar rigorosamente os seguintes dados:
1. periodoVigencia: Período de Vigência (caso conste no PDF, ex: "01/02/2023 a 31/01/2024" ou "Conforme publicação").
2. finalidadeDocumento: O que o documento pretende comprovar em relação ao Requisito do RSC.
3. orgaoEmissor: Órgão ou unidade emissora (ex: "Secretaria de Recursos Humanos / Departamento de Gestão de Pessoas").
4. numeroIdentificacaoSei: Número de identificação com PRIORIDADE MÁXIMA AO NÚMERO SEI (ex: "Processo SEI nº 23096.012345/2024-11" ou "Portaria nº 45/2023").
5. dataDocumento: Data de expedição do documento (ex: "15/03/2024").

Além disso, para CADA documento/item, você DEVE gerar 3 blocos de textos fundamentados conforme as diretrizes do RSC-PCCTAE:
A) experienciaProfissionalTexto: Experiência Profissional e Individual Vinculada ao Requisito (Resumo formal conectando a atuação prática do servidor ao requisito e às atribuições do seu cargo. MÁXIMO DE 1.500 CARACTERES).
B) diferencialAtuacaoTexto: Diferencial da Atuação (Destaque da relevância, inovação, alcance, resolução de problemas ou proatividade na execução. MÁXIMO DE 600 CARACTERES).
C) impactosSaberesTexto: Impacto dos Saberes no Cargo e na Instituição (Descrição direta de como os conhecimentos adquiridos geram valor, melhoria de processos, eficiência e inovação para a instituição e sua unidade de trabalho. MÁXIMO DE 600 CARACTERES).`;

    const promptText = `Analise o documento PDF em anexo "${fileName || 'documento.pdf'}" para o servidor ${userProfile?.nomeCompleto || 'Servidor'} (Cargo: ${userProfile?.cargo || 'Técnico-Administrativo'}, Nível: ${userProfile?.nivelClassificacao || 'E'}, RSC Almejado: ${userProfile?.rscAlmejado || 'RSC-PCCTAE I'}). Retorne uma lista de itens analisados no formato JSON com todos os metadados obrigatórios e os 3 textos A, B e C solicitados.`;

    const pdfPart = {
      inlineData: {
        mimeType: fileType || 'application/pdf',
        data: cleanBase64,
      },
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: { parts: [pdfPart, { text: promptText }] },
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            items: {
              type: Type.ARRAY,
              description: 'Lista de atividades/comprovantes identificados no PDF',
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
                  'justificationText',
                  'regulatoryBasis',
                  'complianceStatus',
                  'complianceNotes',
                  'periodoVigencia',
                  'finalidadeDocumento',
                  'orgaoEmissor',
                  'numeroIdentificacaoSei',
                  'dataDocumento',
                  'experienciaProfissionalTexto',
                  'diferencialAtuacaoTexto',
                  'impactosSaberesTexto',
                ],
              },
            },
            summary: {
              type: Type.STRING,
              description: 'Resumo geral dos achados no documento',
            },
          },
          required: ['items', 'summary'],
        },
      },
    });

    const resultText = response.text || '{}';
    const parsed = JSON.parse(resultText);

    return res.json({
      success: true,
      items: parsed.items || [],
      summary: parsed.summary || 'Análise concluída.',
    });
  } catch (error: any) {
    console.error('Erro na análise de PDF com Gemini:', error);
    return res.status(500).json({
      error: 'Falha ao analisar o documento PDF com a IA Gemini.',
      details: error.message || String(error),
    });
  }
});

// Endpoint: Generate Demonstration of Knowledge and Competencies Text
app.post('/api/generate-memorial-demonstracao', async (req, res) => {
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

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
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
    return res.status(500).json({
      error: 'Erro ao gerar texto com a IA.',
      details: error.message || String(error),
    });
  }
});

// Endpoint: Generate / Refine Justification Text
app.post('/api/generate-justification', async (req, res) => {
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

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
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
    return res.status(500).json({
      error: 'Erro ao gerar justificativa.',
      details: error.message || String(error),
    });
  }
});

export default app;
