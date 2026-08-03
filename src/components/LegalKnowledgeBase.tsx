import React, { useState } from 'react';
import { LEGAL_SOURCES } from '../data/rscStructure';
import { ShieldCheck, ExternalLink, Search, BookOpen, X, HelpCircle, FileCheck, Table } from 'lucide-react';
import { RscTableReference } from './RscTableReference';

interface LegalKnowledgeBaseProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LegalKnowledgeBase: React.FC<LegalKnowledgeBaseProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'table' | 'sources'>('table');
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filtered = LEGAL_SOURCES.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.badge.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-4xl w-full p-6 space-y-4 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Tabela Oficial, Legislação e Normas do RSC-PCCTAE
              </h2>
              <p className="text-xs text-slate-500">
                Métricas oficiais do RSC-PCCTAE (Legislação, Reitoria e Gestão de Pessoas)
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
        <div className="flex border-b border-slate-200 space-x-4 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('table')}
            className={`pb-2 flex items-center gap-1.5 border-b-2 transition ${
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
            className={`pb-2 flex items-center gap-1.5 border-b-2 transition ${
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
              {filtered.map((item, index) => (
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
