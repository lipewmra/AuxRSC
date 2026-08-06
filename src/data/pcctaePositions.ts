export interface PCCTAEPosition {
  name: string;
  nivel: 'E' | 'D' | 'C' | 'B' | 'A' | 'EBTT';
  description: string;
  atribuicoes?: string;
}

export const PCCTAE_POSITIONS: PCCTAEPosition[] = [
  {
    name: "Administrador",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Administrador (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Planejar, organizar, controlar e assessorar as organizações nas áreas de RH, patrimônio, materiais, finanças e tecnologia.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Advogado / Procurador",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Advogado / Procurador (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Prestar assessoria e consultoria jurídica às unidades acadêmicas e administrativas, emitindo pareceres e instruindo processos.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Analista de Tecnologia da Informação",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Analista de Tecnologia da Informação (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Desenvolver e implantar sistemas informatizados, especificando arquitetura, segurança de dados e administrando redes.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Antropólogo",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Antropólogo (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Realizar estudos e pesquisas sociais, econômicas e políticas; gerir patrimônio histórico e cultural.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Arqueólogo",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Arqueólogo (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Investigar sociedades através de vestígios materiais e estudos de patrimônio arqueológico e preservação ambiental.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Arquiteto e Urbanista",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Arquiteto e Urbanista (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Elaborar planos e projetos arquitetônicos, urbanísticos e paisagísticos para campus e fiscalizar obras.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Arquivista",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Arquivista (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Planejar, organizar e coordenar os serviços de arquivo e gestão documental física e eletrônica (SEI).\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Assistente Social",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Assistente Social (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Planejar, coordenar e executar políticas e programas de assistência estudantil, acolhimento e inclusão social.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Astrônomo",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Astrônomo (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Realizar pesquisas científicas em astronomia e geofísica espacial, tratando dados de observatórios e sensores.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Auditor",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Auditor (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Realizar auditagem e acompanhamento da execução orçamentária, financeira, patrimonial e de pessoal nas IFEs.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Bibliotecário-Documentalista",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Bibliotecário-Documentalista (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Gerenciar bibliotecas, centros de documentação e repositórios institucionais; efetuar tratamento técnico da informação.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Biólogo",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Biólogo (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Estudar seres vivos, desenvolver pesquisas em biologia molecular, biotecnologia, ecologia e organizar coleções.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Biomédico",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Biomédico (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Atuar em equipes de saúde em análises clínicas, microbiológicas, imunológicas e pesquisas laboratoriais.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Cenógrafo",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Cenógrafo (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Formular conceitos artísticos de cenografia, elaborando projetos, maquetes e supervisionando montagens.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Contador",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Contador (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Administrar tributos, registrar atos contábeis, controlar ativo permanente e elaborar demonstrações no SIAFI.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Coreógrafo",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Coreógrafo (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Conceber e concretizar projetos cênicos em dança, orientando ensaios e montagens coreográficas.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Decorador",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Decorador (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Projetar e executar soluções estéticas e funcionais para espaços internos institucionais e eventos.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Desenhista Industrial",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Desenhista Industrial (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Aplicar artes visuais e tecnologia para conceber a forma e funcionalidade de produtos, embalagens e sinalização.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Diretor de Artes Cênicas",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Diretor de Artes Cênicas (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Coordenar e supervisionar equipes de cenotécnica, produção e ensaios na montagem de espetáculos.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Diretor de Fotografia",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Diretor de Fotografia (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Captar imagens para cinema, TV e multimídia, definindo conceito fotográfico, lentes e iluminação.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Diretor de Imagem",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Diretor de Imagem (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Coordenar gravações televisivas, operação de câmeras e corte de vídeo na mesa de edição.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Diretor de Produção",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Diretor de Produção (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Gerenciar aspectos artísticos, técnicos, logísticos e financeiros em produções audiovisuais e cênicas.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Diretor de Programa",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Diretor de Programa (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Dirigir tomadas de cenas e transmissões de programas de rádio, TV e mídia digital.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Diretor de Som",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Diretor de Som (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Projetar, configurar e operar sistemas de sonorização, captação, edição e restauração de áudio.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Diretor de Iluminação",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Diretor de Iluminação (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Criar mapas e roteiros de iluminação cênica, supervisionando a montagem e afinação de refletores.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Economista",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Economista (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Analisar o ambiente econômico, elaborar projetos de viabilidade, custos públicos e planejamento orçamentário.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Economista Doméstico",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Economista Doméstico (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Orientar e monitorar ações de economia doméstica, educação do consumidor, habitabilidade e nutrição.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Editor de Publicações",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Editor de Publicações (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Editar textos e imagens para publicações impressas e eletrônicas, definindo planejamento editorial.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Enfermeiro / Enfermeiro-Área",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Enfermeiro / Enfermeiro-Área (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Prestar assistência de enfermagem direta a pacientes graves, coordenar serviços e equipes de saúde.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Engenheiro / Engenheiro-Área",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Engenheiro / Engenheiro-Área (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Desenvolver projetos, orçamentos, laudos periciais e fiscalizar obras de engenharia civil, elétrica, mecânica ou química.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Engenheiro Agrônomo",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Engenheiro Agrônomo (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Desenvolver projetos agropecuários, planejamento agronômico e gestão de fazendas experimentais.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Engenheiro Civil",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Engenheiro Civil (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Elaborar e fiscalizar projetos estruturais, edificações, reformas e saneamento básico no campus.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Engenheiro Eletricista",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Engenheiro Eletricista (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Planejar e fiscalizar instalações elétricas de alta/baixa tensão, subestações e eficiência energética.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Engenheiro Mecânico",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Engenheiro Mecânico (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Desenvolver e supervisionar projetos de climatização, máquinas, elevadores e manutenção mecânica.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Engenheiro Químico",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Engenheiro Químico (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Desenvolver e controlar processos químicos, tratamento de efluentes e segurança operacional.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Engenheiro de Segurança do Trabalho",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Engenheiro de Segurança do Trabalho (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Controlar perdas e riscos ambientais, elaborar PPRA/PCCMSO, laudos de insalubridade e mapas de risco.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Estatístico",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Estatístico (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Desenhar planos amostrais, analisar dados acadêmicos, elaborar modelos estatísticos e indicadores.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Farmacêutico / Farmacêutico-Bioquímico",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Farmacêutico / Farmacêutico-Bioquímico (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Manipular, controlar qualidade e dispensar medicamentos; realizar análises clínicas e toxicológicas.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Figurinista",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Figurinista (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Criar figurinos e indumentárias para espetáculos artísticos, especificando tecidos e técnicas de confecção.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Filósofo",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Filósofo (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Refletir crítica e sistematicamente sobre ética, epistemologia, política e produzir pesquisas conceituais.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Físico",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Físico (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Aplicar princípios físicos em pesquisas laboratoriais, radiações ionizantes, metrologia e instrumentação.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Fonoaudiólogo",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Fonoaudiólogo (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Diagnosticar e reabilitar distúrbios da voz, fala, audição e linguagem oral/escrita.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Fisioterapeuta",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Fisioterapeuta (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Atender pacientes para reabilitação cinesioterápica, motora, cardiorrespiratória e ergonomia.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Geógrafo",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Geógrafo (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Estudar a organização espacial, ordenamento territorial, SIG e processar dados georreferenciados.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Geólogo",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Geólogo (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Realizar levantamentos geológicos, geofísicos, prospecção mineral/hídrica e laudos ambientais.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Historiador",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Historiador (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Pesquisar e organizar fontes históricas, preservando a memória institucional e cultural.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Jornalista",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Jornalista (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Recolher, redigir e publicar notícias para veículos institucionais; gerenciar assessoria de imprensa.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Matemático",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Matemático (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Elaborar modelos matemáticos e lógicos, desenvolver algoritmos, simulações e cálculos atuariais.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Médico / Médico-Área",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Médico / Médico-Área (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Realizar consultas, exames clínicos, perícias médicas institucionais e programas de saúde do trabalhador.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Médico Veterinário",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Médico Veterinário (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Praticar clínica e cirurgia veterinária, vigilância sanitária e controle epidemiológico em rebanhos/biotérios.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Meteorologista",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Meteorologista (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Analisar dados atmosféricos de estações e satélites para emitir previsões de tempo e clima.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Museólogo",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Museólogo (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Criar projetos museológicos, organizar acervos, coordenar reservas técnicas e conservação preventiva.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Músico / Músico Regente",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Músico / Músico Regente (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Arranjar obras musicais, reger grupos vocais/instrumentais e coordenar a produção artística.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Musicoterapeuta",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Musicoterapeuta (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Aplicar técnicas musicoterapêuticas em atendimentos clínicos, educacionais e de promoção da saúde.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Nutricionista",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Nutricionista (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Gerenciar Restaurantes Universitários (RU), elaborar cardápios, fiscalizar higiene (APPCC) e nutrição.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Oceanólogo",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Oceanólogo (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Realizar levantamentos oceanográficos físicos, químicos e biológicos em zonas marinhas e costeiras.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Odontólogo",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Odontólogo (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Realizar atendimentos clínicos odontológicos, restaurações, procedimentos cirúrgicos e biossegurança.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Ortoptista",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Ortoptista (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Avaliar e tratar alterações da motilidade ocular, estrabismos e visão binocular.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Pedagogo-Área",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Pedagogo-Área (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Planejar, acompanhar e avaliar projetos pedagógicos (PPC), capacitação docente e inovação no ensino.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Produtor Cultural",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Produtor Cultural (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Elaborar e gerenciar projetos culturais, festivais, captação de recursos e divulgação artística.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Programador Visual",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Programador Visual (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Desenvolver projetos de comunicação visual gráfica, diagramação de livros, marcas e layouts para web.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Psicólogo-Área",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Psicólogo-Área (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Realizar acolhimento psicossocial, intervenções educacionais, organizacionais e apoio ao estudante/servidor.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Publicitário",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Publicitário (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Criar campanhas publicitárias institucionais, anúncios, folhetos e estratégias de mídias sociais.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Químico",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Químico (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Realizar análises químicas, validação de métodos laboratoriais, gestão de reagentes e resíduos.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Redator",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Redator (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Escrever e revisar textos institucionais, informativos, manuais técnicos e discursos com clareza.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Regente",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Regente (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Reger grupos vocais e orquestrais, conduzindo ensaios e adequando arranjos musicais.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Relações Públicas",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Relações Públicas (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Planejar a imagem institucional, organizar cerimonias, eventos oficiais e relacionamento com imprensa.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Restaurador",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Restaurador (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Restaurar pinturas, esculturas e bens tombados do acervo histórico e artístico universitário.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Revisor de Texto",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Revisor de Texto (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Rever textos acadêmicos e documentos oficiais, corrigindo gramática, clareza e padrão ABNT.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Roteirista",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Roteirista (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Elaborar roteiros audiovisuais, educativos e de programas de rádio e TV.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Secretário Executivo",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Secretário Executivo (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Assessorar a alta direção de reitorias, gerenciando agendas, atas, atos oficiais e viagens.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Sociólogo",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Sociólogo (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Realizar pesquisas sociológicas sobre a comunidade universitária, perfil acadêmico e políticas públicas.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Teólogo",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Teólogo (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Pesquisar textos e doutrinas religiosas, prestando assistência em espaços de acolhimento e ecumenismo.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Tradutor e Intérprete",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Tradutor e Intérprete (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Traduzir e interpretar discursos e textos entre idiomas estrangeiros e a língua portuguesa.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico Desportivo",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Técnico Desportivo (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Ensinar e orientar modalidades esportivas, treinando equipes universitárias para competições.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico em Assuntos Educacionais",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Técnico em Assuntos Educacionais (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Coordenar, planejar e desenvolver projetos e políticas educacionais e instrução de processos acadêmicos.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Tecnólogo em Cooperativismo",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Tecnólogo em Cooperativismo (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Planejar e gerenciar cooperativas e projetos de economia solidária.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Tecnólogo / Formação",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Tecnólogo / Formação (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Estudar, planejar e executar projetos tecnológicos específicos na sua área de formação.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Terapeuta Ocupacional",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Terapeuta Ocupacional (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Atender pacientes para reabilitação motora e psicossocial por meio de atividades adaptadas (AVD).\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Zootecnista",
    nivel: "E",
    description: "Nível E (Superior)",
    atribuicoes: "Descrição Geral do Cargo — Zootecnista (PCCTAE - Nível E / Lei nº 11.091/2005):\n• Fomentar a produção animal, programas de nutrição, genética, instalações e manejo de rebanhos.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Assistente de Direção e Produção",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Assistente de Direção e Produção (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Auxiliar na direção artística e técnica da equipe de produção audiovisual e espetáculos.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Assistente em Administração",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Assistente em Administração (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Executar serviços de apoio nas áreas de recursos humanos, administração, finanças, logística e processos SEI.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Confeccionador de Instrumentos Musicais",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Confeccionador de Instrumentos Musicais (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Projetar instrumentos musicais, preparar matérias-primas, confeccionar, afinar e reparar instrumentos.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Desenhista de Artes Gráficas",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Desenhista de Artes Gráficas (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Interpretar solicitações de desenhos, elaborar ilustração de produtos ou serviços e dar acabamento visual.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Desenhista Projetista",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Desenhista Projetista (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Auxiliar arquiteto e engenheiro na elaboração de projetos de construção civil, arquitetura e mecânica.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Diagramador",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Diagramador (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Planejar serviços de pré-impressão gráfica, programação visual e editorar textos e imagens.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Editor de Imagem",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Editor de Imagem (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Operar ilha de edição de vídeo, selecionar imagens e áudio, realizar ajustes técnicos de cor e corte.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Instrumentador Cirúrgico",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Instrumentador Cirúrgico (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Desempenhar atividades técnicas de instrumentação em procedimentos cirúrgicos e obstétricos.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Mestre de Edificações e Infraestrutura",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Mestre de Edificações e Infraestrutura (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Organizar e supervisionar equipes de trabalhadores na construção e manutenção predial.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Operador de Câmera de Cinema e TV",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Operador de Câmera de Cinema e TV (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Captar imagens em movimento com câmeras de vídeo e cinema interpretando o roteiro fotográfico.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Recreacionista",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Recreacionista (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Desenvolver atividades recreativas e ocupacionais para o desenvolvimento psicossocial.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Revisor de Texto Braille",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Revisor de Texto Braille (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Revisar e corrigir textos transcritos no sistema Braille e notações científicas.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Taxidermista",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Taxidermista (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Reconstituir e empalhar espécimes animais para pesquisas e exposição em museus biológicos.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico de Aerofotogrametria",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico de Aerofotogrametria (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Planejar voos aerofotográficos, processar filmes e mosaicos e transcrever mapas topográficos.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico de Laboratório / Área",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico de Laboratório / Área (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Executar trabalhos técnicos laboratoriais, preparar experimentos, reagentes e manutenção de equipamentos.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico de Tecnologia da Informação",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico de Tecnologia da Informação (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Desenvolver sistemas e aplicações, dar suporte aos usuários e realizar manutenção em computadores e redes.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico em Agrimensura",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico em Agrimensura (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Executar levantamentos geodésicos e topográficos, calcular e elaborar cartas cartográficas.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico em Agropecuária",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico em Agropecuária (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Prestar assistência técnica à produção agropecuária, fiscalizar cultivos e recomendar biossegurança.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico em Alimentos e Laticínios",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico em Alimentos e Laticínios (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Planejar processamento e controle de qualidade de alimentos e insumos na indústria alimentícia.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico em Anatomia e Necrópsia",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico em Anatomia e Necrópsia (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Preparar cadáveres e peças anatômicas para aulas e pesquisas nos laboratórios de saúde.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico em Arquivo",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico em Arquivo (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Auxiliar na organização, conservação, pesquisa e difusão de documentos acervados.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico em Artes Gráficas",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico em Artes Gráficas (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Acompanhar a produção de materiais impressos, calibração de cor e processos de fotolito/CThP.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico em Audiovisual",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico em Audiovisual (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Operar e manter equipamentos de som, projeção, filmagem e cenografia de auditórios.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico em Cartografia",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico em Cartografia (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Elaborar e atualizar cartas cartográficas e mapeamentos georreferenciados em computador.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico em Cinematografia",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico em Cinematografia (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Operar câmeras e equipamentos de estúdio cinematográfico durante produções de mídia.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico em Contabilidade",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico em Contabilidade (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Executar lançamentos contábeis, operacionalizar custos e auxiliares do balanço orçamentário.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico em Economia Doméstica",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico em Economia Doméstica (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Acompanhar projetos sociais, de nutrição comunitária e organização do ambiente familiar.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico em Edificações",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico em Edificações (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Desenvolver projetos arquitetônicos sob supervisão, orçar e acompanhar obras e instalações.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico em Educação Física",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico em Educação Física (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Auxiliar na organização de eventos esportivos, conservação de ginásios e aplicação de treinos.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico em Eletroeletrônica",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico em Eletroeletrônica (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Instalar, manter e calibrar sistemas eletroeletrônicos e circuitos industriais.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico em Eletromecânica",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico em Eletromecânica (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Realizar manutenção e montagem de componentes elétricos e mecânicos de usinas e prédios.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico em Eletrotécnica",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico em Eletrotécnica (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Montar e reparar instalações elétricas prediais e industriais de baixa e média tensão.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico em Enfermagem",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico em Enfermagem (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Prestar assistência de enfermagem sob supervisão, administrar medicamentos e realizar curativos.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico em Enfermagem do Trabalho",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico em Enfermagem do Trabalho (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Atuar na prevenção de acidentes de trabalho, exames periódicos e programas de medicina ocupacional.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico em Enologia",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico em Enologia (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Acompanhar o processamento, fermentação e controle de qualidade de bebidas e fermentados.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico em Equipamentos Médico-Odontológico",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico em Equipamentos Médico-Odontológico (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Instalar e reparar equipamentos odontológicos, médicos e hospitalares do campus.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico em Estradas",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico em Estradas (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Supervisionar a construção e pavimentação de vias, estradas de acesso e terraplanagem.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico em Farmácia",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico em Farmácia (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Manipular e separar medicamentos, controlar estoque e auxiliar o farmacêutico.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico em Geologia",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico em Geologia (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Acompanhar amostragem de rochas, sondagens geológicas e ensaios de solo.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico em Herbário",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico em Herbário (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Coletar, desidratar, identificar e catalogar espécimes vegetais em acervos botânicos.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico em Hidrologia",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico em Hidrologia (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Operar estações pluviométricas e fluviométricas, medindo vazão e qualidade da água.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico em Higiene Dental",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico em Higiene Dental (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Realizar procedimentos odontológicos preventivos, limpeza, aplicação de flúor e biossegurança.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico em Instrumentação",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico em Instrumentação (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Calibrar instrumentos de medição de precisão, sensores e controladores industriais.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico em Mecânica",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico em Mecânica (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Acompanhar manutenção de máquinas, usinagem de peças e sistemas mecânicos.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico em Metalurgia",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico em Metalurgia (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Acompanhar processos de fundição, tratamento térmico e ensaios de materiais metálicos.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico em Microfilmagem",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico em Microfilmagem (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Operar máquinas de microfilmagem e digitalização para preservação do acervo acadêmico.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico em Mineração",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico em Mineração (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Participar de pesquisas minerais, lavra de pedreiras e controle de estabilidade de solo.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico em Móveis e Esquadrias",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico em Móveis e Esquadrias (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Confeccionar e reparar móveis de madeira e esquadrias metálicas do campus.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico em Música",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico em Música (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Acompanhar ensaios, executar partituras e preparar instrumentos em orquestras e corais.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico em Nutrição e Dietética",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico em Nutrição e Dietética (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Acompanhar o preparo de refeições no Restaurante Universitário e verificar higiene sanitária.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico em Ortóptica",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico em Ortóptica (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Auxiliar o médico ortoptista na realização de exames visuais e exercícios para os olhos.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico em Ótica",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico em Ótica (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Confeccionar e surfar lentes ópticas, ajustando armações de óculos.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico em Prótese Dentária",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico em Prótese Dentária (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Confeccionar e reparar próteses dentárias fixas e removíveis conforme moldes.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico em Química",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico em Química (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Realizar ensaios físico-químicos, preparar reagentes e operar espectrofotômetros.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico em Radiologia",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico em Radiologia (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Operar equipamentos de raio-X e diagnóstico por imagem com proteção radiológica.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico em Reabilitação",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico em Reabilitação (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Auxiliar em sessões de fisioterapia e terapia ocupacional para pacientes e servidores.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico em Refrigeração",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico em Refrigeração (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Instalar e manter aparelhos de ar-condicionado, câmaras frias e sistemas frigoríficos.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico em Restauração",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico em Restauração (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Executar técnicas de conservação e restauração de documentos, livros e obras históricas.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico em Saneamento",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico em Saneamento (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Operar estações de tratamento de água e efluentes e controlar redes de esgoto.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico em Segurança do Trabalho",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico em Segurança do Trabalho (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Inspecionar locais de trabalho, fiscalizar uso de EPIs, conduzir CIPA e investigar acidentes.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico em Som",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico em Som (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Configurar mesas de som, microfones e gravação em auditórios e eventos acadêmicos.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico em Telecomunicações",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico em Telecomunicações (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Instalar e manter centrais telefônicas, cabos de fibra óptica e antenas de transmissão.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Técnico em Telefonia",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Técnico em Telefonia (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Reparar aparelhos telefônicos e linhas de comunicação da rede interna.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Tradutor e Intérprete de Linguagem de Sinais (LIBRAS)",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Tradutor e Intérprete de Linguagem de Sinais (LIBRAS) (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Traduzir e interpretar aulas, palestras e eventos acadêmicos para a Língua Brasileira de Sinais.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Transcritor de Sistema Braille",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Transcritor de Sistema Braille (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Transcrever livros didáticos e provas acadêmicas para a escrita tátil em Braille.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Vigilante",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Vigilante (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Rondar dependências institucionais, controlar acesso de pessoas e veículos e preservar a segurança.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Visitador Sanitário",
    nivel: "D",
    description: "Nível D (Técnico/Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Visitador Sanitário (PCCTAE - Nível D / Lei nº 11.091/2005):\n• Inspecionar condições sanitárias nos prédios e refeitórios do campus.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Aderecista",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Aderecista (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Montar, transformar e confeccionar objetos cenográficos sob orientação técnica.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Administrador de Edifícios",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Administrador de Edifícios (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Administrar prédios universitários organizando serviços de manutenção, limpeza e portaria.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Afinador de Instrumentos Musicais",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Afinador de Instrumentos Musicais (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Afinar instrumentos acústicos, testando e regulando sonoridade e partes mecânicas.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Almoxarife",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Almoxarife (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Organizar almoxarifado, efetuar recebimento, estocagem e distribuição de materiais.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Ascensorista",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Ascensorista (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Operar elevadores no transporte de passageiros e cargas nas edificações.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Assistente de Alunos",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Assistente de Alunos (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Assistir e orientar alunos no aspecto de disciplina, segurança e convivência nas dependências.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Auxiliar de Creche",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Auxiliar de Creche (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Cuidar e acompanhar crianças em creches institucionais e atividades recreativas.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Assistente de Laboratório / Área",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Assistente de Laboratório / Área (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Preparar vidrarias, soluções básicas e limpeza de laboratórios acadêmicos.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Assistente de Tecnologia da Informação",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Assistente de Tecnologia da Informação (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Prestar suporte operacional simples em microcomputadores e impressoras.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Auxiliar de Biblioteca",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Auxiliar de Biblioteca (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Atuar na arrumação de estantes, atendimento de empréstimo e devolução de livros.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Auxiliar de Enfermagem",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Auxiliar de Enfermagem (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Prestar cuidados básicos de higiene e conforto a pacientes sob supervisão de enfermagem.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Auxiliar de Saúde",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Auxiliar de Saúde (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Auxiliar em campanhas de vacinação, triagem básica e entrega de documentos.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Auxiliar de Topografia",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Auxiliar de Topografia (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Auxiliar nas tarefas de campo em topografia, segurando mira e balizas.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Auxiliar de Veterinária e Zootecnia",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Auxiliar de Veterinária e Zootecnia (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Higienizar canis e biotérios, alimentar animais e auxiliar em procedimentos clínicos.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Auxiliar em Administração",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Auxiliar em Administração (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Executar tarefas administrativas simples, protocolo, arquivamento e entrega de correspondências.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Auxiliar em Assuntos Educacionais",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Auxiliar em Assuntos Educacionais (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Apoiar na organização de salas de aula, material escolar e listas de presença.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Brigadista de Incêndio",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Brigadista de Incêndio (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Prevenir situações de risco e atuar em primeiros socorros e combate ao fogo.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Camareiro de Espetáculo",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Camareiro de Espetáculo (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Manter em ordem, conservar e passar figurinos e vestuários de elenco cênico.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Cenotécnico",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Cenotécnico (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Construir e adaptar peças de cenários em carpintaria, serralheria e pintura.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Condutor / Motorista Fluvial",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Condutor / Motorista Fluvial (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Conduzir embarcações de pequeno porte para transporte de passageiros ou pesquisas.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Contínuo / Auxiliar de Serviços Administrativos",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Contínuo / Auxiliar de Serviços Administrativos (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Coletar e entregar documentos internos, encomendas e serviços externos de banco/correio.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Contra-Mestre / Ofício",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Contra-Mestre / Ofício (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Orientar e acompanhar tarefas operacionais de oficinas e manutenção.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Contra-Regra",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Contra-Regra (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Cuidar da colocação e guarda de objetos de cena no palco durante apresentações.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Costureiro de Espetáculo / Cenário",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Costureiro de Espetáculo / Cenário (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Confeccionar e ajustar figurinos e cortinas cênicas a partir de croquis.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Cozinheiro",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Cozinheiro (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Preparar refeições sob supervisão de nutricionista no Restaurante Universitário.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Cozinheiro de Embarcações",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Cozinheiro de Embarcações (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Organizar a cozinha e preparar refeições a bordo de barcos de pesquisa.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Datilógrafo de Textos Gráficos",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Datilógrafo de Textos Gráficos (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Digitador e transcritor de documentos e originais para impressão.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Detonador",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Detonador (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Preparar e efetuar detonamento de cargas explosivas para escavação de rochas.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Discotecário",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Discotecário (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Organizar acervo de discos, fitas e CDs da rádio universitária.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Eletricista",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Eletricista (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Instalar e reparar redes elétricas de iluminação, tomadas e quadros de distribuição.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Eletricista de Espetáculo",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Eletricista de Espetáculo (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Instalar refletores, gelatinas e comandos elétricos no palco.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Encadernador",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Encadernador (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Realizar encadernação de livros, teses e revistas em brochura ou capa dura.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Encanador / Bombeiro",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Encanador / Bombeiro (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Instalar e reparar tubulações de água, esgoto, louças sanitárias e torneiras.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Fotógrafo",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Fotógrafo (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Fotografar eventos oficiais, experimentos laboratoriais e solenidades institucionais.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Fotogravador",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Fotogravador (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Gravar matrizes e chapas metálicas para impressão gráfica.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Impositor",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Impositor (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Montar páginas e fotolitos em matrizes de pré-impressão.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Mecânico de Montagem e Manutenção",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Mecânico de Montagem e Manutenção (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Regular e operar máquinas-ferramenta para usinar peças metálicas.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Guarda-Florestal",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Guarda-Florestal (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Vigiar áreas florestais do campus prevenindo caça, desmatamento e queimadas.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Hialotécnico",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Hialotécnico (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Moldar vidros e cristais para confecção e conserto de vidrarias de laboratório.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Impressor",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Impressor (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Operar máquinas impressoras offset e tipográficas no parque gráfico universitário.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Linotipista",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Linotipista (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Compor textos em matrizes de chumbo para linotipo.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Locutor",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Locutor (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Apresentar programas de rádio e narrar vídeos institucionais.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Maquinista de Artes Cênicas",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Maquinista de Artes Cênicas (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Operar varas de iluminação, cortinas e urdimento nos palcos.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Mateiro",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Mateiro (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Acompanhar pesquisadores em expedições em matas e florestas.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Mecânico",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Mecânico (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Manter e reparar motores de veículos e máquinas agrícolas do campus.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Mestre de Embarcações de Pequeno Porte",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Mestre de Embarcações de Pequeno Porte (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Navegar e comandar barcos de pesquisa em rios e lagos.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Motorista",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Motorista (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Dirigir veículos oficiais e ônibus no transporte de alunos, professores e servidores.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Operador de Caldeira",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Operador de Caldeira (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Controlar o funcionamento de caldeiras a vapor para esterilização e aquecimento.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Operador de Central Hidroelétrica",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Operador de Central Hidroelétrica (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Monitorar turbinas e geradores em usinas piloto.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Operador de Destilaria",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Operador de Destilaria (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Operar destiladores para obtenção de álcool e substâncias químicas purificadas.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Operador de Estação de Tratamento d'Água e Esgoto",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Operador de Estação de Tratamento d'Água e Esgoto (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Monitorar dosagem de cloro, coagulantes e filtros no tratamento de água.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Operador de Luz",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Operador de Luz (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Manejar mesa de luz e refletores durante apresentações no teatro.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Operador de Máquinas de Construção Civil",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Operador de Máquinas de Construção Civil (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Operar betoneiras e compressores em canteiros de obras.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Operador de Máquina Fotocompositora",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Operador de Máquina Fotocompositora (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Operar sistemas de fotocomposição para produção gráfica.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Operador de Máquinas de Terraplanagem",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Operador de Máquinas de Terraplanagem (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Operar tratores de esteira e niveladoras em obras viárias do campus.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Operador de Máquina Copiadora",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Operador de Máquina Copiadora (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Operar fotocopiadoras e encadernadoras na central de cópias.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Operador de Máquinas Agrícolas",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Operador de Máquinas Agrícolas (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Operar tratores e colheitadeiras em fazendas experimentais.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Operador de Rádio Telecomunicações",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Operador de Rádio Telecomunicações (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Transmitir e codificar mensagens via rádio para equipes de segurança.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Porteiro",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Porteiro (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Fiscalizar a entrada e saída de pessoas e veículos nos portões da instituição.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Programador de Rádio e Televisão",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Programador de Rádio e Televisão (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Elaborar a grade diária de programação musical e educativa.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Recepcionista",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Recepcionista (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Atender visitantes no saguão, prestando informações e direcionando aos setores.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Revisor de Provas Tipográficas",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Revisor de Provas Tipográficas (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Ler e corrigir provas de impressão antes da tiragem final.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Salva-Vidas",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Salva-Vidas (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Vigiar piscinas e complexos aquáticos do campus prevenindo afogamentos.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Seringueiro",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Seringueiro (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Realizar sangria em seringueiras para extração de látex em campos de estudo.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Sonoplasta",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Sonoplasta (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Selecionar e mixar vinhetas, efeitos sonoros e músicas para rádio e TV.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Telefonista",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Telefonista (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Operar PABX, transferir ligações e prestar informações telefônicas.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Tipógrafo",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Tipógrafo (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Compor tipos móveis para impressão de convites e cartões na tipografia.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Torneiro Mecânico",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Torneiro Mecânico (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Usinar peças cilíndricas em torno mecânico para manutenção de equipamentos.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Vidreiro",
    nivel: "C",
    description: "Nível C (Intermediário)",
    atribuicoes: "Descrição Geral do Cargo — Vidreiro (PCCTAE - Nível C / Lei nº 11.091/2005):\n• Cortar e instalar vidros planos em janelas e portas das edificações.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Açougueiro",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Açougueiro (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Efetuar desossa e corte de carnes para o Restaurante Universitário.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Ajustador Mecânico",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Ajustador Mecânico (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Construir e reparar conjuntos mecânicos e calibradores.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Apontador",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Apontador (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Registrar frequência de trabalhadores e controlar materiais em obras.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Armador",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Armador (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Cortar, dobrar e armar ferragens de ferro/aço para estruturas de concreto.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Armazenista",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Armazenista (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Receber, estocar e conferir alimentos e mantimentos em despensas.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Arrais",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Arrais (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Conduzir embarcações miúdas a motor em águas abrigadas.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Assistente de Câmera",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Assistente de Câmera (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Transportar e auxiliar no alinhamento e foco de câmeras de filmagem.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Assistente de Montagem",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Assistente de Montagem (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Auxiliar na cópia de fitas e organização de rolos de filme.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Assistente de Som",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Assistente de Som (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Carregar microfones, cabos e auxiliar o operador de áudio.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Atendente de Consultório / Área",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Atendente de Consultório / Área (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Recepcionar e cadastrar pacientes nas clínicas universitárias.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Atendente de Enfermagem",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Atendente de Enfermagem (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Executar tarefas simples de auxílio no transporte e leitos de pacientes.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Auxiliar de Agropecuária",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Auxiliar de Agropecuária (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Apoiar o manejo de animais, alimentação e ordenha.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Auxiliar de Anatomia e Necropsia",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Auxiliar de Anatomia e Necropsia (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Limpar e organizar mesas e tanques de formol nos laboratórios.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Auxiliar de Artes Gráficas",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Auxiliar de Artes Gráficas (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Auxiliar na dobra, alceamento e empacotamento de impressos.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Auxiliar de Cenografia",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Auxiliar de Cenografia (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Auxiliar na montagem de painéis e cenários.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Auxiliar de Cozinha",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Auxiliar de Cozinha (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Descascar legumes, lavar utensílios e higienizar a cozinha do RU.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Auxiliar de Curtume e Tanagens",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Auxiliar de Curtume e Tanagens (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Apoiar o tratamento e curtimento de couros em laboratórios de pecuária.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Auxiliar de Eletricista",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Auxiliar de Eletricista (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Passar fiação, carregar escadas e auxiliar na troca de lâmpadas.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Auxiliar de Farmácia",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Auxiliar de Farmácia (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Organizar prateleiras e limpar recipientes da farmácia.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Auxiliar de Figurino",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Auxiliar de Figurino (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Organizar cabides e guardar roupas no acervo cênico.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Auxiliar de Industrialização e Conservação de Alimentos",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Auxiliar de Industrialização e Conservação de Alimentos (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Operar máquinas embaladoras de alimentos.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Auxiliar de Laboratório",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Auxiliar de Laboratório (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Lavar vidrarias, recolher lixo biológico e higienizar bancadas.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Auxiliar de Mecânica",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Auxiliar de Mecânica (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Passar ferramentas, lavar peças e aplicar graxa em motores.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Auxiliar de Meteorologia",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Auxiliar de Meteorologia (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Coletar dados simples de termômetros em estações meteorológicas.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Auxiliar de Microfilmagem",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Auxiliar de Microfilmagem (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Preparar papeladas e retirar grampos para digitalização.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Auxiliar de Nutrição e Dietética",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Auxiliar de Nutrição e Dietética (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Transportar carrinhos de refeições nas alas de internamento.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Auxiliar de Processamento de Dados",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Auxiliar de Processamento de Dados (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Apoiar o manuseio de papel formulário e etiquetas de computadores.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Barbeiro",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Barbeiro (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Prestar serviços de corte de cabelo e barba a alunos residentes.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Barqueiro",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Barqueiro (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Remar ou conduzir pequenas canoas em travessias.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Bombeiro Hidráulico",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Bombeiro Hidráulico (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Trocar reparos de torneiras e desentupir canos.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Carpinteiro",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Carpinteiro (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Confeccionar formas de madeira para concreto e telhados.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Compositor Gráfico",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Compositor Gráfico (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Organizar matrizes de impressão manuais.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Conservador de Pescado",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Conservador de Pescado (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Efetuar limpeza, escamação e salga de peixes.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Contra-Mestre Fluvial / Marítimo",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Contra-Mestre Fluvial / Marítimo (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Auxiliar na manobra de atracação de barcos.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Copeiro",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Copeiro (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Servir café, água e refeições nas reuniões de conselhos.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Costureiro",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Costureiro (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Confeccionar aventais, lençóis e capas de estofado.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Desenhista Copista",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Desenhista Copista (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Copiar plantas e mapas em papel vegetal.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Eletricista de Embarcação",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Eletricista de Embarcação (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Manter acumuladores e geradores de barcos.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Estofador",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Estofador (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Trocar espumas e tecidos de poltronas dos auditórios.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Garçom",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Garçom (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Servir mesas em eventos solenes e refeitórios oficiais.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Jardineiro",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Jardineiro (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Podar gramados, regar plantas e plantar mudas nos canteiros.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Lancheiro",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Lancheiro (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Preparar sucos, lanches e salgados na lanchonete institucional.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Marceneiro",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Marceneiro (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Fabricar e reparar armários, bancadas e mesas de madeira.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Marinheiro",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Marinheiro (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Efetuar limpeza, pintura e cabos de amarração de navios.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Marinheiro-Fluvial",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Marinheiro-Fluvial (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Efetuar manutenção de convés em barcos de rio.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Massagista",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Massagista (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Aplicação de massagens relaxantes para atletas universitários.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Mestre de Rede",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Mestre de Rede (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Tecere e reparar redes de pesca de pesquisas oceânicas.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Montador / Soldador",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Montador / Soldador (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Soldar chapas finas e montar portões metálicos.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Motociclista",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Motociclista (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Conduzir motocicletas para entrega rápida de correspondências.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Operador de Tele-Impressora",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Operador de Tele-Impressora (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Operar telex e aparelhos de transmissão de mensagens.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Padeiro",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Padeiro (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Fabricar pães e biscoitos para o café dos residentes.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Pedreiro",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Pedreiro (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Assentar tijolos, azulejos e realizar reboque em reformas.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Pintor de Construção Cênica e Painéis",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Pintor de Construção Cênica e Painéis (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Pintar cenários e fundos de palco.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Pintor / Área",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Pintor / Área (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Pintar paredes, grades e portas das edificações do campus.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Sapateiro",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Sapateiro (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Confeccionar e consertar calçados de proteção de servidores.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Seleiro",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Seleiro (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Confeccionar e consertar selas e arreios de montaria.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Tratorista",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Tratorista (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Operar tratores agrícolas para roçagem e arado.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Vidraceiro",
    nivel: "B",
    description: "Nível B (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Vidraceiro (PCCTAE - Nível B / Lei nº 11.091/2005):\n• Colocar massas e vidros em caixilhos de janelas.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Assistente de Estúdio",
    nivel: "A",
    description: "Nível A (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Assistente de Estúdio (PCCTAE - Nível A / Lei nº 11.091/2005):\n• Carregar equipamentos e adereços nos estúdios de rádio e TV.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Auxiliar de Alfaiate",
    nivel: "A",
    description: "Nível A (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Auxiliar de Alfaiate (PCCTAE - Nível A / Lei nº 11.091/2005):\n• Passar tecidos e alinhavar costuras.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Auxiliar de Carpintaria",
    nivel: "A",
    description: "Nível A (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Auxiliar de Carpintaria (PCCTAE - Nível A / Lei nº 11.091/2005):\n• Carregar tábuas, limpar serragem e segurar formas de madeira.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Auxiliar de Dobrador",
    nivel: "A",
    description: "Nível A (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Auxiliar de Dobrador (PCCTAE - Nível A / Lei nº 11.091/2005):\n• Segurar chapas de ferro na guilhotina e prensa.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Auxiliar de Encanador",
    nivel: "A",
    description: "Nível A (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Auxiliar de Encanador (PCCTAE - Nível A / Lei nº 11.091/2005):\n• Carregar tubos de PVC/ferro e escavar canaletas de esgoto.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Auxiliar de Estofador",
    nivel: "A",
    description: "Nível A (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Auxiliar de Estofador (PCCTAE - Nível A / Lei nº 11.091/2005):\n• Retirar grampos e estofar assentos rasgados.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Auxiliar de Forjador de Metais",
    nivel: "A",
    description: "Nível A (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Auxiliar de Forjador de Metais (PCCTAE - Nível A / Lei nº 11.091/2005):\n• Aquecer peças de ferro na forja.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Auxiliar de Fundição de Metais",
    nivel: "A",
    description: "Nível A (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Auxiliar de Fundição de Metais (PCCTAE - Nível A / Lei nº 11.091/2005):\n• Retirar escória de cadinhos e derramar metal nos moldes.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Auxiliar de Infra-Estrutura e Manutenção / Área",
    nivel: "A",
    description: "Nível A (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Auxiliar de Infra-Estrutura e Manutenção / Área (PCCTAE - Nível A / Lei nº 11.091/2005):\n• Executar serviços braçais em valetamento e obras gerais.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Auxiliar de Limpeza",
    nivel: "A",
    description: "Nível A (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Auxiliar de Limpeza (PCCTAE - Nível A / Lei nº 11.091/2005):\n• Varrer salas, lavar sanitários, recolher lixo e manter a higiene.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Auxiliar de Marcenaria",
    nivel: "A",
    description: "Nível A (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Auxiliar de Marcenaria (PCCTAE - Nível A / Lei nº 11.091/2005):\n• Lixar peças de madeira e aplicar cola e verniz.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Auxiliar Oficina de Instrumentos Musicais",
    nivel: "A",
    description: "Nível A (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Auxiliar Oficina de Instrumentos Musicais (PCCTAE - Nível A / Lei nº 11.091/2005):\n• Limpar e transportar estojos de instrumentos.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Auxiliar de Padeiro",
    nivel: "A",
    description: "Nível A (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Auxiliar de Padeiro (PCCTAE - Nível A / Lei nº 11.091/2005):\n• Sovar massas de pão e colocar assadeiras no forno.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Auxiliar de Sapateiro",
    nivel: "A",
    description: "Nível A (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Auxiliar de Sapateiro (PCCTAE - Nível A / Lei nº 11.091/2005):\n• Passar cola em solados e lixar couro.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Auxiliar de Serralheria",
    nivel: "A",
    description: "Nível A (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Auxiliar de Serralheria (PCCTAE - Nível A / Lei nº 11.091/2005):\n• Lixar soldas, rebarbar peças de ferro e aplicar zarcão.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Auxiliar de Soldador",
    nivel: "A",
    description: "Nível A (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Auxiliar de Soldador (PCCTAE - Nível A / Lei nº 11.091/2005):\n• Segurar peças metálicas e limpar escória de solda.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Auxiliar Rural",
    nivel: "A",
    description: "Nível A (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Auxiliar Rural (PCCTAE - Nível A / Lei nº 11.091/2005):\n• Limpar terrenos, capinar vegetação e carregar adubo.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Carvoejador",
    nivel: "A",
    description: "Nível A (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Carvoejador (PCCTAE - Nível A / Lei nº 11.091/2005):\n• Abastecer e controlar o fogo nos fornos de carvão vegetal.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Chaveiro",
    nivel: "A",
    description: "Nível A (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Chaveiro (PCCTAE - Nível A / Lei nº 11.091/2005):\n• Fazer cópias de chaves e trocar segredos de fechaduras.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Lavadeiro",
    nivel: "A",
    description: "Nível A (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Lavadeiro (PCCTAE - Nível A / Lei nº 11.091/2005):\n• Lavar e secar lençóis, aventais e vestuários de laboratório.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Oleiro",
    nivel: "A",
    description: "Nível A (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Oleiro (PCCTAE - Nível A / Lei nº 11.091/2005):\n• Moldar tijolos de barro e telhas para secagem ao sol.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Operador de Máquina de Lavanderia",
    nivel: "A",
    description: "Nível A (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Operador de Máquina de Lavanderia (PCCTAE - Nível A / Lei nº 11.091/2005):\n• Operar lavadoras e centrifugas industriais.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Pescador Profissional",
    nivel: "A",
    description: "Nível A (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Pescador Profissional (PCCTAE - Nível A / Lei nº 11.091/2005):\n• Lançar redes e recolher amostragem de peixes para pesquisas.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Redeiro",
    nivel: "A",
    description: "Nível A (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Redeiro (PCCTAE - Nível A / Lei nº 11.091/2005):\n• Armar e consertar redes e trançados de pesca.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Servente de Limpeza",
    nivel: "A",
    description: "Nível A (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Servente de Limpeza (PCCTAE - Nível A / Lei nº 11.091/2005):\n• Executar limpeza pesada de prédios e pátios.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Servente de Obras",
    nivel: "A",
    description: "Nível A (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Servente de Obras (PCCTAE - Nível A / Lei nº 11.091/2005):\n• Transportar sacos de cimento, areia e preparar argamassa.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Taifeiro Fluvial",
    nivel: "A",
    description: "Nível A (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Taifeiro Fluvial (PCCTAE - Nível A / Lei nº 11.091/2005):\n• Servir refeições e manter a limpeza nos camarotes de barcos.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Taifeiro Marítimo",
    nivel: "A",
    description: "Nível A (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Taifeiro Marítimo (PCCTAE - Nível A / Lei nº 11.091/2005):\n• Limpar alojamentos e arrumar mesas em navios de pesquisa.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Vestiarista",
    nivel: "A",
    description: "Nível A (Apoio)",
    atribuicoes: "Descrição Geral do Cargo — Vestiarista (PCCTAE - Nível A / Lei nº 11.091/2005):\n• Guardar pertences de usuários em vestiários de piscinas e ginásios.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  },
  {
    name: "Professor do Ensino Básico, Técnico e Tecnológico (EBTT)",
    nivel: "EBTT",
    description: "Carreira EBTT (Docente)",
    atribuicoes: "Descrição Geral do Cargo — Professor do Ensino Básico, Técnico e Tecnológico (EBTT) (PCCTAE - Nível EBTT / Lei nº 12.772/2012):\n• Planejamento e ministração de aulas na Educação Básica, Técnica e Tecnológica e Ensino Superior, orientações acadêmicas e projetos de pesquisa aplicada.\n• Instrução técnica de processos, elaboração de documentos institucionais e atendimento no âmbito da rede federal de ensino."
  }
];

export function getPCCTAEDescription(cargoName: string, nivel?: string): string {
  const normalized = (cargoName || '').trim().toLowerCase();

  if (!normalized) {
    return `Descrição Geral do Cargo (PCCTAE / Lei nº 11.091/2005):
• Planejamento, execução e acompanhamento das atribuições e rotinas institucionais conforme o Plano de Carreira dos Cargos Técnico-Administrativos em Educação (PCCTAE).`;
  }

  // Exact match
  const exact = PCCTAE_POSITIONS.find((p) => p.name.toLowerCase() === normalized);
  if (exact && exact.atribuicoes) return exact.atribuicoes;

  // Contains match
  const contains = PCCTAE_POSITIONS.find((p) => p.name.toLowerCase().includes(normalized) || normalized.includes(p.name.toLowerCase()));
  if (contains && contains.atribuicoes) return contains.atribuicoes;

  // Level Fallback
  const effectiveNivel = contains?.nivel || nivel || 'D';
  if (effectiveNivel === 'E') {
    return `Descrição Geral do Cargo (${cargoName}) — Nível E (Nível Superior / Lei nº 11.091/2005):
• Planejamento, organização, execução e avaliação de atividades de nível superior de alta complexidade.
• Elaboração de pareceres técnicos, projetos institucionais, relatórios de gestão e pesquisa aplicada no âmbito universitário.
• Assessoria em processos de tomada de decisão e coordenação de equipes de trabalho nas IFEs.`;
  } else if (effectiveNivel === 'D') {
    return `Descrição Geral do Cargo (${cargoName}) — Nível D (Nível Intermediário / Lei nº 11.091/2005):
• Execução de serviços de apoio técnico e administrativo, instrução e autuação de processos no SEI.
• Atendimento ao público, suporte operacional a ações de ensino, pesquisa e extensão e controle de documentos.
• Operacionalização de sistemas institucionais e gestão de rotinas administrativas de média complexidade.`;
  } else if (effectiveNivel === 'C') {
    return `Descrição Geral do Cargo (${cargoName}) — Nível C (Nível Auxiliar / Lei nº 11.091/2005):
• Execução de atividades de apoio operacional, rotinas de secretaria, recepção e atendimento.
• Suporte logístico, controle de estoque/almoxarifado e preservação de infraestrutura institucional.`;
  } else if (effectiveNivel === 'B' || effectiveNivel === 'A') {
    return `Descrição Geral do Cargo (${cargoName}) — Nível ${effectiveNivel} (Apoio Operacional / Lei nº 11.091/2005):
• Execução de tarefas de apoio operacional, manutenção predial, conservação e suporte às atividades do campus.`;
  } else if (effectiveNivel === 'EBTT') {
    return `Descrição Geral do Cargo (${cargoName}) — Carreira EBTT (Lei nº 12.772/2012):
• Ministração de aulas, orientação acadêmica e elaboração de projetos de ensino, pesquisa aplicada e extensão.
• Participação em colegiados de curso e gestão acadêmica nas Instituições Federais de Ensino.`;
  }

  return `Descrição Geral do Cargo (${cargoName}) — Lei nº 11.091/2005:
• Planejamento, execução e acompanhamento das atribuições e rotinas institucionais conforme o Plano de Carreira dos Cargos Técnico-Administrativos em Educação (PCCTAE).`;
}
