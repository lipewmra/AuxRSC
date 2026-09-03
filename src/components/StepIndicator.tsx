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
    <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-3 shadow-xs transition-colors duration-200">
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
                        ? 'bg-[#FEF0B2]/90 dark:bg-[#132247] border-2 border-[#EAA816] text-[#132247] dark:text-[#FEF0B2] shadow-xs font-semibold ring-2 ring-[#EAA816]/30'
                        : isCompleted
                        ? 'bg-white dark:bg-white border-emerald-400 dark:border-emerald-500 text-slate-900 dark:text-slate-900 hover:bg-slate-50 dark:hover:bg-slate-100 shadow-xs'
                        : 'bg-white dark:bg-white border-slate-300 dark:border-slate-300 text-slate-900 dark:text-slate-900 hover:bg-slate-50 dark:hover:bg-slate-100 shadow-xs'
                    }`}
                  >
                    <div
                      className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                        isActive
                          ? 'bg-[#132247] text-[#FEF0B2] border-2 border-[#EAA816] shadow-xs ring-2 ring-[#EAA816]/30'
                          : isCompleted
                          ? 'bg-emerald-50 dark:bg-emerald-50 text-emerald-800 dark:text-emerald-800 border border-emerald-300 dark:border-emerald-300'
                          : 'bg-slate-100 dark:bg-slate-100 text-[#132247] dark:text-[#132247] border border-slate-300 dark:border-slate-300'
                      }`}
                    >
                      <Icon
                        className={`h-4.5 w-4.5 shrink-0 ${
                          isActive
                            ? 'text-[#FEF0B2]'
                            : isCompleted
                            ? 'text-emerald-800 dark:text-emerald-800'
                            : 'text-[#132247] dark:text-[#132247]'
                        }`}
                        strokeWidth={isActive ? 2.5 : 2}
                      />
                    </div>
                    <div className="min-w-0 flex-1 hidden sm:block">
                      <p className={`truncate text-xs ${
                        isActive 
                          ? 'font-bold text-[#132247] dark:text-[#FEF0B2]' 
                          : 'font-bold text-slate-900 dark:text-slate-900'
                      }`}>
                        {step.stepNumber}. {step.title}
                      </p>
                      <p className={`text-[10px] truncate ${
                        isActive 
                          ? 'text-[#C28600] dark:text-[#EAA816] font-semibold' 
                          : 'text-slate-600 dark:text-slate-700 font-medium'
                      }`}>
                        {step.desc}
                      </p>
                    </div>
                    <div className={`sm:hidden font-semibold text-xs ${
                      isActive 
                        ? 'text-[#132247] dark:text-[#FEF0B2]' 
                        : 'text-slate-900 dark:text-slate-900'
                    }`}>
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
