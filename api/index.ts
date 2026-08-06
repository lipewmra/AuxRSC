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
3. O Guia de Referência da Tabela Oficial de Pontuação do RSC-TAE contendo os 6 Requisitos Principais (Anexos I a VI) e seus detalhamentos de documentos e exemplos:

--- DETALHAMENTO DE MAPEAMENTO DOS REQUISITOS E ITENS (ANEXOS I A VI) ---

REQUISITO I (Anexo I) - Atuação em Conselhos, Comissões, GTs, PAD, Sindicato, Concursos e Representação Legal:
- I.1 (3,0 pts/ano): Membro titular ou suplente em efetivo exercício de Conselhos Superiores e Colegiados (CONSUP, CEPE, Conselhos de Campus, Conselho Diretor, Conselhos Gestores, Conselho Editorial). Comprovação: Portaria/Resolução de nomeação/eleição, atas, lista oficial ou declaração da secretaria.
- I.2 (4,5 pts/item): Coordenação ou Presidência de comissões, comitês, GTs ou núcleos (CIS, CPA, Ética, Heteroidentificação, Inventário, Flexibilização, NAPNE, NEABI, NEGED, Comitê de Governança/LGPD, GT PDI). Comprovação: Portaria/Resolução de designação indicando Coordenação/Presidência.
- I.3 (3,0 pts/item): Participação como Membro de comissões, comitês, GTs ou núcleos (CIS, CPA, Ética, Heteroidentificação, Inventário, Flexibilização, NAPNE, NEABI, NEGED, LGPD, PDI, etc.). Comprovação: Portaria/Resolução de designação como membro.
- I.4 (3,0 pts/item): Equipes de apuração (PAD, Sindicância, Tomada de Contas Especial) ou Defensor Dativo. Comprovação: Portaria de designação, termo de compromisso ou certidão da unidade correcional.
- I.5 (4,5 pts/item): Organização, fiscalização ou execução de vestibulares, concursos, seleções públicas ou internas (fiscal de sala, apoio, coordenador de local, certificador do INEP no ENEM). Comprovação: Portaria, edital, ordem de serviço ou declaração da comissão organizadora.
- I.6 (3,0 pts/item): Elaboração, revisão técnica e correção de provas de exames de seleção e concursos públicos. Comprovação: Portaria, contrato, termo de confidencialidade ou declaração da banca.
- I.7 (1,5 pts/ano): Exercício de mandato em entidade sindical da categoria (SINASEFE, FASUBRA, etc.). Comprovação: Ata de eleição e posse ou declaração da entidade com cargo e período do mandato.
- I.8 (3,0 pts/item): Membro em programas/projetos de políticas públicas externas à IFE (Mulheres Mil, PSE, PAA, PNAE, projetos interinstitucionais). Exige resultados institucionais relevantes. Comprovação: Ato formal de designação e relatório/declaração de resultado.
- I.9 (7,5 pts/item): Representação legal da IFE junto ao Poder Público ou responsabilidade técnica regulatória (MEC, MGI, TCU, CGU, Conselhos Profissionais CREA/CRQ/CRB/CRP/Vigilância/Receita). Comprovação: Portaria, procuração, registro no conselho profissional ou protocolo externo.
- I.10 (4,5 pts/item): Atuação técnica externa autorizada em órgãos estatais, escolas de governo ou internacionais (cooperação com MEC, CAPES, CNPq, ENAP, CONIF). Comprovação: Autorização formal da IFE, termo de cooperação e produto entregue com relatório de repercussão.

REQUISITO II (Anexo II) - Projetos Institucionais, Orientação, Materiais, Eventos e Capacitações:
- II.1 (7,5 pts/item): Coordenação de projetos institucionais de ensino, pesquisa, extensão, gestão ou inovação (PIBIC, PIBITI, PIBEX, Pronatec, EnergIFE, etc.). Comprovação: Certificado/registro institucional com indicação explicita da COORDENAÇÃO.
- II.2 (4,5 pts/item): Participação em equipe técnica/especializada em projetos institucionais (ensino, pesquisa, extensão) ou elaboração de Projetos Pedagógicos de Cursos (PPCs). Comprovação: Certificado, portaria ou declaração com a função de integrante executora/técnica.
- II.3 (7,5 pts/item): Membro ou presidente de comissão/conselho editorial de livros, revistas ou edições científicas. Comprovação: Portaria, ato editorial ou página do expediente com nome e função.
- II.4 (3,0 pts/item): Participação em cooperação técnica interinstitucional em projetos (parcerias públicas/privadas de interesse público). Comprovação: Acordo/convênio/termo de cooperação e relatório de execução.
- II.5 (3,0 pts/item): Orientação, tutoria, preceptoria ou supervisão de estagiários, bolsistas PIBIC/PIBITI/PIBEX, tutoria EAD/Pronatec, preceptoria em saúde/clínicas. Comprovação: Portaria, contrato ou termo de designação/orientação com lista de orientandos.
- II.6 (3,0 pts/item): Produção/reformulação de material acessível ou técnico de referência (POP, manuais de procedimentos, guias de sistemas SUAP/SEI, apostilas em Braille/Libras). Comprovação: Cópia ou link do material com autoria e termo de aprovação/publicação.
- II.7 (3,0 pts/evento): Avaliador de trabalhos ou jurado em eventos acadêmicos, científicos e técnicos (congressos, feiras, SNCT, CONNEPI). Comprovação: Certificado de avaliador/jurado ou declaração da organização.
- II.8 (3,0 pts/item): Produção audiovisual, artística, exposição ou podcast institucional (videoaulas, programas de rádio/TV, documentários, podcasts). Comprovação: Ficha técnica, link/arquivo e comprovante de publicação institucional.
- II.9 (1,0 pt/hora): Programas de formação continuada/desenvolvimento de competências efetuados no cargo (mínimo 10h) NÃO utilizados para Aceleração da Promoção/IQ. Comprovação: Certificado com conteúdo, instituição, período e carga horária (≥10h).
- II.10 (1,0 pt/ano): Desempenho de atividade técnica especializada com domínio técnico diferenciado e alta complexidade (administrador corporativo de SUAP/SEI, responsável por infraestutura crítica, laboratórios especializados). Exige requisitos cumulativos do Decreto. Comprovação: Portaria/reconhecimento formal + declaração detalhada com assinaturas da chefia e do dirigente máximo da unidade.
- II.11 (1,0 pt/evento): Participação como ouvinte/congressista em capacitação, fórum, workshop, congresso (mínimo 10h). Comprovação: Certificado de participação com carga horária (≥10h).

REQUISITO III (Anexo III) - Premiações:
- III.1 (20,0 pts/item): Premiação de âmbito internacional por projeto implementado na gestão pública. Comprovação: Certificado/diploma oficial, regulamento comprovando âmbito internacional e prova de implementação.
- III.2 (15,0 pts/item): Premiação de âmbito nacional por projeto implementado (Prêmio Inovação no Serviço Público, ENAP, etc.). Comprovação: Certificado oficial, regulamento nacional e prova de implementação.
- III.3 (7,5 pts/item): Premiação de âmbito local ou institucional por projeto implementado. Comprovação: Certificado oficial, regulamento de instituição formal e prova de implementação.

REQUISITO IV (Anexo IV) - Gestão, Sistemas Estruturantes, Contratações e Ambientes Especiais:
- IV.1 (4,5 pts/item): Operação, implantação, suporte ou desenvolvimento de sistemas estruturantes (SIOP, SIAFI, Tesouro Gerencial, SIAPE, eSocial, SCDP, Compras.gov.br, SUAP, SEI). Exige perfil de acesso próprio e responsabilidade por inclusão/validação de dados. Comprovação: Portaria ou declaração do responsável do setor contendo sistema, módulos, perfil de acesso e repercussões.
- IV.2 (3,0 pts/item): Elaboração de Termo de Referência (TR), Projeto Básico (PB), ETP ou atuação na Equipe de Planejamento da Contratação (Lei 14.133/2021). Comprovação: Documento de formalização da demanda/equipe e TR/PB assinado.
- IV.3 (4,5 pts/item): Gestão ou fiscalização de contratos, atas de registro de preços, convênios ou TEDs. Comprovação: Portaria de designação como gestor/fiscal titular ou substituto.
- IV.4 (3,0 pts/ano): Atuação em comissão de licitação, Pregoeiro, Agente de Contratação, equipe de apoio. Comprovação: Portaria e declaração da área de Administração/Planejamento com período.
- IV.5 (3,0 pts/ano): Apoio técnico especializado em saúde do servidor/estudante, acessibilidade (NAPNE/NEABI), diversidade e sustentabilidade ambiental. Comprovação: Portaria e declaração descrevendo a atuação técnica especializada.
- IV.6 (3,0 pts/ano): Atuação técnica em ambientes com condições especiais de segurança (laboratórios químicos/biológicos, radiação, resíduos) SEM percepção de adicional de insalubridade/periculosidade. Comprovação: Laudo pericial + declaração da Gestão de Pessoas + declaração funcional comprovando NÃO recebimento do adicional financeiro.
- IV.7 (3,0 pts/item): Atuação em sistemas ou processos de trabalho fora das atribuições habituais do cargo efetivo (administração corporativa, escritório de projetos, LGPD, riscos). Comprovação: Designação específica e declaração da chefia comprovando que a atividade não é habitual do cargo.
- IV.8 (4,5 pts/ano): Responsável por setor ou unidade administrativa formalmente designado SEM gratificação/remuneração (ex: almoxarifado, protocolo, biblioteca, TI, manutenção sem CD/FG). Comprovação: Portaria formal de designação indicando o período.

REQUISITO V (Anexo V) - Cargos de Direção (CD) e Funções Gratificadas (FG):
- V.1.A (9,0 pts/ano): Cargo CD-02 Titular (ex: Diretor-Geral de Campus, Pró-Reitor). Comprovação: Portaria de nomeação/exoneração ou relatório SIAPE (CACODETPFU).
- V.1.B (4,5 pts/ano): Cargo CD-02 Substituto. Comprovação: Portaria de substituto + relatório comprovando os dias/períodos efetivamente exercidos.
- V.2.A (7,5 pts/ano): Cargo CD-03 ou CD-04 Titular (Diretores de Diretoria, Chefe de Gabinete). Comprovação: Portaria de nomeação/exoneração ou relatório SIAPE.
- V.2.B (3,0 pts/ano): Cargo CD-03 ou CD-04 Substituto. Comprovação: Portaria de substituição + relatório de dias efetivamente exercidos.
- V.3.A (4,5 pts/ano): Função FG-01 ou FG-02 Titular (Chefes de Departamento/Coordenadores). Comprovação: Portaria de designação/dispensa ou relatório SIAPE.
- V.3.B (1,5 pts/ano): Função FG-01 ou FG-02 Substituto. Comprovação: Portaria de substituição + relatório de efetivo exercício.
- V.4.A (3,0 pts/ano): Função FG-03, FG-04, FG-05 Titular (Chefes de Setor, Coordenadores de Área). Comprovação: Portaria de designação/dispensa ou relatório SIAPE.
- V.4.B (1,0 pt/ano): Função FG-03, FG-04, FG-05 Substituto. Comprovação: Portaria de substituição + relatório de efetivo exercício.

REQUISITO VI (Anexo VI) - Inovação, Produção Intelectual, Titulação Extra, Captação de Recursos e Atuação em Pandemia:
- VI.1 (30,0 pts/item): Carta Patente efetivamente CONCEDIDA pelo INPI ou órgão estrangeiro. Comprovação: Carta patente e registro institucional.
- VI.2 (25,0 pts/item): Protótipos, depósitos de patentes, registro de software, cultivares, desenho industrial. Comprovação: Comprovante de depósito/registro no INPI/NIT.
- VI.3 (20,0 pts/item): Transferência de tecnologia, licenciamento ou exploração de ativo tecnológico. Comprovação: Contrato de transferência ou licenciamento.
- VI.4 (15,0 pts/item): Curso de Educação Formal superior ao exigido para o cargo (Graduação, Pós, Mestrado, Doutorado) NÃO utilizado para o Incentivo à Qualificação (IQ). Comprovação: Diploma/Histórico + Declaração da Gestão de Pessoas comprovando que não está sendo usado no IQ.
- VI.5 (15,0 pts/item): Implantação/desenvolvimento de produtos, processos, técnicas, metodologias ou sistemas com melhoria institucional. Comprovação: Portaria ou declaração com impacto institucional comprovado.
- VI.6 (7,5 pts/item): Liderança ou Vice-Liderança de grupo de pesquisa cadastrado no CNPq ou extensão registrado. Comprovação: Espelho do Diretório do CNPq ou declaração oficial.
- VI.7 (3,0 pts/item): Participação como Membro em grupo de pesquisa cadastrado no CNPq. Comprovação: Certidão/espelho do diretório CNPq com nome do servidor.
- VI.8 (7,5 pts/item): Aprovação de projeto para captação de recursos junto a agências de fomento (CNPq, CAPES, FINEP, FAPs). Comprovação: Edital, resultado oficial de aprovação e termo de outorga.
- VI.9 (20,0 pts/item): Publicação de livro completo impresso/e-book com ISBN e Conselho Editorial. Comprovação: Capa, ficha catalográfica e expediente com ISBN e Conselho Editorial.
- VI.10 (7,5 pts/item): Autoria/coautoria de capítulo de livro ou artigo em periódico/revista científica. Comprovação: Cópia da publicação com autoria, ISSN/ISBN/DOI e expediente.
- VI.11 (4,5 pts/item): Apresentação de trabalho em eventos (oral ou pôster). Comprovação: Certificado indicando explicitamente o servidor como APRESENTADOR.
- VI.12 (4,5 pts/item): Produção de material técnico, científico, metodológico ou didático estruturado (cartilhas, manuais, cadernos técnicos, POPs, produtos ProfEPT). Comprovação: Material impresso/digital com autoria e disponibilização institucional.
- VI.13 (4,5 pts/item): Avaliador ou parecerista ad hoc de projetos de ensino, pesquisa, extensão ou inovação em editais. Comprovação: Designação/convite ou parecer emitido.
- VI.14 (3,0 pts/evento): Expositor, facilitador ou mediador em eventos institucionais (semanas acadêmicas, oficinas, encontros). Comprovação: Certificado de facilitador/expositor.
- VI.15 (4,5 pts/item): Instrutor, tutor, palestrante ou conteudista em ação formativa do Plano de Desenvolvimento de Pessoas (PDP) / Escola de Governo. Comprovação: Designação e certificado/relatório de instrutoria em ação do PDP.
- VI.16 (3,5 pts/evento): Coordenação geral ou de comissão organizadora de congressos, simpósios ou seminários. Comprovação: Portaria/declaração da coordenação e programação.
- VI.17 (4,5 pts/evento): Coorientação formal de Trabalho de Conclusão de Curso (TCC), monografia, dissertação ou tese. Comprovação: Declaração acadêmica, ata de defesa ou folha de aprovação.
- VI.18 (3,0 pts/item): Autoria de obra artística ou cultural registrada com repercussão institucional. Comprovação: Registro da obra e ficha técnica.
- VI.19 (1,0 pt/mês): Atuação institucional presencial/técnica em comissões ou forças-tarefa durante a pandemia (limite final 08/09/2022). Comprovação: Portaria/escala e declaração da unidade com número de meses.

--- REGRAS DE EXTRAÇÃO E FORMATO DE SAÍDA ---

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
