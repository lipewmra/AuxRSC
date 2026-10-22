import React from 'react';
import { Download, Upload, ExternalLink, KeyRound, Settings, Moon, Sun } from 'lucide-react';
import { UserProfile, RSCItem } from '../types';
import headerLogo from '../assets/images/regenerated_image_1785769089212.png';
import { getStoredGeminiApiKey } from '../utils/apiKey';

interface HeaderProps {
  userProfile: UserProfile;
  totalScore: number;
  rscItemCount: number;
  rscItems?: RSCItem[];
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenExport: () => void;
  onOpenImport: () => void;
  onOpenApiKeyModal: () => void;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userProfile,
  theme,
  onToggleTheme,
  onOpenExport,
  onOpenImport,
  onOpenApiKeyModal,
  onOpenSettings,
}) => {
  const hasCustomKey = !!getStoredGeminiApiKey();

  return (
    <header 
      className={`border-b sticky top-0 z-30 w-full overflow-x-hidden transition-colors duration-200 shadow-xs ${
        theme === 'dark' 
          ? 'bg-slate-950 border-slate-800 text-slate-100' 
          : 'bg-[#f2f0da] border-slate-200 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 w-full">
          
          {/* Logo Institucional & Título do Sistema */}
          <div className="flex items-center space-x-3 min-w-0">
            <div className="relative shrink-0">
              <img 
                src={headerLogo} 
                alt="RSC TAE Logomarca" 
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-[#EAA816] shadow-xs" 
                referrerPolicy="no-referrer"
              />
              <span className="absolute -bottom-1 -right-1 bg-[#132247] text-[#FEF0B2] text-[9px] font-black px-1.5 py-0.2 rounded-full border border-[#EAA816]">
                3.1
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center space-x-2 flex-wrap gap-y-0.5">
                <h1 className="text-sm sm:text-base md:text-lg font-black tracking-tight text-[#132247] dark:text-white leading-tight break-words flex items-center gap-1.5">
                  Auxiliador de Preenchimento do <span className="text-[#C28600] dark:text-[#EAA816] font-black">RSC-TAE</span>
                </h1>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 truncate sm:whitespace-normal mt-0.5">
                Assistente de Análise Documental & Memorial SEI •{' '}
                <a
                  href="https://www.calculadorarsc.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#132247] dark:text-[#FEF0B2] hover:text-[#2B96E3] hover:underline font-bold inline-flex items-center gap-0.5"
                >
                  Calculadora Oficial <ExternalLink className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                </a>
              </p>
            </div>
          </div>

          {/* Menu de Ações à Direita */}
          <div className="flex items-center justify-between sm:justify-end gap-2 w-full md:w-auto flex-wrap">
            
            {/* Alternador Rápido de Tema (Sol/Lua) */}
            <button
              type="button"
              onClick={onToggleTheme}
              className={`p-2 rounded-xl border transition cursor-pointer ${
                theme === 'dark'
                  ? 'bg-slate-900 border-slate-700 text-amber-400 hover:bg-slate-800'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-amber-50 hover:border-[#EAA816]'
              }`}
              title={theme === 'dark' ? 'Mudar para Modo Claro' : 'Mudar para Modo Escuro'}
              aria-label="Alternar Tema Claro/Escuro"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4 text-indigo-600" />}
            </button>

            {/* Chave de API IA */}
            <button
              type="button"
              onClick={onOpenApiKeyModal}
              className={`px-3 py-2 text-xs font-bold rounded-xl border transition flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                hasCustomKey
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800'
                  : 'bg-white text-[#132247] border-slate-300 hover:bg-[#FEF0B2]/60 hover:border-[#EAA816] dark:bg-slate-900 dark:text-slate-200 dark:border-slate-700'
              }`}
              title="Status da Conexão e Configuração da Chave Gemini Flash"
            >
              <KeyRound className={`h-3.5 w-3.5 shrink-0 ${hasCustomKey ? 'text-emerald-600 dark:text-emerald-400' : 'text-[#132247] dark:text-[#FEF0B2]'}`} />
              <span className="hidden xs:inline">{hasCustomKey ? 'IA Conectada' : 'Chave IA'}</span>
              <span className={`w-2 h-2 rounded-full ${hasCustomKey ? 'bg-emerald-500 animate-pulse' : 'bg-emerald-400'}`} title="Serviço Gemini Flash Ativo" />
            </button>

            {/* Importar Dados */}
            <button
              type="button"
              onClick={onOpenImport}
              className="px-3 py-2 text-xs font-semibold text-[#132247] dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-[#FEF0B2]/60 dark:hover:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
              title="Importar sessão salva em JSON"
            >
              <Upload className="h-3.5 w-3.5 text-[#132247] dark:text-slate-300 shrink-0" />
              <span className="hidden sm:inline">Importar</span>
            </button>

            {/* Salvar Dados */}
            <button
              type="button"
              onClick={onOpenExport}
              className="px-3 py-2 text-xs font-bold text-white bg-[#132247] hover:bg-[#1C3366] rounded-xl border border-[#EAA816] transition flex items-center gap-1.5 shadow-2xs cursor-pointer"
              title="Salvar e exportar sessão atual"
            >
              <Download className="h-3.5 w-3.5 text-[#FEF0B2] shrink-0" />
              <span>Salvar</span>
            </button>

            {/* BOTÃO PRINCIPAL DE CONFIGURAÇÕES */}
            <button
              type="button"
              onClick={onOpenSettings}
              className="px-3.5 py-2 text-xs font-black text-[#132247] dark:text-[#FEF0B2] bg-[#FEF0B2] hover:bg-[#FCE282] dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl border-2 border-[#EAA816] transition flex items-center gap-1.5 shadow-xs cursor-pointer"
              title="Abrir Configurações, Tutoriais, Legislação e Preferências"
            >
              <Settings className="h-4 w-4 text-[#132247] dark:text-[#FEF0B2] animate-spin-slow shrink-0" />
              <span>Configurações</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
