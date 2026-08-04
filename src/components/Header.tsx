import React from 'react';
import { Calculator, Download, Upload, ExternalLink, ShieldCheck, KeyRound, HelpCircle } from 'lucide-react';
import { UserProfile, RSCItem } from '../types';
import { RSC_REQUIREMENTS, evaluateRSCCompliance } from '../data/rscStructure';
import headerLogo from '../assets/images/regenerated_image_1785769089212.png';
import { getStoredGeminiApiKey } from '../utils/apiKey';

interface HeaderProps {
  userProfile: UserProfile;
  totalScore: number;
  rscItemCount: number;
  rscItems?: RSCItem[];
  onOpenExport: () => void;
  onOpenImport: () => void;
  onOpenLegalModal: () => void;
  onOpenApiKeyModal: () => void;
  onOpenTutorial: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userProfile,
  totalScore,
  rscItemCount,
  rscItems = [],
  onOpenExport,
  onOpenImport,
  onOpenLegalModal,
  onOpenApiKeyModal,
  onOpenTutorial,
}) => {
  const hasCustomKey = !!getStoredGeminiApiKey();
  const targetLevel = userProfile.rscAlmejado || 'RSC-PCCTAE I';
  const evaluation = evaluateRSCCompliance(rscItems, targetLevel);
  const {
    minScore,
    criteriosAlcancados,
    minCriterios,
    isScoreSufficient,
    isCriteriosSufficient,
  } = evaluation;

  return (
    <header className="text-slate-900 border-b border-slate-200 sticky top-0 z-30 w-full overflow-x-hidden" style={{ backgroundColor: '#f2f0da' }}>
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 py-2.5 sm:py-3 w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2.5 sm:gap-3 w-full">
          
          {/* Logo & Title */}
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 w-full md:w-auto">
            <img 
              src={headerLogo} 
              alt="RSC TAE Logomarca" 
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-[85px] md:h-[85px] rounded-full object-cover border-0 shadow-xs shrink-0" 
              referrerPolicy="no-referrer"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center space-x-1.5">
                <h1 className="text-xs sm:text-sm md:text-base font-bold tracking-tight text-[#132247] leading-tight break-words">
                  Auxiliador de Preenchimento do <span className="text-[#C28600] font-extrabold">RSC-TAE</span>
                </h1>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-600 truncate sm:whitespace-normal">
                Assistente de Análise Documental & Justificativas •{' '}
                <a
                  href="https://www.calculadorarsc.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#132247] hover:text-[#2B96E3] hover:underline font-semibold inline-flex items-center gap-0.5"
                >
                  Calculadora RSC <ExternalLink className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#132247]" />
                </a>
              </p>
            </div>
          </div>

          {/* Quick Metrics & Action Buttons Container */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto min-w-0">
            
            {/* Metrics Box - Responsive Grid on Mobile */}
            <div className="bg-[#FEF0B2]/50 border-2 border-[#EAA816] rounded-lg p-2 sm:px-3 sm:py-1 grid grid-cols-2 xs:grid-cols-4 sm:flex sm:items-center gap-2 sm:gap-3 text-xs w-full sm:w-auto shadow-2xs">
              <div className="flex flex-col min-w-0">
                <span className="text-slate-500 block text-[8px] sm:text-[9px] font-bold uppercase tracking-wider">Meta</span>
                <span className="font-bold text-[#132247] text-[11px] sm:text-xs truncate">{targetLevel}</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-slate-500 block text-[8px] sm:text-[9px] font-bold uppercase tracking-wider">Pontuação</span>
                <span className={`font-bold text-[11px] sm:text-xs ${isScoreSufficient ? 'text-emerald-700' : 'text-[#C28600]'}`}>
                  {totalScore.toFixed(1)} / {minScore} pts
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-slate-500 block text-[8px] sm:text-[9px] font-bold uppercase tracking-wider">Critérios</span>
                <span className={`font-bold text-[11px] sm:text-xs ${isCriteriosSufficient ? 'text-emerald-700' : 'text-[#C28600]'}`}>
                  {criteriosAlcancados} / {minCriterios} exigidos
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-slate-500 block text-[8px] sm:text-[9px] font-bold uppercase tracking-wider">Itens</span>
                <span className="font-bold text-[#132247] text-[11px] sm:text-xs">{rscItemCount}</span>
              </div>
            </div>

            {/* Action Buttons - 3 columns x 2 rows layout */}
            <div className="grid grid-cols-3 gap-1.5 w-full sm:w-auto min-w-[320px]">
              <button
                type="button"
                onClick={onOpenTutorial}
                className="w-full px-2 py-1.5 text-xs font-bold text-white bg-[#132247] hover:bg-[#1C3366] border border-[#EAA816] rounded-md transition flex items-center justify-center gap-1 cursor-pointer shadow-2xs"
                title="Abrir Tutorial e Guia de Uso do Sistema"
              >
                <HelpCircle className="h-3.5 w-3.5 text-[#EAA816] shrink-0" />
                <span>Tutorial</span>
              </button>

              <button
                type="button"
                onClick={onOpenApiKeyModal}
                className={`w-full px-2 py-1.5 text-xs font-semibold rounded-md border transition flex items-center justify-center gap-1 cursor-pointer shadow-2xs ${
                  hasCustomKey
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                    : 'bg-white text-[#132247] border-slate-300 hover:bg-[#FEF0B2]/60 hover:border-[#EAA816]'
                }`}
                title="Configurar sua Chave de API do Google Gemini"
              >
                <KeyRound className={`h-3.5 w-3.5 shrink-0 ${hasCustomKey ? 'text-emerald-700' : 'text-[#132247]'}`} />
                <span>Chave IA</span>
                {hasCustomKey && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                )}
              </button>

              <button
                type="button"
                onClick={onOpenLegalModal}
                className="w-full px-2 py-1.5 text-xs font-semibold text-[#132247] bg-white hover:bg-[#FEF0B2]/60 hover:border-[#EAA816] rounded-md border border-slate-300 transition flex items-center justify-center gap-1 cursor-pointer shadow-2xs"
                title="Consultar Legislação e Portarias Oficiais"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-[#132247] shrink-0" />
                <span>Legislação</span>
              </button>

              <button
                type="button"
                onClick={onOpenImport}
                className="w-full px-2 py-1.5 text-xs font-semibold text-[#132247] bg-slate-50 hover:bg-[#FEF0B2]/60 hover:border-[#EAA816] rounded-md border border-slate-300 transition flex items-center justify-center gap-1 cursor-pointer shadow-2xs"
                title="Importar sessão salva em formato JSON"
              >
                <Upload className="h-3.5 w-3.5 text-[#132247] shrink-0" />
                <span>Importar</span>
              </button>

              <button
                type="button"
                onClick={onOpenExport}
                className="col-span-2 w-full px-2.5 py-1.5 text-xs font-bold text-white bg-[#132247] hover:bg-[#1C3366] rounded-md border-2 border-[#EAA816] transition flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                title="Exportar sessão atual para arquivo JSON"
              >
                <Download className="h-3.5 w-3.5 text-[#EAA816] shrink-0" />
                <span className="text-white">Salvar Sessão</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};

