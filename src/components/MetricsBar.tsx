import React from 'react';
import { Target, Award, Layers, FileCheck2, TrendingUp, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { UserProfile, RSCItem } from '../types';
import { evaluateRSCCompliance } from '../data/rscStructure';

interface MetricsBarProps {
  userProfile: UserProfile;
  totalScore: number;
  rscItemCount: number;
  rscItems?: RSCItem[];
  theme?: 'light' | 'dark';
}

export const MetricsBar: React.FC<MetricsBarProps> = ({
  userProfile,
  totalScore,
  rscItemCount,
  rscItems = [],
  theme = 'light',
}) => {
  const targetLevel = userProfile.rscAlmejado || 'RSC-PCCTAE I';
  const evaluation = evaluateRSCCompliance(rscItems, targetLevel);
  const {
    minScore,
    criteriosAlcancados,
    minCriterios,
    isScoreSufficient,
    isCriteriosSufficient,
    validItemsCount,
  } = evaluation;

  // Percentage calculations for progress bars
  const scorePercent = Math.min(100, Math.round((totalScore / Math.max(1, minScore)) * 100));
  const criteriaPercent = Math.min(100, Math.round((criteriosAlcancados / Math.max(1, minCriterios)) * 100));
  const isFullyCompliant = isScoreSufficient && isCriteriosSufficient;

  // Determine IQ incentive percentage
  let iqPercent = '52%';
  if (targetLevel.includes('VI')) {
    iqPercent = '75%';
  } else if (targetLevel.includes('V')) {
    iqPercent = '52%';
  } else if (targetLevel.includes('IV')) {
    iqPercent = '30%';
  } else if (targetLevel.includes('III')) {
    iqPercent = '25%';
  } else if (targetLevel.includes('II')) {
    iqPercent = '15%';
  } else {
    iqPercent = '10%';
  }

  return (
    <div className="w-full bg-[#f8f7eb] dark:bg-slate-900 border-b border-[#EAA816]/30 dark:border-slate-800 py-3 sm:py-4 px-3 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto space-y-2.5">
        
        {/* Banner de Status Global de Conformidade (Compacto e Direto) */}
        <div 
          className={`px-3.5 py-1.5 rounded-xl border flex items-center justify-between gap-2 text-xs transition-all ${
            isFullyCompliant
              ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
              : 'bg-amber-50/80 dark:bg-amber-950/40 border-amber-300/80 dark:border-amber-800/80 text-amber-950 dark:text-amber-200'
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            {isFullyCompliant ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
            )}
            <span className="font-bold truncate">
              {isFullyCompliant
                ? 'Processo Apto ao Requerimento SEI: Pontuação mínima e critérios atingidos!'
                : `Acompanhamento do RSC: Faltam ${
                    !isScoreSufficient
                      ? `${(minScore - totalScore).toFixed(1)} pontos`
                      : ''
                  }${!isScoreSufficient && !isCriteriosSufficient ? ' e ' : ''}${
                    !isCriteriosSufficient
                      ? `${minCriterios - criteriosAlcancados} critério(s) distintos`
                      : ''
                  } para deferimento.`}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-[11px] shrink-0 font-semibold">
            <span className="text-slate-500 dark:text-slate-400">Dec. 13.048/2026</span>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <span className={isFullyCompliant ? 'text-emerald-700 dark:text-emerald-300 font-bold' : 'text-amber-700 dark:text-amber-300 font-bold'}>
              {isFullyCompliant ? '100% Homologado' : 'Em Preenchimento'}
            </span>
          </div>
        </div>

        {/* Grid com as 4 Métricas Principais em Destaque Absoluto: META, PONTUAÇÃO, CRITÉRIOS, ITENS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
          
          {/* 1. META */}
          <div 
            className="p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 shadow-xs flex flex-col justify-between bg-white dark:bg-slate-800/90 border-slate-200 dark:border-slate-700 hover:border-[#EAA816] dark:hover:border-[#EAA816] group"
          >
            <div>
              <div className="flex items-center justify-between gap-1.5 mb-2">
                <span className="text-[11px] sm:text-xs font-black tracking-wider uppercase text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <div className="p-1 rounded-lg bg-[#132247] text-[#FEF0B2]">
                    <Target className="h-3.5 w-3.5" />
                  </div>
                  META
                </span>
                <span className="text-[10px] sm:text-[11px] font-black px-2 py-0.5 rounded-full bg-[#132247] text-[#FEF0B2] border border-[#EAA816] shadow-2xs">
                  +{iqPercent} IQ
                </span>
              </div>

              <div className="my-1.5">
                <div className="text-base sm:text-lg font-black text-[#132247] dark:text-white tracking-tight truncate" title={targetLevel}>
                  {targetLevel}
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 truncate mt-0.5 font-medium">
                  Nível {userProfile.nivelClassificacao || 'E'} • {userProfile.cargo || 'PCCTAE'}
                </div>
              </div>
            </div>

            <div className="pt-2 mt-2 border-t border-slate-100 dark:border-slate-700/80 text-[11px] text-slate-600 dark:text-slate-400 flex items-center justify-between">
              <span className="font-semibold text-slate-500 dark:text-slate-400">Exigência Mínima</span>
              <span className="font-bold text-[#132247] dark:text-[#FEF0B2]">
                {minScore} pts • {minCriterios} crit.
              </span>
            </div>
          </div>

          {/* 2. PONTUAÇÃO */}
          <div 
            className={`p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 shadow-xs flex flex-col justify-between bg-white dark:bg-slate-800/90 ${
              isScoreSufficient 
                ? 'border-emerald-300 dark:border-emerald-700/80 ring-1 ring-emerald-400/20' 
                : 'border-amber-300 dark:border-amber-700/80 ring-1 ring-amber-400/20'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-1.5 mb-2">
                <span className="text-[11px] sm:text-xs font-black tracking-wider uppercase text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <div className={`p-1 rounded-lg ${isScoreSufficient ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white'}`}>
                    <Award className="h-3.5 w-3.5" />
                  </div>
                  PONTUAÇÃO
                </span>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${
                  isScoreSufficient 
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-700' 
                    : 'bg-amber-100 text-amber-950 border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-700'
                }`}>
                  {isScoreSufficient ? 'ATINGIDA' : `FALTA ${(minScore - totalScore).toFixed(1)}`}
                </span>
              </div>

              <div className="my-1.5">
                <div className="flex items-baseline gap-1.5">
                  <span className={`text-2xl sm:text-3xl font-black tracking-tight font-mono ${
                    isScoreSufficient ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'
                  }`}>
                    {totalScore.toFixed(1)}
                  </span>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                    / {minScore} pts
                  </span>
                </div>

                {/* Barra de Progresso de Pontos */}
                <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full mt-2 overflow-hidden p-0.5">
                  <div 
                    className={`h-full transition-all duration-300 rounded-full ${
                      isScoreSufficient ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${scorePercent}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 mt-2 border-t border-slate-100 dark:border-slate-700/80 text-[11px] text-slate-600 dark:text-slate-400 flex items-center justify-between">
              <span className="font-semibold text-slate-500 dark:text-slate-400">{scorePercent}% cumprido</span>
              <span className={`font-bold ${isScoreSufficient ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'}`}>
                {isScoreSufficient ? `+${(totalScore - minScore).toFixed(1)} sobra` : `${totalScore.toFixed(1)} pts válidos`}
              </span>
            </div>
          </div>

          {/* 3. CRITÉRIOS */}
          <div 
            className={`p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 shadow-xs flex flex-col justify-between bg-white dark:bg-slate-800/90 ${
              isCriteriosSufficient 
                ? 'border-emerald-300 dark:border-emerald-700/80 ring-1 ring-emerald-400/20' 
                : 'border-slate-200 dark:border-slate-700 hover:border-[#EAA816]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-1.5 mb-2">
                <span className="text-[11px] sm:text-xs font-black tracking-wider uppercase text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <div className={`p-1 rounded-lg ${isCriteriosSufficient ? 'bg-emerald-600 text-white' : 'bg-indigo-600 text-white'}`}>
                    <Layers className="h-3.5 w-3.5" />
                  </div>
                  CRITÉRIOS
                </span>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${
                  isCriteriosSufficient 
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-700' 
                    : 'bg-amber-100 text-amber-950 border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-700'
                }`}>
                  {isCriteriosSufficient ? 'ATINGIDO' : `FALTA ${minCriterios - criteriosAlcancados}`}
                </span>
              </div>

              <div className="my-1.5">
                <div className="flex items-baseline gap-1.5">
                  <span className={`text-2xl sm:text-3xl font-black tracking-tight font-mono ${
                    isCriteriosSufficient ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-900 dark:text-white'
                  }`}>
                    {criteriosAlcancados}
                  </span>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                    / {minCriterios} distintos
                  </span>
                </div>

                {/* Barra de Progresso de Critérios */}
                <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full mt-2 overflow-hidden p-0.5">
                  <div 
                    className={`h-full transition-all duration-300 rounded-full ${
                      isCriteriosSufficient ? 'bg-emerald-500' : 'bg-indigo-500'
                    }`}
                    style={{ width: `${criteriaPercent}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 mt-2 border-t border-slate-100 dark:border-slate-700/80 text-[11px] text-slate-600 dark:text-slate-400 flex items-center justify-between">
              <span className="font-semibold text-slate-500 dark:text-slate-400">{criteriaPercent}% cumprido</span>
              <span className={`font-bold ${isCriteriosSufficient ? 'text-emerald-700 dark:text-emerald-400' : 'text-indigo-600 dark:text-indigo-400'}`}>
                {isCriteriosSufficient ? 'Diversidade OK' : 'Requisitos I a VI'}
              </span>
            </div>
          </div>

          {/* 4. ITENS */}
          <div 
            className="p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 shadow-xs flex flex-col justify-between bg-white dark:bg-slate-800/90 border-slate-200 dark:border-slate-700 hover:border-[#EAA816] group"
          >
            <div>
              <div className="flex items-center justify-between gap-1.5 mb-2">
                <span className="text-[11px] sm:text-xs font-black tracking-wider uppercase text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <div className="p-1 rounded-lg bg-[#132247] text-[#FEF0B2]">
                    <FileCheck2 className="h-3.5 w-3.5" />
                  </div>
                  ITENS
                </span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600">
                  {validItemsCount} VÁLIDOS
                </span>
              </div>

              <div className="my-1.5">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black text-[#132247] dark:text-white tracking-tight font-mono">
                    {rscItemCount}
                  </span>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                    documento(s)
                  </span>
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 truncate mt-1.5 font-medium">
                  {validItemsCount > 0 ? `${validItemsCount} comprovante(s) pontuando` : 'Aguardando comprovantes'}
                </div>
              </div>
            </div>

            <div className="pt-2 mt-2 border-t border-slate-100 dark:border-slate-700/80 text-[11px] text-slate-600 dark:text-slate-400 flex items-center justify-between">
              <span className="font-semibold text-slate-500 dark:text-slate-400">Auditoria SEI</span>
              <span className={`font-bold ${rscItemCount > 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'}`}>
                {rscItemCount > 0 ? 'Prontos para envio' : 'Sem arquivos'}
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

