import React, { useState } from 'react';
import { X, Copy, Check, FileText, Quote, ShieldCheck } from 'lucide-react';
import { RSCItem } from '../types';

interface EvidenceQuoteModalProps {
  item: RSCItem | null;
  onClose: () => void;
}

export const EvidenceQuoteModal: React.FC<EvidenceQuoteModalProps> = ({ item, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!item) return null;

  const quoteText = item.trechoComprobatorioExato?.trim();

  const handleCopy = () => {
    if (!quoteText) return;
    navigator.clipboard.writeText(quoteText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5 min-w-0">
            <div className="h-8 w-8 rounded-lg bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center shrink-0">
              <Quote className="h-4 w-4 text-indigo-300" />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-sm sm:text-base text-white truncate">
                Trecho Comprobatório Exato (Evidência Documental)
              </h3>
              <p className="text-xs text-slate-300 truncate">
                Citação textual extraída diretamente do PDF para comprovação legal
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer"
            title="Fechar janela"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Metadata Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-start space-x-2">
              <FileText className="h-4 w-4 text-slate-500 shrink-0 mt-0.5" />
              <div className="min-w-0">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Arquivo Analisado</span>
                <span className="font-semibold text-slate-800 break-all text-xs">
                  {item.documentName || 'Documento Anexo'}
                </span>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-start space-x-2">
              <ShieldCheck className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
              <div className="min-w-0">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Critério / Item</span>
                <span className="font-semibold text-slate-800 truncate block text-xs">
                  {item.categoryCode} - {item.categoryName}
                </span>
              </div>
            </div>
          </div>

          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Atividade Mapeada
            </span>
            <p className="text-xs sm:text-sm font-semibold text-slate-900 bg-amber-50/60 border border-amber-200 rounded-xl p-3">
              {item.title}
            </p>
          </div>

          {/* Quote Block */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                <Quote className="h-3.5 w-3.5 text-indigo-600" /> Citação Literal Extraída do PDF
              </span>
              {quoteText && (
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center space-x-1 text-xs text-indigo-600 hover:text-indigo-800 font-semibold px-2 py-1 rounded-md hover:bg-indigo-50 transition cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copiar Trecho</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {quoteText ? (
              <div className="bg-slate-900 text-slate-100 rounded-xl p-4 font-mono text-xs leading-relaxed border border-slate-800 shadow-inner relative group select-text whitespace-pre-wrap max-h-60 overflow-y-auto">
                {quoteText}
              </div>
            ) : (
              <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-xl p-4 text-xs">
                Nenhum trecho textual exato foi registrado para este item (comum em itens cadastrados manualmente ou extraídos de documentos sem texto legível).
              </div>
            )}
          </div>

          <div className="bg-indigo-50/70 border border-indigo-200 rounded-xl p-3 text-[11px] text-indigo-900 leading-relaxed flex items-start gap-2">
            <span className="text-base">⚖️</span>
            <div>
              <strong>Segurança Jurídica (Regra do Grounding Rígido):</strong> Este trecho serve de subsídio probatório direto para a Comissão de Avaliação do RSC, comprovando que a atividade não foi inventada ou presumida.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-5 py-3 flex items-center justify-end space-x-2">
          {quoteText && (
            <button
              type="button"
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition cursor-pointer inline-flex items-center gap-1.5"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copiado para a Área de Transferência' : 'Copiar Trecho'}
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition cursor-pointer shadow-xs"
          >
            Fechar Janela
          </button>
        </div>
      </div>
    </div>
  );
};
