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
  const steps = [
    { id: 1, title: 'Dados do Servidor', icon: User, desc: 'Perfil e RSC Almejado' },
    { id: 2, title: 'Upload de PDFs', icon: FileText, desc: 'Comprovantes e Cursos' },
    { id: 3, title: 'Análise Inteligente', icon: Sparkles, desc: 'Extração via IA' },
    { id: 4, title: 'Calculadora RSC', icon: LayoutGrid, desc: 'Organizador e Textos' },
    { id: 5, title: 'Relatório Final', icon: CheckCircle2, desc: 'Pontuação e Conformidade' },
  ];

  const iconBgMap: Record<number, string> = {
    1: '#fff6f6',
    2: '#f8fafb',
    3: '#ffffff',
    4: '#ffffff',
    5: '#ffffff',
  };

  return (
    <div className="bg-white border-b border-slate-200 py-3 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Progress">
          <ol className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = activeStep === step.id;
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
                      style={{ backgroundColor: iconBgMap[step.id] }}
                      className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isActive
                          ? 'bg-[#132247] text-[#EAA816] border border-[#EAA816]'
                          : isCompleted
                          ? 'bg-[#132247] text-[#54B0EE] stroke-[2.5]'
                          : 'bg-slate-100 text-[#132247]'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1 hidden sm:block">
                      <p className={`truncate text-xs ${isActive ? 'font-bold text-[#132247]' : 'font-medium text-slate-800'}`}>
                        {step.id}. {step.title}
                      </p>
                      <p className={`text-[10px] truncate ${isActive ? 'text-[#C28600] font-semibold' : 'text-slate-500'}`}>{step.desc}</p>
                    </div>
                    <div className="sm:hidden font-semibold text-xs text-[#132247]">
                      Passo {step.id}
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
