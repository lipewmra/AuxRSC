import React, { useState, useEffect } from 'react';
import {
  KeyRound,
  X,
  ExternalLink,
  Check,
  Trash2,
  Shield,
  Eye,
  EyeOff,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';
import { getStoredGeminiApiKey, setStoredGeminiApiKey, removeStoredGeminiApiKey } from '../utils/apiKey';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  requiredReason?: string | null;
  onKeySaved?: () => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  requiredReason,
  onKeySaved,
}) => {
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [hasStoredKey, setHasStoredKey] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const currentKey = getStoredGeminiApiKey();
      setApiKeyInput(currentKey);
      setHasStoredKey(!!currentKey);
      setSavedSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = apiKeyInput.trim();
    if (!trimmed) {
      alert('Por favor, insira uma chave válida do Google AI Studio.');
      return;
    }
    setStoredGeminiApiKey(trimmed);
    setHasStoredKey(true);
    setSavedSuccess(true);
    if (onKeySaved) {
      onKeySaved();
    }
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  const handleRemove = () => {
    removeStoredGeminiApiKey();
    setApiKeyInput('');
    setHasStoredKey(false);
    setSavedSuccess(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#132247] text-white px-5 py-4 flex items-center justify-between border-b border-[#EAA816]">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-[#FEF0B2]/10 rounded-lg border border-[#EAA816]/40">
              <KeyRound className="h-5 w-5 text-[#EAA816]" />
            </div>
            <div>
              <h2 className="text-base font-bold">Chave de API da IA Gemini</h2>
              <p className="text-xs text-slate-300">Necessária para leitura de PDFs e geração de textos</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition cursor-pointer"
            title="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 space-y-5">
          {/* Action Interception Alert Banner if requiredReason is set */}
          {requiredReason && !hasStoredKey && (
            <div className="p-3.5 bg-amber-50 border-2 border-amber-300 rounded-xl flex items-start space-x-3 text-amber-950 text-xs shadow-xs">
              <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <strong className="font-bold text-amber-950 block text-xs">
                  Chave de IA Requerida para Prosseguir!
                </strong>
                <p className="leading-relaxed text-amber-900">{requiredReason}</p>
              </div>
            </div>
          )}

          {/* Current Status Badge */}
          <div className="p-3.5 rounded-xl border text-xs flex items-center justify-between bg-slate-50 border-slate-200">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-[#132247]" />
              <span className="font-medium text-slate-700">Status de Conexão:</span>
            </div>
            {hasStoredKey ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Chave Própria Ativa
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                Aguardando Chave
              </span>
            )}
          </div>

          {/* STEP-BY-STEP TUTORIAL BOX ON HOW TO CREATE THE KEY */}
          <div className="bg-[#FEF0B2]/30 border border-[#EAA816]/70 rounded-xl p-4 text-xs text-slate-800 space-y-3">
            <div className="flex items-center space-x-2 text-[#132247] font-bold text-xs uppercase tracking-wider">
              <HelpCircle className="h-4 w-4 text-[#C28600]" />
              <span>Tutorial: Como Criar sua Chave Gratuita em 4 Passos</span>
            </div>

            <ol className="space-y-2 pl-2">
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#132247] text-[#EAA816] font-bold text-[10px] flex items-center justify-center shrink-0">
                  1
                </span>
                <div>
                  <strong>Acesse o Google AI Studio:</strong>{' '}
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-[#132247] hover:text-[#2B96E3] underline"
                  >
                    Clique aqui para abrir a página oficial <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#132247] text-[#EAA816] font-bold text-[10px] flex items-center justify-center shrink-0">
                  2
                </span>
                <div>
                  <strong>Faça Login:</strong> Use sua conta normal do Google (Gmail ou Institucional).
                </div>
              </li>

              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#132247] text-[#EAA816] font-bold text-[10px] flex items-center justify-center shrink-0">
                  3
                </span>
                <div>
                  <strong>Gere a Chave:</strong> Clique no botão azul <strong>"Create API key"</strong> e copie a sequência (ex: <code>AIzaSy...</code>).
                </div>
              </li>

              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#132247] text-[#EAA816] font-bold text-[10px] flex items-center justify-center shrink-0">
                  4
                </span>
                <div>
                  <strong>Cole e Salve:</strong> Cole o código no campo abaixo e clique em <strong>"Salvar Chave"</strong>.
                </div>
              </li>
            </ol>
          </div>

          {/* Form Input */}
          <form onSubmit={handleSave} className="space-y-4 pt-1">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Cole sua Chave GEMINI_API_KEY
              </label>
              <div className="relative">
                <input
                  type={showKey ? 'text' : 'password'}
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  placeholder="Cole sua chave AIzaSy..."
                  required
                  className="w-full pr-10 pl-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#132247] focus:border-[#132247] font-mono text-slate-800 bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
                  title={showKey ? 'Ocultar' : 'Exibir'}
                >
                  {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Sua chave é gravada <strong>exclusivamente no seu navegador</strong> (localStorage) e não fica salva nos nossos servidores.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-2">
              {hasStoredKey ? (
                <button
                  type="button"
                  onClick={handleRemove}
                  className="px-3 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-50 border border-rose-200 rounded-lg transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Remover
                </button>
              ) : (
                <div />
              )}

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg border border-slate-300 transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-[#132247] hover:bg-[#1C3366] rounded-lg border border-[#EAA816] transition flex items-center gap-1.5 cursor-pointer shadow-xs hover:scale-102"
                >
                  {savedSuccess ? (
                    <>
                      <Check className="h-4 w-4 text-[#EAA816]" /> Salvo com Sucesso!
                    </>
                  ) : (
                    <>
                      Salvar e Liberar IA <ArrowRight className="h-3.5 w-3.5 text-[#EAA816]" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

