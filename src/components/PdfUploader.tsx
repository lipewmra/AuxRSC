import React, { useRef } from 'react';
import { UploadedDocument } from '../types';
import { FileText, Upload, Trash2, CheckCircle2, AlertCircle, FilePlus, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';

interface PdfUploaderProps {
  documents: UploadedDocument[];
  onAddDocuments: (docs: UploadedDocument[]) => void;
  onRemoveDocument: (docId: string) => void;
  onStartAnalysis: () => void;
  onPrevStep: () => void;
  isAnalyzing: boolean;
}

export const PdfUploader: React.FC<PdfUploaderProps> = ({
  documents,
  onAddDocuments,
  onRemoveDocument,
  onStartAnalysis,
  onPrevStep,
  isAnalyzing,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const files = Array.from(e.target.files) as File[];
    const newDocs: UploadedDocument[] = [];

    for (const file of files) {
      if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
        alert(`O arquivo "${file.name}" não é um PDF válido.`);
        continue;
      }

      // Convert file to base64
      const base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      newDocs.push({
        id: 'doc_' + Math.random().toString(36).substr(2, 9),
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type || 'application/pdf',
        base64Data,
        analyzed: false,
        detectedItemsCount: 0,
      });
    }

    if (newDocs.length > 0) {
      onAddDocuments(newDocs);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileText className="h-5 w-5 text-[#0B1D3A]" />
            Upload de Documentos Comprovatórios em PDF
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Anexe os diplomas, certificados de cursos, portarias de comissão/chefia, artigos e declarações. O sistema analisará o conteúdo do PDF com IA Gemini para sugerir o enquadramento ideal.
          </p>
        </div>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2 bg-[#FEF0B2]/80 hover:bg-[#FEF0B2] text-[#132247] border-2 border-[#EAA816] font-bold rounded-xl text-xs transition flex items-center space-x-2 shrink-0 cursor-pointer shadow-2xs"
        >
          <FilePlus className="h-4 w-4 text-[#132247]" />
          <span>Adicionar PDFs</span>
        </button>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="application/pdf"
        multiple
        className="hidden"
      />

      {/* Dropzone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-[#EAA816] hover:bg-[#FEF0B2]/50 bg-[#FEF0B2]/20 rounded-2xl p-8 text-center cursor-pointer transition group shadow-2xs"
      >
        <div className="mx-auto h-12 w-12 rounded-xl bg-[#132247] text-[#EAA816] border border-[#EAA816] flex items-center justify-center group-hover:scale-110 transition">
          <Upload className="h-6 w-6 text-[#EAA816]" />
        </div>
        <p className="mt-3 text-xs font-bold text-[#132247]">
          Clique para selecionar os arquivos PDF ou arraste-os para esta área
        </p>
        <p className="mt-1 text-[11px] text-slate-500">
          Certificados, Portarias SEI, Declarações de Exercício, Artigos em PDF (máx. 50MB por envio)
        </p>
      </div>

      {/* Uploaded Documents List */}
      {documents.length > 0 ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 px-1">
            <span>Documentos Anexados ({documents.length})</span>
            <span className="text-slate-400 text-[11px]">
              {documents.filter((d) => d.analyzed).length} de {documents.length} analisados
            </span>
          </div>

          {documents.some((d) => d.fileSize > 3.5 * 1024 * 1024) && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-800 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Atenção para Vercel:</span> Você possui arquivo(s) com mais de 3.5MB. Na hospedagem Vercel, payloads de requisições têm limite de upload (~4MB). Se ocorrer falha na análise, recomendamos dividir o PDF ou comprimi-lo antes do envio.
              </div>
            </div>
          )}

          {documents.some((d) => d.analysisError) && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 space-y-2">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                <div className="space-y-1 flex-1">
                  <span className="font-bold text-rose-900 block">Falha detectada na análise de documento(s):</span>
                  {documents.filter((d) => d.analysisError).map((d) => (
                    <div key={d.id} className="text-rose-700">
                      <strong className="font-semibold">{d.fileName}:</strong> {d.analysisError}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-rose-200/80 flex items-center justify-between gap-3">
                <p className="text-[11px] text-rose-700">
                  O sistema agora possui fila cadenciada. Clique para tentar reanalisar apenas os arquivos pendentes:
                </p>
                <button
                  onClick={onStartAnalysis}
                  disabled={isAnalyzing}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold shrink-0 transition flex items-center gap-1.5 shadow-2xs"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Reanalisar Arquivos Pendentes
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-start justify-between gap-3 text-xs"
              >
                <div className="flex items-start space-x-3 min-w-0 flex-1">
                  <div className="h-9 w-9 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 font-bold">
                    PDF
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-slate-900 truncate" title={doc.fileName}>
                      {doc.fileName}
                    </p>
                    <div className="flex items-center space-x-2 text-[11px] text-slate-500 mt-0.5">
                      <span>{formatFileSize(doc.fileSize)}</span>
                      <span>•</span>
                      {doc.analyzed ? (
                        doc.documentoValido === false ? (
                          <span className="text-rose-600 font-semibold flex items-center gap-1" title={doc.motivoRejeicao || 'Documento rejeitado'}>
                            <AlertCircle className="h-3 w-3 text-rose-600" />
                            REJEITADO (Inválido/Ilegível)
                          </span>
                        ) : (
                          <span className="text-emerald-600 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            Válido ({doc.detectedItemsCount} item{doc.detectedItemsCount !== 1 ? 's' : ''})
                          </span>
                        )
                      ) : doc.analysisError ? (
                        <span className="text-rose-600 font-semibold flex items-center gap-1" title={doc.analysisError}>
                          <AlertCircle className="h-3 w-3" />
                          {doc.analysisError.length > 40 ? doc.analysisError.substring(0, 40) + '...' : doc.analysisError}
                        </span>
                      ) : (
                        <span className="text-amber-600 font-medium">Pendente de Análise</span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onRemoveDocument(doc.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                  title="Remover documento"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center text-xs text-slate-500">
          Nenhum PDF anexado ainda. Você pode fazer o upload dos arquivos ou avançar diretamente e cadastrar itens manualmente na calculadora.
        </div>
      )}

      {/* Footer Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={onPrevStep}
          className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition flex items-center gap-1.5"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar para Dados Pessoais</span>
        </button>

        <button
          type="button"
          onClick={onStartAnalysis}
          disabled={isAnalyzing || documents.length === 0}
          className={`px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-sm transition flex items-center space-x-2 border-2 ${
            documents.length === 0
              ? 'bg-slate-300 border-slate-300 cursor-not-allowed'
              : 'bg-[#132247] hover:bg-[#1C3366] border-[#EAA816] cursor-pointer'
          }`}
        >
          <Sparkles className="h-4 w-4 text-[#EAA816]" />
          <span className="text-white font-bold">{isAnalyzing ? 'Analisando PDFs...' : 'Iniciar Análise com IA Gemini'}</span>
          <ArrowRight className="h-4 w-4 text-[#EAA816]" />
        </button>
      </div>
    </div>
  );
};
