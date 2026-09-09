import React, { useState, useMemo, useEffect } from 'react';
import { RSCItem, UserProfile } from '../types';
import { RSC_REQUIREMENTS, evaluateRSCCompliance } from '../data/rscStructure';
import { getApiHeaders, getStoredGeminiApiKey } from '../utils/apiKey';
import { calculateServiceTimeFromEntryDate, formatDateDisplay } from '../utils/dateValidation';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Award,
  Copy,
  Check,
  FileText,
  Printer,
  Download,
  Sparkles,
  UserCheck,
  Briefcase,
  Calendar,
  Building2,
  CheckSquare,
  Square,
  HelpCircle,
  Loader2,
  RefreshCw,
  Target,
  Edit3,
  Eye,
  EyeOff,
} from 'lucide-react';

interface ComplianceSummaryProps {
  rscItems: RSCItem[];
  userProfile: UserProfile;
  onOpenExport: () => void;
  onRequireApiKey?: (reason: string) => void;
}

// Helper to build a fluid, dignified life history narrative conforming to Decreto nº 13.048/2026
export const buildConsolidatedLifeHistoryMemorial = (
  userProfile: UserProfile,
  rscItems: RSCItem[],
  trajetoriaData: {
    dataIngresso: string;
    tempoServico: string;
    setoresAtuacao: string;
    areasDestaque: string[];
    atividadesDesempenhadas: string;
    projetosEntregas: string;
    impactosMelhorias: string;
  },
  rscSummary: {
    totalScore: number;
    minScore: number;
    criteriosAlcancados: number;
    minCriterios: number;
  }
): string => {
  const nome = userProfile.nomeCompleto ? userProfile.nomeCompleto.trim() : 'o(a) servidor(a)';
  const cargo = userProfile.cargo || 'Técnico-Administrativo em Educação';
  const nivel = userProfile.nivelClassificacao || 'E';
  const lotacao = userProfile.lotacao || 'sua Instituição Federal de Ensino';
  const rscLevel = userProfile.rscAlmejado || 'RSC-PCCTAE I';

  const activeItems = rscItems.filter((i) => !i.isPriorToPublicService && !i.isDiscarded);

  // Group items by category to weave their real titles into the narrative
  const comissoes = activeItems.filter((i) => i.directiveId === 'requisito_1').map((i) => i.title);
  const projetosExtensao = activeItems.filter((i) => i.directiveId === 'requisito_2').map((i) => i.title);
  const respTecnica = activeItems.filter((i) => i.directiveId === 'requisito_4').map((i) => i.title);
  const gestao = activeItems.filter((i) => i.directiveId === 'requisito_5').map((i) => i.title);
  const producoes = activeItems.filter((i) => i.directiveId === 'requisito_6').map((i) => i.title);

  // 1. Ingresso e compromisso com o serviço público
  const calcServico = calculateServiceTimeFromEntryDate(trajetoriaData.dataIngresso);
  const rawTempo = trajetoriaData.tempoServico && trajetoriaData.tempoServico.trim()
    ? trajetoriaData.tempoServico
    : (calcServico.valid ? calcServico.formattedText : 'sua trajetória');
  const tempoServicoFormatado = rawTempo.replace(/(de|em)?\s*efetivo\s*exerc[íi]cio/gi, '').trim();

  const p1 = `O(A) servidor(a) ${nome} ingressou no serviço público em ${trajetoriaData.dataIngresso}, no cargo de ${cargo} (Nível de Classificação ${nivel}), lotado(a) no(a) ${lotacao}, totalizando ${tempoServicoFormatado || 'sua trajetória'} de contínuo e dedicado exercício público. Ao longo de sua trajetória funcional, consolidou sólida atuação nos setores de ${trajetoriaData.setoresAtuacao}, assumindo encargos técnicos e operacionais de contínua responsabilidade institucional.`;

  // 2. Trajetória cotidiana e competências
  const areasStr =
    trajetoriaData.areasDestaque.length > 0
      ? trajetoriaData.areasDestaque.slice(0, 3).join(', ')
      : 'gestão acadêmico-administrativa e suporte especializado';
  const p2 = `No exercício cotidiano de suas atribuições regimentais, desenvolveu competências prioritárias com ênfase em ${areasStr}. Dentre as principais rotinas desempenhadas, destacam-se: ${trajetoriaData.atividadesDesempenhadas.replace(/\.$/, '')}. Tal atuação sistemática garantiu a continuidade administrativa, a integridade dos processos e a qualidade no atendimento prestado à comunidade acadêmica e à gestão superior.`;

  // 3. Atividades documentadas da Calculadora RSC
  const itensConcretos: string[] = [];
  if (comissoes.length > 0) {
    itensConcretos.push(`a efetiva participação em comissões institucionais e colegiados (como ${comissoes.slice(0, 2).join(' e ')})`);
  }
  if (projetosExtensao.length > 0) {
    itensConcretos.push(`o engajamento em projetos de extensão, ações de capacitação e ensino (${projetosExtensao.slice(0, 2).join(' e ')})`);
  }
  if (respTecnica.length > 0) {
    itensConcretos.push(`a assunção de responsabilidades técnicas, fiscalização de contratos e sustentação de sistemas (${respTecnica.slice(0, 2).join('; ')})`);
  }
  if (gestao.length > 0) {
    itensConcretos.push(`o exercício de funções de direção ou coordenação setorial (${gestao.slice(0, 2).join(' e ')})`);
  }
  if (producoes.length > 0) {
    itensConcretos.push(`a elaboração de manuais normativos, pareceres e produções técnicas (${producoes.slice(0, 2).join('; ')})`);
  }

  const p3 = `Dentre as contribuições institucionais de maior relevância formalmente comprovadas neste requerimento, sobressai ${
    itensConcretos.length > 0
      ? itensConcretos.join(', bem como ') + '.'
      : trajetoriaData.projetosEntregas
  }`;

  // 4. Inovações procedimentais, otimização de fluxos e probidade
  const p4 = `Destaca-se a implementação de inovações procedimentais que resultaram na otimização de fluxos de trabalho e na redução significativa de prazos administrativos, refletindo diretamente em: ${trajetoriaData.impactosMelhorias.replace(/\.$/, '')}. Tais ações não apenas garantiram celeridade processual, mas asseguraram a integridade dos registros da unidade, alinhando-se aos princípios fundamentais de eficiência, publicidade e probidade na administração pública.`;

  // 5. Conclusão e enquadramento ao nível pleiteado
  const p5 = `Diante do exposto, considerando a trajetória consolidada, a alta carga de produtividade técnica e a comprovação de ${rscSummary.totalScore.toFixed(1)} pontos em ${rscSummary.criteriosAlcancados} critérios específicos da Tabela Oficial, o(a) servidor(a) demonstra pleno alinhamento aos dispositivos da Lei nº 15.367/2026 e do Decreto nº 13.048/2026. Conclui-se que o conjunto de saberes, competências e vivências acumulados atende rigorosamente aos padrões de complexidade exigidos para a concessão do ${rscLevel}.`;

  const textoFinal = `${p1}\n\n${p2}\n\n${p3}\n\n${p4}\n\n${p5}`;
  if (textoFinal.length > 2950) {
    return textoFinal.substring(0, 2900) + '...';
  }
  return textoFinal;
};

const AREA_CHECKBOX_OPTIONS = [
  'Gestão e Atendimento Discente / Acadêmico',
  'Apoio Técnico e Administrativo às Atividades de Ensino, Pesquisa e Extensão',
  'Desenvolvimento, Operação e Manutenção de Sistemas de Informação e TI',
  'Participação em Comissões, Conselhos, Grupos de Trabalho e Representações Oficiais',
  'Gestão de Contratos, Licitações, Compras e Patrimônio Público',
  'Atuação em Situações de Calamidade, Emergência Pública ou Crise Pandêmica',
  'Organização de Eventos Científicos, Acadêmicos e Feiras Tecnológicas',
  'Elaboração de Pareceres Técnicos, Manualização de Processos e Normativas',
  'Ações de Capacitação, Treinamento e Inovação em Processos Institucionais',
  'Exercício de Cargos de Direção (CD) e Funções Gratificadas (FG / FCC / FCE)',
  'Orientação, Tutoria ou Acompanhamento de Estagiários e Bolsistas',
  'Atuação em Infraestrutura, Suporte Operacional e Segurança da Informação',
];

export const ComplianceSummary: React.FC<ComplianceSummaryProps> = ({
  rscItems,
  userProfile,
  onOpenExport,
  onRequireApiKey,
}) => {
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedDemonstracao, setCopiedDemonstracao] = useState(false);
  const [copiedFieldKey, setCopiedFieldKey] = useState<string | null>(null);
  const [showFullMemorial, setShowFullMemorial] = useState<boolean>(false);

  // Form Trajectory Fields - Cálculo exclusivo baseado na data de ingresso no serviço público
  const rawEntryDate = userProfile.dataIngressoServicoPublico || userProfile.dataExercicio || '';
  const initialDataIngresso = rawEntryDate 
    ? (formatDateDisplay(rawEntryDate) !== 'Não informada' ? formatDateDisplay(rawEntryDate) : rawEntryDate)
    : '01/03/2012';

  const initialCalc = calculateServiceTimeFromEntryDate(initialDataIngresso);
  const initialTempoServico = initialCalc.valid ? initialCalc.formattedText : '14 anos';

  const [dataIngresso, setDataIngresso] = useState<string>(initialDataIngresso);
  const [tempoServico, setTempoServico] = useState<string>(initialTempoServico);

  const handleDataIngressoChange = (newDate: string) => {
    setDataIngresso(newDate);
    const calc = calculateServiceTimeFromEntryDate(newDate);
    if (calc.valid) {
      setTempoServico(calc.formattedText);
    }
  };

  useEffect(() => {
    const raw = userProfile.dataIngressoServicoPublico || userProfile.dataExercicio;
    if (raw) {
      const formatted = formatDateDisplay(raw) !== 'Não informada' ? formatDateDisplay(raw) : raw;
      setDataIngresso(formatted);
      const calc = calculateServiceTimeFromEntryDate(raw);
      if (calc.valid) {
        setTempoServico(calc.formattedText);
      }
    }
  }, [userProfile.dataIngressoServicoPublico, userProfile.dataExercicio]);

  const [setoresAtuacao, setSetoresAtuacao] = useState<string>('Secretaria Acadêmica, Comissão Permanente de Licitação, Coordenação Geral');
  const [selectedAreas, setSelectedAreas] = useState<string[]>([
    'Gestão e Atendimento Discente / Acadêmico',
    'Apoio Técnico e Administrativo às Atividades de Ensino, Pesquisa e Extensão',
    'Participação em Comissões, Conselhos, Grupos de Trabalho e Representações Oficiais',
    'Elaboração de Pareceres Técnicos, Manualização de Processos e Normativas',
  ]);

  const [atividadesDesempenhadas, setAtividadesDesempenhadas] = useState<string>(
    'Execução de rotinas técnico-administrativas estratégicas, atendimento direto à comunidade universitária, instrução de processos acadêmicos e administrativos no SEI, elaboração de relatórios técnicos de suporte às decisões e gestão de registros institucionais.'
  );

  const [projetosEntregas, setProjetosEntregas] = useState<string>(
    'Membro titular de Comissões de Avaliação e Grupos de Trabalho, participação em comissão organizadora de eventos científicos da instituição, atuações em projetos de extensão universitária e reestruturação de fluxos operacionais internos.'
  );

  const [impactosMelhorias, setImpactosMelhorias] = useState<string>(
    'Redução de prazos no tramitamento de processos no SEI, otimização no atendimento discente e docente, padronização de rotinas com manuais operacionais e fortalecimento da integridade dos registros da unidade.'
  );

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedDemonstracaoText, setGeneratedDemonstracaoText] = useState<string>('');

  const evaluation = evaluateRSCCompliance(rscItems, userProfile.rscAlmejado || 'RSC-PCCTAE I');
  const {
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
  } = evaluation;

  const percentualIQ = req?.percentualIQ || 10;

  const copyToClipboard = (text: string, key: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedFieldKey(key);
    setTimeout(() => setCopiedFieldKey(null), 2000);
  };

  const toggleArea = (area: string) => {
    if (selectedAreas.includes(area)) {
      setSelectedAreas(selectedAreas.filter((a) => a !== area));
    } else {
      setSelectedAreas([...selectedAreas, area]);
    }
  };

  // State for editable Memorial demonstration text
  const [demonstracaoText, setDemonstracaoText] = useState<string>(() => {
    return buildConsolidatedLifeHistoryMemorial(
      userProfile,
      rscItems,
      {
        dataIngresso,
        tempoServico,
        setoresAtuacao,
        areasDestaque: selectedAreas,
        atividadesDesempenhadas,
        projetosEntregas,
        impactosMelhorias,
      },
      {
        totalScore,
        minScore,
        criteriosAlcancados,
        minCriterios,
      }
    );
  });

  const handleConsolidateFromHistory = () => {
    const fresh = buildConsolidatedLifeHistoryMemorial(
      userProfile,
      rscItems,
      {
        dataIngresso,
        tempoServico,
        setoresAtuacao,
        areasDestaque: selectedAreas,
        atividadesDesempenhadas,
        projetosEntregas,
        impactosMelhorias,
      },
      {
        totalScore,
        minScore,
        criteriosAlcancados,
        minCriterios,
      }
    );
    setDemonstracaoText(fresh);
  };

  const handleGenerateDemonstracaoWithAI = async () => {
    if (!getStoredGeminiApiKey()) {
      if (onRequireApiKey) {
        onRequireApiKey('A elaboração do texto do Memorial Descritivo com IA exige a inserção prévia de uma Chave do Google Gemini.');
      }
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-memorial-demonstracao', {
        method: 'POST',
        headers: getApiHeaders(),
        body: JSON.stringify({
          userProfile,
          rscItems, // Crucial: passes real document items to Gemini
          trajetoriaData: {
            dataIngresso,
            tempoServico,
            setoresAtuacao,
            areasDestaque: selectedAreas,
            atividadesDesempenhadas,
            projetosEntregas,
            impactosMelhorias,
          },
          rscSummary: {
            totalScore,
            minScore,
            criteriosAlcancados,
            minCriterios,
            scoreByReq,
          },
        }),
      });

      const data = await response.json();
      if (!response.ok || data.error) {
        if (data.error && (data.error.includes('Chave') || data.error.includes('API') || data.error.includes('GEMINI_API_KEY'))) {
          if (onRequireApiKey) {
            onRequireApiKey('Sua Chave de API do Gemini precisa ser inserida ou atualizada.');
          }
          return;
        }
      }

      if (data.success && data.demonstracaoTexto) {
        setDemonstracaoText(data.demonstracaoTexto);
      } else {
        handleConsolidateFromHistory();
      }
    } catch (e) {
      console.error('Erro ao gerar com a IA, consolidando localmente:', e);
      handleConsolidateFromHistory();
    } finally {
      setIsGenerating(false);
    }
  };

  const currentDemonstracaoText = demonstracaoText;

  // Full Memorial Text for SEI
  const fullMemorialText = `REQUERIMENTO DE RECONHECIMENTO DE SABERES E COMPETÊNCIAS (RSC - PCCTAE/EBTT)
INSTITUIÇÃO FEDERAL DE ENSINO / ÓRGÃO PÚBLICO
DEPARTAMENTO DE GESTÃO DE PESSOAS / RECURSOS HUMANOS

1. DADOS DO SERVIDOR:
Nome: ${userProfile.nomeCompleto || 'Não informado'}
Matrícula SIAPE: ${userProfile.siape || 'Não informada'}
Cargo: ${userProfile.cargo || 'Não informado'} (Nível ${userProfile.nivelClassificacao || 'E'})
Lotação: ${userProfile.lotacao || 'Não informada'}
Escolaridade Atual: ${userProfile.titulacaoAtual?.toUpperCase() || 'GRADUAÇÃO'}
RSC Solicitado: ${userProfile.rscAlmejado || 'RSC-PCCTAE I'} (${req?.escolaridade} | IQ: ${percentualIQ}%)
Data do Requerimento: ${userProfile.dataRequerimento || new Date().toLocaleDateString('pt-BR')}

2. RESUMO DA PONTUAÇÃO ALCANÇADA POR REQUISITO (LEI 15.367/2026 / ANEXOS I A VI):
- Requisito I (Conselhos / GTs / Comissões / Concursos / Sindicato): ${scoreByReq.requisito_1.toFixed(1)} pontos
- Requisito II (Projetos / Ensino / Extensão / Orientação / Capacitações): ${scoreByReq.requisito_2.toFixed(1)} pontos
- Requisito III (Premiações de Reconhecimento Público): ${scoreByReq.requisito_3.toFixed(1)} pontos
- Requisito IV (Responsabilidades Técnicas / Sistemas / Contratos / Licitações): ${scoreByReq.requisito_4.toFixed(1)} pontos
- Requisito V (Exercício de Cargo de Direção CD / Função Gratificada FG): ${scoreByReq.requisito_5.toFixed(1)} pontos
- Requisito VI (Produção Científica / Técnica / Patentes / Eventos / Pandemia): ${scoreByReq.requisito_6.toFixed(1)} pontos

PONTUAÇÃO TOTAL ACUMULADA: ${totalScore.toFixed(1)} PONTOS (Piso mínimo exigido: ${minScore} pontos)
CRITÉRIOS ESPECÍFICOS ALCANÇADOS: ${criteriosAlcancados} de ${minCriterios} exigidos pela Lei
PERCENTUAL DO IQ CORRESPONDENTE: ${percentualIQ}%
REQUISITO ESPECIAL DO NÍVEL: ${specialReqMet ? 'CUMPRIDO' : 'PENDENTE'} (${specialReqDesc})
STATUS FINAL DE ENQUADRAMENTO: ${isFullyCompliant ? 'APTO - Todos os requisitos atendidos' : 'PENDENTE - Incompleto'}

================================================================================
3. DEMONSTRAÇÃO DOS SABERES, DAS COMPETÊNCIAS E DO ALINHAMENTO AO NÍVEL PLEITEADO
================================================================================
${currentDemonstracaoText}

================================================================================
4. JUSTIFICATIVAS FUNDAMENTADAS POR ITEM / COMPROVANTE ANEXADO:
================================================================================
${rscItems
  .map(
    (item, index) =>
      `--------------------------------------------------------------------------------
ITEM ${index + 1}: ${item.title.toUpperCase()}
Categoria na Calculadora RSC: Item ${item.categoryCode} - ${item.categoryName}
Número de Identificação (SEI): ${item.numeroIdentificacaoSei || 'Não informado'}
Órgão / Unidade Emissora: ${item.orgaoEmissor || item.issuer || 'Órgão Emissor'}
Data do Documento: ${item.dataDocumento || 'Não informada'} | Período de Vigência: ${item.periodoVigencia || 'Não informado'}
Finalidade do Documento: ${item.finalidadeDocumento || 'Comprovação das atividades para pontuação de RSC'}
Status de Pontuação: ${
  item.isPriorToPublicService
    ? '0.0 pts (DESCONSIDERADO - Documento anterior à data de ingresso no serviço público)'
    : `${item.totalScore.toFixed(1)} pts (VÁLIDO)`
}
${item.isPriorToPublicService ? `Motivo da Invalidação Temporal: ${item.dateValidationReason || 'Data anterior ao ingresso no serviço público'}\n` : ''}
Justificativa de Enquadramento:
${item.justificationText || 'Não informada.'}

A) Experiência Profissional e Individual Vinculada ao Requisito (Máx 1.500 caract.):
${item.experienciaProfissionalTexto || 'Não informada.'}

B) Diferencial da Atuação (Máx 600 caract.):
${item.diferencialAtuacaoTexto || 'Não informada.'}

C) Impacto dos Saberes no Cargo e na Instituição (Máx 600 caract.):
${item.impactosSaberesTexto || 'Não informada.'}
`
  )
  .join('\n')}
--------------------------------------------------------------------------------
DECLARAÇÃO DE CONFORMIDADE:
Declaro, sob as penas da lei e conforme as diretrizes da Lei nº 15.367/2026, Decreto nº 13.048/2026 e Resoluções Oficiais de Avaliação do RSC, que as informações e documentos acostados ao processo SEI correspondem ao histórico profissional em efetivo exercício.

Local, ${new Date().toLocaleDateString('pt-BR')}.
____________________________________________________
${userProfile.nomeCompleto || 'Assinatura do Servidor'}`;

  const handleCopyFullMemorial = () => {
    navigator.clipboard.writeText(fullMemorialText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  const handleCopyDemonstracao = () => {
    navigator.clipboard.writeText(currentDemonstracaoText);
    setCopiedDemonstracao(true);
    setTimeout(() => setCopiedDemonstracao(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Status Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[#132247] dark:text-indigo-400" />
              Relatório Final de Conformidade & Memorial para o SEI
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Validação das exigências normativas da Tabela Oficial do RSC-PCCTAE para o requerimento do <span className="text-[#C28600] dark:text-[#EAA816] font-bold">{userProfile.rscAlmejado}</span>.
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-[#FEF0B2]/50 dark:hover:bg-slate-700 text-[#132247] dark:text-slate-200 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700 transition flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="h-4 w-4 text-[#132247] dark:text-indigo-400" />
              <span>Imprimir / PDF</span>
            </button>

            <button
              type="button"
              onClick={onOpenExport}
              className="px-4 py-2 bg-[#132247] hover:bg-[#1C3366] text-white text-xs font-bold rounded-xl border-2 border-[#EAA816] shadow-xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="h-4 w-4 text-[#EAA816]" />
              <span className="text-white font-bold">Exportar JSON da Sessão</span>
            </button>
          </div>
        </div>

        {/* Audit Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Score Target */}
          <div
            className={`p-5 rounded-2xl border ${
              isScoreSufficient
                ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800'
                : 'bg-amber-50/60 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Pontuação Mínima
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {totalScore.toFixed(1)} / {minScore} Pontos
                </h3>
              </div>
              <div
                className={`h-9 w-9 rounded-xl flex items-center justify-center font-bold text-white shrink-0 ${
                  isScoreSufficient ? 'bg-emerald-600' : 'bg-amber-600'
                }`}
              >
                {isScoreSufficient ? <CheckCircle2 className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">
              {isScoreSufficient
                ? `Pontuação mínima de ${minScore} pontos atingida para o ${userProfile.rscAlmejado}.`
                : `Ainda faltam ${(minScore - totalScore).toFixed(1)} pontos para o mínimo de ${minScore} pts.`}
            </p>
          </div>

          {/* Card 2: Specific Criteria Count */}
          <div
            className={`p-5 rounded-2xl border ${
              isCriteriosSufficient
                ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800'
                : 'bg-amber-50/60 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Critérios Específicos Mínimos
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {criteriosAlcancados} / {minCriterios} Critérios Registrados
                </h3>
              </div>
              <div
                className={`h-9 w-9 rounded-xl flex items-center justify-center font-bold text-white shrink-0 ${
                  isCriteriosSufficient ? 'bg-emerald-600' : 'bg-amber-600'
                }`}
              >
                {isCriteriosSufficient ? <CheckCircle2 className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">
              {minCriterios === 0
                ? 'Sem exigência mínima de quantidade de critérios.'
                : isCriteriosSufficient
                ? `Atendeu à exigência mínima de ${minCriterios} critérios específicos.`
                : `Necessário comprovar pelo menos ${minCriterios} critérios específicos diferentes.`}
            </p>
          </div>

          {/* Card 3: IQ Percentage */}
          <div className="p-5 rounded-2xl border bg-indigo-50/70 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
                  Incentivo à Qualificação (IQ)
                </span>
                <h3 className="text-xl font-extrabold text-indigo-900 dark:text-indigo-200">
                  {percentualIQ}% do IQ
                </h3>
              </div>
              <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white shrink-0">
                <Award className="h-5 w-5" />
              </div>
            </div>
            <p className="text-xs text-indigo-900/80 dark:text-indigo-300 mt-2 font-medium">
              Percentual fixado pela tabela oficial do RSC-PCCTAE para o {userProfile.rscAlmejado}.
            </p>
          </div>
        </div>

        {/* Requisito Adicional Highlight */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Requisito Adicional do Nível ({userProfile.rscAlmejado}):
          </span>
          <p className="text-xs font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
            {req?.requisitoAdicional}
          </p>
        </div>
      </div>

      {/* Trajectory Data Collection & Memorial Demonstration Builder */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-6 md:p-8 space-y-6">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
            <Briefcase className="h-4 w-4" />
            <span>Elaboração do Memorial do Servidor (SEI)</span>
          </div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white mt-1">
            Demonstração dos Saberes, das Competências e do Alinhamento ao Nível Pleiteado
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Preencha os dados da sua trajetória profissional no serviço público e selecione seus campos de destaque para gerar a fundamentação sólida exigida pela Lei 15.367/2026 e pelas comissões de avaliação.
          </p>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Data de Ingresso */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                Data de Ingresso no Serviço Público
              </label>
              <button
                type="button"
                onClick={() => copyToClipboard(dataIngresso, 'dataIngresso')}
                className="p-1 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded transition cursor-pointer"
                title="Copiar Data de Ingresso"
              >
                {copiedFieldKey === 'dataIngresso' ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
            <input
              type="text"
              value={dataIngresso}
              onChange={(e) => handleDataIngressoChange(e.target.value)}
              placeholder="Ex: 01/03/2012"
              className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-800 dark:text-slate-200 font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              Data oficial de ingresso no serviço público.
            </p>
          </div>

          {/* Tempo de Serviço */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                <UserCheck className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                Tempo de Efetivo Exercício
              </label>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    const calc = calculateServiceTimeFromEntryDate(dataIngresso);
                    if (calc.valid) setTempoServico(calc.formattedText);
                  }}
                  className="p-1 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded transition cursor-pointer"
                  title="Recalcular tempo de serviço a partir da data de ingresso"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => copyToClipboard(tempoServico, 'tempoServico')}
                  className="p-1 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded transition cursor-pointer"
                  title="Copiar Tempo de Serviço"
                >
                  {copiedFieldKey === 'tempoServico' ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>
            <input
              type="text"
              value={tempoServico}
              onChange={(e) => setTempoServico(e.target.value)}
              placeholder="Ex: 14 anos e 6 meses"
              className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-800 dark:text-slate-200 font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">
              Calculado com base exclusiva na data de ingresso ({dataIngresso}).
            </p>
          </div>

          {/* Unidades e Setores */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                Setores e Unidades de Atuação
              </label>
              <button
                type="button"
                onClick={() => copyToClipboard(setoresAtuacao, 'setoresAtuacao')}
                className="p-1 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded transition cursor-pointer"
                title="Copiar Setores"
              >
                {copiedFieldKey === 'setoresAtuacao' ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
            <input
              type="text"
              value={setoresAtuacao}
              onChange={(e) => setSetoresAtuacao(e.target.value)}
              placeholder="Ex: Secretaria Acadêmica, CPL, Diretoria de TI"
              className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-800 dark:text-slate-200 font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Checkboxes de Áreas de Destaque */}
        <div className="bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 md:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <CheckSquare className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                Selecione as Áreas / Campos de Destaque da Sua Atuação Profissional
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Marque os elementos que correspondem à sua experiência real na instituição para incorporar ao texto formal do Memorial.
              </p>
            </div>
            <button
              type="button"
              onClick={() => copyToClipboard(selectedAreas.join('; '), 'selectedAreas')}
              className="px-2.5 py-1 text-[11px] font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition flex items-center gap-1 shrink-0 cursor-pointer"
              title="Copiar Áreas Selecionadas"
            >
              {copiedFieldKey === 'selectedAreas' ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedFieldKey === 'selectedAreas' ? 'Copiado!' : 'Copiar Áreas'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-2">
            {AREA_CHECKBOX_OPTIONS.map((area) => {
              const isChecked = selectedAreas.includes(area);
              return (
                <button
                  type="button"
                  key={area}
                  onClick={() => toggleArea(area)}
                  className={`p-2.5 rounded-xl text-left border transition text-xs font-medium flex items-start gap-2.5 cursor-pointer ${
                    isChecked
                      ? 'bg-indigo-50/90 dark:bg-indigo-950/60 border-indigo-300 dark:border-indigo-700 text-indigo-950 dark:text-indigo-200 font-semibold shadow-2xs'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100/70 dark:hover:bg-slate-750'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {isChecked ? (
                      <CheckSquare className="h-4 w-4 text-indigo-600 dark:text-indigo-400 fill-indigo-100 dark:fill-indigo-900" />
                    ) : (
                      <Square className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                    )}
                  </div>
                  <span className="leading-snug">{area}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Textareas for Detailed Trajectory */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Atividades e Atribuições Principais */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase text-slate-700 dark:text-slate-300 block">
                Atividades e Atribuições Principais
              </label>
              <button
                type="button"
                onClick={() => copyToClipboard(atividadesDesempenhadas, 'atividadesDesempenhadas')}
                className="p-1 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded transition cursor-pointer"
                title="Copiar Atividades"
              >
                {copiedFieldKey === 'atividadesDesempenhadas' ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
            <textarea
              rows={4}
              value={atividadesDesempenhadas}
              onChange={(e) => setAtividadesDesempenhadas(e.target.value)}
              placeholder="Descreva as principais rotinas e atribuições técnico-administrativas executadas..."
              className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-800 dark:text-slate-200 font-normal focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none leading-relaxed"
            />
          </div>

          {/* Projetos e Entregas de Destaque */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase text-slate-700 dark:text-slate-300 block">
                Projetos e Entregas de Destaque
              </label>
              <button
                type="button"
                onClick={() => copyToClipboard(projetosEntregas, 'projetosEntregas')}
                className="p-1 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded transition cursor-pointer"
                title="Copiar Projetos e Entregas"
              >
                {copiedFieldKey === 'projetosEntregas' ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
            <textarea
              rows={4}
              value={projetosEntregas}
              onChange={(e) => setProjetosEntregas(e.target.value)}
              placeholder="Mencione comissões, projetos, capacitações e produções relevantes..."
              className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-800 dark:text-slate-200 font-normal focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none leading-relaxed"
            />
          </div>

          {/* Impactos e Melhorias Institucionais */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase text-slate-700 dark:text-slate-300 block">
                Impactos e Melhorias Institucionais
              </label>
              <button
                type="button"
                onClick={() => copyToClipboard(impactosMelhorias, 'impactosMelhorias')}
                className="p-1 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded transition cursor-pointer"
                title="Copiar Impactos"
              >
                {copiedFieldKey === 'impactosMelhorias' ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
            <textarea
              rows={4}
              value={impactosMelhorias}
              onChange={(e) => setImpactosMelhorias(e.target.value)}
              placeholder="Destaque melhorias operacionais, eficiência e inovação geradas para a instituição..."
              className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-800 dark:text-slate-200 font-normal focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none leading-relaxed"
            />
          </div>
        </div>

        {/* Item 2 do Memorial: Alinhamento da trajetória ao nível pleiteado */}
        <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 flex-wrap">
                <span className="text-amber-500 font-bold">⚠️</span>
                <span>Alinhamento da trajetória ao nível pleiteado (item 2 do memorial)</span>
                <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-700">
                  [PREENCHIDO]
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Este campo é obrigatório. Escreva e revise o alinhamento antes de finalizar o Memorial ou gerar o processo no SEI.
              </p>
            </div>
          </div>

          {/* Banner de Atenção - Decreto 13.048/2026 */}
          <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/80 rounded-xl text-xs text-amber-900 dark:text-amber-200 leading-relaxed space-y-1">
            <p className="font-bold flex items-center gap-1.5 text-amber-950 dark:text-amber-100">
              <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
              Atenção:
            </p>
            <p>
              nos termos do Decreto nº 13.048/2026, este Memorial poderá ser publicado no sítio eletrônico institucional antes da decisão da CRSC-PCCTAE. Não inclua CPF, RG, endereço residencial, telefone pessoal, dados de saúde, senhas, informações sigilosas, dados pessoais desnecessários de terceiros ou outras informações que não sejam necessárias à comprovação das experiências.
            </p>
          </div>

          {/* Textarea editável pelo usuário */}
          <div className="space-y-2">
            <textarea
              rows={12}
              value={currentDemonstracaoText}
              onChange={(e) => setDemonstracaoText(e.target.value)}
              placeholder="Escreva ou consolide o histórico e trajetória do servidor aqui..."
              className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-4 text-xs font-serif leading-relaxed text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-y min-h-[260px] shadow-2xs select-text"
            />

            {/* Rodapé com Contador de Caracteres e Botões */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
              <div className="text-xs font-bold">
                <span
                  className={
                    currentDemonstracaoText.length > 3000
                      ? 'text-rose-600 dark:text-rose-400'
                      : currentDemonstracaoText.length > 2800
                      ? 'text-amber-600 dark:text-amber-400'
                      : 'text-slate-600 dark:text-slate-400'
                  }
                >
                  {currentDemonstracaoText.length} / 3000 caractere(s)
                </span>
                {currentDemonstracaoText.length > 3000 && (
                  <span className="text-rose-600 dark:text-rose-400 ml-2 font-normal">(Excedeu o limite recomendado)</span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleConsolidateFromHistory}
                  className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                  title="Recalcular e consolidar a partir do histórico do servidor e dos documentos da Calculadora"
                >
                  <RefreshCw className="h-3.5 w-3.5 text-slate-600 dark:text-slate-400" />
                  <span>Consolidar do Histórico</span>
                </button>

                <button
                  type="button"
                  onClick={handleGenerateDemonstracaoWithAI}
                  disabled={isGenerating}
                  className="px-3.5 py-2 bg-[#132247] hover:bg-[#1C3366] text-white text-xs font-bold rounded-xl border border-[#EAA816] shadow-xs transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isGenerating ? <Loader2 className="h-3.5 w-3.5 animate-spin text-[#EAA816]" /> : <Sparkles className="h-3.5 w-3.5 text-[#EAA816]" />}
                  <span className="text-white font-bold">{isGenerating ? 'Gerando com IA...' : 'Aprimorar com IA Gemini'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyDemonstracao}
                  className={`px-4 py-2 rounded-xl text-xs font-bold shadow-xs transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
                    copiedDemonstracao ? 'bg-emerald-600 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {copiedDemonstracao ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span>{copiedDemonstracao ? 'Demonstração Copiada!' : 'Copiar Alinhamento da Trajetória'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Complete SEI Memorial Accordion / Download Box */}
        <div className="space-y-3 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/90 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                Memorial Descritivo Completo com Todos os Comprovantes Anexados
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Une o requerimento, pontuação por requisito, a demonstração de saberes e as justificativas detalhadas de cada documento.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0 flex-wrap">
              <button
                type="button"
                onClick={() => setShowFullMemorial(!showFullMemorial)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border shadow-2xs ${
                  showFullMemorial
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800 text-indigo-800 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50'
                    : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
                title={showFullMemorial ? 'Ocultar texto completo do memorial' : 'Exibir texto completo do memorial na tela'}
              >
                {showFullMemorial ? (
                  <>
                    <EyeOff className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                    <span>Ocultar Memorial</span>
                  </>
                ) : (
                  <>
                    <Eye className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                    <span>Exibir Memorial Completo</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleCopyFullMemorial}
                className={`px-4 py-2 rounded-xl text-xs font-semibold shadow-xs transition flex items-center gap-1.5 cursor-pointer ${
                  copiedAll ? 'bg-emerald-600 text-white' : 'bg-slate-900 dark:bg-indigo-600 text-white hover:bg-slate-800 dark:hover:bg-indigo-700'
                }`}
              >
                {copiedAll ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span>{copiedAll ? 'Memorial Completo Copiado!' : 'Copiar Memorial Completo'}</span>
              </button>
            </div>
          </div>

          {showFullMemorial && (
            <div className="p-4 bg-slate-950 text-slate-200 rounded-2xl font-mono text-[11px] leading-relaxed overflow-x-auto max-h-[420px] border border-slate-800 whitespace-pre-wrap select-all">
              {fullMemorialText}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

