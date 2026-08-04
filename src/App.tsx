import React, { useState, useEffect } from 'react';
import { AlertTriangle, Mail } from 'lucide-react';
import { UserProfile, UploadedDocument, RSCItem, SessionState } from './types';
import { STANDARD_CATEGORIES } from './data/rscStructure';
import { Header } from './components/Header';
import { StepIndicator } from './components/StepIndicator';
import { ProfileForm } from './components/ProfileForm';
import { PdfUploader } from './components/PdfUploader';
import { AnalysisProgress } from './components/AnalysisProgress';
import { RscCalculatorOrganizer } from './components/RscCalculatorOrganizer';
import { ComplianceSummary } from './components/ComplianceSummary';
import { LegalKnowledgeBase } from './components/LegalKnowledgeBase';
import { ExportImportModal } from './components/ExportImportModal';
import { ApiKeyModal } from './components/ApiKeyModal';
import { OnboardingTutorialModal } from './components/OnboardingTutorialModal';
import { RscIntroAnimationModal } from './components/RscIntroAnimationModal';
import { getApiHeaders } from './utils/apiKey';
import footerLogo from './assets/images/regenerated_image_1785769091029.png';

export default function App() {
  // Main State
  const [userProfile, setUserProfile] = useState<UserProfile>({
    nomeCompleto: '',
    cpf: '',
    siape: '',
    cargo: '',
    nivelClassificacao: 'E',
    lotacao: '',
    titulacaoAtual: 'graduacao',
    rscAlmejado: 'RSC-PCCTAE I',
    dataRequerimento: new Date().toISOString().split('T')[0],
    dataExercicio: '',
    observacoes: '',
  });

  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const [rscItems, setRscItems] = useState<RSCItem[]>([]);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Modals & Overlay States
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [isTutorialModalOpen, setIsTutorialModalOpen] = useState(false);
  const [isIntroAnimationOpen, setIsIntroAnimationOpen] = useState(false);
  const [exportImportModalMode, setExportImportModalMode] = useState<'export' | 'import' | null>(null);

  // Auto-open celebration animation then tutorial on first visit
  useEffect(() => {
    const hasSeen = localStorage.getItem('rsc_has_seen_tutorial_v1');
    if (!hasSeen) {
      setIsIntroAnimationOpen(true);
    }
  }, []);

  // Analysis State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [totalFilesToAnalyze, setTotalFilesToAnalyze] = useState(0);
  const [currentFileAnalyzing, setCurrentFileAnalyzing] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  // Total Score Calculation
  const totalScore = rscItems.reduce((acc, curr) => acc + curr.totalScore, 0);

  // Document Management
  const handleAddDocuments = (newDocs: UploadedDocument[]) => {
    setDocuments((prev) => [...prev, ...newDocs]);
  };

  const handleRemoveDocument = (docId: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== docId));
    setRscItems((prev) => prev.filter((item) => item.documentId !== docId));
  };

  // Run Gemini PDF Analysis Server-Side
  const handleStartAnalysis = async () => {
    const docsToAnalyze = documents.filter((d) => !d.analyzed && d.base64Data);
    if (docsToAnalyze.length === 0) {
      setActiveStep(4);
      return;
    }

    setActiveStep(3);
    setIsAnalyzing(true);
    setTotalFilesToAnalyze(docsToAnalyze.length);
    setAnalysisProgress(0);

    const updatedDocs = [...documents];
    const newExtractedItems: RSCItem[] = [];

    for (let i = 0; i < docsToAnalyze.length; i++) {
      const doc = docsToAnalyze[i];
      setCurrentFileAnalyzing(doc.fileName);
      setStatusMessage(`Analisando e extraindo comprovante ${i + 1} de ${docsToAnalyze.length}...`);

      try {
        const response = await fetch('/api/analyze-pdf', {
          method: 'POST',
          headers: getApiHeaders(),
          body: JSON.stringify({
            base64Data: doc.base64Data,
            fileName: doc.fileName,
            fileType: doc.fileType,
            userProfile,
          }),
        });

        if (!response.ok) {
          const errJson = await response.json().catch(() => ({}));
          throw new Error(errJson.error || 'Erro na resposta do servidor.');
        }

        const data = await response.json();
        const extracted = data.items || [];

        // Convert extracted items to RSCItem and cross-reference with STANDARD_CATEGORIES
        extracted.forEach((item: any) => {
          const matchedCategory = STANDARD_CATEGORIES.find(
            (c) => c.code?.trim().toUpperCase() === item.categoryCode?.trim().toUpperCase()
          );

          const finalCategoryCode = matchedCategory ? matchedCategory.code : (item.categoryCode || 'I.1');
          const finalDirectiveId = matchedCategory ? matchedCategory.directiveId : (item.directiveId || 'requisito_1');
          const finalCategoryName = matchedCategory ? matchedCategory.title : (item.categoryName || 'Categoria RSC');
          const finalUnitPoints = matchedCategory ? matchedCategory.unitPoints : (item.unitPoints || 1.0);
          const finalQuantity = item.quantity && item.quantity > 0 ? item.quantity : 1;
          const calculatedTotalScore = finalUnitPoints * finalQuantity;

          newExtractedItems.push({
            id: 'item_' + Math.random().toString(36).substr(2, 9),
            documentId: doc.id,
            documentName: doc.fileName,
            title: item.title || `Item de ${doc.fileName}`,
            issuer: item.orgaoEmissor || item.issuer || 'Emissor não identificado',
            startDate: item.startDate,
            endDate: item.endDate,
            workloadHours: item.workloadHours,
            directiveId: finalDirectiveId,
            categoryCode: finalCategoryCode,
            categoryName: finalCategoryName,
            unitPoints: finalUnitPoints,
            quantity: finalQuantity,
            totalScore: calculatedTotalScore,
            justificationText: item.justificationText || '',
            regulatoryBasis: matchedCategory?.legalRef || item.regulatoryBasis || 'Lei 15.367/2026 / Tabela RSC',
            complianceStatus: item.complianceStatus || 'valid',
            complianceNotes: item.complianceNotes || [],

            // Campos detalhados conforme diretrizes do RSC-PCCTAE
            periodoVigencia: item.periodoVigencia || (item.startDate ? `${item.startDate} ${item.endDate ? `a ${item.endDate}` : ''}` : 'Não especificado no PDF'),
            finalidadeDocumento: item.finalidadeDocumento || 'Comprovação das atividades para pontuação no RSC',
            orgaoEmissor: item.orgaoEmissor || item.issuer || 'Órgão Emissor',
            numeroIdentificacaoSei: item.numeroIdentificacaoSei || 'Documento Anexo',
            dataDocumento: item.dataDocumento || item.endDate || item.startDate || 'Não especificada',
            experienciaProfissionalTexto: item.experienciaProfissionalTexto || '',
            diferencialAtuacaoTexto: item.diferencialAtuacaoTexto || '',
            impactosSaberesTexto: item.impactosSaberesTexto || '',
          });
        });

        // Mark doc as analyzed
        const docIdx = updatedDocs.findIndex((d) => d.id === doc.id);
        if (docIdx !== -1) {
          updatedDocs[docIdx] = {
            ...updatedDocs[docIdx],
            analyzed: true,
            detectedItemsCount: extracted.length,
          };
        }
      } catch (err: any) {
        console.error(`Erro ao analisar ${doc.fileName}:`, err);
        const docIdx = updatedDocs.findIndex((d) => d.id === doc.id);
        if (docIdx !== -1) {
          updatedDocs[docIdx] = {
            ...updatedDocs[docIdx],
            analysisError: err.message || 'Erro de leitura',
          };
        }
      }

      setAnalysisProgress(i + 1);
    }

    setDocuments(updatedDocs);
    setRscItems((prev) => [...prev, ...newExtractedItems]);
    setIsAnalyzing(false);
    setCompletedSteps((prev) => Array.from(new Set([...prev, 1, 2, 3])));
    setActiveStep(4);
  };

  // Regenerate Justification via API
  const handleRegenerateJustification = async (item: RSCItem) => {
    try {
      const response = await fetch('/api/generate-justification', {
        method: 'POST',
        headers: getApiHeaders(),
        body: JSON.stringify({ item, userProfile }),
      });

      if (response.ok) {
        const data = await response.json();
        handleUpdateItem({
          ...item,
          justificationText: data.justificationText || item.justificationText,
          experienciaProfissionalTexto: data.experienciaProfissionalTexto || item.experienciaProfissionalTexto,
          diferencialAtuacaoTexto: data.diferencialAtuacaoTexto || item.diferencialAtuacaoTexto,
          impactosSaberesTexto: data.impactosSaberesTexto || item.impactosSaberesTexto,
        });
      }
    } catch (err) {
      console.error('Erro ao regerar justificativa:', err);
    }
  };

  // Item Modifiers
  const handleUpdateItem = (updated: RSCItem) => {
    setRscItems((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
  };

  const handleDeleteItem = (itemId: string) => {
    setRscItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleAddItem = (newItem: RSCItem) => {
    setRscItems((prev) => [newItem, ...prev]);
  };

  // Import Session Handler
  const handleImportSession = (imported: SessionState) => {
    if (imported.userProfile) setUserProfile(imported.userProfile);
    if (imported.documents) setDocuments(imported.documents);
    if (imported.rscItems) setRscItems(imported.rscItems);
    if (imported.activeStep) setActiveStep(imported.activeStep);
  };

  const currentSession: SessionState = {
    version: '1.0',
    lastModified: new Date().toISOString(),
    userProfile,
    documents,
    rscItems,
    activeStep,
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 font-sans flex flex-col">
      {/* Fixed Notice Banner Top */}
      <div className="bg-[#FEF0B2] border-b-2 border-[#EAA816] text-[#132247] px-4 py-2 text-xs text-center font-medium flex items-center justify-center gap-2 shadow-2xs">
        <AlertTriangle className="h-4 w-4 text-[#132247] shrink-0" />
        <span>
          <strong className="text-[#C28600]">ATENÇÃO:</strong> O sistema auxilia no preenchimento da calculadora RSC, mas todos os dados devem ser conferidos antes de sua inclusão no sistema oficial. Como a Inteligência Artificial pode apresentar divergências ou inconsistências (&quot;alucinações&quot;), o usuário deve sempre revisar todo o conteúdo gerado. Não nos responsabilizamos pelas informações produzidas.
        </span>
      </div>

      {/* App Header */}
      <Header
        userProfile={userProfile}
        totalScore={totalScore}
        rscItemCount={rscItems.length}
        rscItems={rscItems}
        onOpenExport={() => setExportImportModalMode('export')}
        onOpenImport={() => setExportImportModalMode('import')}
        onOpenLegalModal={() => setIsLegalModalOpen(true)}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        onOpenTutorial={() => setIsIntroAnimationOpen(true)}
      />

      {/* Step Tracker */}
      <StepIndicator
        activeStep={activeStep}
        onSelectStep={(step) => setActiveStep(step)}
        completedSteps={completedSteps}
      />

      {/* Main View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeStep === 1 && (
          <ProfileForm
            userProfile={userProfile}
            onChangeProfile={setUserProfile}
            onNextStep={() => {
              setCompletedSteps((prev) => Array.from(new Set([...prev, 1])));
              setActiveStep(2);
            }}
          />
        )}

        {activeStep === 2 && (
          <PdfUploader
            documents={documents}
            onAddDocuments={handleAddDocuments}
            onRemoveDocument={handleRemoveDocument}
            onStartAnalysis={handleStartAnalysis}
            onPrevStep={() => setActiveStep(1)}
            isAnalyzing={isAnalyzing}
          />
        )}

        {activeStep === 3 && (
          <AnalysisProgress
            currentFile={currentFileAnalyzing}
            progressCount={analysisProgress}
            totalCount={totalFilesToAnalyze}
            statusMessage={statusMessage}
          />
        )}

        {activeStep === 4 && (
          <RscCalculatorOrganizer
            rscItems={rscItems}
            userProfile={userProfile}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
            onAddItem={handleAddItem}
            onRegenerateJustification={handleRegenerateJustification}
            onNextStep={() => {
              setCompletedSteps((prev) => Array.from(new Set([...prev, 4])));
              setActiveStep(5);
            }}
          />
        )}

        {activeStep === 5 && (
          <ComplianceSummary
            rscItems={rscItems}
            userProfile={userProfile}
            onOpenExport={() => setExportImportModalMode('export')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto px-4 space-y-2 flex flex-col items-center">
          <img 
            src={footerLogo} 
            alt="RSC TAE Logomarca" 
            className="w-[100px] h-[100px] rounded-full object-cover border-0 shadow-xs mb-1" 
            style={{ width: '100px', height: '100px', borderWidth: '0px' }}
            referrerPolicy="no-referrer"
          />
          <p className="font-semibold text-slate-800">
            Auxiliador de Preenchimento do RSC-TAE • Sistema de Suporte à Calculadora RSC (PCCTAE/EBTT)
          </p>
          <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
            <span>Desenvolvido por / Créditos de criação:</span>
            <strong className="text-slate-800 font-bold">Philippe Wagner Melo Regis de Araujo</strong>
            <span className="text-indigo-600 inline-flex items-center gap-0.5 ml-1">
              <Mail className="h-3 w-3 inline" />
              philippewagnermra@gmail.com
            </span>
          </p>
          <p className="text-[10px] text-slate-400">
            Fundamentado na Lei nº 15.367/2026, Decreto nº 13.048/2026 e Resoluções Oficiais de Avaliação do RSC.
          </p>
        </div>
      </footer>

      {/* Modals */}
      <RscIntroAnimationModal
        isOpen={isIntroAnimationOpen}
        onComplete={() => {
          setIsIntroAnimationOpen(false);
          setIsTutorialModalOpen(true);
        }}
      />
      <LegalKnowledgeBase isOpen={isLegalModalOpen} onClose={() => setIsLegalModalOpen(false)} />
      <ApiKeyModal isOpen={isApiKeyModalOpen} onClose={() => setIsApiKeyModalOpen(false)} />
      <OnboardingTutorialModal
        isOpen={isTutorialModalOpen}
        onClose={() => setIsTutorialModalOpen(false)}
        onOpenApiKeyModal={() => {
          setIsTutorialModalOpen(false);
          setIsApiKeyModalOpen(true);
        }}
      />

      <ExportImportModal
        mode={exportImportModalMode || 'export'}
        isOpen={exportImportModalMode !== null}
        onClose={() => setExportImportModalMode(null)}
        currentSession={currentSession}
        onImportSession={handleImportSession}
      />
    </div>
  );
}
