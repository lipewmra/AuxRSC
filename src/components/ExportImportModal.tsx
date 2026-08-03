import React, { useRef, useState } from 'react';
import { SessionState } from '../types';
import { Download, Upload, X, CheckCircle2, AlertCircle, FileCode } from 'lucide-react';

interface ExportImportModalProps {
  mode: 'export' | 'import';
  isOpen: boolean;
  onClose: () => void;
  currentSession: SessionState;
  onImportSession: (session: SessionState) => void;
}

export const ExportImportModal: React.FC<ExportImportModalProps> = ({
  mode,
  isOpen,
  onClose,
  currentSession,
  onImportSession,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleExportJSON = () => {
    const jsonString = JSON.stringify(currentSession, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    const cleanName = (currentSession.userProfile.nomeCompleto || 'Servidor')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_');
    const dateStr = new Date().toISOString().split('T')[0];

    link.href = url;
    link.download = `Sessao_RSC_${cleanName}_${dateStr}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportError(null);
    setImportSuccess(false);

    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);

        if (!parsed.userProfile || !Array.isArray(parsed.rscItems)) {
          throw new Error('O arquivo JSON não possui uma estrutura válida de sessão RSC.');
        }

        onImportSession({
          version: parsed.version || '1.0',
          lastModified: parsed.lastModified || new Date().toISOString(),
          userProfile: parsed.userProfile,
          documents: Array.isArray(parsed.documents) ? parsed.documents : [],
          rscItems: parsed.rscItems,
          activeStep: parsed.activeStep || 4,
        });

        setImportSuccess(true);
        setTimeout(() => {
          onClose();
          setImportSuccess(false);
        }, 1200);
      } catch (err: any) {
        setImportError(err.message || 'Erro ao importar arquivo JSON.');
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2.5">
            <div
              className={`h-9 w-9 rounded-xl flex items-center justify-center font-bold text-white ${
                mode === 'export' ? 'bg-indigo-600' : 'bg-blue-600'
              }`}
            >
              {mode === 'export' ? <Download className="h-5 w-5" /> : <Upload className="h-5 w-5" />}
            </div>
            <h2 className="text-base font-bold text-slate-900">
              {mode === 'export' ? 'Salvar Sessão em Arquivo JSON' : 'Importar Sessão Salva (JSON)'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {mode === 'export' ? (
          <div className="space-y-4">
            <p className="text-xs text-slate-600 leading-relaxed">
              Exporta os dados cadastrais do servidor, a lista de documentos em PDF, as categorias mapeadas na Calculadora RSC e os textos das justificativas fundamentadas para um arquivo <strong className="text-slate-900">JSON</strong> local.
            </p>

            <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-xs text-indigo-900 space-y-1">
              <span className="font-semibold block">Conteúdo da Sessão Atual:</span>
              <ul className="list-disc pl-4 text-[11px] space-y-0.5 text-indigo-800">
                <li>Servidor: {currentSession.userProfile.nomeCompleto || 'Sem Nome'}</li>
                <li>RSC Almejado: {currentSession.userProfile.rscAlmejado}</li>
                <li>Itens Mapeados: {currentSession.rscItems.length} itens</li>
                <li>Pontuação Total: {currentSession.rscItems.reduce((s, i) => s + i.totalScore, 0).toFixed(1)} pts</li>
              </ul>
            </div>

            <button
              type="button"
              onClick={handleExportJSON}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="h-4 w-4" />
              <span>Baixar Arquivo JSON da Sessão</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-xs text-slate-600 leading-relaxed">
              Selecione o arquivo <strong className="text-slate-900">.json</strong> salvo anteriormente para restaurar a sessão inteira do Organizador RSC sem perda de informações.
            </p>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json,application/json"
              className="hidden"
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50 hover:bg-blue-50/20 rounded-xl p-6 text-center cursor-pointer transition"
            >
              <FileCode className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-xs font-semibold text-slate-800">Clique para selecionar o arquivo .json</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Sessao_RSC_*.json</p>
            </div>

            {importError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
                <span>{importError}</span>
              </div>
            )}

            {importSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Sessão restaurada com sucesso!</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
