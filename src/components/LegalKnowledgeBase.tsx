import React, { useState } from 'react';
import { LEGAL_SOURCES, STANDARD_CATEGORIES } from '../data/rscStructure';
import { ShieldCheck, ExternalLink, Search, BookOpen, X, HelpCircle, FileCheck, Table, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { RscTableReference } from './RscTableReference';

interface LegalKnowledgeBaseProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LegalKnowledgeBase: React.FC<LegalKnowledgeBaseProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'table' | 'guide' | 'sources'>('guide');
  const [search, setSearch] = useState('');
  const [filterReq, setFilterReq] = useState<string>('all');

  if (!isOpen) return null;

  const filteredSources = LEGAL_SOURCES.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.badge.toLowerCase().includes(search.toLowerCase())
  );

  const filteredCategories = STANDARD_CATEGORIES.filter((cat) => {
    const matchesReq = filterReq === 'all' || cat.directiveId === filterReq;
    const matchesSearch =
      !search ||
      cat.code.toLowerCase().includes(search.toLowerCase()) ||
      cat.title.toLowerCase().includes(search.toLowerCase()) ||
      cat.description.toLowerCase().includes(search.toLowerCase()) ||
      (cat.documentosComprovacao && cat.documentosComprovacao.toLowerCase().includes(search.toLowerCase())) ||
      (cat.exemplos && cat.exemplos.toLowerCase().includes(search.toLowerCase()));
    return matchesReq && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-5xl w-full p-6 space-y-4 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Guia Oficial de Mapeamento, Documentos e Legislação do RSC-PCCTAE
              </h2>
              <p className="text-xs text-slate-500">
                Regras oficiais do RSC-PCCTAE (Anexos I a VI - Documentos de comprovação, exemplos e observações)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-slate-200 space-x-4 text-xs font-semibold overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('guide')}
            className={`pb-2 flex items-center gap-1.5 border-b-2 transition whitespace-nowrap ${
              activeTab === 'guide'
                ? 'border-indigo-600 text-indigo-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <FileCheck className="h-4 w-4" />
            <span>Guia de Documentos por Item (Anexos I-VI)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('table')}
            className={`pb-2 flex items-center gap-1.5 border-b-2 transition whitespace-nowrap ${
              activeTab === 'table'
                ? 'border-indigo-600 text-indigo-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Table className="h-4 w-4" />
            <span>Tabela de Níveis e Métricas</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('sources')}
            className={`pb-2 flex items-center gap-1.5 border-b-2 transition whitespace-nowrap ${
              activeTab === 'sources'
                ? 'border-indigo-600 text-indigo-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>Legislação e Portarias</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'table' ? (
          <div className="overflow-y-auto flex-1 pr-1">
            <RscTableReference />
          </div>
        ) : activeTab === 'guide' ? (
          <div className="space-y-4 overflow-y-auto flex-1 pr-1">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="h-4 w-4 text-slate-400 absolute left-3.5 top-2.5" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Pesquisar por item, documento de comprovação, portaria ou exemplo (ex: I.1, SEI, portaria, PAD)..."
                  className="w-full pl-10 pr-4 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <select
                value={filterReq}
                onChange={(e) => setFilterReq(e.target.value)}
                className="py-2 px-3 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 bg-white font-medium text-slate-700"
              >
                <option value="all">Todos os 6 Requisitos (I a VI)</option>
                <option value="requisito_1">Requisito I - Conselhos, Comissões e Representação</option>
                <option value="requisito_2">Requisito II - Projetos, Manuais e Eventos</option>
                <option value="requisito_3">Requisito III - Premiações</option>
                <option value="requisito_4">Requisito IV - Sistemas, Contratos e Chefias</option>
                <option value="requisito_5">Requisito V - Cargos (CD) e Funções (FG)</option>
                <option value="requisito_6">Requisito VI - Patentes, Artigos, Livros, Cursos e Pandemia</option>
              </select>
            </div>

            {/* List of Categories */}
            <div className="space-y-3">
              {filteredCategories.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs">
                  Nenhum item encontrado com os termos pesquisados.
                </div>
              ) : (
                filteredCategories.map((cat) => (
                  <div
                    key={cat.code}
                    className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5 hover:border-indigo-300 transition"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2">
                      <div className="flex items-center space-x-2">
                        <span className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-bold text-xs">
                          Item {cat.code}
                        </span>
                        <h3 className="text-xs font-bold text-slate-900">{cat.title}</h3>
                      </div>
                      <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100 self-start sm:self-auto">
                        {cat.legalRef}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600">{cat.description}</p>

                    {cat.documentosComprovacao && (
                      <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-lg text-xs space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                          <FileText className="h-3.5 w-3.5 text-emerald-600" />
                          <span>Documentos de Comprovação Exigidos:</span>
                        </div>
                        <p className="text-emerald-800 leading-relaxed text-[11px]">
                          {cat.documentosComprovacao}
                        </p>
                      </div>
                    )}

                    {cat.exemplos && (
                      <div className="p-2.5 bg-blue-50/70 border border-blue-200 rounded-lg text-xs space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-blue-900">
                          <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />
                          <span>Exemplos Práticos Aceitos:</span>
                        </div>
                        <p className="text-blue-800 leading-relaxed text-[11px]">{cat.exemplos}</p>
                      </div>
                    )}

                    {cat.observacoes && (
                      <div className="p-2.5 bg-amber-50/70 border border-amber-200 rounded-lg text-xs space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-amber-900">
                          <AlertCircle className="h-3.5 w-3.5 text-amber-600" />
                          <span>Observações & Regras Específicas:</span>
                        </div>
                        <p className="text-amber-800 leading-relaxed text-[11px]">
                          {cat.observacoes}
                        </p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-3 overflow-y-auto flex-1 pr-1">
            {/* Search Input */}
            <div className="relative">
              <Search className="h-4 w-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Pesquisar por lei, portaria, tabela ou diretriz..."
                className="w-full pl-10 pr-4 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Links Grid */}
            <div className="space-y-3">
              {filteredSources.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 bg-slate-50 hover:bg-indigo-50/40 border border-slate-200 hover:border-indigo-200 rounded-xl transition group block"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 text-[10px] font-bold">
                          {item.badge}
                        </span>
                        <h3 className="text-xs font-bold text-slate-900 group-hover:text-indigo-900">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-[11px] text-slate-500">{item.description}</p>
                    </div>

                    <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 shrink-0 mt-1 transition" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 text-white font-semibold rounded-xl text-xs hover:bg-slate-800 transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
