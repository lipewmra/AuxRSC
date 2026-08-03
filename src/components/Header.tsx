import React from 'react';
import { Calculator, Download, Upload, ExternalLink, ShieldCheck } from 'lucide-react';
import { UserProfile, RSCItem } from '../types';
import { RSC_REQUIREMENTS, evaluateRSCCompliance } from '../data/rscStructure';
import headerLogo from '../assets/images/regenerated_image_1785769089212.png';

interface HeaderProps {
  userProfile: UserProfile;
  totalScore: number;
  rscItemCount: number;
  rscItems?: RSCItem[];
  onOpenExport: () => void;
  onOpenImport: () => void;
  onOpenLegalModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userProfile,
  totalScore,
  rscItemCount,
  rscItems = [],
  onOpenExport,
  onOpenImport,
  onOpenLegalModal,
}) => {
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
    <header className="text-slate-900 border-b border-slate-200 sticky top-0 z-30" style={{ backgroundColor: '#f2f0da' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <img 
              src={headerLogo} 
              alt="RSC TAE Logomarca" 
              className="w-[100px] h-[100px] rounded-full object-cover border-0 shadow-sm shrink-0" 
              style={{ width: '100px', height: '100px', borderWidth: '0px' }}
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-base font-bold tracking-tight text-[#132247]">
                  Auxiliador de Preenchimento do <span className="text-[#C28600] font-extrabold">RSC-TAE</span>
                </h1>
              </div>
              <p className="text-xs text-slate-600">
                Assistente de Análise Documental & Justificativas •{' '}
                <a
                  href="https://www.calculadorarsc.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#132247] hover:text-[#2B96E3] hover:underline font-semibold inline-flex items-center gap-0.5"
                >
                  Calculadora RSC <ExternalLink className="h-3 w-3 text-[#132247]" />
                </a>
              </p>
            </div>
          </div>

          {/* Quick Metrics & Target Status */}
          <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap shrink-0">
            <div className="bg-[#FEF0B2]/40 border-2 border-[#EAA816] rounded-lg px-3 py-1 flex items-center space-x-3 text-xs shrink-0 shadow-2xs">
              <div>
                <span className="text-slate-500 block text-[9px] font-bold uppercase tracking-wider">Meta</span>
                <span className="font-bold text-[#132247]">{targetLevel}</span>
              </div>
              <div className="h-5 w-[1px] bg-[#EAA816]/50" />
              <div>
                <span className="text-slate-500 block text-[9px] font-bold uppercase tracking-wider">Pontuação</span>
                <span className={`font-bold ${isScoreSufficient ? 'text-emerald-700' : 'text-[#C28600]'}`}>
                  {totalScore.toFixed(1)} / {minScore} pts
                </span>
              </div>
              <div className="h-5 w-[1px] bg-[#EAA816]/50" />
              <div>
                <span className="text-slate-500 block text-[9px] font-bold uppercase tracking-wider">Critérios</span>
                <span className={`font-bold ${isCriteriosSufficient ? 'text-emerald-700' : 'text-[#C28600]'}`}>
                  {criteriosAlcancados} / {minCriterios} exigidos
                </span>
              </div>
              <div className="h-5 w-[1px] bg-[#EAA816]/50" />
              <div>
                <span className="text-slate-500 block text-[9px] font-bold uppercase tracking-wider">Itens</span>
                <span className="font-bold text-[#132247]">{rscItemCount}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 shrink-0">
              <button
                type="button"
                onClick={onOpenLegalModal}
                className="px-3 py-1.5 text-xs font-semibold text-[#132247] hover:bg-[#FEF0B2]/60 hover:border-[#EAA816] rounded-md border border-slate-300 transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                title="Consultar Legislação e Portarias Oficiais"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-[#132247]" />
                <span className="hidden sm:inline">Legislação</span>
              </button>

              <button
                type="button"
                onClick={onOpenImport}
                className="px-3 py-1.5 text-xs font-semibold text-[#132247] hover:text-[#132247] bg-slate-50 hover:bg-[#FEF0B2]/60 hover:border-[#EAA816] rounded-md border border-slate-300 transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                title="Importar sessão salva em formato JSON"
              >
                <Upload className="h-3.5 w-3.5 text-[#132247]" />
                <span>Importar Dados</span>
              </button>

              <button
                type="button"
                onClick={onOpenExport}
                className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#132247] hover:bg-[#1C3366] rounded-md border-2 border-[#EAA816] transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                title="Exportar sessão atual para arquivo JSON"
              >
                <Download className="h-3.5 w-3.5 text-[#EAA816]" />
                <span className="text-white">Salvar Sessão</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

