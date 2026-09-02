export type NivelClassificacao = 'C' | 'D' | 'E' | 'EBTT';
export type TitulacaoAtual =
  | 'fundamental_incompleto'
  | 'fundamental_completo'
  | 'medio_tecnico'
  | 'graduacao'
  | 'especializacao'
  | 'mestrado';

export type RSCLevel =
  | 'RSC-PCCTAE I'
  | 'RSC-PCCTAE II'
  | 'RSC-PCCTAE III'
  | 'RSC-PCCTAE IV'
  | 'RSC-PCCTAE V'
  | 'RSC-PCCTAE VI'
  | 'RSC-I'
  | 'RSC-II'
  | 'RSC-III';

export interface UserProfile {
  nomeCompleto: string;
  cpf?: string;
  siape: string;
  cargo: string;
  nivelClassificacao: NivelClassificacao;
  lotacao: string;
  titulacaoAtual: TitulacaoAtual;
  rscAlmejado: RSCLevel;
  dataRequerimento: string;
  dataExercicio?: string;
  dataIngressoServicoPublico: string;
  observacoes: string;
}

export type RSCDirectiveId =
  | 'requisito_1'
  | 'requisito_2'
  | 'requisito_3'
  | 'requisito_4'
  | 'requisito_5'
  | 'requisito_6'
  | 'diretriz_1'
  | 'diretriz_2'
  | 'diretriz_3';

export interface RSCItem {
  id: string;
  documentId?: string;
  documentName?: string;
  title: string;
  issuer: string;
  startDate?: string;
  endDate?: string;
  workloadHours?: number;
  directiveId: RSCDirectiveId;
  categoryCode: string;
  categoryName: string;
  unitPoints: number;
  quantity: number;
  totalScore: number;
  justificationText: string;
  regulatoryBasis: string;
  complianceStatus: 'valid' | 'warning' | 'needs_info';
  complianceNotes: string[];

  // Auditoria e Gestão de Itens no Passo 4
  isCompleted?: boolean;             // Checkbox de concluído / conferido
  isDiscarded?: boolean;             // Mover para caixa vermelha (descartar/desconsiderar no final da tela)
  discardReason?: string;            // Motivo do descarte se aplicável
  familyGroupKey?: string;           // Identificador do grupo de mesma família
  isFamilyConsolidated?: boolean;    // Indica se os textos A, B e C foram unificados com a família

  // Validação de anterioridade da data do documento em relação ao ingresso no serviço público
  isPriorToPublicService?: boolean;
  dateValidationReason?: string;
  effectiveDocumentDate?: string;

  // Detailed fields requested by user & GEM instructions
  periodoVigencia?: string;
  finalidadeDocumento?: string;
  orgaoEmissor?: string;
  numeroIdentificacaoSei?: string;
  dataDocumento?: string;
  experienciaProfissionalTexto?: string; // (A: max 1500 chars)
  diferencialAtuacaoTexto?: string;      // (B: max 600 chars)
  impactosSaberesTexto?: string;         // (C: max 600 chars)
  trechoComprobatorioExato?: string;     // Grounding Rígido (citação literal)
}

export interface AnalysisLogEntry {
  docId: string;
  fileName: string;
  fileSize: number;
  analyzedAt: string;
  status: 'success' | 'rejected' | 'error';
  modelUsed?: string;
  confiancaOcr?: string;
  tipoDocumento?: string;
  detectedItemsCount: number;
  itemTitles: string[];
  totalScoreDetected: number;
  motivoRejeicao?: string;
  errorMessage?: string;
}

export interface UploadedDocument {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  base64Data?: string;
  analyzed: boolean;
  documentoValido?: boolean;
  tipoDocumento?: string;
  confiancaOcr?: string;
  motivoRejeicao?: string;
  analysisError?: string;
  analyzedAt?: string;
  detectedItemsCount: number;
  dataDocumento?: string;
  isPriorToPublicService?: boolean;
  dateValidationReason?: string;
}

export interface SessionState {
  version: string;
  lastModified: string;
  userProfile: UserProfile;
  documents: UploadedDocument[];
  rscItems: RSCItem[];
  activeStep: number;
}

export interface RSCStandardCategory {
  code: string;
  directiveId: RSCDirectiveId;
  title: string;
  description: string;
  unitPoints: number;
  unitType: 'por_hora' | 'por_item' | 'por_ano' | 'por_semestre' | 'por_evento';
  maxScoreCap?: number;
  legalRef: string;
  documentosComprovacao?: string;
  exemplos?: string;
  observacoes?: string;
}

export interface RSCLevelRequirement {
  level: RSCLevel;
  escolaridade: string;
  minTotalScore: number;
  minCriteriosCount: number;
  criteriosTexto: string;
  requisitoAdicional: string;
  percentualIQ: number;
  equivalence: string;
  description: string;
}
