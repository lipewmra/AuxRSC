import React from 'react';
import { RSC_REQUIREMENTS } from '../data/rscStructure';
import { Award, CheckCircle2, Info } from 'lucide-react';
import { RSCLevel } from '../types';

interface RscTableReferenceProps {
  selectedLevel?: RSCLevel;
  onSelectLevel?: (level: RSCLevel) => void;
}

export const RscTableReference: React.FC<RscTableReferenceProps> = ({
  selectedLevel,
  onSelectLevel,
}) => {
  const levels: RSCLevel[] = [
    'RSC-PCCTAE I',
    'RSC-PCCTAE II',
    'RSC-PCCTAE III',
    'RSC-PCCTAE IV',
    'RSC-PCCTAE V',
    'RSC-PCCTAE VI',
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-5 md:p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            Tabela Oficial de Níveis do RSC-PCCTAE
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Escolaridade, pontuação mínima, critérios específicos e percentuais do Incentivo à Qualificação (IQ).
          </p>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800 self-start sm:self-auto">
          Oficial MEC / UFCG
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold uppercase text-[10px] tracking-wider">
              <th className="py-2.5 px-3">Nível</th>
              <th className="py-2.5 px-3">Escolaridade do Servidor</th>
              <th className="py-2.5 px-3 text-center">Pontuação Mínima</th>
              <th className="py-2.5 px-3 text-center">Critérios Específicos Mínimos</th>
              <th className="py-2.5 px-3">Requisito Adicional</th>
              <th className="py-2.5 px-3 text-center">Percentual do IQ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {levels.map((levelKey) => {
              const req = RSC_REQUIREMENTS[levelKey];
              if (!req) return null;
              const isSelected = selectedLevel === levelKey;

              return (
                <tr
                  key={levelKey}
                  onClick={() => onSelectLevel && onSelectLevel(levelKey)}
                  className={`transition cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-50/80 dark:bg-indigo-950/60 font-medium text-slate-900 dark:text-white border-l-4 border-l-indigo-600 dark:border-l-indigo-400'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <td className="py-3 px-3 font-bold text-slate-900 dark:text-white whitespace-nowrap flex items-center gap-1.5">
                    {isSelected && <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />}
                    <span>{req.level}</span>
                  </td>
                  <td className="py-3 px-3">{req.escolaridade}</td>
                  <td 
                    className="py-3 px-3 text-center font-bold text-indigo-700 dark:text-[#EAA816] whitespace-nowrap"
                  >
                    {req.minTotalScore} pontos
                  </td>
                  <td className="py-3 px-3 text-center font-medium whitespace-nowrap">
                    {req.criteriosTexto}
                  </td>
                  <td className="py-3 px-3 text-[11px] leading-snug text-slate-600 dark:text-slate-400">
                    {req.requisitoAdicional}
                  </td>
                  <td className="py-3 px-3 text-center font-bold text-emerald-700 dark:text-emerald-400 whitespace-nowrap">
                    {req.percentualIQ}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-start gap-2">
        <Info className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
        <span>
          Clique em uma linha da tabela acima para selecionar o nível RSC almejado e atualizar automaticamente as metas na calculadora.
        </span>
      </div>
    </div>
  );
};
