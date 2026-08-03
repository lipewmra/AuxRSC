import { RSCLevelRequirement, RSCStandardCategory, RSCDirectiveId } from '../types';

export const DIRECTIVE_NAMES: Record<string, { title: string; subtitle: string; description: string }> = {
  requisito_1: {
    title: 'Requisito I - Grupos de Trabalho, Comissões, Comitês e Representações',
    subtitle: 'Anexo I - Atuação em Conselhos, Comissões, Grupos de Trabalho, PAD e Sindicato',
    description: 'Exercício em conselhos superiores, comissões, presidência/membro de GTs, defensor dativo em PAD, vestibulares/concursos, representação legal e atuação técnica externa.',
  },
  requisito_2: {
    title: 'Requisito II - Projetos Institucionais, Gestão, Ensino, Pesquisa, Extensão e Inovação',
    subtitle: 'Anexo II - Coordenação e Atuação em Projetos, Orientação, Formação e Capacitação',
    description: 'Coordenação e participação em projetos de ensino, pesquisa, extensão, gestão e inovação, conselho editorial, tutoria, manuais técnicos, podcast/audiovisual e capacitações.',
  },
  requisito_3: {
    title: 'Requisito III - Recebimento de Premiação em Evento de Reconhecimento Público',
    subtitle: 'Anexo III - Premiações Internacionais, Nacionais e Locais/Institucionais',
    description: 'Premiação em eventos de reconhecimento público por projetos implementados na administração pública (internacional, nacional ou local/institucional).',
  },
  requisito_4: {
    title: 'Requisito IV - Assunção de Responsabilidades Técnico-Administrativas ou Especializadas',
    subtitle: 'Anexo IV - Operação de Sistemas, Licitações, Contratos e Chefias sem Remuneração',
    description: 'Operação de sistemas estruturantes, elaboração de TR/projeto básico, gestão/fiscalização de contratos, licitações, políticas de saúde/acessibilidade e chefias sem remuneração.',
  },
  requisito_5: {
    title: 'Requisito V - Exercício de Função ou Cargo de Direção ou Assessoramento',
    subtitle: 'Anexo V - Cargos de Direção (CD-02, CD-03/04) e Funções Gratificadas (FG-01/02, FG-03+)',
    description: 'Exercício titular ou substituto de Cargos de Direção (CD-02, CD-03, CD-04) e Funções Gratificadas (FG-01, FG-02, FG-03+).',
  },
  requisito_6: {
    title: 'Requisito VI - Produção, Prospecção e Difusão de Conhecimento Científico ou Técnico',
    subtitle: 'Anexo VI - Patentes, Protótipos, Artigos, Livros, Cursos, Eventos e Pandemia',
    description: 'Cartas patentes, propriedade intelectual, artigos, livros, capítulos, trabalhos em eventos, instrutoria, captação de recursos, grupos de pesquisa, TCCs e atuação em pandemias.',
  },

  // Compatibility aliases
  diretriz_1: {
    title: 'Requisito I - Grupos de Trabalho, Comissões e Representações',
    subtitle: 'Anexo I - Atuação em Conselhos, Comissões, GTs e Sindicatos',
    description: 'Exercício em conselhos superiores, comissões, presidência/membro de GTs, defensor dativo em PAD, vestibulares/concursos, representação legal e atuação técnica externa.',
  },
  diretriz_2: {
    title: 'Requisito II - Projetos Institucionais, Gestão e Capacitação',
    subtitle: 'Anexo II - Projetos, Orientação, Formação e Capacitação',
    description: 'Coordenação e participação em projetos de ensino, pesquisa, extensão, gestão e inovação, conselho editorial, tutoria, manuais técnicos e capacitações.',
  },
  diretriz_3: {
    title: 'Requisito VI - Produção e Difusão do Conhecimento',
    subtitle: 'Anexo VI - Patentes, Protótipos, Artigos, Livros e Cursos',
    description: 'Cartas patentes, propriedade intelectual, artigos, livros, capítulos, trabalhos em eventos, instrutoria, captação de recursos e grupos de pesquisa.',
  },
};

export const RSC_REQUIREMENTS: Record<string, RSCLevelRequirement> = {
  'RSC-PCCTAE I': {
    level: 'RSC-PCCTAE I',
    escolaridade: 'Ensino fundamental não concluído',
    minTotalScore: 10,
    minCriteriosCount: 0,
    criteriosTexto: 'Sem mínimo exigido de critérios específicos',
    requisitoAdicional: 'Alcançar a pontuação mínima de 10 pontos e comprovar as atividades apresentadas.',
    percentualIQ: 10,
    equivalence: 'Incentivo à Qualificação (IQ): 10%',
    description: 'Pontuação mínima de 10 pontos. Comprovação das atividades apresentadas.',
  },
  'RSC-PCCTAE II': {
    level: 'RSC-PCCTAE II',
    escolaridade: 'Ensino fundamental concluído',
    minTotalScore: 15,
    minCriteriosCount: 2,
    criteriosTexto: '2 critérios específicos',
    requisitoAdicional: 'Atender a pelo menos dois critérios específicos e atingir no mínimo 15 pontos.',
    percentualIQ: 15,
    equivalence: 'Incentivo à Qualificação (IQ): 15%',
    description: 'Pontuação mínima de 15 pontos e atendimento a pelo menos 2 critérios específicos.',
  },
  'RSC-PCCTAE III': {
    level: 'RSC-PCCTAE III',
    escolaridade: 'Ensino médio ou curso técnico de nível médio',
    minTotalScore: 25,
    minCriteriosCount: 2,
    criteriosTexto: '2 critérios específicos',
    requisitoAdicional: 'Atender a pelo menos dois critérios específicos e atingir no mínimo 25 pontos.',
    percentualIQ: 25,
    equivalence: 'Incentivo à Qualificação (IQ): 25%',
    description: 'Pontuação mínima de 25 pontos e atendimento a pelo menos 2 critérios específicos.',
  },
  'RSC-PCCTAE IV': {
    level: 'RSC-PCCTAE IV',
    escolaridade: 'Graduação',
    minTotalScore: 30,
    minCriteriosCount: 3,
    criteriosTexto: '3 critérios específicos',
    requisitoAdicional: 'Pelo menos um critério deve estar relacionado aos Requisitos II, IV, V ou VI.',
    percentualIQ: 30,
    equivalence: 'Incentivo à Qualificação (IQ): 30%',
    description: 'Pontuação mínima de 30 pontos, 3 critérios específicos e pelo menos 1 nos Requisitos II, IV, V ou VI.',
  },
  'RSC-PCCTAE V': {
    level: 'RSC-PCCTAE V',
    escolaridade: 'Pós-graduação lato sensu (Especialização)',
    minTotalScore: 52,
    minCriteriosCount: 5,
    criteriosTexto: '5 critérios específicos',
    requisitoAdicional: 'Pelo menos um critério deve estar relacionado aos Requisitos IV, V ou VI.',
    percentualIQ: 52,
    equivalence: 'Incentivo à Qualificação (IQ): 52%',
    description: 'Pontuação mínima de 52 pontos, 5 critérios específicos e pelo menos 1 nos Requisitos IV, V ou VI.',
  },
  'RSC-PCCTAE VI': {
    level: 'RSC-PCCTAE VI',
    escolaridade: 'Mestrado',
    minTotalScore: 75,
    minCriteriosCount: 7,
    criteriosTexto: '7 critérios específicos',
    requisitoAdicional: 'Pelo menos um critério deve estar relacionado ao Requisito VI.',
    percentualIQ: 75,
    equivalence: 'Incentivo à Qualificação (IQ): 75%',
    description: 'Pontuação mínima de 75 pontos, 7 critérios específicos e pelo menos 1 no Requisito VI.',
  },

  // Shortcuts
  'RSC-I': {
    level: 'RSC-PCCTAE I',
    escolaridade: 'Ensino fundamental não concluído',
    minTotalScore: 10,
    minCriteriosCount: 0,
    criteriosTexto: 'Sem mínimo exigido de critérios específicos',
    requisitoAdicional: 'Alcançar a pontuação mínima de 10 pontos e comprovar as atividades.',
    percentualIQ: 10,
    equivalence: 'Incentivo à Qualificação (IQ): 10%',
    description: 'Pontuação mínima de 10 pontos.',
  },
  'RSC-II': {
    level: 'RSC-PCCTAE II',
    escolaridade: 'Ensino fundamental concluído',
    minTotalScore: 15,
    minCriteriosCount: 2,
    criteriosTexto: '2 critérios específicos',
    requisitoAdicional: 'Atender a pelo menos dois critérios específicos.',
    percentualIQ: 15,
    equivalence: 'Incentivo à Qualificação (IQ): 15%',
    description: 'Pontuação mínima de 15 pontos.',
  },
  'RSC-III': {
    level: 'RSC-PCCTAE III',
    escolaridade: 'Ensino médio ou curso técnico',
    minTotalScore: 25,
    minCriteriosCount: 2,
    criteriosTexto: '2 critérios específicos',
    requisitoAdicional: 'Atender a pelo menos dois critérios específicos.',
    percentualIQ: 25,
    equivalence: 'Incentivo à Qualificação (IQ): 25%',
    description: 'Pontuação mínima de 25 pontos.',
  },
};

export const STANDARD_CATEGORIES: RSCStandardCategory[] = [
  // --- REQUISITO I (Anexo I) ---
  {
    code: 'I.1',
    directiveId: 'requisito_1',
    title: 'Exercício de mandato como membro de conselhos superiores e colegiados da IFE',
    description: 'Membro de conselhos superiores, conselhos de unidades e órgãos colegiados da Instituição Federal de Ensino.',
    unitPoints: 3.0,
    unitType: 'por_ano',
    legalRef: 'Anexo I - Item 1 (3,0 pts por ano ou fração acima de 6m)',
  },
  {
    code: 'I.2',
    directiveId: 'requisito_1',
    title: 'Coordenação ou presidência de núcleos, representações, GTs, comissões ou comitês',
    description: 'Coordenação ou presidência regularmente instituída ou reconhecida pelo órgão/entidade na administração pública.',
    unitPoints: 4.5,
    unitType: 'por_item',
    legalRef: 'Anexo I - Item 2 (4,5 pts por designação)',
  },
  {
    code: 'I.3',
    directiveId: 'requisito_1',
    title: 'Participação como membro de núcleos, representações, GTs, comissões ou comitês',
    description: 'Participação como membro em comissões, comitês, grupos de trabalho regularmente instituídos.',
    unitPoints: 3.0,
    unitType: 'por_item',
    legalRef: 'Anexo I - Item 3 (3,0 pts por designação)',
  },
  {
    code: 'I.4',
    directiveId: 'requisito_1',
    title: 'Participação em equipes de apuração (PAD, sindicância, tomada de contas) ou defensor dativo',
    description: 'Defensor dativo ou membro de equipe em processos de apuração de responsabilidade, sindicâncias e PADs.',
    unitPoints: 3.0,
    unitType: 'por_item',
    legalRef: 'Anexo I - Item 4 (3,0 pts por designação)',
  },
  {
    code: 'I.5',
    directiveId: 'requisito_1',
    title: 'Atuação em organização, fiscalização ou execução de exames de seleção, vestibulares ou concursos',
    description: 'Atividades operacionais de organização, fiscalização e execução de exames de seleção e concursos.',
    unitPoints: 4.5,
    unitType: 'por_item',
    legalRef: 'Anexo I - Item 5 (4,5 pts por designação)',
  },
  {
    code: 'I.6',
    directiveId: 'requisito_1',
    title: 'Elaboração, revisão e/ou correção de provas de exame de seleção, vestibular ou concursos',
    description: 'Atuação na elaboração, bancas, revisão ou correção de exames de seleção e concursos.',
    unitPoints: 3.0,
    unitType: 'por_item',
    legalRef: 'Anexo I - Item 6 (3,0 pts por designação)',
  },
  {
    code: 'I.7',
    directiveId: 'requisito_1',
    title: 'Exercício de mandato em entidade sindical da categoria',
    description: 'Atuação e exercício de mandato em entidade representativa/sindical dos servidores.',
    unitPoints: 1.5,
    unitType: 'por_ano',
    legalRef: 'Anexo I - Item 7 (1,5 pts por ano ou fração acima de 6m)',
  },
  {
    code: 'I.8',
    directiveId: 'requisito_1',
    title: 'Participação como membro em programas/projetos de políticas públicas externas à IFE',
    description: 'Participação comprovada com obtenção de resultados institucionais relevantes.',
    unitPoints: 3.0,
    unitType: 'por_item',
    legalRef: 'Anexo I - Item 8 (3,0 pts por designação)',
  },
  {
    code: 'I.9',
    directiveId: 'requisito_1',
    title: 'Representação legal da IFE junto ao Poder Público ou responsabilidade técnica regulatória',
    description: 'Representação legal ou responsabilidade técnica junto a órgãos de fiscalização, controle e regulação.',
    unitPoints: 7.5,
    unitType: 'por_item',
    legalRef: 'Anexo I - Item 9 (7,5 pts por designação)',
  },
  {
    code: 'I.10',
    directiveId: 'requisito_1',
    title: 'Atuação técnica externa autorizada em órgãos estatais, escolas de governo ou internacionais',
    description: 'Atuação formalmente autorizada com contribuição ou repercussão institucional comprovada.',
    unitPoints: 4.5,
    unitType: 'por_item',
    legalRef: 'Anexo I - Item 10 (4,5 pts por produto)',
  },

  // --- REQUISITO II (Anexo II) ---
  {
    code: 'II.1',
    directiveId: 'requisito_2',
    title: 'Coordenação de projetos institucionais (ensino, pesquisa, extensão, gestão e inovação)',
    description: 'Coordenação formal de projetos institucionais nas áreas acadêmicas e de gestão.',
    unitPoints: 7.5,
    unitType: 'por_item',
    legalRef: 'Anexo II - Item 1 (7,5 pts por projeto)',
  },
  {
    code: 'II.2',
    directiveId: 'requisito_2',
    title: 'Participação em atividades técnicas/especializadas em projetos pedagógicos e institucionais',
    description: 'Execução de ações especializadas e elaboração de projetos pedagógicos ou institucionais.',
    unitPoints: 4.5,
    unitType: 'por_item',
    legalRef: 'Anexo II - Item 2 (4,5 pts por projeto)',
  },
  {
    code: 'II.3',
    directiveId: 'requisito_2',
    title: 'Participação em comissão ou conselho editorial de livros, revistas ou edições científicas',
    description: 'Membro de conselho editorial e comissões de publicações acadêmicas/científicas.',
    unitPoints: 7.5,
    unitType: 'por_item',
    legalRef: 'Anexo II - Item 3 (7,5 pts por mandato)',
  },
  {
    code: 'II.4',
    directiveId: 'requisito_2',
    title: 'Participação em Cooperação Técnica Interinstitucional em projetos',
    description: 'Cooperação entre instituições públicas/privadas em projetos de interesse público.',
    unitPoints: 3.0,
    unitType: 'por_item',
    legalRef: 'Anexo II - Item 4 (3,0 pts por projeto)',
  },
  {
    code: 'II.5',
    directiveId: 'requisito_2',
    title: 'Atividades de orientação, tutoria, preceptoria ou supervisão',
    description: 'Supervisão de estagiários, tutoria acadêmica/corporativa e preceptoria.',
    unitPoints: 3.0,
    unitType: 'por_item',
    legalRef: 'Anexo II - Item 5 (3,0 pts por designação)',
  },
  {
    code: 'II.6',
    directiveId: 'requisito_2',
    title: 'Produção ou reformulação de material acessível ou técnico de referência (manuais, roteiros)',
    description: 'Elaboração de guias, manuais de procedimentos, roteiros operacionais e materiais inclusivos.',
    unitPoints: 3.0,
    unitType: 'por_item',
    legalRef: 'Anexo II - Item 6 (3,0 pts por produto)',
  },
  {
    code: 'II.7',
    directiveId: 'requisito_2',
    title: 'Avaliação de trabalhos ou atuação como jurado em eventos acadêmicos, científicos e técnicos',
    description: 'Avaliador de resumos, artigos, projetos e jurado em eventos institucionais.',
    unitPoints: 3.0,
    unitType: 'por_evento',
    legalRef: 'Anexo II - Item 7 (3,0 pts por evento)',
  },
  {
    code: 'II.8',
    directiveId: 'requisito_2',
    title: 'Atividade institucional de produção audiovisual, artística, exposição ou podcast',
    description: 'Desenvolvimento de podcasts, exposições, materiais institucionais de comunicação.',
    unitPoints: 3.0,
    unitType: 'por_item',
    legalRef: 'Anexo II - Item 8 (3,0 pts por projeto)',
  },
  {
    code: 'II.9',
    directiveId: 'requisito_2',
    title: 'Programas de formação continuada/desenvolvimento de competências (mínimo 10h)',
    description: 'Participação em ações formais de capacitação não utilizadas para aceleração de promoção.',
    unitPoints: 1.0,
    unitType: 'por_hora',
    legalRef: 'Anexo II - Item 9 (1,0 pt por capacitação)',
  },
  {
    code: 'II.10',
    directiveId: 'requisito_2',
    title: 'Desempenho de atividade técnica especializada com domínio técnico diferenciado',
    description: 'Atividade técnica de alta complexidade com reconhecimento formal e relevância institucional.',
    unitPoints: 1.0,
    unitType: 'por_ano',
    legalRef: 'Anexo II - Item 10 (1,0 pt por ano ou fração acima de 6m)',
  },
  {
    code: 'II.11',
    directiveId: 'requisito_2',
    title: 'Participação em capacitação, fórum, oficina, workshop e congresso (mínimo 10h)',
    description: 'Participação em eventos de capacitação vinculados aos interesses institucionais.',
    unitPoints: 1.0,
    unitType: 'por_evento',
    legalRef: 'Anexo II - Item 11 (1,0 pt por evento)',
  },

  // --- REQUISITO III (Anexo III) ---
  {
    code: 'III.1',
    directiveId: 'requisito_3',
    title: 'Premiação de âmbito internacional por projeto implementado na administração pública',
    description: 'Reconhecimento e prêmio internacional por soluções/projetos na gestão pública.',
    unitPoints: 20.0,
    unitType: 'por_item',
    legalRef: 'Anexo III - Item 1 (20,0 pts por prêmio)',
  },
  {
    code: 'III.2',
    directiveId: 'requisito_3',
    title: 'Premiação de âmbito nacional por projeto implementado na administração pública',
    description: 'Prêmios de inovação na gestão pública concedidos por órgãos federais ou nacionais.',
    unitPoints: 15.0,
    unitType: 'por_item',
    legalRef: 'Anexo III - Item 2 (15,0 pts por prêmio)',
  },
  {
    code: 'III.3',
    directiveId: 'requisito_3',
    title: 'Premiação de âmbito local ou institucional por projeto implementado',
    description: 'Premiação regional ou da própria instituição por boas práticas e projetos.',
    unitPoints: 7.5,
    unitType: 'por_item',
    legalRef: 'Anexo III - Item 3 (7,5 pts por prêmio)',
  },

  // --- REQUISITO IV (Anexo IV) ---
  {
    code: 'IV.1',
    directiveId: 'requisito_4',
    title: 'Operação, implantação, suporte ou desenvolvimento de sistemas estruturantes',
    description: 'Atuação em sistemas institucionais essenciais da administração pública (SEI, SIGAA, SIAFI, etc.).',
    unitPoints: 4.5,
    unitType: 'por_item',
    legalRef: 'Anexo IV - Item 1 (4,5 pts por sistema)',
  },
  {
    code: 'IV.2',
    directiveId: 'requisito_4',
    title: 'Elaboração de termo de referência, projeto básico ou equipe de planejamento de contratações',
    description: 'Elaboração de TR/PB e equipe de planejamento de licitações e compras públicas.',
    unitPoints: 3.0,
    unitType: 'por_item',
    legalRef: 'Anexo IV - Item 2 (3,0 pts por designação)',
  },
  {
    code: 'IV.3',
    directiveId: 'requisito_4',
    title: 'Gestão ou fiscalização de contratos de aquisição, serviços, convênios e acordos',
    description: 'Atuação como gestor ou fiscal titular/substituto de contratos administrativos.',
    unitPoints: 4.5,
    unitType: 'por_item',
    legalRef: 'Anexo IV - Item 3 (4,5 pts por designação)',
  },
  {
    code: 'IV.4',
    directiveId: 'requisito_4',
    title: 'Atividades relacionadas a processos de licitação e suas excepcionalidades',
    description: 'Condução, agentes de contratação, pregoeiro e equipe de apoio em licitações.',
    unitPoints: 3.0,
    unitType: 'por_ano',
    legalRef: 'Anexo IV - Item 4 (3,0 pts por ano ou fração acima de 6m)',
  },
  {
    code: 'IV.5',
    directiveId: 'requisito_4',
    title: 'Apoio técnico especializado em saúde, acessibilidade, diversidade e ambiente',
    description: 'Suporte técnico a ações de promoção da saúde, acessibilidade, inclusão e sustentabilidade.',
    unitPoints: 3.0,
    unitType: 'por_ano',
    legalRef: 'Anexo IV - Item 5 (3,0 pts por ano ou fração acima de 6m)',
  },
  {
    code: 'IV.6',
    directiveId: 'requisito_4',
    title: 'Atuação técnica em ambientes/processos com condições especiais de segurança',
    description: 'Ambientes com exigência regulatória estrita sem recebimento de adicional insalubridade/periculosidade.',
    unitPoints: 3.0,
    unitType: 'por_ano',
    legalRef: 'Anexo IV - Item 6 (3,0 pts por ano ou fração acima de 6m)',
  },
  {
    code: 'IV.7',
    directiveId: 'requisito_4',
    title: 'Atuação em sistemas ou processos de trabalho fora das atribuições habituais',
    description: 'Suporte a processos institucionais específicos de ensino, pesquisa e gestão não habituais.',
    unitPoints: 3.0,
    unitType: 'por_item',
    legalRef: 'Anexo IV - Item 7 (3,0 pts por designação)',
  },
  {
    code: 'IV.8',
    directiveId: 'requisito_4',
    title: 'Responsável por setor ou unidade, formalmente designado, sem remuneração',
    description: 'Chefia/responsabilidade de setor sem gratificação financeira associada.',
    unitPoints: 4.5,
    unitType: 'por_ano',
    legalRef: 'Anexo IV - Item 8 (4,5 pts por ano ou fração acima de 6m)',
  },

  // --- REQUISITO V (Anexo V) ---
  {
    code: 'V.1.A',
    directiveId: 'requisito_5',
    title: 'Cargo de Direção CD-02 ou equivalente — Titular',
    description: 'Exercício titular de cargo de direção de nível CD-02.',
    unitPoints: 9.0,
    unitType: 'por_ano',
    legalRef: 'Anexo V - Item 1 (9,0 pts por ano titular)',
  },
  {
    code: 'V.1.B',
    directiveId: 'requisito_5',
    title: 'Cargo de Direção CD-02 ou equivalente — Substituto',
    description: 'Exercício de substituição formal de cargo de direção de nível CD-02.',
    unitPoints: 4.5,
    unitType: 'por_ano',
    legalRef: 'Anexo V - Item 1 (4,5 pts por ano substituto)',
  },
  {
    code: 'V.2.A',
    directiveId: 'requisito_5',
    title: 'Cargo de Direção CD-03 e CD-04 ou equivalente — Titular',
    description: 'Exercício titular de cargo de direção CD-03 e CD-04.',
    unitPoints: 7.5,
    unitType: 'por_ano',
    legalRef: 'Anexo V - Item 2 (7,5 pts por ano titular)',
  },
  {
    code: 'V.2.B',
    directiveId: 'requisito_5',
    title: 'Cargo de Direção CD-03 e CD-04 ou equivalente — Substituto',
    description: 'Exercício de substituição em cargos CD-03 e CD-04.',
    unitPoints: 3.0,
    unitType: 'por_ano',
    legalRef: 'Anexo V - Item 2 (3,0 pts por ano substituto)',
  },
  {
    code: 'V.3.A',
    directiveId: 'requisito_5',
    title: 'Função Gratificada FG-01 e FG-02 ou equivalente — Titular',
    description: 'Exercício titular de função gratificada FG-01 ou FG-02.',
    unitPoints: 4.5,
    unitType: 'por_ano',
    legalRef: 'Anexo V - Item 3 (4,5 pts por ano titular)',
  },
  {
    code: 'V.3.B',
    directiveId: 'requisito_5',
    title: 'Função Gratificada FG-01 e FG-02 ou equivalente — Substituto',
    description: 'Exercício de substituto em funções FG-01 e FG-02.',
    unitPoints: 1.5,
    unitType: 'por_ano',
    legalRef: 'Anexo V - Item 3 (1,5 pts por ano substituto)',
  },
  {
    code: 'V.4.A',
    directiveId: 'requisito_5',
    title: 'Função Gratificada FG-03 ou superior — Titular',
    description: 'Exercício titular de funções gratificadas a partir da FG-03.',
    unitPoints: 3.0,
    unitType: 'por_ano',
    legalRef: 'Anexo V - Item 4 (3,0 pts por ano titular)',
  },
  {
    code: 'V.4.B',
    directiveId: 'requisito_5',
    title: 'Função Gratificada FG-03 ou superior — Substituto',
    description: 'Exercício substituto em funções a partir da FG-03.',
    unitPoints: 1.0,
    unitType: 'por_ano',
    legalRef: 'Anexo V - Item 4 (1,0 pt por ano substituto)',
  },

  // --- REQUISITO VI (Anexo VI) ---
  {
    code: 'VI.1',
    directiveId: 'requisito_6',
    title: 'Carta patente relacionada aos interesses institucionais',
    description: 'Patente concedida por órgão oficial de propriedade industrial.',
    unitPoints: 30.0,
    unitType: 'por_item',
    legalRef: 'Anexo VI - Item 1 (30,0 pts por patente)',
  },
  {
    code: 'VI.2',
    directiveId: 'requisito_6',
    title: 'Desenvolvimento de protótipos, registro de propriedade intelectual ou invenção',
    description: 'Protótipos funcionais, registros de software, desenho industrial e invenções.',
    unitPoints: 25.0,
    unitType: 'por_item',
    legalRef: 'Anexo VI - Item 2 (25,0 pts por projeto)',
  },
  {
    code: 'VI.3',
    directiveId: 'requisito_6',
    title: 'Transferência de tecnologia, licenciamento ou exploração de ativo tecnológico',
    description: 'Comercialização, acordos de transferência tecnológica e licenças.',
    unitPoints: 20.0,
    unitType: 'por_item',
    legalRef: 'Anexo VI - Item 3 (20,0 pts por produto)',
  },
  {
    code: 'VI.4',
    directiveId: 'requisito_6',
    title: 'Curso de educação formal superior ao exigido para o cargo (não utilizado no IQ)',
    description: 'Diploma/certificado formal não utilizado para fins de Incentivo à Qualificação (IQ).',
    unitPoints: 15.0,
    unitType: 'por_item',
    legalRef: 'Anexo VI - Item 4 (15,0 pts por curso)',
  },
  {
    code: 'VI.5',
    directiveId: 'requisito_6',
    title: 'Implantação ou desenvolvimento de produto, projeto, processo, técnica ou tecnologia',
    description: 'Inovação e aplicação prática de novos métodos no âmbito da instituição.',
    unitPoints: 15.0,
    unitType: 'por_item',
    legalRef: 'Anexo VI - Item 5 (15,0 pts por produto)',
  },
  {
    code: 'VI.6',
    directiveId: 'requisito_6',
    title: 'Liderança ou vice-liderança de grupo de pesquisa ou extensão registrado',
    description: 'Líder ou vice-líder em grupo cadastrado no CNPq ou sistema institucional.',
    unitPoints: 7.5,
    unitType: 'por_item',
    legalRef: 'Anexo VI - Item 6 (7,5 pts por grupo)',
  },
  {
    code: 'VI.7',
    directiveId: 'requisito_6',
    title: 'Participação como membro de grupo de pesquisa registrado',
    description: 'Pesquisador/membro formalmente cadastrado em grupo de pesquisa.',
    unitPoints: 3.0,
    unitType: 'por_item',
    legalRef: 'Anexo VI - Item 7 (3,0 pts por projeto)',
  },
  {
    code: 'VI.8',
    directiveId: 'requisito_6',
    title: 'Aprovação de projeto para a captação de recursos para a IFE',
    description: 'Projetos aprovados em editais de fomento e agências financiadoras.',
    unitPoints: 7.5,
    unitType: 'por_item',
    legalRef: 'Anexo VI - Item 8 (7,5 pts por projeto)',
  },
  {
    code: 'VI.9',
    directiveId: 'requisito_6',
    title: 'Publicação ou organização de livro com ISBN e Conselho Editorial',
    description: 'Livro impresso ou e-book com corpo editorial e ISBN registrado.',
    unitPoints: 20.0,
    unitType: 'por_item',
    legalRef: 'Anexo VI - Item 9 (20,0 pts por produto)',
  },
  {
    code: 'VI.10',
    directiveId: 'requisito_6',
    title: 'Autoria/coautoria de capítulo de livro, artigo em periódico, jornal científico ou revista',
    description: 'Artigos científicos ou capítulos de livros especializados.',
    unitPoints: 7.5,
    unitType: 'por_item',
    legalRef: 'Anexo VI - Item 10 (7,5 pts por publicação)',
  },
  {
    code: 'VI.11',
    directiveId: 'requisito_6',
    title: 'Apresentação de trabalho de interesse institucional em eventos',
    description: 'Apresentação oral ou pôster em congressos, seminários e encontros.',
    unitPoints: 4.5,
    unitType: 'por_item',
    legalRef: 'Anexo VI - Item 11 (4,5 pts por produto)',
  },
  {
    code: 'VI.12',
    directiveId: 'requisito_6',
    title: 'Produção de material técnico, científico, metodológico ou administrativo estruturado',
    description: 'Relatórios técnicos complexos, notas técnicas e materiais metodológicos.',
    unitPoints: 4.5,
    unitType: 'por_item',
    legalRef: 'Anexo VI - Item 12 (4,5 pts por produto)',
  },
  {
    code: 'VI.13',
    directiveId: 'requisito_6',
    title: 'Avaliação de projetos de ensino, pesquisa, extensão e/ou inovação',
    description: 'Avaliador ad hoc de editais e comitês de fomento.',
    unitPoints: 4.5,
    unitType: 'por_item',
    legalRef: 'Anexo VI - Item 13 (4,5 pts por projeto)',
  },
  {
    code: 'VI.14',
    directiveId: 'requisito_6',
    title: 'Atividade de difusão ou apoio à formação institucional (expositor, facilitador)',
    description: 'Expositor, mediador de mesas, facilitador e colaborador em ações corporativas.',
    unitPoints: 3.0,
    unitType: 'por_evento',
    legalRef: 'Anexo VI - Item 14 (3,0 pts por evento)',
  },
  {
    code: 'VI.15',
    directiveId: 'requisito_6',
    title: 'Atuação como instrutor, tutor, palestrante ou autor de conteúdo em ação formativa',
    description: 'Instrutor de treinamento interno, docente em cursos da escola de governo ou palestrante.',
    unitPoints: 4.5,
    unitType: 'por_item',
    legalRef: 'Anexo VI - Item 15 (4,5 pts por curso)',
  },
  {
    code: 'VI.16',
    directiveId: 'requisito_6',
    title: 'Coordenação de congresso, simpósio ou seminário de interesse institucional',
    description: 'Coordenação geral ou científica de eventos acadêmico-administrativos.',
    unitPoints: 3.5,
    unitType: 'por_evento',
    legalRef: 'Anexo VI - Item 16 (3,5 pts por evento)',
  },
  {
    code: 'VI.17',
    directiveId: 'requisito_6',
    title: 'Coorientação de Trabalho de Conclusão de Curso (TCC)',
    description: 'Coorientador formal de TCC em graduação ou pós-graduação.',
    unitPoints: 4.5,
    unitType: 'por_evento',
    legalRef: 'Anexo VI - Item 17 (4,5 pts por evento)',
  },
  {
    code: 'VI.18',
    directiveId: 'requisito_6',
    title: 'Autoria de obra artística ou cultural registrada com repercussão institucional',
    description: 'Composições, produções visuais ou culturais registradas.',
    unitPoints: 3.0,
    unitType: 'por_item',
    legalRef: 'Anexo VI - Item 18 (3,0 pts por produto)',
  },
  {
    code: 'VI.19',
    directiveId: 'requisito_6',
    title: 'Atuação institucional no enfrentamento de situações de surto, epidemia e pandemia',
    description: 'Comissões, forças-tarefa e atuação presencial/técnica durante emergências sanitárias.',
    unitPoints: 1.0,
    unitType: 'por_semestre',
    legalRef: 'Anexo VI - Item 19 (1,0 pt por mês)',
  },
];

export const LEGAL_SOURCES = [
  {
    title: 'Tabela Oficial do RSC-PCCTAE (Anexos I a VI)',
    url: 'https://www.gov.br/ufcg/pt-br/composicao/secretarias/srh/rsc-reconhecimento-de-saberes-e-competencias/tabela-de-niveis-do-rsc-pcctae',
    badge: 'Tabela Oficial PDF',
    description: 'Matriz oficial com os 6 Requisitos de avaliação, pontuações unitárias e unidades de medida para enquadramento.',
  },
  {
    title: 'Sobre o RSC-PCCTAE',
    url: 'https://www.gov.br/ufcg/pt-br/composicao/secretarias/srh/rsc-reconhecimento-de-saberes-e-competencias/sobre-o-rsc',
    badge: 'Institucional',
    description: 'Conceito geral, direitos, abrangência e fundamentação do Reconhecimento de Saberes e Competências.',
  },
  {
    title: 'Como Solicitar o RSC (PCCTAE)',
    url: 'https://www.gov.br/ufcg/pt-br/composicao/secretarias/srh/rsc-reconhecimento-de-saberes-e-competencias/como-solicitar-o-rsc-pcctae',
    badge: 'Procedimento',
    description: 'Guia passo a passo para abertura do processo via SEI, documentos obrigatórios e formulários.',
  },
  {
    title: 'Lei Federal nº 15.367/2026',
    url: 'https://www2.camara.leg.br/legin/fed/lei/2026/lei-15367-30-marco-2026-798892-publicacaooriginal-178682-pl.html',
    badge: 'Legislação Federal',
    description: 'Marco legal atualizado sobre os direitos de carreiras federais e estruturação do RSC.',
  },
  {
    title: 'Decreto Federal nº 13.048/2026',
    url: 'https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2026/decreto/d13048.htm',
    badge: 'Regulamento Federal',
    description: 'Regulamentação e diretrizes nacionais para validação de competências do funcionalismo.',
  },
  {
    title: 'Portaria e Normas do RSC',
    url: 'https://mecnormas.mec.gov.br/pesquisa/detalhar/13462',
    badge: 'Diretriz Oficial',
    description: 'Critérios gerais e diretrizes para comissões especiais de avaliação do RSC.',
  },
  {
    title: 'Portaria SRH de Regulamentação',
    url: 'https://www.gov.br/ufcg/pt-br/composicao/secretarias/srh/rsc-reconhecimento-de-saberes-e-competencias/legislacao-e-normas-do-rsc-pcctae/sei_6678068_portaria.pdf/@@display-file/file',
    badge: 'Portaria SRH',
    description: 'Regulamentação interna da Gestão de Pessoas / Recursos Humanos.',
  },
  {
    title: 'Portaria - Comissão do RSC',
    url: 'https://www.gov.br/ufcg/pt-br/composicao/secretarias/srh/rsc-reconhecimento-de-saberes-e-competencias/legislacao-e-normas-do-rsc-pcctae/portaria-142-comissao-rsc-ufcg.pdf/@@display-file/file',
    badge: 'Comissão Especial',
    description: 'Composição, fluxos de avaliação e regimento interno da comissão de avaliação.',
  },
];

export function evaluateRSCCompliance(rscItems: { directiveId: string; categoryCode: string; totalScore: number }[], targetLevel: string) {
  const req = RSC_REQUIREMENTS[targetLevel] || RSC_REQUIREMENTS['RSC-PCCTAE I'];
  const minScore = req?.minTotalScore || 10;
  const minCriterios = req?.minCriteriosCount || 0;

  // Total Score
  const totalScore = rscItems.reduce((acc, item) => acc + (item.totalScore || 0), 0);

  // Scores by Requisito
  const scoreByReq: Record<string, number> = {
    requisito_1: 0,
    requisito_2: 0,
    requisito_3: 0,
    requisito_4: 0,
    requisito_5: 0,
    requisito_6: 0,
  };

  rscItems.forEach((item) => {
    let dId = item.directiveId;
    if (dId === 'diretriz_1') dId = 'requisito_1';
    if (dId === 'diretriz_2') dId = 'requisito_2';
    if (dId === 'diretriz_3') dId = 'requisito_6';
    if (scoreByReq[dId] !== undefined) {
      scoreByReq[dId] += item.totalScore || 0;
    }
  });

  // Unique category codes that have points > 0 (distinct criteria in table)
  const uniqueCategories = new Set(
    rscItems.filter((i) => (i.totalScore || 0) > 0).map((i) => i.categoryCode)
  );
  const criteriosAlcancados = uniqueCategories.size;

  const isScoreSufficient = totalScore >= minScore;
  const isCriteriosSufficient = criteriosAlcancados >= minCriterios;

  // Special level requirements
  let specialReqMet = true;
  let specialReqDesc = req?.requisitoAdicional || 'Sem requisito especial adicional';

  if (targetLevel.includes('IV') && !targetLevel.includes('V') && !targetLevel.includes('VI')) {
    // RSC-IV: Pelo menos 1 critério nos Requisitos II, IV, V ou VI
    const hasReq2456 = rscItems.some((i) =>
      ['requisito_2', 'requisito_4', 'requisito_5', 'requisito_6', 'diretriz_2', 'diretriz_3'].includes(i.directiveId)
    );
    specialReqMet = hasReq2456;
    specialReqDesc = 'Necessário pelo menos 1 critério nos Requisitos II, IV, V ou VI';
  } else if (targetLevel.includes('V') && !targetLevel.includes('VI')) {
    // RSC-V: Pelo menos 1 critério nos Requisitos IV, V ou VI
    const hasReq456 = rscItems.some((i) =>
      ['requisito_4', 'requisito_5', 'requisito_6', 'diretriz_3'].includes(i.directiveId)
    );
    specialReqMet = hasReq456;
    specialReqDesc = 'Necessário pelo menos 1 critério nos Requisitos IV, V ou VI';
  } else if (targetLevel.includes('VI')) {
    // RSC-VI: Pelo menos 1 critério no Requisito VI
    const hasReq6 = rscItems.some((i) =>
      ['requisito_6', 'diretriz_3'].includes(i.directiveId)
    );
    specialReqMet = hasReq6;
    specialReqDesc = 'Necessário pelo menos 1 critério no Requisito VI (Produção e Difusão do Conhecimento)';
  }

  const isFullyCompliant = isScoreSufficient && isCriteriosSufficient && specialReqMet;

  return {
    req,
    totalScore,
    minScore,
    criteriosAlcancados,
    minCriterios,
    scoreByReq,
    isScoreSufficient,
    isCriteriosSufficient,
    specialReqMet,
    specialReqDesc,
    isFullyCompliant,
  };
}
