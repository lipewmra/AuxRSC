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
}

export const OnboardingTutorialModal: React.FC<OnboardingTutorialModalProps> = ({
  isOpen,
  onClose,
  onOpenApiKeyModal,
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
      localStorage.setItem('rsc_has_seen_tutorial_v1', 'true');
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
        <div className="space-y-4 text-slate-700 text-sm">
          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl flex items-start space-x-3">
            <Sparkles className="h-5 w-5 text-[#C28600] shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed text-amber-900">
              <strong className="font-bold block mb-0.5 text-amber-950">Inteligência Artificial Privada:</strong>
              O sistema utiliza o modelo <strong>Google Gemini 1.5/3.6 Flash</strong> para ler seus PDFs, extrair dados de portarias e redigir o memorial do processo SEI.
            </div>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-900 flex items-center gap-2 text-xs uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              Como funciona sua chave de API:
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 list-disc pl-5">
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

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs">
              <span className="font-bold text-slate-800">Status Atual: </span>
              {hasApiKey ? (
                <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full text-[11px] border border-emerald-200 inline-flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Chave Configurada
                </span>
              ) : (
                <span className="text-amber-700 font-bold bg-amber-100 px-2 py-0.5 rounded-full text-[11px] border border-amber-200">
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

          <div className="text-[11px] text-slate-500 pt-1">
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold text-[#132247] hover:text-[#2B96E3] hover:underline"
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
        <div className="space-y-3.5 text-xs text-slate-700">
          <div className="grid grid-cols-1 gap-2.5">
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-start space-x-2.5">
              <div className="w-6 h-6 rounded-full bg-[#132247] text-[#EAA816] font-bold flex items-center justify-center shrink-0 text-xs">
                1
              </div>
              <div>
                <strong className="font-bold text-slate-900 block text-xs">Dados do Servidor</strong>
                Preencha seu nome, SIAPE, cargo (Nível C, D ou E) e o nível de RSC almejado (RSC-PCCTAE I, II, III, IV, V ou VI).
              </div>
            </div>

            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-start space-x-2.5">
              <div className="w-6 h-6 rounded-full bg-[#132247] text-[#EAA816] font-bold flex items-center justify-center shrink-0 text-xs">
                2
              </div>
              <div>
                <strong className="font-bold text-slate-900 block text-xs">Upload de PDFs com Leitura de IA</strong>
                Envie suas portarias, certificados, relatórios ou declarações. A IA extrai automaticamente: órgão emissor, datas de vigência, número SEI e pontuação sugerida nos Requisitos I a VI.
              </div>
            </div>

            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-start space-x-2.5">
              <div className="w-6 h-6 rounded-full bg-[#132247] text-[#EAA816] font-bold flex items-center justify-center shrink-0 text-xs">
                3
              </div>
              <div>
                <strong className="font-bold text-slate-900 block text-xs">Organizador da Calculadora RSC</strong>
                Edite, organize e confirme as categorias, horas, anos ou itens. O sistema calcula a pontuação exata conforme os anexos da portaria oficial.
              </div>
            </div>

            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-start space-x-2.5">
              <div className="w-6 h-6 rounded-full bg-[#132247] text-[#EAA816] font-bold flex items-center justify-center shrink-0 text-xs">
                4
              </div>
              <div>
                <strong className="font-bold text-slate-900 block text-xs">Matriz & Tabelas de Referência</strong>
                Consulte a tabela oficial de pontuação mínima e diretrizes para sanar qualquer dúvida técnica.
              </div>
            </div>

            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-start space-x-2.5">
              <div className="w-6 h-6 rounded-full bg-[#132247] text-[#EAA816] font-bold flex items-center justify-center shrink-0 text-xs">
                5
              </div>
              <div>
                <strong className="font-bold text-slate-900 block text-xs">Relatório Final e Memorial para o SEI</strong>
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
        <div className="space-y-3.5 text-xs text-slate-700">
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
            <h4 className="font-bold text-emerald-900 text-xs flex items-center gap-1.5">
              <Award className="h-4 w-4 text-emerald-700" />
              Regra da Dupla Aprovação do RSC:
            </h4>
            <p className="text-emerald-800 text-xs leading-relaxed">
              Para obter o deferimento da Comissão Especial do RSC, não basta atingir a pontuação total. O servidor precisa cumprir cumulativamente:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Meta 1</span>
              <strong className="font-bold text-slate-900 block text-xs">Pontuação Mínima Acumulada</strong>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Soma de todos os pontos válidos nos comprovantes inseridos (ex: 10 pts para RSC-I, 20 pts para RSC-II, etc.).
              </p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Meta 2</span>
              <strong className="font-bold text-slate-900 block text-xs">Quantidade de Critérios Distintos</strong>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Exigência de pontuar em itens/categorias diferentes (ex: I.1 + II.3 + IV.1) conforme a tabela oficial.
              </p>
            </div>
          </div>

          <div className="p-3 bg-amber-50/60 border border-amber-200 rounded-lg space-y-1.5">
            <strong className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-amber-600" />
              Barra de Indicador e Alertas Automáticos:
            </strong>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              A barra no topo do aplicativo muda de cor em tempo real:
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px]">
              <span className="px-2 py-0.5 rounded font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                Verde: APTO ao Requerimento SEI
              </span>
              <span className="px-2 py-0.5 rounded font-bold bg-amber-100 text-amber-800 border border-amber-300">
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
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]">
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
            className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition"
            title="Fechar Tutorial"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Step subtitle banner */}
        <div className="bg-slate-100 px-6 py-2 border-b border-slate-200 text-xs font-semibold text-slate-600">
          {currentStepData.subtitle}
        </div>

        {/* Body content */}
        <div className="p-6 overflow-y-auto flex-1">{currentStepData.content}</div>

        {/* Footer controls */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <label className="flex items-center space-x-2 text-xs text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="rounded border-slate-300 text-[#132247] focus:ring-[#132247] h-4 w-4"
            />
            <span>Não mostrar novamente ao abrir o sistema</span>
          </label>

          <div className="flex items-center space-x-2 shrink-0 w-full sm:w-auto justify-end">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition flex items-center gap-1 cursor-pointer"
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
