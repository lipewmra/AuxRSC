import React, { useState, useMemo } from 'react';
import { RSCItem, UserProfile, RSCDirectiveId, UploadedDocument } from '../types';
import { DIRECTIVE_NAMES, STANDARD_CATEGORIES, RSC_REQUIREMENTS, evaluateRSCCompliance } from '../data/rscStructure';
import { checkDocumentPriorToEntryDate, getItemEffectiveDate, formatDateDisplay } from '../utils/dateValidation';
import { EvidenceQuoteModal } from './EvidenceQuoteModal';
import { AnalysisReportModal } from './AnalysisReportModal';
import { FamilyTextConsolidationModal } from './FamilyTextConsolidationModal';
import { ConsolidatedFamilyTexts } from '../utils/textConsolidation';
import {
  LayoutGrid,
  Plus,
  Copy,
  Check,
  Edit2,
  Trash2,
  FileText,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Quote,
  Calendar,
  ShieldAlert,
  Sparkles,
  Layers,
  CheckSquare,
  Square,
  Ban,
  RotateCcw,
  BarChart3,
  Target,
} from 'lucide-react';

export const getItemFinalidade = (item: RSCItem, userProfile?: UserProfile): string => {
  if (item.finalidadeDocumento && item.finalidadeDocumento.trim().length > 0) {
    return item.finalidadeDocumento.trim();
  }
  return `Comprovação de atuação em "${item.title}" emitida por ${item.issuer || 'órgão competente'} para pontuação no item ${item.categoryCode} (${item.categoryName}) perante o ${userProfile?.rscAlmejado || 'RSC-PCCTAE'}.`;
};

interface RscCalculatorOrganizerProps {
  rscItems: RSCItem[];
  documents?: UploadedDocument[];
  userProfile: UserProfile;
  onUpdateItem: (item: RSCItem) => void;
  onDeleteItem: (itemId: string) => void;
  onAddItem: (item: RSCItem) => void;
  onRegenerateJustification: (item: RSCItem) => Promise<void>;
  onNextStep: () => void;
}

export const RscCalculatorOrganizer: React.FC<RscCalculatorOrganizerProps> = ({
  rscItems,
  documents = [],
  userProfile,
  onUpdateItem,
  onDeleteItem,
  onAddItem,
  onRegenerateJustification,
  onNextStep,
}) => {
  const [selectedDirective, setSelectedDirective] = useState<RSCDirectiveId | 'all'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedJustificationId, setCopiedJustificationId] = useState<string | null>(null);
  const [copiedFieldKey, setCopiedFieldKey] = useState<string | null>(null);
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);

  // Modais de UX
  const [evidenceModalItem, setEvidenceModalItem] = useState<RSCItem | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [familyModalItems, setFamilyModalItems] = useState<RSCItem[] | null>(null);

  const [isEditingItem, setIsEditingItem] = useState<RSCItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [loadingRegenId, setLoadingRegenId] = useState<string | null>(null);

  // Formulário de Novo Item
  const [newItem, setNewItem] = useState<Partial<RSCItem>>({
    title: '',
    issuer: '',
    directiveId: 'requisito_1',
    categoryCode: 'I.1',
    categoryName: 'Exercício de mandato como membro de conselhos superiores e colegiados da IFE',
    unitPoints: 3.0,
    quantity: 1,
    totalScore: 3.0,
    justificationText: '',
    regulatoryBasis: 'Anexo I - Item 1 (Lei 15.367/2026 / Tabela RSC)',
    complianceStatus: 'valid',
    complianceNotes: ['Adicionado manualmente'],
  });

  const copyFieldText = (text: string, key: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedFieldKey(key);
    setTimeout(() => setCopiedFieldKey(null), 2000);
  };

  // Separação de itens ativos vs. descartados (caixa vermelha no final)
  const activeItems = useMemo(
    () => rscItems.filter((it) => !it.isDiscarded),
    [rscItems]
  );

  const discardedItems = useMemo(
    () => rscItems.filter((it) => it.isDiscarded),
    [rscItems]
  );

  // Contadores de Checkbox de Concluído
  const totalActiveCount = activeItems.length;
  const completedCount = activeItems.filter((it) => it.isCompleted).length;
  const pendingCount = totalActiveCount - completedCount;
  const completionPercentage = totalActiveCount > 0 ? Math.round((completedCount / totalActiveCount) * 100) : 0;

  // Avaliação de conformidade com RSC (apenas itens ativos e não anteriores ao ingresso)
  const targetLevel = userProfile.rscAlmejado || 'RSC-PCCTAE I';
  const evaluation = evaluateRSCCompliance(activeItems, targetLevel);
  const {
    totalScore,
    minScore,
    criteriosAlcancados,
    minCriterios,
    scoreByReq,
    isScoreSufficient,
    isCriteriosSufficient,
    isFullyCompliant,
  } = evaluation;

  const entryDate = userProfile.dataIngressoServicoPublico || userProfile.dataExercicio;

  // Ordenação padronizada dos 6 Requisitos
  const orderedDirectives: { id: RSCDirectiveId; name: string; roman: string; desc: string }[] = [
    { id: 'requisito_1', name: 'Requisito I', roman: 'I', desc: 'Comissões, Colegiados e GTs' },
    { id: 'requisito_2', name: 'Requisito II', roman: 'II', desc: 'Projetos Institucionais e Gestão' },
    { id: 'requisito_3', name: 'Requisito III', roman: 'III', desc: 'Premiações em Eventos' },
    { id: 'requisito_4', name: 'Requisito IV', roman: 'IV', desc: 'Responsabilidades Técnicas' },
    { id: 'requisito_5', name: 'Requisito V', roman: 'V', desc: 'Cargos CD e Funções FG' },
    { id: 'requisito_6', name: 'Requisito VI', roman: 'VI', desc: 'Produção e Difusão' },
  ];

  // Normalizador de ID de Requisito para agrupamento
  const normalizeDirective = (dirId: string): RSCDirectiveId => {
    if (dirId === 'diretriz_1') return 'requisito_1';
    if (dirId === 'diretriz_2') return 'requisito_2';
    if (dirId === 'diretriz_3') return 'requisito_6';
    return (dirId as RSCDirectiveId) || 'requisito_1';
  };

  // Agrupamento por Requisitos e Itens / Famílias
  const groupedSections = useMemo(() => {
    const filtered =
      selectedDirective === 'all'
        ? activeItems
        : activeItems.filter((i) => normalizeDirective(i.directiveId) === selectedDirective);

    const result: {
      directive: { id: RSCDirectiveId; name: string; roman: string; desc: string };
      categories: {
        categoryCode: string;
        categoryName: string;
        directiveId: RSCDirectiveId;
        items: RSCItem[];
        isFamily: boolean;
        familyScore: number;
      }[];
    }[] = [];

    orderedDirectives.forEach((dir) => {
      const itemsInDir = filtered.filter((it) => normalizeDirective(it.directiveId) === dir.id);
      if (itemsInDir.length === 0 && selectedDirective !== 'all') return;
      if (itemsInDir.length === 0) return;

      // Agrupa por código de categoria (Item/Critério)
      const catMap = new Map<string, RSCItem[]>();
      itemsInDir.forEach((item) => {
        const code = item.categoryCode || 'Geral';
        if (!catMap.has(code)) {
          catMap.set(code, []);
        }
        catMap.get(code)!.push(item);
      });

      // Ordena as categorias pelo código
      const sortedCatCodes = Array.from(catMap.keys()).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

      const categories = sortedCatCodes.map((code) => {
        const list = catMap.get(code)!;
        const first = list[0];
        const validItems = list.filter((it) => !it.isPriorToPublicService);
        const familyScore = validItems.reduce((acc, it) => acc + it.totalScore, 0);

        return {
          categoryCode: code,
          categoryName: first.categoryName || 'Atividades RSC',
          directiveId: dir.id,
          items: list,
          isFamily: list.length > 1,
          familyScore,
        };
      });

      result.push({
        directive: dir,
        categories,
      });
    });

    return result;
  }, [activeItems, selectedDirective]);

  // Ações de Checkbox
  const handleToggleCompleted = (item: RSCItem) => {
    onUpdateItem({
      ...item,
      isCompleted: !item.isCompleted,
    });
  };

  const handleToggleDiscarded = (item: RSCItem) => {
    onUpdateItem({
      ...item,
      isDiscarded: !item.isDiscarded,
      // Se estava expandido, fecha
    });
  };

  // Aplicação de Textos Unidos da Família
  const handleApplyFamilyTexts = (texts: ConsolidatedFamilyTexts) => {
    if (!familyModalItems || familyModalItems.length === 0) return;

    familyModalItems.forEach((it) => {
      onUpdateItem({
        ...it,
        experienciaProfissionalTexto: texts.experienciaProfissionalTexto,
        diferencialAtuacaoTexto: texts.diferencialAtuacaoTexto,
        impactosSaberesTexto: texts.impactosSaberesTexto,
        isFamilyConsolidated: true,
      });
    });
  };

  const handleCopyParams = (item: RSCItem) => {
    const text = `Calculadora RSC (www.calculadorarsc.com)\nItem: ${item.title}\nCategoria: ${item.categoryCode} - ${item.categoryName}\nPontos Unitários: ${item.unitPoints}\nQuantidade: ${item.quantity}\nPontuação Total: ${item.totalScore.toFixed(1)} pts\nArquivo: ${item.documentName || 'Anexo'}\nJustificativa: ${item.justificationText}`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyJustification = (item: RSCItem) => {
    navigator.clipboard.writeText(item.justificationText);
    setCopiedJustificationId(item.id);
    setTimeout(() => setCopiedJustificationId(null), 2000);
  };

  const handleTriggerRegen = async (item: RSCItem) => {
    setLoadingRegenId(item.id);
    try {
      await onRegenerateJustification(item);
    } finally {
      setLoadingRegenId(null);
    }
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditingItem) {
      const effectiveDate = getItemEffectiveDate(isEditingItem);
      const dateCheck = checkDocumentPriorToEntryDate(effectiveDate, entryDate);
      const updatedItem: RSCItem = {
        ...isEditingItem,
        isPriorToPublicService: dateCheck.isPrior,
        dateValidationReason: dateCheck.reason,
        effectiveDocumentDate: effectiveDate,
      };
      onUpdateItem(updatedItem);
      setIsEditingItem(null);
    }
  };

  const handleSaveNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.title || !newItem.issuer) return;

    const tempItem: Partial<RSCItem> = {
      ...newItem,
      effectiveDocumentDate: getItemEffectiveDate(newItem as RSCItem),
    };
    const dateCheck = checkDocumentPriorToEntryDate(tempItem.effectiveDocumentDate, entryDate);

    const created: RSCItem = {
      id: 'item_' + Math.random().toString(36).substr(2, 9),
      title: newItem.title || '',
      issuer: newItem.issuer || '',
      startDate: newItem.startDate,
      endDate: newItem.endDate,
      workloadHours: newItem.workloadHours,
      directiveId: newItem.directiveId || 'requisito_1',
      categoryCode: newItem.categoryCode || 'I.1',
      categoryName: newItem.categoryName || 'Categoria RSC',
      unitPoints: newItem.unitPoints || 1.0,
      quantity: newItem.quantity || 1,
      totalScore: (newItem.unitPoints || 1.0) * (newItem.quantity || 1),
      justificationText: newItem.justificationText || '',
      regulatoryBasis: newItem.regulatoryBasis || 'Tabela Oficial RSC UFCG',
      complianceStatus: 'valid',
      complianceNotes: ['Cadastrado manualmente'],
      isPriorToPublicService: dateCheck.isPrior,
      dateValidationReason: dateCheck.reason,
      effectiveDocumentDate: tempItem.effectiveDocumentDate,
      dataDocumento: newItem.dataDocumento,
      numeroIdentificacaoSei: newItem.numeroIdentificacaoSei || 'Documento Manual',
      orgaoEmissor: newItem.issuer,
      periodoVigencia: newItem.periodoVigencia,
      documentName: 'Adicionado Manualmente',
      finalidadeDocumento: newItem.finalidadeDocumento || `Comprovação de atuação em "${newItem.title}" emitida por ${newItem.issuer || 'órgão competente'} para pontuação no item ${newItem.categoryCode} perante o ${userProfile?.rscAlmejado || 'RSC-PCCTAE'}.`,
    };

    onAddItem(created);
    setIsAddingNew(false);
    setNewItem({
      title: '',
      issuer: '',
      directiveId: 'requisito_1',
      categoryCode: 'I.1',
      categoryName: 'Exercício de mandato como membro de conselhos superiores e colegiados da IFE',
      unitPoints: 3.0,
      quantity: 1,
      totalScore: 3.0,
      justificationText: '',
      regulatoryBasis: 'Anexo I - Item 1 (Lei 15.367/2026 / Tabela RSC)',
      complianceStatus: 'valid',
      complianceNotes: ['Adicionado manualmente'],
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Modais de Suporte */}
      <EvidenceQuoteModal
        item={evidenceModalItem}
        onClose={() => setEvidenceModalItem(null)}
      />

      <AnalysisReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        documents={documents}
        rscItems={rscItems}
      />

      {familyModalItems && (
        <FamilyTextConsolidationModal
          isOpen={!!familyModalItems}
          onClose={() => setFamilyModalItems(null)}
          items={familyModalItems}
          userProfile={userProfile}
          onApply={handleApplyFamilyTexts}
        />
      )}

      {/* Top Banner: Auditoria, Pontuação e Botão do Relatório do Passo 3 */}
      <div className="bg-[#132247] text-white rounded-2xl p-5 md:p-6 shadow-md border-2 border-[#EAA816] space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-[#EAA816] text-[#132247] text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider">
                Passo 4: Calculadora RSC UFCG
              </span>
              <span className="bg-white/10 text-white/90 text-xs px-2.5 py-0.5 rounded-md font-medium border border-white/15">
                {userProfile.cargo || 'TAE'} • {targetLevel}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white mt-1.5 flex items-center gap-2">
              Organizador de Requisitos e Comprovantes
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Itens agrupados e ordenados por requisitos e critérios oficiais da Tabela RSC. Revise cada comprovante, confira os textos complementares consolidados e audite suas pontuações.
            </p>
          </div>

          {/* Botão de Acesso ao Relatório do Passo 3 */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsReportModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition cursor-pointer flex items-center gap-2 shadow-xs"
            >
              <BarChart3 className="h-4 w-4 text-[#EAA816]" />
              <span>Relatório do Passo 3 (IA)</span>
            </button>
          </div>
        </div>

        {/* Métricas: Pontuação, Critérios e Checklist de Conclusão */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Pontuação */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-300 block">Pontuação Apurada</span>
              <span className={`text-2xl font-black ${isScoreSufficient ? 'text-emerald-400' : 'text-[#EAA816]'}`}>
                {totalScore.toFixed(1)}{' '}
                <span className="text-xs font-normal text-slate-300">/ {minScore} pts mínimos</span>
              </span>
            </div>
            <div className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase ${
              isScoreSufficient ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-[#EAA816]/20 text-[#EAA816] border border-[#EAA816]/50'
            }`}>
              {isScoreSufficient ? 'Suficiente' : 'Pendente'}
            </div>
          </div>

          {/* Critérios Alcançados */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-300 block">Critérios com Pontuação</span>
              <span className={`text-2xl font-black ${isCriteriosSufficient ? 'text-emerald-400' : 'text-[#EAA816]'}`}>
                {criteriosAlcancados}{' '}
                <span className="text-xs font-normal text-slate-300">/ {minCriterios} exigidos</span>
              </span>
            </div>
            <div className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase ${
              isCriteriosSufficient ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-[#EAA816]/20 text-[#EAA816] border border-[#EAA816]/50'
            }`}>
              {isCriteriosSufficient ? 'Cumprido' : 'Pendente'}
            </div>
          </div>

          {/* Contador de Itens Concluídos (Item 6 solicitado pelo usuário) */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-slate-300 block">
                Itens Conferidos
              </span>
              <span className="text-xs font-bold text-emerald-400">
                {pendingCount === 0 ? 'Tudo Conferido!' : `Faltam ${pendingCount} para marcar`}
              </span>
            </div>
            <div className="mt-2">
              <div className="flex items-baseline justify-between text-xs mb-1">
                <span className="font-bold text-white">
                  {completedCount} de {totalActiveCount} concluídos
                </span>
                <span className="text-[11px] text-slate-300">{completionPercentage}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-white/10">
                <div
                  className="bg-emerald-500 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Resumo por Requisito I ao VI */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2.5 pt-2">
          {orderedDirectives.map((dir) => {
            const score = scoreByReq[dir.id] || 0;
            return (
              <div
                key={dir.id}
                className="bg-[#1C3366]/90 border border-[#EAA816]/40 rounded-xl p-2.5 text-center transition hover:border-[#EAA816]"
              >
                <span className="text-[10px] text-slate-300 font-semibold block">{dir.name}</span>
                <span className="text-sm font-bold text-[#EAA816]">{score.toFixed(1)} pts</span>
                <span className="text-[9px] text-slate-300 block truncate">{dir.desc}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Alerta de Anterioridade ao Ingresso no Serviço Público */}
      {(() => {
        const priorItems = activeItems.filter((item) => item.isPriorToPublicService);
        if (priorItems.length === 0) return null;
        return (
          <div className="bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-300 dark:border-amber-900/60 rounded-2xl p-4 shadow-xs space-y-2">
            <div className="flex items-start gap-3">
              <div className="h-9 w-9 rounded-xl bg-amber-100 dark:bg-amber-900/40 border border-amber-300 dark:border-amber-800 flex items-center justify-center shrink-0">
                <Calendar className="h-5 w-5 text-amber-700 dark:text-amber-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-xs sm:text-sm font-bold text-amber-950 dark:text-amber-200">
                    Cruzamento com Ingresso no Serviço Público: {priorItems.length} documento(s) com data anterior a {formatDateDisplay(entryDate) || 'não informada'}
                  </h3>
                  <span className="bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full">
                    Não Pontua
                  </span>
                </div>
                <p className="text-xs text-amber-800 dark:text-amber-300 mt-1 leading-relaxed">
                  Pelo regulamento do RSC-PCCTAE, apenas documentos emitidos e atividades executadas após o ingresso no serviço público ({formatDateDisplay(entryDate) || 'não informado'}) pontuam. Esses itens estão desconsiderados dos cálculos.
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {priorItems.map((p) => (
                    <span
                      key={p.id}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200 text-[11px] font-medium shadow-2xs"
                    >
                      <ShieldAlert className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                      <span className="font-bold truncate max-w-[200px]">{p.title}</span>
                      <span className="text-amber-700 dark:text-amber-400 text-[10px]">({p.effectiveDocumentDate || p.dataDocumento || 'Data anterior'})</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Barra de Filtro por Requisito e Botão de Adição Manual */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors duration-200">
        {/* Filtros de Requisitos */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSelectedDirective('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              selectedDirective === 'all'
                ? 'bg-[#132247] text-white border-2 border-[#EAA816] shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-[#FEF0B2]/60 hover:text-slate-900 hover:border-[#EAA816]/60 border border-slate-200 dark:border-slate-700'
            }`}
          >
            Todos os Requisitos ({activeItems.length})
          </button>
          {orderedDirectives.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setSelectedDirective(d.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                selectedDirective === d.id
                  ? 'bg-[#132247] text-white border-2 border-[#EAA816] shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-[#FEF0B2]/60 hover:text-slate-900 hover:border-[#EAA816]/60 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {d.name}
            </button>
          ))}
        </div>

        {/* Adicionar Item Manual */}
        <button
          type="button"
          onClick={() => setIsAddingNew(true)}
          className="px-3.5 py-1.5 bg-[#132247] hover:bg-[#1C3366] text-white text-xs font-bold rounded-lg border-2 border-[#EAA816] shadow-xs transition flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <Plus className="h-4 w-4 text-[#EAA816]" />
          <span>Cadastrar Item Manual</span>
        </button>
      </div>

      {/* Formulário de Adicionar Item Manual */}
      {isAddingNew && (
        <div className="bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 rounded-2xl p-6 space-y-4 animate-in fade-in duration-150">
          <div className="flex justify-between items-center pb-2 border-b border-emerald-200 dark:border-emerald-800">
            <h3 className="text-sm font-bold text-emerald-950 dark:text-emerald-200 flex items-center gap-2">
              <Plus className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              Cadastrar Novo Item na Calculadora RSC
            </h3>
            <button
              type="button"
              onClick={() => setIsAddingNew(false)}
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
            >
              Cancelar
            </button>
          </div>

          <form onSubmit={handleSaveNew} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="md:col-span-2">
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Título da Atividade / Comprovante *</label>
              <input
                type="text"
                required
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                placeholder="Ex: Portaria de Designação de Comissão..."
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Órgão Emissor / Instituição *</label>
              <input
                type="text"
                required
                value={newItem.issuer}
                onChange={(e) => setNewItem({ ...newItem, issuer: e.target.value })}
                placeholder="Ex: Reitoria UFCG, SRH..."
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Requisito do RSC</label>
              <select
                value={newItem.directiveId}
                onChange={(e) => setNewItem({ ...newItem, directiveId: e.target.value as RSCDirectiveId })}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 font-semibold text-slate-800 dark:text-slate-200"
              >
                {orderedDirectives.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} — {d.desc}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Código / Categoria da Tabela Oficial</label>
              <select
                value={newItem.categoryCode}
                onChange={(e) => {
                  const cat = STANDARD_CATEGORIES.find((c) => c.code === e.target.value);
                  setNewItem({
                    ...newItem,
                    categoryCode: e.target.value,
                    categoryName: cat ? cat.title : 'Categoria',
                    unitPoints: cat ? cat.unitPoints : 1,
                    directiveId: cat ? cat.directiveId : newItem.directiveId,
                    regulatoryBasis: cat ? cat.legalRef : 'Tabela Oficial RSC',
                  });
                }}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              >
                {STANDARD_CATEGORIES.map((cat) => (
                  <option key={cat.code} value={cat.code}>
                    Item {cat.code} — {cat.title} ({cat.unitPoints} pts)
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:col-span-2 bg-white dark:bg-slate-800/80 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Data do Documento</label>
                <input
                  type="text"
                  placeholder="DD/MM/AAAA"
                  value={newItem.dataDocumento || ''}
                  onChange={(e) => setNewItem({ ...newItem, dataDocumento: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-slate-300 dark:border-slate-600 rounded-lg text-xs bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Data Início</label>
                <input
                  type="text"
                  placeholder="Ex: 01/01/2023"
                  value={newItem.startDate || ''}
                  onChange={(e) => setNewItem({ ...newItem, startDate: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-slate-300 dark:border-slate-600 rounded-lg text-xs bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Data Fim</label>
                <input
                  type="text"
                  placeholder="Ex: 31/12/2023"
                  value={newItem.endDate || ''}
                  onChange={(e) => setNewItem({ ...newItem, endDate: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-slate-300 dark:border-slate-600 rounded-lg text-xs bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 md:col-span-2">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Pontos Unitários</label>
                <input
                  type="number"
                  step="0.1"
                  value={newItem.unitPoints}
                  onChange={(e) => {
                    const pts = parseFloat(e.target.value) || 0;
                    setNewItem({
                      ...newItem,
                      unitPoints: pts,
                      totalScore: pts * (newItem.quantity || 1),
                    });
                  }}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Quantidade / Multiplicador</label>
                <input
                  type="number"
                  step="1"
                  min="1"
                  value={newItem.quantity}
                  onChange={(e) => {
                    const qty = parseFloat(e.target.value) || 1;
                    setNewItem({
                      ...newItem,
                      quantity: qty,
                      totalScore: (newItem.unitPoints || 1) * qty,
                    });
                  }}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            {/* O que o documento pretende comprovar */}
            <div className="md:col-span-2">
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                O que o documento pretende comprovar (Finalidade no Processo SEI)
              </label>
              <textarea
                rows={2}
                value={newItem.finalidadeDocumento || ''}
                onChange={(e) => setNewItem({ ...newItem, finalidadeDocumento: e.target.value })}
                placeholder="Ex: Comprovação de atuação como membro de comissão técnica permanente..."
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 resize-none"
              />
            </div>

            <div className="md:col-span-2 flex justify-end space-x-2 pt-3 border-t border-emerald-200 dark:border-emerald-800">
              <button
                type="button"
                onClick={() => setIsAddingNew(false)}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-xs cursor-pointer"
              >
                Salvar Item
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista Principal de Itens: Agrupados por Requisito e por Item/Família */}
      {groupedSections.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center shadow-xs transition-colors duration-200">
          <FileText className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700 dark:text-slate-200">Nenhum item encontrado</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            Não há atividades mapeadas para o filtro selecionado. Você pode cadastrar manualmente ou voltar ao Passo 2 para enviar PDFs.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {groupedSections.map((section) => (
            <div key={section.directive.id} className="space-y-4">
              {/* Cabeçalho do Requisito */}
              <div className="flex items-center justify-between border-b-2 border-[#132247] dark:border-slate-700 pb-2">
                <div className="flex items-center gap-2.5">
                  <div className="h-7 w-7 rounded-lg bg-[#132247] text-[#EAA816] flex items-center justify-center text-xs font-black">
                    {section.directive.roman}
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-[#132247] dark:text-[#EAA816]">
                      {section.directive.name}: {section.directive.desc}
                    </h3>
                  </div>
                </div>
                <span className="text-xs font-bold text-indigo-900 dark:text-indigo-200 bg-indigo-50 dark:bg-indigo-950/50 px-2.5 py-1 rounded-md border border-indigo-200 dark:border-indigo-800">
                  {section.categories.reduce((acc, c) => acc + c.items.length, 0)} comprovante(s)
                </span>
              </div>

              {/* Categorias / Famílias dentro deste Requisito */}
              <div className="space-y-4">
                {section.categories.map((catGroup) => (
                  <div
                    key={catGroup.categoryCode}
                    className={`rounded-2xl border transition shadow-xs overflow-hidden ${
                      catGroup.isFamily
                        ? 'border-indigo-300 dark:border-indigo-800/80 bg-indigo-50/20 dark:bg-indigo-950/20'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                    }`}
                  >
                    {/* Cabeçalho do Item / Critério da Tabela */}
                    <div className="bg-slate-100/90 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-700 px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="bg-[#132247] text-white text-xs font-black px-2.5 py-0.5 rounded-md">
                          Item {catGroup.categoryCode}
                        </span>
                        <span className="font-bold text-xs text-slate-900 dark:text-white">
                          {catGroup.categoryName}
                        </span>

                        {catGroup.isFamily && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-200 text-[10px] font-bold border border-indigo-200 dark:border-indigo-800">
                            <Layers className="h-3 w-3 text-indigo-600 dark:text-indigo-400" />
                            Família com {catGroup.items.length} comprovantes unidos
                          </span>
                        )}
                      </div>

                      {/* Ações da Família (Unir Textos Complementares A, B e C) */}
                      {catGroup.isFamily && (
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => setFamilyModalItems(catGroup.items)}
                            className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition shadow-2xs flex items-center gap-1.5 cursor-pointer"
                            title="Unir textos complementares A, B e C de toda a família"
                          >
                            <Sparkles className="h-3.5 w-3.5" />
                            <span>Unir Textos A, B e C da Família</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Lista de Comprovantes deste Critério */}
                    <div className="divide-y divide-slate-100 dark:divide-slate-800">
                      {catGroup.items.map((item) => {
                        const isExpanded = expandedItemId === item.id;
                        const isCompleted = !!item.isCompleted;

                        return (
                          <div
                            key={item.id}
                            className={`p-4 transition ${
                              isCompleted
                                ? 'bg-emerald-50/30 dark:bg-emerald-950/20'
                                : 'bg-white dark:bg-slate-900 hover:bg-slate-50/80 dark:hover:bg-slate-800/50'
                            }`}
                          >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                              {/* Checkbox de Concluído + Detalhes Principais */}
                              <div className="flex items-start gap-3 min-w-0 flex-1">
                                {/* Checkbox de Conclusão / Verificado */}
                                <button
                                  type="button"
                                  onClick={() => handleToggleCompleted(item)}
                                  className="mt-0.5 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition cursor-pointer shrink-0"
                                  title={isCompleted ? 'Desmarcar como concluído' : 'Marcar como concluído'}
                                >
                                  {isCompleted ? (
                                    <CheckSquare className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                  ) : (
                                    <Square className="h-5 w-5 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300" />
                                  )}
                                </button>

                                <div className="space-y-1.5 min-w-0 flex-1">
                                  {/* Nome do Arquivo Analisado BEM DESTACADO */}
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-[11px] font-bold border border-slate-300 dark:border-slate-700">
                                      <FileText className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                                      <span className="truncate max-w-[260px] sm:max-w-md">
                                        Arquivo: {item.documentName || 'Documento Comprobatório'}
                                      </span>
                                    </span>

                                    {item.isFamilyConsolidated && (
                                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 text-[10px] font-semibold border border-indigo-200 dark:border-indigo-800">
                                        <CheckCircle className="h-3 w-3 text-indigo-600 dark:text-indigo-400" /> Textos A, B e C Unidos
                                      </span>
                                    )}

                                    {item.isPriorToPublicService ? (
                                      <span className="px-2 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 text-[10px] font-semibold flex items-center gap-1 border border-rose-200 dark:border-rose-800">
                                        <ShieldAlert className="h-3 w-3 text-rose-600 dark:text-rose-400" /> Anterior ao Ingresso (Não Pontua)
                                      </span>
                                    ) : item.complianceStatus === 'valid' ? (
                                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-[10px] font-semibold flex items-center gap-1 border border-emerald-200 dark:border-emerald-800">
                                        <CheckCircle className="h-3 w-3" /> Válido
                                      </span>
                                    ) : (
                                      <span className="px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 text-[10px] font-semibold flex items-center gap-1 border border-amber-200 dark:border-amber-800">
                                        <AlertTriangle className="h-3 w-3" /> Requer Ajuste
                                      </span>
                                    )}
                                  </div>

                                  {/* Título da Atividade */}
                                  <div className="flex items-center gap-2">
                                    <h4
                                      className={`text-sm font-bold leading-snug ${
                                        item.isPriorToPublicService
                                          ? 'text-slate-500 line-through'
                                          : 'text-slate-900 dark:text-white'
                                      }`}
                                    >
                                      {item.title}
                                    </h4>
                                    <button
                                      type="button"
                                      onClick={() => copyFieldText(item.title, item.id + '_title')}
                                      className="p-1 text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 rounded transition shrink-0 cursor-pointer"
                                      title="Copiar Título"
                                    >
                                      {copiedFieldKey === item.id + '_title' ? (
                                        <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                                      ) : (
                                        <Copy className="h-3.5 w-3.5" />
                                      )}
                                    </button>
                                  </div>

                                  {/* Metadados: Emissor, Data, Carga Horária, Processo SEI */}
                                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                                    <span>
                                      Emissor: <strong className="text-slate-700 dark:text-slate-200">{item.issuer}</strong>
                                    </span>
                                    {item.dataDocumento && (
                                      <span className="text-amber-800 dark:text-amber-400 font-medium">
                                        Data: <strong>{item.dataDocumento}</strong>
                                      </span>
                                    )}
                                    {item.workloadHours && (
                                      <span>
                                        Carga: <strong className="text-slate-700 dark:text-slate-200">{item.workloadHours}h</strong>
                                      </span>
                                    )}
                                    {item.numeroIdentificacaoSei && (
                                      <span>
                                        Identificação/SEI: <strong className="text-slate-700 dark:text-slate-200">{item.numeroIdentificacaoSei}</strong>
                                      </span>
                                    )}
                                  </div>

                                  {/* O que o documento pretende comprovar (Finalidade Comprobatória) */}
                                  <div className="mt-2.5 p-2.5 bg-slate-50 dark:bg-slate-800/70 border border-slate-200/90 dark:border-slate-700 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                    <div className="min-w-0 flex-1">
                                      <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-bold text-[11px] mb-0.5">
                                        <Target className="h-3.5 w-3.5 text-[#132247] dark:text-indigo-400 shrink-0" />
                                        <span>O que o documento pretende comprovar (Finalidade no Processo):</span>
                                      </div>
                                      <p className="text-xs text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                                        {getItemFinalidade(item, userProfile)}
                                      </p>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => copyFieldText(getItemFinalidade(item, userProfile), item.id + '_finalidade')}
                                      className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border shadow-2xs ${
                                        copiedFieldKey === item.id + '_finalidade'
                                          ? 'bg-emerald-600 text-white border-emerald-600'
                                          : 'bg-white dark:bg-slate-800 hover:bg-[#132247] hover:text-white dark:hover:bg-slate-700 text-[#132247] dark:text-indigo-300 border-slate-300 dark:border-slate-700'
                                      }`}
                                      title="Copiar o que o documento pretende comprovar para colar no SEI"
                                    >
                                      {copiedFieldKey === item.id + '_finalidade' ? (
                                        <>
                                          <Check className="h-3.5 w-3.5" />
                                          <span>Copiado!</span>
                                        </>
                                      ) : (
                                        <>
                                          <Copy className="h-3.5 w-3.5" />
                                          <span>Copiar Finalidade</span>
                                        </>
                                      )}
                                    </button>
                                  </div>
                                </div>
                              </div>

                              {/* Pontuação & Ações */}
                              <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                                <div className="text-left md:text-right">
                                  <span className="text-[10px] uppercase text-slate-400 dark:text-slate-500 block font-semibold">
                                    Pontuação
                                  </span>
                                  {item.isPriorToPublicService ? (
                                    <div>
                                      <span className="text-sm font-bold text-slate-400 line-through">
                                        {item.totalScore.toFixed(1)} pts
                                      </span>
                                      <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 block">
                                        0.0 pts (Excluído)
                                      </span>
                                    </div>
                                  ) : (
                                    <div>
                                      <span className="text-base font-black text-indigo-900 dark:text-indigo-300">
                                        {item.totalScore.toFixed(1)}{' '}
                                        <span className="text-xs font-normal text-slate-500 dark:text-slate-400">pts</span>
                                      </span>
                                      <span className="text-[10px] text-slate-400 dark:text-slate-500 block">
                                        ({item.quantity} x {item.unitPoints} pt)
                                      </span>
                                    </div>
                                  )}
                                </div>

                                <div className="flex items-center space-x-1.5">
                                  {/* Botão de Trecho Comprobatório Exato */}
                                  {item.trechoComprobatorioExato && (
                                    <button
                                      type="button"
                                      onClick={() => setEvidenceModalItem(item)}
                                      className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800 transition flex items-center gap-1 cursor-pointer"
                                      title="Ver citação literal extraída do PDF em janela modal"
                                    >
                                      <Quote className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                                      <span>Ver Citação</span>
                                    </button>
                                  )}

                                  {/* Copiar Parâmetros da Calculadora */}
                                  <button
                                    type="button"
                                    onClick={() => handleCopyParams(item)}
                                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1 border ${
                                      copiedId === item.id
                                        ? 'bg-emerald-600 text-white border-emerald-600'
                                        : 'bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-indigo-900 dark:hover:text-indigo-200 border-slate-200 dark:border-slate-700'
                                    }`}
                                    title="Copiar dados para a Calculadora RSC"
                                  >
                                    {copiedId === item.id ? (
                                      <Check className="h-3.5 w-3.5" />
                                    ) : (
                                      <Copy className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                                    )}
                                    <span>{copiedId === item.id ? 'Copiado!' : 'Copiar Dados'}</span>
                                  </button>

                                  {/* Desconsiderar / Mover para Caixa Vermelha */}
                                  <button
                                    type="button"
                                    onClick={() => handleToggleDiscarded(item)}
                                    className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg transition cursor-pointer"
                                    title="Mover item para Caixa Vermelha (Desconsiderados no final da tela)"
                                  >
                                    <Ban className="h-4 w-4" />
                                  </button>

                                  {/* Editar */}
                                  <button
                                    type="button"
                                    onClick={() => setIsEditingItem(item)}
                                    className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-800 rounded-lg transition"
                                    title="Editar Item"
                                  >
                                    <Edit2 className="h-4 w-4" />
                                  </button>

                                  {/* Excluir */}
                                  <button
                                    type="button"
                                    onClick={() => onDeleteItem(item.id)}
                                    className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg transition"
                                    title="Excluir Definitivamente"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>

                                  {/* Expandir Detalhes */}
                                  <button
                                    type="button"
                                    onClick={() => setExpandedItemId(isExpanded ? null : item.id)}
                                    className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
                                    title="Ver Textos e Justificativas"
                                  >
                                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Conteúdo Expandido (Textos Complementares A, B, C e Justificativa) */}
                            {isExpanded && (
                              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4 text-xs bg-slate-50/50 dark:bg-slate-950/40 p-4 rounded-xl">
                                {/* Trecho Comprobatório Exato: Apenas botão para abrir em janela modal conforme item 4 */}
                                <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-xl p-3 flex items-center justify-between gap-3">
                                  <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200">
                                    <Quote className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
                                    <span>
                                      <strong>Trecho Comprobatório Exato:</strong> Oculto no card para limpeza visual. Disponível para conferência em janela modal.
                                    </span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => setEvidenceModalItem(item)}
                                    className="px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shrink-0 cursor-pointer shadow-2xs"
                                  >
                                    Abrir em Janela
                                  </button>
                                </div>

                                {/* O que o documento pretende comprovar no bloco expandido */}
                                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3.5 space-y-1.5 shadow-2xs">
                                  <div className="flex items-center justify-between">
                                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                                      <Target className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                                      O que o documento pretende comprovar (Finalidade no Processo SEI)
                                    </label>
                                    <button
                                      type="button"
                                      onClick={() => copyFieldText(getItemFinalidade(item, userProfile), item.id + '_finalidade_exp')}
                                      className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition flex items-center gap-1 cursor-pointer ${
                                        copiedFieldKey === item.id + '_finalidade_exp'
                                          ? 'bg-emerald-600 text-white'
                                          : 'bg-slate-800 hover:bg-slate-700 text-white dark:bg-slate-700 dark:hover:bg-slate-600'
                                      }`}
                                    >
                                      {copiedFieldKey === item.id + '_finalidade_exp' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                                      <span>{copiedFieldKey === item.id + '_finalidade_exp' ? 'Copiado!' : 'Copiar Finalidade'}</span>
                                    </button>
                                  </div>
                                  <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-medium bg-slate-50 dark:bg-slate-900/80 p-2.5 rounded-lg border border-slate-100 dark:border-slate-700">
                                    {getItemFinalidade(item, userProfile)}
                                  </p>
                                </div>

                                {/* Justificativa Fundamentada Geral */}
                                <div className="space-y-1.5">
                                  <div className="flex items-center justify-between">
                                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                                      <FileText className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                                      Justificativa Fundamentada Geral (Processo SEI)
                                    </label>
                                    <div className="flex items-center space-x-2">
                                      <button
                                        type="button"
                                        onClick={() => handleTriggerRegen(item)}
                                        disabled={loadingRegenId === item.id}
                                        className="px-2.5 py-1 text-[11px] font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded-md border border-indigo-200 dark:border-indigo-800 transition flex items-center gap-1 cursor-pointer"
                                      >
                                        <RefreshCw className={`h-3 w-3 ${loadingRegenId === item.id ? 'animate-spin' : ''}`} />
                                        <span>Regerar com IA</span>
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleCopyJustification(item)}
                                        className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition flex items-center gap-1 cursor-pointer ${
                                          copiedJustificationId === item.id
                                            ? 'bg-emerald-600 text-white'
                                            : 'bg-slate-800 hover:bg-slate-700 text-white dark:bg-slate-700 dark:hover:bg-slate-600'
                                        }`}
                                      >
                                        {copiedJustificationId === item.id ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                                        <span>{copiedJustificationId === item.id ? 'Copiado!' : 'Copiar Texto'}</span>
                                      </button>
                                    </div>
                                  </div>
                                  <div className="p-3.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-serif whitespace-pre-line shadow-2xs">
                                    {item.justificationText || 'Sem justificativa gerada.'}
                                  </div>
                                </div>

                                {/* Textos Complementares A, B e C */}
                                <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-750">
                                  <h5 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider flex items-center justify-between">
                                    <span>Textos Complementares Formato SEI</span>
                                    {catGroup.isFamily && (
                                      <button
                                        type="button"
                                        onClick={() => setFamilyModalItems(catGroup.items)}
                                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-bold underline"
                                      >
                                        Editar Textos da Família
                                      </button>
                                    )}
                                  </h5>

                                  {/* Bloco A */}
                                  <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3.5 space-y-1.5">
                                    <div className="flex items-center justify-between">
                                      <span className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                                        <span className="px-1.5 py-0.5 bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-200 rounded font-black text-[10px]">A</span>
                                        Experiência Profissional e Individual Vinculada ao Requisito
                                      </span>
                                      <button
                                        type="button"
                                        onClick={() => copyFieldText(item.experienciaProfissionalTexto || '', item.id + '_blocoA')}
                                        className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 p-1 text-xs"
                                        title="Copiar texto A"
                                      >
                                        {copiedFieldKey === item.id + '_blocoA' ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                                      </button>
                                    </div>
                                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs">
                                      {item.experienciaProfissionalTexto || 'Texto não preenchido.'}
                                    </p>
                                  </div>

                                  {/* Bloco B */}
                                  <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3.5 space-y-1.5">
                                    <div className="flex items-center justify-between">
                                      <span className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                                        <span className="px-1.5 py-0.5 bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 rounded font-black text-[10px]">B</span>
                                        Diferencial da Atuação
                                      </span>
                                      <button
                                        type="button"
                                        onClick={() => copyFieldText(item.diferencialAtuacaoTexto || '', item.id + '_blocoB')}
                                        className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 p-1 text-xs"
                                        title="Copiar texto B"
                                      >
                                        {copiedFieldKey === item.id + '_blocoB' ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                                      </button>
                                    </div>
                                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs">
                                      {item.diferencialAtuacaoTexto || 'Texto não preenchido.'}
                                    </p>
                                  </div>

                                  {/* Bloco C */}
                                  <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3.5 space-y-1.5">
                                    <div className="flex items-center justify-between">
                                      <span className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                                        <span className="px-1.5 py-0.5 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 rounded font-black text-[10px]">C</span>
                                        Impacto dos Saberes no Cargo e na Instituição
                                      </span>
                                      <button
                                        type="button"
                                        onClick={() => copyFieldText(item.impactosSaberesTexto || '', item.id + '_blocoC')}
                                        className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 p-1 text-xs"
                                        title="Copiar texto C"
                                      >
                                        {copiedFieldKey === item.id + '_blocoC' ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                                      </button>
                                    </div>
                                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs">
                                      {item.impactosSaberesTexto || 'Texto não preenchido.'}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Caixa Vermelha: Itens Desconsiderados / Rejeitados no Final da Tela (Item 5 solicitado pelo usuário) */}
      {discardedItems.length > 0 && (
        <div className="bg-rose-50/80 dark:bg-rose-950/30 border-2 border-rose-300 dark:border-rose-900/60 rounded-2xl p-5 shadow-xs space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-rose-200 dark:border-rose-900/50 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-rose-200 dark:bg-rose-900 text-rose-800 dark:text-rose-200 flex items-center justify-center shrink-0">
                <Ban className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-rose-950 dark:text-rose-200 flex items-center gap-2">
                  Caixa de Itens Desconsiderados / Rejeitados ({discardedItems.length})
                  <span className="bg-rose-600 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">
                    Excluídos do Cálculo
                  </span>
                </h3>
                <p className="text-xs text-rose-800 dark:text-rose-300/80 mt-0.5">
                  Itens marcados para descarte. Eles não pontuam na Calculadora RSC, mas podem ser restaurados a qualquer momento clicando em "Restaurar".
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {discardedItems.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/50 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-rose-200 dark:border-rose-800">
                      {item.categoryCode}
                    </span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 line-through">
                      {item.title}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <span>Arquivo: <strong className="text-slate-700 dark:text-slate-300">{item.documentName || 'Documento Anexo'}</strong></span>
                    <span>•</span>
                    <span>Pontos Desconsiderados: <strong className="text-rose-700 dark:text-rose-400">{item.totalScore.toFixed(1)} pts</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleToggleDiscarded(item)}
                    className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Restaurar para Lista Ativa</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteItem(item.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg transition"
                    title="Excluir Definitivamente"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal de Edição de Item */}
      {isEditingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto text-slate-900 dark:text-slate-100">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-200 dark:border-slate-800">
              Editar Dados do Item na Calculadora RSC
            </h3>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Título da Atividade</label>
                <input
                  type="text"
                  value={isEditingItem.title}
                  onChange={(e) => setIsEditingItem({ ...isEditingItem, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Órgão Emissor</label>
                  <input
                    type="text"
                    value={isEditingItem.issuer}
                    onChange={(e) => setIsEditingItem({ ...isEditingItem, issuer: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Data do Documento</label>
                  <input
                    type="text"
                    value={isEditingItem.dataDocumento || ''}
                    onChange={(e) => setIsEditingItem({ ...isEditingItem, dataDocumento: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Pontos Unitários</label>
                  <input
                    type="number"
                    step="0.1"
                    value={isEditingItem.unitPoints}
                    onChange={(e) => {
                      const pts = parseFloat(e.target.value) || 0;
                      setIsEditingItem({
                        ...isEditingItem,
                        unitPoints: pts,
                        totalScore: pts * isEditingItem.quantity,
                      });
                    }}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Quantidade</label>
                  <input
                    type="number"
                    step="1"
                    value={isEditingItem.quantity}
                    onChange={(e) => {
                      const qty = parseFloat(e.target.value) || 0;
                      setIsEditingItem({
                        ...isEditingItem,
                        quantity: qty,
                        totalScore: isEditingItem.unitPoints * qty,
                      });
                    }}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* O que o documento pretende comprovar */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-semibold text-slate-700 dark:text-slate-300">
                    O que o documento pretende comprovar (Finalidade no Processo SEI)
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditingItem({
                        ...isEditingItem,
                        finalidadeDocumento: getItemFinalidade(isEditingItem, userProfile),
                      });
                    }}
                    className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-semibold underline cursor-pointer"
                  >
                    Sugerir Automaticamente
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={isEditingItem.finalidadeDocumento || ''}
                  onChange={(e) => setIsEditingItem({ ...isEditingItem, finalidadeDocumento: e.target.value })}
                  placeholder="Ex: Comprovação de atuação em..."
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg resize-none bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Texto da Justificativa</label>
                <textarea
                  rows={4}
                  value={isEditingItem.justificationText}
                  onChange={(e) => setIsEditingItem({ ...isEditingItem, justificationText: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg resize-none font-serif bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditingItem(null)}
                  className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-xs cursor-pointer"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Botão de Avançar para o Passo Final */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {completedCount} de {totalActiveCount} itens conferidos ({completionPercentage}%)
        </span>
        <button
          type="button"
          onClick={onNextStep}
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-md transition cursor-pointer flex items-center gap-2"
        >
          <span>Avançar para Relatório Final e Conformidade</span>
          <CheckCircle className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
