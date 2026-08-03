import React, { useState } from 'react';
import { RSCItem, UserProfile, RSCDirectiveId } from '../types';
import { DIRECTIVE_NAMES, STANDARD_CATEGORIES, RSC_REQUIREMENTS, evaluateRSCCompliance } from '../data/rscStructure';
import {
  LayoutGrid,
  Plus,
  Copy,
  Check,
  Edit2,
  Trash2,
  FileText,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  RefreshCw,
} from 'lucide-react';

interface RscCalculatorOrganizerProps {
  rscItems: RSCItem[];
  userProfile: UserProfile;
  onUpdateItem: (item: RSCItem) => void;
  onDeleteItem: (itemId: string) => void;
  onAddItem: (item: RSCItem) => void;
  onRegenerateJustification: (item: RSCItem) => Promise<void>;
  onNextStep: () => void;
}

export const RscCalculatorOrganizer: React.FC<RscCalculatorOrganizerProps> = ({
  rscItems,
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

  const copyFieldText = (text: string, key: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedFieldKey(key);
    setTimeout(() => setCopiedFieldKey(null), 2000);
  };
  const [isEditingItem, setIsEditingItem] = useState<RSCItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [loadingRegenId, setLoadingRegenId] = useState<string | null>(null);

  // New Item State
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

  const targetLevel = userProfile.rscAlmejado || 'RSC-PCCTAE I';
  const evaluation = evaluateRSCCompliance(rscItems, targetLevel);
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

  const scoreR1 = scoreByReq.requisito_1;
  const scoreR2 = scoreByReq.requisito_2;
  const scoreR3 = scoreByReq.requisito_3;
  const scoreR4 = scoreByReq.requisito_4;
  const scoreR5 = scoreByReq.requisito_5;
  const scoreR6 = scoreByReq.requisito_6;

  const filteredItems =
    selectedDirective === 'all'
      ? rscItems
      : rscItems.filter((i) => {
          if (i.directiveId === selectedDirective) return true;
          if (selectedDirective === 'requisito_1' && i.directiveId === 'diretriz_1') return true;
          if (selectedDirective === 'requisito_2' && i.directiveId === 'diretriz_2') return true;
          if (selectedDirective === 'requisito_6' && i.directiveId === 'diretriz_3') return true;
          return false;
        });

  const handleCopyParams = (item: RSCItem) => {
    const text = `Calculadora RSC (www.calculadorarsc.com)\nItem: ${item.title}\nCategoria: ${item.categoryCode} - ${item.categoryName}\nPontos Unitários: ${item.unitPoints}\nQuantidade: ${item.quantity}\nPontuação Total: ${item.totalScore.toFixed(1)} pts\nJustificativa: ${item.justificationText}`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyJustification = (item: RSCItem) => {
    navigator.clipboard.writeText(item.justificationText);
    setCopiedJustificationId(item.id);
    setTimeout(() => setCopiedJustificationId(null), 2000);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditingItem) {
      onUpdateItem(isEditingItem);
      setIsEditingItem(null);
    }
  };

  const handleSaveNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.title || !newItem.issuer) return;

    const itemToAdd: RSCItem = {
      id: 'item_' + Math.random().toString(36).substr(2, 9),
      title: newItem.title || 'Nova Atividade',
      issuer: newItem.issuer || 'UFCG',
      startDate: newItem.startDate,
      endDate: newItem.endDate,
      workloadHours: newItem.workloadHours,
      directiveId: newItem.directiveId as RSCDirectiveId,
      categoryCode: newItem.categoryCode || 'I.1',
      categoryName: newItem.categoryName || 'Categoria RSC',
      unitPoints: Number(newItem.unitPoints) || 1,
      quantity: Number(newItem.quantity) || 1,
      totalScore: (Number(newItem.unitPoints) || 1) * (Number(newItem.quantity) || 1),
      justificationText:
        newItem.justificationText ||
        `O servidor atua na função de ${userProfile.cargo} na UFCG, tendo desempenhado com êxito a atividade de ${newItem.title}, emitida por ${newItem.issuer}, enquadrando-se nos termos da Tabela Oficial do RSC-PCCTAE.`,
      regulatoryBasis: newItem.regulatoryBasis || 'Tabela Oficial RSC-PCCTAE / Lei 15.367/2026',
      complianceStatus: 'valid',
      complianceNotes: ['Item cadastrado manualmente pelo servidor'],
    };

    onAddItem(itemToAdd);
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
      regulatoryBasis: 'Anexo I - Item 1 (Tabela RSC)',
      complianceStatus: 'valid',
      complianceNotes: ['Adicionado manualmente'],
    });
  };

  const handleTriggerRegen = async (item: RSCItem) => {
    setLoadingRegenId(item.id);
    try {
      await onRegenerateJustification(item);
    } finally {
      setLoadingRegenId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Scores Breakdown */}
      <div className="bg-[#132247] text-white rounded-2xl p-6 shadow-sm border-2 border-[#EAA816]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#EAA816]/40">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#EAA816] bg-[#FEF0B2]/15 px-2.5 py-0.5 rounded-full border border-[#EAA816]/40">
              Matriz Oficial do RSC-PCCTAE (Anexos I a VI)
            </span>
            <h2 className="text-xl font-bold tracking-tight text-white mt-1.5 flex items-center gap-2">
              Organizador de Conteúdos e Justificativas
            </h2>
            <p className="text-xs text-slate-200 mt-1">
              Copie os dados e justificativas para preenchimento no sistema oficial e no site{' '}
              <a
                href="https://www.calculadorarsc.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#EAA816] hover:underline inline-flex items-center gap-1 font-bold"
              >
                calculadorarsc.com <ExternalLink className="h-3 w-3 text-[#EAA816]" />
              </a>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 bg-[#1C3366] border-2 border-[#EAA816]/70 p-4 rounded-xl shrink-0">
            {/* Total Points Counter */}
            <div className="pr-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Pontuação Total</p>
              <p className={`text-2xl font-black ${isScoreSufficient ? 'text-emerald-400' : 'text-[#EAA816]'}`}>
                {totalScore.toFixed(1)}{' '}
                <span className="text-xs font-medium text-slate-300">/ {minScore} pts</span>
              </p>
            </div>

            <div className="h-10 w-[1px] bg-[#EAA816]/40 hidden sm:block" />

            {/* Criteria Count (Número de Critérios requeridos pela lei) */}
            <div className="px-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Critérios Alcançados</p>
              <p className={`text-2xl font-black ${isCriteriosSufficient ? 'text-emerald-400' : 'text-[#EAA816]'}`}>
                {criteriosAlcancados}{' '}
                <span className="text-xs font-medium text-slate-300">/ {minCriterios} exigidos</span>
              </p>
            </div>

            <div className="h-10 w-[1px] bg-[#EAA816]/40 hidden sm:block" />

            {/* Overall Level Status */}
            <div className="pl-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Status no {targetLevel}</p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                  isFullyCompliant 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                    : 'bg-[#EAA816]/20 text-[#EAA816] border border-[#EAA816]/50'
                }`}>
                  {isFullyCompliant ? 'APTO - Requisitos Cumpridos' : 'PENDENTE DE REQUISITOS'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Score per Requisito Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 pt-6">
          <div className="bg-[#1C3366]/90 border border-[#EAA816]/40 rounded-xl p-3 text-center">
            <span className="text-[10px] text-slate-300 font-semibold block">Requisito I</span>
            <span className="text-sm font-bold text-[#EAA816]">{scoreR1.toFixed(1)} pts</span>
            <span className="text-[9px] text-slate-300 block truncate">GTs/Comissões</span>
          </div>

          <div className="bg-[#1C3366]/90 border border-[#EAA816]/40 rounded-xl p-3 text-center">
            <span className="text-[10px] text-slate-300 font-semibold block">Requisito II</span>
            <span className="text-sm font-bold text-[#EAA816]">{scoreR2.toFixed(1)} pts</span>
            <span className="text-[9px] text-slate-300 block truncate">Projetos/Gestão</span>
          </div>

          <div className="bg-[#1C3366]/90 border border-[#EAA816]/40 rounded-xl p-3 text-center">
            <span className="text-[10px] text-slate-300 font-semibold block">Requisito III</span>
            <span className="text-sm font-bold text-[#EAA816]">{scoreR3.toFixed(1)} pts</span>
            <span className="text-[9px] text-slate-300 block truncate">Premiações</span>
          </div>

          <div className="bg-[#1C3366]/90 border border-[#EAA816]/40 rounded-xl p-3 text-center">
            <span className="text-[10px] text-slate-300 font-semibold block">Requisito IV</span>
            <span className="text-sm font-bold text-[#EAA816]">{scoreR4.toFixed(1)} pts</span>
            <span className="text-[9px] text-slate-300 block truncate">Resp. Técnicas</span>
          </div>

          <div className="bg-[#1C3366]/90 border border-[#EAA816]/40 rounded-xl p-3 text-center">
            <span className="text-[10px] text-slate-300 font-semibold block">Requisito V</span>
            <span className="text-sm font-bold text-[#EAA816]">{scoreR5.toFixed(1)} pts</span>
            <span className="text-[9px] text-slate-300 block truncate">Funções CD/FG</span>
          </div>

          <div className="bg-[#1C3366]/90 border border-[#EAA816]/40 rounded-xl p-3 text-center">
            <span className="text-[10px] text-slate-300 font-semibold block">Requisito VI</span>
            <span className="text-sm font-bold text-[#EAA816]">{scoreR6.toFixed(1)} pts</span>
            <span className="text-[9px] text-slate-300 block truncate">Produção Técnica</span>
          </div>
        </div>
      </div>

      {/* Tabs & Controls */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Directive Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSelectedDirective('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              selectedDirective === 'all'
                ? 'bg-[#132247] text-white border-2 border-[#EAA816] shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-[#FEF0B2]/60 hover:border-[#EAA816]/60 border border-slate-200'
            }`}
          >
            Todos ({rscItems.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedDirective('requisito_1')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              selectedDirective === 'requisito_1'
                ? 'bg-[#132247] text-white border-2 border-[#EAA816] shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-[#FEF0B2]/60 hover:border-[#EAA816]/60 border border-slate-200'
            }`}
          >
            Req. I (Comissões)
          </button>
          <button
            type="button"
            onClick={() => setSelectedDirective('requisito_2')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              selectedDirective === 'requisito_2'
                ? 'bg-[#132247] text-white border-2 border-[#EAA816] shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-[#FEF0B2]/60 hover:border-[#EAA816]/60 border border-slate-200'
            }`}
          >
            Req. II (Projetos)
          </button>
          <button
            type="button"
            onClick={() => setSelectedDirective('requisito_3')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              selectedDirective === 'requisito_3'
                ? 'bg-[#132247] text-white border-2 border-[#EAA816] shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-[#FEF0B2]/60 hover:border-[#EAA816]/60 border border-slate-200'
            }`}
          >
            Req. III (Prêmios)
          </button>
          <button
            type="button"
            onClick={() => setSelectedDirective('requisito_4')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              selectedDirective === 'requisito_4'
                ? 'bg-[#132247] text-white border-2 border-[#EAA816] shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-[#FEF0B2]/60 hover:border-[#EAA816]/60 border border-slate-200'
            }`}
          >
            Req. IV (Resp. Técnica)
          </button>
          <button
            type="button"
            onClick={() => setSelectedDirective('requisito_5')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              selectedDirective === 'requisito_5'
                ? 'bg-[#132247] text-white border-2 border-[#EAA816] shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-[#FEF0B2]/60 hover:border-[#EAA816]/60 border border-slate-200'
            }`}
          >
            Req. V (CD/FG)
          </button>
          <button
            type="button"
            onClick={() => setSelectedDirective('requisito_6')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              selectedDirective === 'requisito_6'
                ? 'bg-[#132247] text-white border-2 border-[#EAA816] shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-[#FEF0B2]/60 hover:border-[#EAA816]/60 border border-slate-200'
            }`}
          >
            Req. VI (Produção)
          </button>
        </div>

        {/* Add Manual Item Button */}
        <button
          type="button"
          onClick={() => setIsAddingNew(true)}
          className="px-3.5 py-1.5 bg-[#132247] hover:bg-[#1C3366] text-white text-xs font-bold rounded-lg border-2 border-[#EAA816] shadow-xs transition flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <Plus className="h-4 w-4 text-[#EAA816]" />
          <span className="text-white font-bold">Adicionar Item Manual</span>
        </button>
      </div>

      {/* Manual Item Add Form Modal / Drawer */}
      {isAddingNew && (
        <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-6 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-emerald-200">
            <h3 className="text-sm font-bold text-emerald-950 flex items-center gap-2">
              <Plus className="h-4 w-4 text-emerald-600" />
              Cadastrar Novo Item na Calculadora RSC
            </h3>
            <button
              type="button"
              onClick={() => setIsAddingNew(false)}
              className="text-xs text-slate-500 hover:text-slate-800"
            >
              Cancelar
            </button>
          </div>

          <form onSubmit={handleSaveNew} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="md:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">Título da Atividade / Comprovante *</label>
              <input
                type="text"
                required
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                placeholder="Ex: Portaria de Designação da Comissão de Avaliação..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Órgão Emissor / Instituição *</label>
              <input
                type="text"
                required
                value={newItem.issuer}
                onChange={(e) => setNewItem({ ...newItem, issuer: e.target.value })}
                placeholder="Ex: Reitoria UFCG, SRH, ENAP..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Requisito do RSC</label>
              <select
                value={newItem.directiveId}
                onChange={(e) => setNewItem({ ...newItem, directiveId: e.target.value as RSCDirectiveId })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white font-semibold text-slate-800"
              >
                <option value="requisito_1">Requisito I - Grupos de Trabalho e Comissões</option>
                <option value="requisito_2">Requisito II - Projetos Institucionais e Gestão</option>
                <option value="requisito_3">Requisito III - Premiações em Eventos Públicos</option>
                <option value="requisito_4">Requisito IV - Responsabilidades Técnicas e Licitações</option>
                <option value="requisito_5">Requisito V - Cargos de Direção e Funções (CD/FG)</option>
                <option value="requisito_6">Requisito VI - Produção e Difusão de Conhecimento</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">Código / Categoria da Tabela Oficial</label>
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
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
              >
                {STANDARD_CATEGORIES.map((cat) => (
                  <option key={cat.code} value={cat.code}>
                    Item {cat.code} — {cat.title} ({cat.unitPoints} pts)
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2 md:col-span-2">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Pontos por Unidade</label>
                <input
                  type="number"
                  step="0.1"
                  value={newItem.unitPoints}
                  onChange={(e) => setNewItem({ ...newItem, unitPoints: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Quantidade</label>
                <input
                  type="number"
                  step="0.5"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({ ...newItem, quantity: parseFloat(e.target.value) || 1 })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">
                Texto da Justificativa Fundamentada (opcional - pode ser gerado com IA)
              </label>
              <textarea
                rows={3}
                value={newItem.justificationText}
                onChange={(e) => setNewItem({ ...newItem, justificationText: e.target.value })}
                placeholder="Deixe em branco para gerar automaticamente ou escreva sua justificativa..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white resize-none"
              />
            </div>

            <div className="md:col-span-2 flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddingNew(false)}
                className="px-4 py-2 bg-slate-200 text-slate-700 font-semibold rounded-lg"
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

      {/* Item List */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 space-y-3">
          <LayoutGrid className="h-10 w-10 text-slate-300 mx-auto" />
          <p className="text-sm font-semibold text-slate-700">Nenhum item neste requisito</p>
          <p className="text-xs text-slate-400">
            Anexe PDFs na etapa anterior para extração automática ou adicione itens manualmente.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredItems.map((item) => {
            const isExpanded = expandedItemId === item.id;
            const dirInfo = DIRECTIVE_NAMES[item.directiveId] || DIRECTIVE_NAMES['requisito_1'];

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition hover:border-slate-300"
              >
                {/* Header Row */}
                <div className="p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-bold uppercase tracking-wider">
                        Item {item.categoryCode}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 truncate">
                        {dirInfo?.title.split('-')[0]}
                      </span>
                      {item.complianceStatus === 'valid' ? (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-semibold flex items-center gap-1 border border-emerald-200">
                          <CheckCircle className="h-3 w-3" /> Válido
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 text-[10px] font-semibold flex items-center gap-1 border border-amber-200">
                          <AlertTriangle className="h-3 w-3" /> Requer Ajuste
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900 leading-snug">{item.title}</h3>
                      <button
                        type="button"
                        onClick={() => copyFieldText(item.title, item.id + '_title')}
                        className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded transition shrink-0 cursor-pointer"
                        title="Copiar Título do Item"
                      >
                        {copiedFieldKey === item.id + '_title' ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                      <span>Emissor: <strong className="text-slate-700">{item.issuer}</strong></span>
                      {item.workloadHours && (
                        <span>Carga Horária: <strong className="text-slate-700">{item.workloadHours}h</strong></span>
                      )}
                      {item.startDate && (
                        <span>Período: <strong className="text-slate-700">{item.startDate} {item.endDate ? `a ${item.endDate}` : ''}</strong></span>
                      )}
                    </div>
                  </div>

                  {/* Score & Main Quick Actions */}
                  <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <div className="text-left md:text-right">
                      <span className="text-[10px] uppercase text-slate-400 block font-semibold">Pontuação</span>
                      <span className="text-base font-black text-indigo-900">
                        {item.totalScore.toFixed(1)} <span className="text-xs font-normal text-slate-500">pts</span>
                      </span>
                      <span className="text-[10px] text-slate-400 block">
                        ({item.quantity} x {item.unitPoints} pt)
                      </span>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      {/* Copy Calculator Specs */}
                      <button
                        type="button"
                        onClick={() => handleCopyParams(item)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1 border ${
                          copiedId === item.id
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-900 border-slate-200'
                        }`}
                        title="Copiar dados para a Calculadora RSC"
                      >
                        {copiedId === item.id ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5 text-indigo-600" />}
                        <span>{copiedId === item.id ? 'Copiado!' : 'Copiar Dados'}</span>
                      </button>

                      {/* Expand Details */}
                      <button
                        type="button"
                        onClick={() => setExpandedItemId(isExpanded ? null : item.id)}
                        className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
                        title="Ver Justificativa e Detalhes"
                      >
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Details Section */}
                {isExpanded && (
                  <div className="p-4 md:p-5 bg-slate-50 border-t border-slate-200 space-y-4">
                    {/* Category Title */}
                    <div className="bg-white border border-slate-200 rounded-xl p-3.5 text-xs flex items-center justify-between gap-3">
                      <div>
                        <span className="text-slate-400 font-semibold block text-[10px] uppercase tracking-wider">
                          Categoria da Tabela Oficial do RSC (Anexo I a VI)
                        </span>
                        <p className="font-bold text-slate-900 mt-0.5 text-sm">
                          {item.categoryCode} - {item.categoryName}
                        </p>
                        <p className="text-slate-500 text-[11px] mt-0.5">
                          Base Regulamentar: <strong className="text-slate-700">{item.regulatoryBasis}</strong>
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyFieldText(`${item.categoryCode} - ${item.categoryName}`, item.id + '_cat')}
                        className="px-2.5 py-1 text-[11px] font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition flex items-center gap-1 shrink-0 cursor-pointer"
                        title="Copiar Categoria"
                      >
                        {copiedFieldKey === item.id + '_cat' ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                        <span>{copiedFieldKey === item.id + '_cat' ? 'Copiado!' : 'Copiar'}</span>
                      </button>
                    </div>

                    {/* Dados Específicos do Documento (Solicitados pelo Usuário) */}
                    <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 text-xs space-y-2.5">
                      <h4 className="font-bold text-indigo-950 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                        <FileText className="h-4 w-4 text-indigo-600" />
                        Dados de Identificação do Documento em PDF
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
                        {/* Número SEI */}
                        <div className="bg-white p-2.5 rounded-lg border border-indigo-100/80 shadow-2xs flex items-center justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">Número de Identificação (SEI)</span>
                            <span className="font-bold text-slate-800 text-xs block truncate">{item.numeroIdentificacaoSei || 'Não informado'}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => copyFieldText(item.numeroIdentificacaoSei || '', item.id + '_sei')}
                            disabled={!item.numeroIdentificacaoSei}
                            className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition shrink-0 cursor-pointer disabled:opacity-30 disabled:hover:bg-transparent"
                            title="Copiar Número SEI"
                          >
                            {copiedFieldKey === item.id + '_sei' ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                          </button>
                        </div>

                        {/* Órgão / Unidade Emissora */}
                        <div className="bg-white p-2.5 rounded-lg border border-indigo-100/80 shadow-2xs flex items-center justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">Órgão / Unidade Emissora</span>
                            <span className="font-bold text-slate-800 text-xs block truncate">{item.orgaoEmissor || item.issuer || 'UFCG'}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => copyFieldText(item.orgaoEmissor || item.issuer || 'UFCG', item.id + '_emissor')}
                            className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition shrink-0 cursor-pointer"
                            title="Copiar Órgão Emissor"
                          >
                            {copiedFieldKey === item.id + '_emissor' ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                          </button>
                        </div>

                        {/* Data do Documento */}
                        <div className="bg-white p-2.5 rounded-lg border border-indigo-100/80 shadow-2xs flex items-center justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">Data do Documento</span>
                            <span className="font-bold text-slate-800 text-xs block truncate">{item.dataDocumento || 'Não informada'}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => copyFieldText(item.dataDocumento || '', item.id + '_data')}
                            disabled={!item.dataDocumento}
                            className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition shrink-0 cursor-pointer disabled:opacity-30 disabled:hover:bg-transparent"
                            title="Copiar Data do Documento"
                          >
                            {copiedFieldKey === item.id + '_data' ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                          </button>
                        </div>

                        {/* Período de Vigência */}
                        <div className="bg-white p-2.5 rounded-lg border border-indigo-100/80 shadow-2xs flex items-center justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">Período de Vigência</span>
                            <span className="font-bold text-slate-800 text-xs block truncate">{item.periodoVigencia || 'Não aplicável'}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => copyFieldText(item.periodoVigencia || '', item.id + '_vigencia')}
                            disabled={!item.periodoVigencia}
                            className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition shrink-0 cursor-pointer disabled:opacity-30 disabled:hover:bg-transparent"
                            title="Copiar Período de Vigência"
                          >
                            {copiedFieldKey === item.id + '_vigencia' ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                          </button>
                        </div>

                        {/* Finalidade do Documento */}
                        <div className="bg-white p-2.5 rounded-lg border border-indigo-100/80 shadow-2xs md:col-span-2 flex items-center justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">Finalidade do Documento</span>
                            <span className="font-semibold text-slate-800 text-xs block">{item.finalidadeDocumento || 'Comprovação das atividades para pontuação de RSC'}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => copyFieldText(item.finalidadeDocumento || 'Comprovação das atividades para pontuação de RSC', item.id + '_finalidade')}
                            className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition shrink-0 cursor-pointer"
                            title="Copiar Finalidade"
                          >
                            {copiedFieldKey === item.id + '_finalidade' ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Justificativa Fundamentada Geral */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                          <FileText className="h-3.5 w-3.5 text-indigo-600" />
                          Justificativa Fundamentada Geral (Processo SEI)
                        </label>

                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => handleTriggerRegen(item)}
                            disabled={loadingRegenId === item.id}
                            className="px-2.5 py-1 text-[11px] font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-md border border-indigo-200 transition flex items-center gap-1 cursor-pointer"
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
                                : 'bg-slate-800 text-white hover:bg-slate-700'
                            }`}
                          >
                            {copiedJustificationId === item.id ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                            <span>{copiedJustificationId === item.id ? 'Copiado!' : 'Copiar Texto'}</span>
                          </button>
                        </div>
                      </div>

                      <div className="p-3.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 leading-relaxed font-serif whitespace-pre-line shadow-2xs">
                        {item.justificationText || 'Sem justificativa gerada.'}
                      </div>
                    </div>

                    {/* Três Blocos de Texto OBRIGATÓRIOS (A, B, C) */}
                    <div className="space-y-3 pt-2 border-t border-slate-200">
                      <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center justify-between">
                        <span>Textos Complementares Fundamentados (Conforme GEM RSC)</span>
                        <span className="text-[10px] text-slate-500 font-normal">Formatados para formulário SEI</span>
                      </h4>

                      {/* Bloco A: Experiência Profissional */}
                      <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                            <span className="px-1.5 py-0.5 bg-indigo-100 text-indigo-800 rounded font-black text-[10px]">A</span>
                            Experiência Profissional e Individual Vinculada ao Requisito
                          </span>
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-mono font-bold ${
                              (item.experienciaProfissionalTexto?.length || 0) > 1500 ? 'text-rose-600' : 'text-slate-400'
                            }`}>
                              {item.experienciaProfissionalTexto?.length || 0} / 1.500 caract.
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText(item.experienciaProfissionalTexto || '');
                                setCopiedId(item.id + '_A');
                                setTimeout(() => setCopiedId(null), 2000);
                              }}
                              className="px-2 py-0.5 text-[10px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded transition flex items-center gap-1 cursor-pointer"
                            >
                              {copiedId === item.id + '_A' ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                              <span>{copiedId === item.id + '_A' ? 'Copiado!' : 'Copiar A'}</span>
                            </button>
                          </div>
                        </div>
                        <p className="text-xs text-slate-700 font-serif leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200/80 whitespace-pre-line">
                          {item.experienciaProfissionalTexto || 'Aguardando geração do texto de experiência profissional.'}
                        </p>
                      </div>

                      {/* Bloco B: Diferencial da Atuação */}
                      <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                            <span className="px-1.5 py-0.5 bg-indigo-100 text-indigo-800 rounded font-black text-[10px]">B</span>
                            Diferencial da Atuação
                          </span>
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-mono font-bold ${
                              (item.diferencialAtuacaoTexto?.length || 0) > 600 ? 'text-rose-600' : 'text-slate-400'
                            }`}>
                              {item.diferencialAtuacaoTexto?.length || 0} / 600 caract.
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText(item.diferencialAtuacaoTexto || '');
                                setCopiedId(item.id + '_B');
                                setTimeout(() => setCopiedId(null), 2000);
                              }}
                              className="px-2 py-0.5 text-[10px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded transition flex items-center gap-1 cursor-pointer"
                            >
                              {copiedId === item.id + '_B' ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                              <span>{copiedId === item.id + '_B' ? 'Copiado!' : 'Copiar B'}</span>
                            </button>
                          </div>
                        </div>
                        <p className="text-xs text-slate-700 font-serif leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200/80 whitespace-pre-line">
                          {item.diferencialAtuacaoTexto || 'Aguardando geração do texto de diferencial da atuação.'}
                        </p>
                      </div>

                      {/* Bloco C: Impacto dos Saberes */}
                      <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                            <span className="px-1.5 py-0.5 bg-indigo-100 text-indigo-800 rounded font-black text-[10px]">C</span>
                            Impacto dos Saberes no Cargo e na Instituição
                          </span>
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-mono font-bold ${
                              (item.impactosSaberesTexto?.length || 0) > 600 ? 'text-rose-600' : 'text-slate-400'
                            }`}>
                              {item.impactosSaberesTexto?.length || 0} / 600 caract.
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText(item.impactosSaberesTexto || '');
                                setCopiedId(item.id + '_C');
                                setTimeout(() => setCopiedId(null), 2000);
                              }}
                              className="px-2 py-0.5 text-[10px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded transition flex items-center gap-1 cursor-pointer"
                            >
                              {copiedId === item.id + '_C' ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                              <span>{copiedId === item.id + '_C' ? 'Copiado!' : 'Copiar C'}</span>
                            </button>
                          </div>
                        </div>
                        <p className="text-xs text-slate-700 font-serif leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200/80 whitespace-pre-line">
                          {item.impactosSaberesTexto || 'Aguardando geração do texto de impacto dos saberes.'}
                        </p>
                      </div>
                    </div>

                    {/* Compliance Notes */}
                    {item.complianceNotes && item.complianceNotes.length > 0 && (
                      <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-[11px] text-amber-900 space-y-1">
                        <span className="font-bold block">Notas de Conformidade / Checklist Documental:</span>
                        <ul className="list-disc pl-4 space-y-0.5 text-amber-800">
                          {item.complianceNotes.map((note, idx) => (
                            <li key={idx}>{note}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Actions: Edit or Delete Item */}
                    <div className="flex justify-end space-x-2 pt-2 border-t border-slate-200/80">
                      <button
                        type="button"
                        onClick={() => setIsEditingItem(item)}
                        className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition flex items-center gap-1"
                      >
                        <Edit2 className="h-3.5 w-3.5 text-slate-600" />
                        <span>Editar Item</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onDeleteItem(item.id)}
                        className="px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition flex items-center gap-1"
                      >
                        <Trash2 className="h-3.5 w-3.5 text-rose-600" />
                        <span>Excluir</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Modal for Editing Item */}
      {isEditingItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
              Editar Item da Calculadora RSC
            </h3>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Título da Atividade</label>
                <input
                  type="text"
                  required
                  value={isEditingItem.title}
                  onChange={(e) => setIsEditingItem({ ...isEditingItem, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Órgão Emissor</label>
                <input
                  type="text"
                  required
                  value={isEditingItem.issuer}
                  onChange={(e) => setIsEditingItem({ ...isEditingItem, issuer: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Requisito</label>
                  <select
                    value={isEditingItem.directiveId}
                    onChange={(e) =>
                      setIsEditingItem({ ...isEditingItem, directiveId: e.target.value as RSCDirectiveId })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  >
                    <option value="requisito_1">Requisito I (GTs/Comissões)</option>
                    <option value="requisito_2">Requisito II (Projetos/Gestão)</option>
                    <option value="requisito_3">Requisito III (Premiações)</option>
                    <option value="requisito_4">Requisito IV (Resp. Técnica)</option>
                    <option value="requisito_5">Requisito V (Funções CD/FG)</option>
                    <option value="requisito_6">Requisito VI (Produção/Difusão)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Código Categoria</label>
                  <input
                    type="text"
                    value={isEditingItem.categoryCode}
                    onChange={(e) => setIsEditingItem({ ...isEditingItem, categoryCode: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Pontos Unitários</label>
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
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Quantidade</label>
                  <input
                    type="number"
                    step="0.5"
                    value={isEditingItem.quantity}
                    onChange={(e) => {
                      const qty = parseFloat(e.target.value) || 0;
                      setIsEditingItem({
                        ...isEditingItem,
                        quantity: qty,
                        totalScore: isEditingItem.unitPoints * qty,
                      });
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Texto da Justificativa</label>
                <textarea
                  rows={4}
                  value={isEditingItem.justificationText}
                  onChange={(e) => setIsEditingItem({ ...isEditingItem, justificationText: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg resize-none font-serif"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditingItem(null)}
                  className="px-4 py-2 bg-slate-200 text-slate-700 font-semibold rounded-lg"
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

      {/* Next Step Button */}
      <div className="flex justify-end pt-4">
        <button
          type="button"
          onClick={onNextStep}
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs shadow-sm hover:shadow transition cursor-pointer"
        >
          Avançar para Relatório Final e Conformidade
        </button>
      </div>
    </div>
  );
};
