import React from 'react';
import { Sparkles, CheckCircle2, Loader2, ShieldAlert } from 'lucide-react';

interface AnalysisProgressProps {
  currentFile?: string;
  progressCount: number;
  totalCount: number;
  statusMessage: string;
}

export const AnalysisProgress: React.FC<AnalysisProgressProps> = ({
  currentFile,
  progressCount,
  totalCount,
  statusMessage,
}) => {
  const percentage = totalCount > 0 ? Math.round((progressCount / totalCount) * 100) : 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-8 text-center max-w-2xl mx-auto space-y-6">
      <div className="mx-auto h-16 w-16 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center animate-pulse">
        <Sparkles className="h-8 w-8 text-indigo-600" />
      </div>

      <div>
        <h3 className="text-lg font-bold text-slate-900">
          Analisando Documentos PDF com a IA Gemini
        </h3>
        <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
          Processando textos, extraindo portarias, cargas horárias e enquadrando os comprovantes na tabela da Calculadora RSC (UFCG/MEC).
        </p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2 max-w-md mx-auto">
        <div className="flex justify-between text-xs font-semibold text-slate-700">
          <span>{statusMessage || 'Processando...'}</span>
          <span>{percentage}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200">
          <div
            className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-[11px] text-slate-400">
          Documento {progressCount} de {totalCount} {currentFile ? `• ${currentFile}` : ''}
        </p>
      </div>

      {/* Info Pills */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 text-left space-y-2">
        <div className="flex items-center space-x-2 text-indigo-900 font-semibold">
          <Loader2 className="h-4 w-4 animate-spin text-indigo-600" />
          <span>Verificações em andamento:</span>
        </div>
        <ul className="text-[11px] text-slate-500 space-y-1 pl-6 list-disc">
          <li>Classificação na Diretriz correta (Diretriz I, II ou III)</li>
          <li>Cálculo e estimativa de pontos e multiplicadores</li>
          <li>Geração do texto formal da Justificativa Fundamentada</li>
          <li>Validação de conformidade com a Lei 15.367/2026 e Portarias UFCG</li>
        </ul>
      </div>
    </div>
  );
};
