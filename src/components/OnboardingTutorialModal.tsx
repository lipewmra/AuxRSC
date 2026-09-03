import React, { useState, useEffect } from 'react';
import {
  X,
  ChevronRight,
  ChevronLeft,
  KeyRound,
  FileSearch,
  Calculator,
  CheckCircle2,
  FileText,
  Sparkles,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  Award,
  Layers,
  Zap,
} from 'lucide-react';
import { getStoredGeminiApiKey } from '../utils/apiKey';

interface OnboardingTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApiKeyModal: () => void;
  onOpenIntroModal?: () => void;
}

export const OnboardingTutorialModal: React.FC<OnboardingTutorialModalProps> = ({
  isOpen,
  onClose,
  onOpenApiKeyModal,
  onOpenIntroModal,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const hasApiKey = !!getStoredGeminiApiKey();

  const handleFinish = () => {
    if (dontShowAgain) {
      localStorage.setItem('rsc_has_seen_tutorial_v3', 'true');
    }
    onClose();
  };

  const steps = [
    {
      id: 'ia-key',
      title: '1. Sua Chave de IA do Google Gemini',
      subtitle: 'Configuração individual, gratuita e 100% privada',
      icon: KeyRound,
      color: 'from-amber-500 to-[#132247]',
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300 text-sm">
          <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl flex items-start space-x-3">
            <Sparkles className="h-5 w-5 text-[#C28600] dark:text-[#EAA816] shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed text-amber-900 dark:text-amber-200">
              <strong className="font-bold block mb-0.5 text-amber-950 dark:text-amber-100">Inteligência Artificial Privada:</strong>
              O sistema utiliza o modelo <strong>Google Gemini 1.5/3.6 Flash</strong> para ler seus PDFs, extrair dados de portarias e redigir o memorial do processo SEI.
            </div>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-xs uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              Como funciona sua chave de API:
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 list-disc pl-5">
              <li>
                <strong>Gratuita e Pessoal:</strong> Obtenha sua chave no Google AI Studio sem nenhum custo.
              </li>
              <li>
                <strong>Armazenamento Seguro:</strong> Sua chave fica salva apenas no seu navegador (localStorage) e não é compartilhada nem armazenada em banco de dados externo.
              </li>
              <li>
                <strong>Sem Limites Compartilhados:</strong> Garante velocidade e autonomia total para analisar quantos documentos desejar.
              </li>
            </ul>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs">
              <span className="font-bold text-slate-800 dark:text-slate-200">Status Atual: </span>
              {hasApiKey ? (
                <span className="text-emerald-700 dark:text-emerald-300 font-bold bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full text-[11px] border border-emerald-200 dark:border-emerald-800 inline-flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Chave Configurada
                </span>
              ) : (
                <span className="text-amber-700 dark:text-amber-300 font-bold bg-amber-100 dark:bg-amber-950/80 px-2 py-0.5 rounded-full text-[11px] border border-amber-200 dark:border-amber-800">
                  Nenhuma chave inserida ainda
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                onOpenApiKeyModal();
              }}
              className="px-3.5 py-1.5 bg-[#132247] hover:bg-[#1C3366] text-white font-bold text-xs rounded-lg border border-[#EAA816] transition flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
            >
              <KeyRound className="h-3.5 w-3.5 text-[#EAA816]" />
              {hasApiKey ? 'Gerenciar Chave de IA' : 'Inserir Minha Chave Agora'}
            </button>
          </div>

          <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-1">
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold text-[#132247] dark:text-indigo-400 hover:text-[#2B96E3] hover:underline"
            >
              Criar chave gratuita no Google AI Studio <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      ),
    },
    {
      id: 'step-by-step',
      title: '2. Como Usar o Programa (Passo a Passo)',
      subtitle: 'Fluxo em 5 etapas para montar seu processo SEI do RSC',
      icon: Layers,
      color: 'from-[#132247] to-[#1C3366]',
      content: (
        <div className="space-y-3.5 text-xs text-slate-700 dark:text-slate-300">
          <div className="grid grid-cols-1 gap-2.5">
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg flex items-start space-x-2.5">
              <div className="w-6 h-6 rounded-full bg-[#132247] text-[#EAA816] font-bold flex items-center justify-center shrink-0 text-xs">
                1
              </div>
              <div>
                <strong className="font-bold text-slate-900 dark:text-white block text-xs">Dados do Servidor</strong>
                Preencha seu nome, SIAPE, cargo (Nível C, D ou E) e o nível de RSC almejado (RSC-PCCTAE I, II, III, IV, V ou VI).
              </div>
            </div>

            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg flex items-start space-x-2.5">
              <div className="w-6 h-6 rounded-full bg-[#132247] text-[#EAA816] font-bold flex items-center justify-center shrink-0 text-xs">
                2
              </div>
              <div>
                <strong className="font-bold text-slate-900 dark:text-white block text-xs">Upload de PDFs com Leitura de IA</strong>
                Envie suas portarias, certificados, relatórios ou declarações. A IA extrai automaticamente: órgão emissor, datas de vigência, número SEI e pontuação sugerida nos Requisitos I a VI.
              </div>
            </div>

            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg flex items-start space-x-2.5">
              <div className="w-6 h-6 rounded-full bg-[#132247] text-[#EAA816] font-bold flex items-center justify-center shrink-0 text-xs">
                3
              </div>
              <div>
                <strong className="font-bold text-slate-900 dark:text-white block text-xs">Organizador da Calculadora RSC</strong>
                Edite, organize e confirme as categorias, horas, anos ou itens. O sistema calcula a pontuação exata conforme os anexos da portaria oficial.
              </div>
            </div>

            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg flex items-start space-x-2.5">
              <div className="w-6 h-6 rounded-full bg-[#132247] text-[#EAA816] font-bold flex items-center justify-center shrink-0 text-xs">
                4
              </div>
              <div>
                <strong className="font-bold text-slate-900 dark:text-white block text-xs">Matriz & Tabelas de Referência</strong>
                Consulte a tabela oficial de pontuação mínima e diretrizes para sanar qualquer dúvida técnica.
              </div>
            </div>

            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg flex items-start space-x-2.5">
              <div className="w-6 h-6 rounded-full bg-[#132247] text-[#EAA816] font-bold flex items-center justify-center shrink-0 text-xs">
                5
              </div>
              <div>
                <strong className="font-bold text-slate-900 dark:text-white block text-xs">Relatório Final e Memorial para o SEI</strong>
                Gere com 1 clique a seção formal do Memorial Descritivo de Saberes, imprima em PDF ou faça backup em JSON.
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'points-rules',
      title: '3. Como Acompanhar Pontos e Critérios',
      subtitle: 'Entendendo as metas e alertas do RSC-PCCTAE',
      icon: Award,
      color: 'from-emerald-600 to-[#132247]',
      content: (
        <div className="space-y-3.5 text-xs text-slate-700 dark:text-slate-300">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl space-y-1">
            <h4 className="font-bold text-emerald-900 dark:text-emerald-200 text-xs flex items-center gap-1.5">
              <Award className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
              Regra da Dupla Aprovação do RSC:
            </h4>
            <p className="text-emerald-800 dark:text-emerald-300 text-xs leading-relaxed">
              Para obter o deferimento da Comissão Especial do RSC, não basta atingir a pontuação total. O servidor precisa cumprir cumulativamente:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">Meta 1</span>
              <strong className="font-bold text-slate-900 dark:text-white block text-xs">Pontuação Mínima Acumulada</strong>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                Soma de todos os pontos válidos nos comprovantes inseridos (ex: 10 pts para RSC-I, 20 pts para RSC-II, etc.).
              </p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">Meta 2</span>
              <strong className="font-bold text-slate-900 dark:text-white block text-xs">Quantidade de Critérios Distintos</strong>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                Exigência de pontuar em itens/categorias diferentes (ex: I.1 + II.3 + IV.1) conforme a tabela oficial.
              </p>
            </div>
          </div>

          <div className="p-3 bg-amber-50/60 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-lg space-y-1.5">
            <strong className="font-bold text-slate-900 dark:text-white text-xs flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              Barra de Indicador e Alertas Automáticos:
            </strong>
            <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
              A barra no topo do aplicativo muda de cor em tempo real:
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] flex-wrap">
              <span className="px-2 py-0.5 rounded font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                Verde: APTO ao Requerimento SEI
              </span>
              <span className="px-2 py-0.5 rounded font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
                Amarelo: Pontos ou Critérios Pendentes
              </span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const currentStepData = steps[currentStep];
  const StepIcon = currentStepData.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#132247] text-white px-6 py-4 flex items-center justify-between border-b border-[#EAA816]">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#FEF0B2]/10 rounded-xl border border-[#EAA816]/40 text-[#EAA816]">
              <StepIcon className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#EAA816] block">
                Guia de Início Rápido • {currentStep + 1} de {steps.length}
              </span>
              <h2 className="text-base font-bold">{currentStepData.title}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition cursor-pointer"
            title="Fechar Tutorial"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Step subtitle banner */}
        <div className="bg-slate-100 dark:bg-slate-800/80 px-6 py-2 border-b border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300">
          {currentStepData.subtitle}
        </div>

        {/* Body content */}
        <div className="p-6 overflow-y-auto flex-1">{currentStepData.content}</div>

        {/* Footer controls */}
        <div className="bg-slate-50 dark:bg-slate-950 px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-4 flex-wrap">
            <label className="flex items-center space-x-2 text-xs text-slate-600 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                className="rounded border-slate-300 dark:border-slate-700 text-[#132247] focus:ring-[#132247] h-4 w-4"
              />
              <span>Não mostrar novamente ao abrir o sistema</span>
            </label>

            {onOpenIntroModal && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenIntroModal();
                }}
                className="text-xs text-[#132247] dark:text-[#FEF0B2] hover:text-[#C28600] dark:hover:text-[#EAA816] font-bold underline flex items-center gap-1 cursor-pointer"
                title="Ver tela de abertura e animação"
              >
                <Sparkles className="h-3.5 w-3.5 text-[#C28600] dark:text-[#EAA816]" />
                <span>Ver Tela de Abertura</span>
              </button>
            )}
          </div>

          <div className="flex items-center space-x-2 shrink-0 w-full sm:w-auto justify-end">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-lg transition flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" /> Anterior
              </button>
            )}

            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => prev + 1)}
                className="px-4 py-2 text-xs font-bold text-white bg-[#132247] hover:bg-[#1C3366] border border-[#EAA816] rounded-lg transition flex items-center gap-1 cursor-pointer shadow-xs"
              >
                Próximo <ChevronRight className="h-4 w-4 text-[#EAA816]" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                className="px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 border border-emerald-500 rounded-lg transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <CheckCircle2 className="h-4 w-4" /> Entendi! Iniciar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
