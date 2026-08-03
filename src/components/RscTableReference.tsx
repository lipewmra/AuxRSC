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
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 md:p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Award className="h-4 w-4 text-indigo-600" />
            Tabela Oficial de Níveis do RSC-PCCTAE
          </h3>
          <p className="text-xs text-slate-500">
            Escolaridade, pontuação mínima, critérios específicos e percentuais do Incentivo à Qualificação (IQ).
          </p>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100 self-start sm:self-auto">
          Oficial MEC / UFCG
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
              <th className="py-2.5 px-3">Nível</th>
              <th className="py-2.5 px-3">Escolaridade do Servidor</th>
              <th className="py-2.5 px-3 text-center">Pontuação Mínima</th>
              <th className="py-2.5 px-3 text-center">Critérios Específicos Mínimos</th>
              <th className="py-2.5 px-3">Requisito Adicional</th>
              <th className="py-2.5 px-3 text-center">Percentual do IQ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
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
                      ? 'bg-indigo-50/80 font-medium text-slate-900 border-l-4 border-l-indigo-600'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <td className="py-3 px-3 font-bold text-slate-900 whitespace-nowrap flex items-center gap-1.5">
                    {isSelected && <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600 shrink-0" />}
                    <span>{req.level}</span>
                  </td>
                  <td className="py-3 px-3">{req.escolaridade}</td>
                  <td 
                    className="py-3 px-3 text-center font-bold text-indigo-700 whitespace-nowrap"
                    style={{
                      color:
                        levelKey === 'RSC-PCCTAE IV'
                          ? '#d7a72d'
                          : levelKey === 'RSC-PCCTAE V'
                          ? '#d79d2d'
                          : levelKey === 'RSC-PCCTAE VI'
                          ? '#d7ac2d'
                          : '#d7a22d'
                    }}
                  >
                    {req.minTotalScore} pontos
                  </td>
                  <td className="py-3 px-3 text-center font-medium whitespace-nowrap">
                    {req.criteriosTexto}
                  </td>
                  <td className="py-3 px-3 text-[11px] leading-snug text-slate-600">
                    {req.requisitoAdicional}
                  </td>
                  <td className="py-3 px-3 text-center font-bold text-emerald-700 whitespace-nowrap">
                    {req.percentualIQ}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-500 flex items-start gap-2">
        <Info className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
        <span>
          Clique em uma linha da tabela acima para selecionar o nível RSC almejado e atualizar automaticamente as metas na calculadora.
        </span>
      </div>
    </div>
  );
};
