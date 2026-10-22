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
  Activity,
  RefreshCw,
  Wifi,
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
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    connected: boolean;
    activeModel?: string;
    latencyMs?: number;
    message?: string;
    keySource?: string;
  } | null>(null);

  useEffect(() => {
    if (isOpen) {
      const currentKey = getStoredGeminiApiKey();
      setApiKeyInput(currentKey);
      setHasStoredKey(!!currentKey);
      setSavedSuccess(false);
      setTestResult(null);
    }
  }, [isOpen]);

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const keyToTest = apiKeyInput.trim() || getStoredGeminiApiKey();
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (keyToTest) {
        headers['x-gemini-api-key'] = keyToTest;
      }

      const res = await fetch('/api/gemini-status', {
        method: 'POST',
        headers,
      });
      const data = await res.json();
      setTestResult(data);
    } catch (err: any) {
      setTestResult({
        connected: false,
        message: 'Falha ao conectar com o servidor da aplicação.',
      });
    } finally {
      setIsTesting(false);
    }
  };

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
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
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
            <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-800 rounded-xl flex items-start space-x-3 text-amber-950 dark:text-amber-200 text-xs shadow-xs">
              <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <strong className="font-bold text-amber-950 dark:text-amber-100 block text-xs">
                  Chave de IA Requerida para Prosseguir!
                </strong>
                <p className="leading-relaxed text-amber-900 dark:text-amber-300">{requiredReason}</p>
              </div>
            </div>
          )}

          {/* Current Status Badge */}
          <div className="p-3.5 rounded-xl border text-xs flex items-center justify-between bg-slate-50 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-[#132247] dark:text-indigo-400" />
              <span className="font-medium text-slate-700 dark:text-slate-300">Status de Conexão:</span>
            </div>
            {hasStoredKey ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> Chave Própria Ativa
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
                Aguardando Chave
              </span>
            )}
          </div>

          {/* Real-time Connection Diagnostic */}
          <div className="p-3.5 rounded-xl border text-xs bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4 text-[#132247] dark:text-[#EAA816]" />
                <span className="font-bold text-slate-800 dark:text-slate-200">Diagnóstico da Conexão IA</span>
              </div>
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={isTesting}
                className="px-3 py-1.5 bg-[#132247] hover:bg-[#1C3366] text-white text-[11px] font-bold rounded-lg border border-[#EAA816]/50 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`h-3 w-3 text-[#EAA816] ${isTesting ? 'animate-spin' : ''}`} />
                <span>{isTesting ? 'Testando...' : 'Testar Conexão Agora'}</span>
              </button>
            </div>

            {testResult && (
              <div
                className={`p-3 rounded-lg border text-xs space-y-1.5 animate-fade-in ${
                  testResult.connected
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                    : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold">
                  {testResult.connected ? (
                    <>
                      <Wifi className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      <span>Conexão Operacional com Gemini Flash</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                      <span>Falha de Conexão</span>
                    </>
                  )}
                </div>

                <p className="text-[11px] leading-relaxed opacity-95">
                  {testResult.message}
                </p>

                {testResult.connected && (
                  <div className="pt-1 flex flex-wrap gap-2 text-[10px] text-emerald-800 dark:text-emerald-300">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/60 font-semibold border border-emerald-200 dark:border-emerald-800">
                      Modelo: {testResult.activeModel}
                    </span>
                    {testResult.latencyMs && (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/60 font-semibold border border-emerald-200 dark:border-emerald-800">
                        Latência: {testResult.latencyMs}ms
                      </span>
                    )}
                    {testResult.keySource && (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/60 font-semibold border border-emerald-200 dark:border-emerald-800">
                        Origem: {testResult.keySource}
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* STEP-BY-STEP TUTORIAL BOX ON HOW TO CREATE THE KEY */}
          <div className="bg-[#FEF0B2]/30 dark:bg-amber-950/20 border border-[#EAA816]/70 dark:border-[#EAA816]/40 rounded-xl p-4 text-xs text-slate-800 dark:text-slate-200 space-y-3">
            <div className="flex items-center space-x-2 text-[#132247] dark:text-[#FEF0B2] font-bold text-xs uppercase tracking-wider">
              <HelpCircle className="h-4 w-4 text-[#C28600] dark:text-[#EAA816]" />
              <span>Tutorial: Como Criar sua Chave Gratuita em 4 Passos</span>
            </div>

            <ol className="space-y-2 pl-2">
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#132247] dark:bg-slate-800 text-[#EAA816] font-bold text-[10px] flex items-center justify-center shrink-0 border border-[#EAA816]/30">
                  1
                </span>
                <div>
                  <strong>Acesse o Google AI Studio:</strong>{' '}
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-[#132247] dark:text-indigo-400 hover:text-[#2B96E3] underline"
                  >
                    Clique aqui para abrir a página oficial <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#132247] dark:bg-slate-800 text-[#EAA816] font-bold text-[10px] flex items-center justify-center shrink-0 border border-[#EAA816]/30">
                  2
                </span>
                <div>
                  <strong>Faça Login:</strong> Use sua conta normal do Google (Gmail ou Institucional).
                </div>
              </li>

              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#132247] dark:bg-slate-800 text-[#EAA816] font-bold text-[10px] flex items-center justify-center shrink-0 border border-[#EAA816]/30">
                  3
                </span>
                <div>
                  <strong>Gere a Chave:</strong> Clique no botão azul <strong>"Create API key"</strong> e copie a sequência (ex: <code>AIzaSy...</code>).
                </div>
              </li>

              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#132247] dark:bg-slate-800 text-[#EAA816] font-bold text-[10px] flex items-center justify-center shrink-0 border border-[#EAA816]/30">
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
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                Cole sua Chave GEMINI_API_KEY
              </label>
              <div className="relative">
                <input
                  type={showKey ? 'text' : 'password'}
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  placeholder="Cole sua chave AIzaSy..."
                  required
                  className="w-full pr-10 pl-3 py-2.5 text-sm border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-[#132247] focus:border-[#132247] font-mono text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  title={showKey ? 'Ocultar' : 'Exibir'}
                >
                  {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Sua chave é gravada <strong>exclusivamente no seu navegador</strong> (localStorage) e não fica salva nos nossos servidores.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-2">
              {hasStoredKey ? (
                <button
                  type="button"
                  onClick={handleRemove}
                  className="px-3 py-2 text-xs font-semibold text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-lg transition flex items-center gap-1.5 cursor-pointer"
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
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 transition cursor-pointer"
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

