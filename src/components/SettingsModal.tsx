import React from 'react';
import {
  Settings,
  X,
  Sun,
  Moon,
  Type,
  Sparkles,
  HelpCircle,
  ShieldCheck,
  KeyRound,
  ExternalLink,
  ChevronRight,
  Minus,
  Plus,
  RotateCcw,
} from 'lucide-react';
import { getStoredGeminiApiKey } from '../utils/apiKey';

export type AppTheme = 'light' | 'dark';
export type AppFontSize = 'normal' | 'large' | 'xlarge';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: AppTheme;
  onThemeChange: (theme: AppTheme) => void;
  fontSize: AppFontSize;
  onFontSizeChange: (size: AppFontSize) => void;
  onOpenIntro: () => void;
  onOpenTutorial: () => void;
  onOpenLegalModal: () => void;
  onOpenApiKeyModal: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  theme,
  onThemeChange,
  fontSize,
  onFontSizeChange,
  onOpenIntro,
  onOpenTutorial,
  onOpenLegalModal,
  onOpenApiKeyModal,
}) => {
  if (!isOpen) return null;

  const hasApiKey = !!getStoredGeminiApiKey();

  const getFontSizeLabel = (size: AppFontSize) => {
    switch (size) {
      case 'normal':
        return 'Padrão (100%)';
      case 'large':
        return 'Grande (112%)';
      case 'xlarge':
        return 'Extra Grande (125%)';
      default:
        return '100%';
    }
  };

  const handleDecreaseFontSize = () => {
    if (fontSize === 'xlarge') onFontSizeChange('large');
    else if (fontSize === 'large') onFontSizeChange('normal');
  };

  const handleIncreaseFontSize = () => {
    if (fontSize === 'normal') onFontSizeChange('large');
    else if (fontSize === 'large') onFontSizeChange('xlarge');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div 
        className={`relative w-full max-w-xl rounded-2xl shadow-2xl border transition-colors duration-200 overflow-hidden ${
          theme === 'dark'
            ? 'bg-slate-900 border-slate-700 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Modal Header */}
        <div 
          className={`px-5 py-4 flex items-center justify-between border-b ${
            theme === 'dark' ? 'bg-slate-950/70 border-slate-800' : 'bg-[#f2f0da]/80 border-slate-200'
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-[#132247] text-[#FEF0B2] border border-[#EAA816] flex items-center justify-center shadow-xs">
              <Settings className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold flex items-center gap-2 leading-tight">
                Configurações & Recursos
                <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-[#132247] text-[#FEF0B2] border border-[#EAA816]">
                  v3.1
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Personalize preferências de visualização e acesse guias do sistema
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition cursor-pointer"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* SEÇÃO 1: APARÊNCIA E ACESSIBILIDADE */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Type className="h-4 w-4 text-[#132247] dark:text-[#FEF0B2]" />
              Aparência & Acessibilidade
            </h3>

            {/* Tema Claro / Escuro */}
            <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    {theme === 'dark' ? <Moon className="h-4 w-4 text-indigo-400" /> : <Sun className="h-4 w-4 text-amber-500" />}
                    Tema Visual da Interface
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Alterne entre a paleta clássica e o modo de alto contraste noturno
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => onThemeChange('light')}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer border ${
                      theme === 'light'
                        ? 'bg-white border-[#EAA816] text-[#132247] shadow-xs ring-2 ring-[#EAA816]/30'
                        : 'bg-transparent border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-white/50'
                    }`}
                  >
                    <Sun className="h-3.5 w-3.5 text-amber-500" />
                    <span>Modo Claro</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onThemeChange('dark')}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer border ${
                      theme === 'dark'
                        ? 'bg-slate-950 border-indigo-500 text-white shadow-xs ring-2 ring-indigo-500/40'
                        : 'bg-transparent border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-200/50'
                    }`}
                  >
                    <Moon className="h-3.5 w-3.5 text-indigo-400" />
                    <span>Modo Escuro</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Tamanho da Fonte */}
            <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Type className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      Tamanho da Fonte (Acessibilidade)
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Aumente para facilitar a leitura de documentos e memoriais extensos
                    </p>
                  </div>

                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800 self-start sm:self-auto">
                    {getFontSizeLabel(fontSize)}
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleDecreaseFontSize}
                    disabled={fontSize === 'normal'}
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-xs font-bold flex items-center justify-center gap-1 transition disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-200/60 dark:hover:bg-slate-700 cursor-pointer text-slate-800 dark:text-slate-200"
                    title="Diminuir tamanho da fonte"
                  >
                    <Minus className="h-3.5 w-3.5" />
                    <span>Diminuir (A-)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onFontSizeChange('normal')}
                    className={`px-3 py-2 rounded-xl border text-xs font-bold flex items-center justify-center gap-1 transition cursor-pointer ${
                      fontSize === 'normal'
                        ? 'bg-[#132247] text-[#FEF0B2] border-[#EAA816]'
                        : 'border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-700'
                    }`}
                    title="Redefinir para tamanho padrão"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Padrão</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleIncreaseFontSize}
                    disabled={fontSize === 'xlarge'}
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-xs font-bold flex items-center justify-center gap-1 transition disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-200/60 dark:hover:bg-slate-700 cursor-pointer text-slate-800 dark:text-slate-200"
                    title="Aumentar tamanho da fonte"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Aumentar (A+)</span>
                  </button>
                </div>

                {/* Exemplo de Pré-visualização de texto */}
                <div className={`p-2.5 rounded-lg border text-xs leading-relaxed ${theme === 'dark' ? 'bg-slate-950/60 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-600'}`}>
                  <span className="font-semibold text-slate-900 dark:text-white">Prévia de leitura: </span>
                  O conjunto de saberes e competências atende aos requisitos do Decreto nº 13.048/2026.
                </div>
              </div>
            </div>

          </div>

          {/* SEÇÃO 2: NAVEGAÇÃO E RECURSOS (Abertura, Tutorial, Legislação) */}
          <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-[#C28600]" />
              Guias & Recursos do RSC-TAE
            </h3>

            <div className="grid grid-cols-1 gap-2.5">
              {/* Abertura */}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenIntro();
                }}
                className={`p-3.5 rounded-xl border text-left transition flex items-center justify-between group cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-slate-800/60 hover:bg-slate-800 border-slate-700 text-slate-200'
                    : 'bg-slate-50 hover:bg-white border-slate-200 hover:border-[#EAA816] text-slate-800 hover:shadow-xs'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="h-9 w-9 rounded-xl bg-[#132247] text-[#FEF0B2] border border-[#EAA816] flex items-center justify-center shrink-0">
                    <Sparkles className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#C28600] transition-colors">
                      Tela de Abertura & Apresentação
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Rever a introdução às regras, pontuações mínimas e novidades da v3.1
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* Tutorial */}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenTutorial();
                }}
                className={`p-3.5 rounded-xl border text-left transition flex items-center justify-between group cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-slate-800/60 hover:bg-slate-800 border-slate-700 text-slate-200'
                    : 'bg-slate-50 hover:bg-white border-slate-200 hover:border-[#EAA816] text-slate-800 hover:shadow-xs'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="h-9 w-9 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-800 flex items-center justify-center shrink-0">
                    <HelpCircle className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                      Tutorial & Guia Passo a Passo
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Aprenda como preencher o formulário, subir PDFs e gerar o Memorial SEI
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* Legislação */}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenLegalModal();
                }}
                className={`p-3.5 rounded-xl border text-left transition flex items-center justify-between group cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-slate-800/60 hover:bg-slate-800 border-slate-700 text-slate-200'
                    : 'bg-slate-50 hover:bg-white border-slate-200 hover:border-[#EAA816] text-slate-800 hover:shadow-xs'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="h-9 w-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center justify-center shrink-0">
                    <ShieldCheck className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                      Legislação & Normas Oficiais
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Consulte a íntegra da Lei nº 15.367/2026, Decreto nº 13.048/2026 e critérios
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* SEÇÃO 3: INTEGRAÇÃO IA GEMINI */}
          <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <KeyRound className="h-4 w-4 text-indigo-500" />
              Inteligência Artificial (Google Gemini)
            </h3>

            <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${theme === 'dark' ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>Chave de API Gemini</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    hasApiKey 
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800' 
                      : 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800'
                  }`}>
                    {hasApiKey ? 'Configurada' : 'Padrão do Servidor'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Utilizada para análise inteligente de PDFs e redação do Memorial
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenApiKeyModal();
                }}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#132247] hover:bg-[#1C3366] text-white border border-[#EAA816] shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
              >
                <KeyRound className="h-3.5 w-3.5 text-[#FEF0B2]" />
                <span>Gerenciar Chave</span>
              </button>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className={`px-5 py-3.5 border-t flex items-center justify-between ${theme === 'dark' ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <a
            href="https://www.calculadorarsc.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-[#132247] dark:text-[#FEF0B2] hover:underline inline-flex items-center gap-1"
          >
            Acessar Calculadora Oficial <ExternalLink className="h-3 w-3" />
          </a>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-[#132247] hover:bg-[#1C3366] text-[#FEF0B2] text-xs font-bold rounded-xl border border-[#EAA816] transition shadow-xs cursor-pointer"
          >
            Concluir & Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
