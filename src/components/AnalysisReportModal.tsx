import React from 'react';
import { X, CheckCircle, AlertTriangle, FileText, Sparkles, Cpu, Clock, ShieldCheck } from 'lucide-react';
import { UploadedDocument, RSCItem, AnalysisLogEntry } from '../types';

interface AnalysisReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  documents: UploadedDocument[];
  rscItems: RSCItem[];
  analysisLogs?: AnalysisLogEntry[];
}

export const AnalysisReportModal: React.FC<AnalysisReportModalProps> = ({
  isOpen,
  onClose,
  documents,
  rscItems,
  analysisLogs = [],
}) => {
  if (!isOpen) return null;

  const totalDocs = documents.length;
  const analyzedDocs = documents.filter((d) => d.analyzed);
  const validDocs = documents.filter((d) => d.analyzed && d.documentoValido !== false);
  const rejectedDocs = documents.filter((d) => d.analyzed && d.documentoValido === false);

  const totalExtractedItems = rscItems.length;
  const totalScoreComputed = rscItems
    .filter((it) => !it.isPriorToPublicService && !it.isDiscarded)
    .reduce((acc, it) => acc + it.totalScore, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-xl bg-indigo-600/40 border border-indigo-400/30 flex items-center justify-center shrink-0">
              <Sparkles className="h-5 w-5 text-indigo-300" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                Relatório de Processamento da IA (Passo 3)
                <span className="bg-indigo-500/30 text-indigo-200 border border-indigo-400/40 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                  Log Consolidado
                </span>
              </h3>
              <p className="text-xs text-slate-300">
                Auditoria completa da extração inteligente, modelos utilizados e validações documentais
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer"
            title="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
              <span className="text-[11px] font-semibold text-slate-500 uppercase block">Documentos Analisados</span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">
                {analyzedDocs.length} <span className="text-xs font-normal text-slate-400">de {totalDocs}</span>
              </span>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5">
              <span className="text-[11px] font-semibold text-emerald-700 uppercase block">Comprovantes Válidos</span>
              <span className="text-2xl font-black text-emerald-800 mt-1 block">
                {validDocs.length}
              </span>
            </div>

            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3.5">
              <span className="text-[11px] font-semibold text-indigo-700 uppercase block">Itens Extraídos</span>
              <span className="text-2xl font-black text-indigo-900 mt-1 block">
                {totalExtractedItems}
              </span>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5">
              <span className="text-[11px] font-semibold text-amber-800 uppercase block">Pontuação Apurada</span>
              <span className="text-2xl font-black text-amber-900 mt-1 block">
                {totalScoreComputed.toFixed(1)} <span className="text-xs font-normal text-amber-700">pts</span>
              </span>
            </div>
          </div>

          {/* AI Model Strategy Banner */}
          <div className="bg-indigo-50/70 border border-indigo-200 rounded-xl p-4 text-xs text-indigo-950 flex items-start gap-3">
            <Cpu className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-bold text-indigo-900">Estratégia de Execução Econômica e Eficiente da IA</h4>
              <p className="text-indigo-800 leading-relaxed text-[11px]">
                O sistema prioriza automaticamente o modelo de alta eficiência e menor custo operacional (<strong>Gemini 3.1 Flash-Lite</strong>). Caso o modelo principal enfrente sobrecarga temporária de cota ou instabilidade de rede, o pipeline aciona fallback imediato e transparente para modelos secundários (<strong>Gemini 3.8 Flash</strong> e <strong>Gemini Flash Latest</strong>) sem interrupção para o usuário.
              </p>
            </div>
          </div>

          {/* Detailed Document Table */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <FileText className="h-4 w-4 text-slate-600" />
              Detalhamento Documento a Documento
            </h4>

            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Nome do Arquivo</th>
                    <th className="p-3">Status do Gatekeeper</th>
                    <th className="p-3">Itens Detectados</th>
                    <th className="p-3">Confiança OCR</th>
                    <th className="p-3">Pontos Gerados</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {documents.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-4 text-center text-slate-500">
                        Nenhum documento enviado para análise.
                      </td>
                    </tr>
                  ) : (
                    documents.map((doc) => {
                      const docItems = rscItems.filter((it) => it.documentId === doc.id || it.documentName === doc.fileName);
                      const docScore = docItems
                        .filter((it) => !it.isPriorToPublicService && !it.isDiscarded)
                        .reduce((acc, it) => acc + it.totalScore, 0);

                      const log = analysisLogs.find((l) => l.docId === doc.id || l.fileName === doc.fileName);
                      const modelName = log?.modelUsed || 'gemini-3.1-flash-lite';

                      return (
                        <tr key={doc.id} className="hover:bg-slate-50 transition">
                          <td className="p-3 font-semibold text-slate-800">
                            <div className="flex items-center gap-2">
                              <FileText className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                              <span className="truncate max-w-[200px] sm:max-w-xs" title={doc.fileName}>
                                {doc.fileName}
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-400 font-normal block mt-0.5">
                              {(doc.fileSize / 1024).toFixed(0)} KB • Modelo: {modelName}
                            </span>
                          </td>
                          <td className="p-3">
                            {doc.documentoValido === false ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 font-bold text-[10px] border border-rose-300">
                                <AlertTriangle className="h-3 w-3 text-rose-600" />
                                Rejeitado
                              </span>
                            ) : doc.analyzed ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[10px] border border-emerald-300">
                                <CheckCircle className="h-3 w-3 text-emerald-600" />
                                Aprovado ({doc.tipoDocumento || 'Oficial'})
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium text-[10px]">
                                <Clock className="h-3 w-3" /> Pendente
                              </span>
                            )}
                            {doc.motivoRejeicao && (
                              <p className="text-[10px] text-rose-700 mt-1 max-w-xs font-normal">
                                {doc.motivoRejeicao}
                              </p>
                            )}
                          </td>
                          <td className="p-3">
                            <span className="font-bold text-slate-900">
                              {docItems.length} {docItems.length === 1 ? 'atividade' : 'atividades'}
                            </span>
                          </td>
                          <td className="p-3">
                            <span
                              className={`font-semibold text-[11px] ${
                                doc.confiancaOcr === 'Alta'
                                  ? 'text-emerald-700'
                                  : doc.confiancaOcr === 'Media'
                                  ? 'text-amber-700'
                                  : 'text-slate-500'
                              }`}
                            >
                              {doc.confiancaOcr || 'Alta'}
                            </span>
                          </td>
                          <td className="p-3 font-bold text-indigo-900">
                            {docScore > 0 ? `+${docScore.toFixed(1)} pts` : '0.0 pts'}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3.5 flex items-center justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition cursor-pointer shadow-xs"
          >
            Fechar Relatório
          </button>
        </div>
      </div>
    </div>
  );
};
