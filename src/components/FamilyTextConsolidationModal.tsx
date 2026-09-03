import React, { useState, useEffect } from 'react';
import { X, Sparkles, Check, Copy, AlertCircle, RefreshCw, Layers } from 'lucide-react';
import { RSCItem, UserProfile } from '../types';
import {
  ConsolidatedFamilyTexts,
  consolidateFamilyTextsLocal,
  consolidateFamilyTextsWithAI,
} from '../utils/textConsolidation';

interface FamilyTextConsolidationModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: RSCItem[];
  userProfile?: UserProfile;
  onApply: (texts: ConsolidatedFamilyTexts) => void;
}

export const FamilyTextConsolidationModal: React.FC<FamilyTextConsolidationModalProps> = ({
  isOpen,
  onClose,
  items,
  userProfile,
  onApply,
}) => {
  const [blocoA, setBlocoA] = useState('');
  const [blocoB, setBlocoB] = useState('');
  const [blocoC, setBlocoC] = useState('');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Inicializa com consolidação local ao abrir
  useEffect(() => {
    if (isOpen && items.length > 0) {
      const initial = consolidateFamilyTextsLocal(items, userProfile);
      setBlocoA(initial.experienciaProfissionalTexto);
      setBlocoB(initial.diferencialAtuacaoTexto);
      setBlocoC(initial.impactosSaberesTexto);
    }
  }, [isOpen, items, userProfile]);

  if (!isOpen || items.length === 0) return null;

  const categoryCode = items[0]?.categoryCode || 'Item';
  const categoryName = items[0]?.categoryName || 'Atividades RSC';
  const directiveId = items[0]?.directiveId || 'Requisito';

  const handleGenerateAI = async () => {
    setIsGeneratingAI(true);
    try {
      const result = await consolidateFamilyTextsWithAI(items, userProfile);
      setBlocoA(result.experienciaProfissionalTexto);
      setBlocoB(result.diferencialAtuacaoTexto);
      setBlocoC(result.impactosSaberesTexto);
    } catch (err) {
      console.error('Erro ao gerar com IA:', err);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSave = () => {
    onApply({
      experienciaProfissionalTexto: blocoA,
      diferencialAtuacaoTexto: blocoB,
      impactosSaberesTexto: blocoC,
      sourceCount: items.length,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-150 flex flex-col max-h-[90vh] transition-colors duration-200">
        {/* Header */}
        <div className="bg-slate-900 dark:bg-slate-950 text-white px-6 py-4 flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-xl bg-indigo-600/40 border border-indigo-400/30 flex items-center justify-center shrink-0">
              <Layers className="h-5 w-5 text-indigo-300" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                União e Consolidação dos Textos Complementares A, B e C
              </h3>
              <p className="text-xs text-slate-300 dark:text-slate-400">
                Família do Critério <strong className="text-amber-300">{categoryCode}</strong> • {categoryName} ({items.length} comprovantes unidos)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer"
            title="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Action Banner */}
        <div className="bg-indigo-50 dark:bg-indigo-950/40 border-b border-indigo-100 dark:border-indigo-900/60 px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 shrink-0">
          <p className="text-xs text-indigo-900 dark:text-indigo-200 leading-tight">
            Os {items.length} comprovantes desta mesma família foram unificados em uma narrativa coesa padrão SEI, evitando repetições e respeitando os limites regulamentares.
          </p>
          <button
            type="button"
            onClick={handleGenerateAI}
            disabled={isGeneratingAI}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition shadow-xs cursor-pointer shrink-0 disabled:opacity-50"
          >
            {isGeneratingAI ? (
              <>
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                <span>Refinando com IA...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5" />
                <span>Harmonizar com IA</span>
              </>
            )}
          </button>
        </div>

        {/* Content with 3 Text Blocks */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1">
          {/* Comprovantes da Família Tag List */}
          <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-3">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase block mb-1.5">
              Comprovantes Integrados Nesta Família ({items.length})
            </span>
            <div className="flex flex-wrap gap-1.5">
              {items.map((it, idx) => (
                <span
                  key={it.id}
                  className="bg-white dark:bg-slate-850 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-[11px] px-2.5 py-1 rounded-lg font-medium shadow-2xs truncate max-w-[280px]"
                  title={it.title}
                >
                  <strong className="text-indigo-700 dark:text-indigo-400">#{idx + 1}</strong> {it.title} ({it.documentName || 'PDF'})
                </span>
              ))}
            </div>
          </div>

          {/* Bloco A */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <span className="h-5 w-5 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-[10px] font-black">
                  A
                </span>
                Experiência Profissional e Individual Vinculada ao Requisito
              </label>
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-mono font-bold ${
                    blocoA.length > 1500 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {blocoA.length} / 1.500 caracteres
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(blocoA, 'A')}
                  className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 p-1 text-xs transition"
                  title="Copiar texto A"
                >
                  {copiedField === 'A' ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>
            <textarea
              rows={5}
              value={blocoA}
              onChange={(e) => setBlocoA(e.target.value)}
              className="w-full text-xs text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 leading-relaxed font-sans"
              placeholder="Síntese cronológica integrada de todas as atividades da família..."
            />
          </div>

          {/* Bloco B */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <span className="h-5 w-5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 flex items-center justify-center text-[10px] font-black">
                  B
                </span>
                Diferencial da Atuação
              </label>
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-mono font-bold ${
                    blocoB.length > 600 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {blocoB.length} / 600 caracteres
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(blocoB, 'B')}
                  className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 p-1 text-xs transition"
                  title="Copiar texto B"
                >
                  {copiedField === 'B' ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>
            <textarea
              rows={3}
              value={blocoB}
              onChange={(e) => setBlocoB(e.target.value)}
              className="w-full text-xs text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 leading-relaxed font-sans"
              placeholder="Diferencial e relevância gerada pelo conjunto de comprovantes..."
            />
          </div>

          {/* Bloco C */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <span className="h-5 w-5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center text-[10px] font-black">
                  C
                </span>
                Impacto dos Saberes no Cargo e na Instituição
              </label>
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-mono font-bold ${
                    blocoC.length > 600 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {blocoC.length} / 600 caracteres
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(blocoC, 'C')}
                  className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 p-1 text-xs transition"
                  title="Copiar texto C"
                >
                  {copiedField === 'C' ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>
            <textarea
              rows={3}
              value={blocoC}
              onChange={(e) => setBlocoC(e.target.value)}
              className="w-full text-xs text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 leading-relaxed font-sans"
              placeholder="Impactos nos processos, rotina administrativa e governança..."
            />
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 px-6 py-3.5 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition cursor-pointer shadow-xs inline-flex items-center gap-1.5"
          >
            <Check className="h-4 w-4" />
            <span>Aplicar Textos Unidos aos {items.length} Itens da Família</span>
          </button>
        </div>
      </div>
    </div>
  );
};
