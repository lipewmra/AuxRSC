import React from 'react';
import { User, FileText, Sparkles, LayoutGrid, CheckCircle2 } from 'lucide-react';

interface StepIndicatorProps {
  activeStep: number;
  onSelectStep: (step: number) => void;
  completedSteps: number[];
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  activeStep,
  onSelectStep,
  completedSteps,
}) => {
  // O Passo 3 (Análise IA) é executado como processo em background/modal e não aparece no menu visível conforme solicitado pelo usuário
  const steps = [
    { id: 1, stepNumber: 1, title: 'Dados do Servidor', icon: User, desc: 'Perfil e Ingresso' },
    { id: 2, stepNumber: 2, title: 'Upload de PDFs', icon: FileText, desc: 'Envio de Comprovantes' },
    { id: 4, stepNumber: 3, title: 'Calculadora RSC', icon: LayoutGrid, desc: 'Organizador e Textos' },
    { id: 5, stepNumber: 4, title: 'Relatório Final', icon: CheckCircle2, desc: 'Pontuação e Parecer' },
  ];

  return (
    <div className="bg-white border-b border-slate-200 py-3 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Progress">
          <ol className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            {steps.map((step) => {
              const Icon = step.icon;
              // Se o activeStep for 3 (durante a análise), destacamos o passo 2 ou 4
              const isActive = activeStep === step.id || (activeStep === 3 && step.id === 2);
              const isCompleted = completedSteps.includes(step.id);

              return (
                <li key={step.id}>
                  <button
                    type="button"
                    onClick={() => onSelectStep(step.id)}
                    className={`w-full text-left p-2.5 rounded-xl transition border text-xs flex items-center space-x-3 cursor-pointer ${
                      isActive
                        ? 'bg-[#FEF0B2]/80 border-2 border-[#EAA816] text-[#132247] shadow-xs font-semibold'
                        : isCompleted
                        ? 'bg-slate-50 border-slate-300 text-slate-800 hover:bg-[#FEF0B2]/40 hover:border-[#EAA816]/60'
                        : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    <div
                      className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                        isActive
                          ? 'bg-[#132247] text-[#FEF0B2] border-2 border-[#EAA816] shadow-xs ring-2 ring-[#EAA816]/30'
                          : isCompleted
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                          : 'bg-white text-[#132247] border border-slate-300'
                      }`}
                    >
                      <Icon
                        className="h-4.5 w-4.5 shrink-0"
                        strokeWidth={isActive ? 2.5 : 2}
                        style={{
                          color: isActive ? '#FEF0B2' : isCompleted ? '#047857' : '#132247',
                          stroke: isActive ? '#FEF0B2' : isCompleted ? '#047857' : '#132247',
                        }}
                      />
                    </div>
                    <div className="min-w-0 flex-1 hidden sm:block">
                      <p className={`truncate text-xs ${isActive ? 'font-bold text-[#132247]' : 'font-medium text-slate-800'}`}>
                        {step.stepNumber}. {step.title}
                      </p>
                      <p className={`text-[10px] truncate ${isActive ? 'text-[#C28600] font-semibold' : 'text-slate-500'}`}>{step.desc}</p>
                    </div>
                    <div className="sm:hidden font-semibold text-xs text-[#132247]">
                      Passo {step.stepNumber}
                    </div>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
};
