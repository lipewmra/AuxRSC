import React, { useState, useEffect } from 'react';
import { KeyRound, X, ExternalLink, Check, Trash2, Shield, Eye, EyeOff, Sparkles, CheckCircle2 } from 'lucide-react';
import { getStoredGeminiApiKey, setStoredGeminiApiKey, removeStoredGeminiApiKey } from '../utils/apiKey';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose }) => {
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
    setStoredGeminiApiKey(apiKeyInput);
    setHasStoredKey(!!apiKeyInput.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleRemove = () => {
    removeStoredGeminiApiKey();
    setApiKeyInput('');
    setHasStoredKey(false);
    setSavedSuccess(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-[#132247] text-white px-5 py-4 flex items-center justify-between border-b border-[#EAA816]">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-[#FEF0B2]/10 rounded-lg border border-[#EAA816]/40">
              <KeyRound className="h-5 w-5 text-[#EAA816]" />
            </div>
            <div>
              <h2 className="text-base font-bold">Chave de API do Gemini</h2>
              <p className="text-xs text-slate-300">Configuração individual por usuário</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition"
            title="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSave} className="p-6 space-y-5">
          {/* Current Status Badge */}
          <div className="p-3.5 rounded-lg border text-xs flex items-center justify-between bg-slate-50 border-slate-200">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-[#132247]" />
              <span className="font-medium text-slate-700">Status de Conexão:</span>
            </div>
            {hasStoredKey ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Chave Própria Ativa
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-300">
                Sem Chave Individual
              </span>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Sua Chave do Google AI Studio (GEMINI_API_KEY)
            </label>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="Cole sua chave AIzaSy..."
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
              Sua chave fica salva <strong>exclusivamente no seu navegador</strong> (localStorage) e é enviada diretamente para processar suas análises de PDF e geração de pareceres.
            </p>
          </div>

          {/* Guide link */}
          <div className="bg-[#FEF0B2]/30 border border-[#EAA816]/60 rounded-lg p-3.5 text-xs text-slate-700 flex items-start space-x-2.5">
            <Sparkles className="h-4 w-4 text-[#C28600] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-[#132247]">Como obter sua chave gratuita:</p>
              <p className="text-slate-600">
                Acesse o Google AI Studio com sua conta Google e clique em <strong>"Create API Key"</strong>. A cota gratuita é ideal para uso pessoal do RSC.
              </p>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-bold text-[#132247] hover:text-[#2B96E3] hover:underline pt-1"
              >
                Obter minha GEMINI_API_KEY no Google AI Studio <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between pt-2">
            {hasStoredKey ? (
              <button
                type="button"
                onClick={handleRemove}
                className="px-3 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-50 border border-rose-200 rounded-lg transition flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Remover Chave
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
                className="px-4 py-2 text-xs font-bold text-white bg-[#132247] hover:bg-[#1C3366] rounded-lg border border-[#EAA816] transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                {savedSuccess ? (
                  <>
                    <Check className="h-4 w-4 text-[#EAA816]" /> Salvo!
                  </>
                ) : (
                  'Salvar Chave'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
