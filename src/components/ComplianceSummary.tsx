import React, { useState } from 'react';
import { RSCItem, UserProfile } from '../types';
import { RSC_REQUIREMENTS, evaluateRSCCompliance } from '../data/rscStructure';
import { getApiHeaders } from '../utils/apiKey';
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
} from 'lucide-react';

interface ComplianceSummaryProps {
  rscItems: RSCItem[];
  userProfile: UserProfile;
  onOpenExport: () => void;
}

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
}) => {
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedDemonstracao, setCopiedDemonstracao] = useState(false);
  const [copiedFieldKey, setCopiedFieldKey] = useState<string | null>(null);

  // Form Trajectory Fields
  const [dataIngresso, setDataIngresso] = useState<string>('01/03/2012');
  const [tempoServico, setTempoServico] = useState<string>('14 anos em efetivo exercício');
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

  // Function to build default / local Demonstration Text
  const buildLocalDemonstracaoText = () => {
    const nome = userProfile.nomeCompleto || 'o(a) servidor(a)';
    const siape = userProfile.siape ? ` (SIAPE nº ${userProfile.siape})` : '';
    const cargo = userProfile.cargo || 'Técnico-Administrativo em Educação';
    const nivel = userProfile.nivelClassificacao || 'E';
    const rscLevel = userProfile.rscAlmejado || 'RSC-PCCTAE I';
    const areasStr = selectedAreas.length > 0 ? selectedAreas.join('; ') : 'Gestão e suporte acadêmico-administrativo';

    return `DEMONSTRAÇÃO DOS SABERES, DAS COMPETÊNCIAS E DO ALINHAMENTO AO NÍVEL PLEITEADO (${rscLevel.toUpperCase()})

1. INTRODUÇÃO E TRAJETÓRIA PROFISSIONAL NO SERVIÇO PÚBLICO
O(A) servidor(a) ${nome}${siape}, ocupante do cargo de ${cargo} (Nível de Classificação ${nivel}), em efetivo exercício no serviço público desde ${dataIngresso} (${tempoServico}), vem por meio deste memorial demonstrar e fundamentar a acumulação sistemática de saberes, competências e responsabilidades técnicas desenvolvidas ao longo de sua trajetória funcional nos setores: ${setoresAtuacao}.

2. DEMONSTRAÇÃO DOS SABERES E DAS COMPETÊNCIAS ADQUIRIDAS
No exercício contínuo de suas atribuições regimentais e institucionais, o(a) servidor(a) consolidou sólida atuação em áreas de elevada relevância para a instituição, destacando-se prioritariamente nos seguintes campos de atuação:
${areasStr}.

No cotidiano de trabalho, destacam-se como principais atividades desempenhadas:
${atividadesDesempenhadas}

3. ENTREGAS RELEVANTES, PROJETOS E IMPACTO INSTITUCIONAL
Ao longo do histórico funcional, o(a) servidor(a) contribuiu de forma expressiva para o fortalecimento do serviço público e da missão institucional através dos seguintes projetos, comissões e entregas técnicas de relevância:
${projetosEntregas}

Como resultado direto dessa atuação qualificada, os saberes e competências desenvolvidos produziram os seguintes impactos e melhorias institucionais:
${impactosMelhorias}

4. ENQUADRAMENTO E CORRESPONDÊNCIA AO NÍVEL PLEITEADO (${rscLevel})
Analisando a trajetória do(a) servidor(a) à luz da Lei nº 15.367/2026, do Decreto nº 13.048/2026 e das Resoluções Oficiais de Avaliação do RSC, constata-se plena equivalência e alinhamento com as exigências do nível ${rscLevel}:
- Pontuação Total Atingida na Calculadora RSC: ${totalScore.toFixed(1)} pontos (Piso mínimo exigido: ${minScore} pts).
- Categoria de Critérios Alcançados: ${criteriosAlcancados} critérios específicos distintos (Mínimo exigido: ${minCriterios} critérios).
- Requisito Especial do Nível: ${specialReqMet ? 'CUMPRIDO' : 'PENDENTE'} (${specialReqDesc}).

A diversidade das produções, atuações em comissões, orientações/projetos e responsabilidades técnicas comprovadas demonstra de forma cristalina que o conjunto de saberes e competências acumulados pelo(a) servidor(a) atinge a complexidade, abrangência e o perfil profissional exigido para a concessão do ${rscLevel}, fazendo jus à percepção do percentual de ${percentualIQ}% do Incentivo à Qualificação (IQ).

Local, ${new Date().toLocaleDateString('pt-BR')}.`;
  };

  const handleGenerateDemonstracaoWithAI = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-memorial-demonstracao', {
        method: 'POST',
        headers: getApiHeaders(),
        body: JSON.stringify({
          userProfile,
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
      if (data.success && data.demonstracaoTexto) {
        setGeneratedDemonstracaoText(data.demonstracaoTexto);
      } else {
        setGeneratedDemonstracaoText(buildLocalDemonstracaoText());
      }
    } catch (e) {
      console.error('Erro ao gerar com a IA, gerando localmente:', e);
      setGeneratedDemonstracaoText(buildLocalDemonstracaoText());
    } finally {
      setIsGenerating(false);
    }
  };

  const currentDemonstracaoText = generatedDemonstracaoText || buildLocalDemonstracaoText();

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
Pontuação Computada: ${item.totalScore.toFixed(1)} pts

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
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[#132247]" />
              Relatório Final de Conformidade & Memorial para o SEI
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Validação das exigências normativas da Tabela Oficial do RSC-PCCTAE para o requerimento do <span className="text-[#C28600] font-bold">{userProfile.rscAlmejado}</span>.
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-2 bg-slate-100 hover:bg-[#FEF0B2]/50 text-[#132247] text-xs font-semibold rounded-xl border border-slate-300 transition flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="h-4 w-4 text-[#132247]" />
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
              isScoreSufficient ? 'bg-emerald-50/60 border-emerald-200' : 'bg-amber-50/60 border-amber-200'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Pontuação Mínima
                </span>
                <h3 className="text-base font-bold text-slate-900">
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
            <p className="text-xs text-slate-600 mt-2">
              {isScoreSufficient
                ? `Pontuação mínima de ${minScore} pontos atingida para o ${userProfile.rscAlmejado}.`
                : `Ainda faltam ${(minScore - totalScore).toFixed(1)} pontos para o mínimo de ${minScore} pts.`}
            </p>
          </div>

          {/* Card 2: Specific Criteria Count */}
          <div
            className={`p-5 rounded-2xl border ${
              isCriteriosSufficient ? 'bg-emerald-50/60 border-emerald-200' : 'bg-amber-50/60 border-amber-200'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Critérios Específicos Mínimos
                </span>
                <h3 className="text-base font-bold text-slate-900">
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
            <p className="text-xs text-slate-600 mt-2">
              {minCriterios === 0
                ? 'Sem exigência mínima de quantidade de critérios.'
                : isCriteriosSufficient
                ? `Atendeu à exigência mínima de ${minCriterios} critérios específicos.`
                : `Necessário comprovar pelo menos ${minCriterios} critérios específicos diferentes.`}
            </p>
          </div>

          {/* Card 3: IQ Percentage */}
          <div className="p-5 rounded-2xl border bg-indigo-50/70 border-indigo-200">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                  Incentivo à Qualificação (IQ)
                </span>
                <h3 className="text-xl font-extrabold text-indigo-900">
                  {percentualIQ}% do IQ
                </h3>
              </div>
              <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white shrink-0">
                <Award className="h-5 w-5" />
              </div>
            </div>
            <p className="text-xs text-indigo-900/80 mt-2 font-medium">
              Percentual fixado pela tabela oficial do RSC-PCCTAE para o {userProfile.rscAlmejado}.
            </p>
          </div>
        </div>

        {/* Requisito Adicional Highlight */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
            Requisito Adicional do Nível ({userProfile.rscAlmejado}):
          </span>
          <p className="text-xs font-medium text-slate-800 leading-relaxed">
            {req?.requisitoAdicional}
          </p>
        </div>
      </div>

      {/* Trajectory Data Collection & Memorial Demonstration Builder */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8 space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
            <Briefcase className="h-4 w-4" />
            <span>Elaboração do Memorial do Servidor (SEI)</span>
          </div>
          <h2 className="text-lg font-black text-slate-900 mt-1">
            Demonstração dos Saberes, das Competências e do Alinhamento ao Nível Pleiteado
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Preencha os dados da sua trajetória profissional no serviço público e selecione seus campos de destaque para gerar a fundamentação sólida exigida pela Lei 15.367/2026 e pelas comissões de avaliação.
          </p>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Data de Ingresso */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase text-slate-600 flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-indigo-600" />
                Data de Ingresso no Serviço Público
              </label>
              <button
                type="button"
                onClick={() => copyToClipboard(dataIngresso, 'dataIngresso')}
                className="p-1 text-slate-400 hover:text-indigo-600 rounded transition cursor-pointer"
                title="Copiar Data de Ingresso"
              >
                {copiedFieldKey === 'dataIngresso' ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
            <input
              type="text"
              value={dataIngresso}
              onChange={(e) => setDataIngresso(e.target.value)}
              placeholder="Ex: 01/03/2012"
              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Tempo de Serviço */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase text-slate-600 flex items-center gap-1.5">
                <UserCheck className="h-3.5 w-3.5 text-indigo-600" />
                Tempo de Efetivo Exercício
              </label>
              <button
                type="button"
                onClick={() => copyToClipboard(tempoServico, 'tempoServico')}
                className="p-1 text-slate-400 hover:text-indigo-600 rounded transition cursor-pointer"
                title="Copiar Tempo de Serviço"
              >
                {copiedFieldKey === 'tempoServico' ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
            <input
              type="text"
              value={tempoServico}
              onChange={(e) => setTempoServico(e.target.value)}
              placeholder="Ex: 14 anos em efetivo exercício"
              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Unidades e Setores */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase text-slate-600 flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 text-indigo-600" />
                Setores e Unidades de Atuação
              </label>
              <button
                type="button"
                onClick={() => copyToClipboard(setoresAtuacao, 'setoresAtuacao')}
                className="p-1 text-slate-400 hover:text-indigo-600 rounded transition cursor-pointer"
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
              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Checkboxes de Áreas de Destaque */}
        <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-4 md:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <CheckSquare className="h-4 w-4 text-indigo-600" />
                Selecione as Áreas / Campos de Destaque da Sua Atuação Profissional
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Marque os elementos que correspondem à sua experiência real na instituição para incorporar ao texto formal do Memorial.
              </p>
            </div>
            <button
              type="button"
              onClick={() => copyToClipboard(selectedAreas.join('; '), 'selectedAreas')}
              className="px-2.5 py-1 text-[11px] font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition flex items-center gap-1 shrink-0 cursor-pointer"
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
                      ? 'bg-indigo-50/90 border-indigo-300 text-indigo-950 font-semibold shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100/70'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {isChecked ? (
                      <CheckSquare className="h-4 w-4 text-indigo-600 fill-indigo-100" />
                    ) : (
                      <Square className="h-4 w-4 text-slate-400" />
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
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase text-slate-700 block">
                Atividades e Atribuições Principais
              </label>
              <button
                type="button"
                onClick={() => copyToClipboard(atividadesDesempenhadas, 'atividadesDesempenhadas')}
                className="p-1 text-slate-400 hover:text-indigo-600 rounded transition cursor-pointer"
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
              className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-800 font-normal focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none leading-relaxed"
            />
          </div>

          {/* Projetos e Entregas de Destaque */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase text-slate-700 block">
                Projetos e Entregas de Destaque
              </label>
              <button
                type="button"
                onClick={() => copyToClipboard(projetosEntregas, 'projetosEntregas')}
                className="p-1 text-slate-400 hover:text-indigo-600 rounded transition cursor-pointer"
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
              className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-800 font-normal focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none leading-relaxed"
            />
          </div>

          {/* Impactos e Melhorias Institucionais */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase text-slate-700 block">
                Impactos e Melhorias Institucionais
              </label>
              <button
                type="button"
                onClick={() => copyToClipboard(impactosMelhorias, 'impactosMelhorias')}
                className="p-1 text-slate-400 hover:text-indigo-600 rounded transition cursor-pointer"
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
              className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-800 font-normal focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none leading-relaxed"
            />
          </div>
        </div>

        {/* Action Controls to Generate / Update Memorial */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <HelpCircle className="h-4 w-4 text-indigo-500 shrink-0" />
            <span>
              O texto é atualizado em tempo real combinando seus dados com a pontuação de <strong>{totalScore.toFixed(1)} pts</strong> em <strong>{criteriosAlcancados} critérios</strong>.
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <button
              type="button"
              onClick={() => setGeneratedDemonstracaoText(buildLocalDemonstracaoText())}
              className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer w-full sm:w-auto"
            >
              <RefreshCw className="h-3.5 w-3.5 text-slate-600" />
              <span>Atualizar Texto Básico</span>
            </button>

            <button
              type="button"
              onClick={handleGenerateDemonstracaoWithAI}
              disabled={isGenerating}
              className="px-4 py-2.5 bg-[#132247] hover:bg-[#1C3366] text-white text-xs font-bold rounded-xl border-2 border-[#EAA816] shadow-xs transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 w-full sm:w-auto"
            >
              {isGenerating ? <Loader2 className="h-4 w-4 animate-spin text-[#EAA816]" /> : <Sparkles className="h-4 w-4 text-[#EAA816]" />}
              <span className="text-white font-bold">{isGenerating ? 'Gerando com IA...' : 'Aprimorar Texto com IA Gemini'}</span>
            </button>
          </div>
        </div>

        {/* Generated Demonstration Text Box */}
        <div className="space-y-3 pt-4 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileText className="h-4 w-4 text-indigo-600" />
                Texto da Demonstração dos Saberes e Competências (SEI)
              </h3>
              <p className="text-xs text-slate-500">
                Texto pronto fundamentado para colar diretamente no bloco do Memorial no processo SEI.
              </p>
            </div>

            <button
              type="button"
              onClick={handleCopyDemonstracao}
              className={`px-4 py-2 rounded-xl text-xs font-semibold shadow-xs transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
                copiedDemonstracao ? 'bg-emerald-600 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {copiedDemonstracao ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span>{copiedDemonstracao ? 'Demonstração Copiada!' : 'Copiar Apenas Esta Demonstração'}</span>
            </button>
          </div>

          <div className="p-4 md:p-5 bg-slate-900 text-slate-100 rounded-2xl font-mono text-xs leading-relaxed overflow-x-auto max-h-[450px] border border-slate-800 whitespace-pre-wrap select-all">
            {currentDemonstracaoText}
          </div>
        </div>

        {/* Complete SEI Memorial Accordion / Download Box */}
        <div className="space-y-3 pt-6 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-indigo-600" />
                Memorial Descritivo Completo com Todos os Comprovantes Anexados
              </h3>
              <p className="text-xs text-slate-500">
                Une o requerimento, pontuação por requisito, a demonstração de saberes e as justificativas detalhadas de cada documento.
              </p>
            </div>

            <button
              type="button"
              onClick={handleCopyFullMemorial}
              className={`px-4 py-2 rounded-xl text-xs font-semibold shadow-xs transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
                copiedAll ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              {copiedAll ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span>{copiedAll ? 'Memorial Completo Copiado!' : 'Copiar Memorial Completo'}</span>
            </button>
          </div>

          <div className="p-4 bg-slate-950 text-slate-200 rounded-2xl font-mono text-[11px] leading-relaxed overflow-x-auto max-h-[350px] border border-slate-800 whitespace-pre-wrap select-all">
            {fullMemorialText}
          </div>
        </div>
      </div>
    </div>
  );
};

