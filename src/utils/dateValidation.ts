/**
 * Utilitários de validação e cruzamento de datas para o RSC-PCCTAE
 * Verifica se a data do documento é anterior à data de ingresso no serviço público do servidor.
 */

const MONTHS_MAP: Record<string, number> = {
  janeiro: 0,
  jan: 0,
  fevereiro: 1,
  fev: 1,
  março: 2,
  marco: 2,
  mar: 2,
  abril: 3,
  abr: 3,
  maio: 4,
  mai: 4,
  junho: 5,
  jun: 5,
  julho: 6,
  jul: 6,
  agosto: 7,
  ago: 7,
  setembro: 8,
  set: 8,
  outubro: 9,
  out: 9,
  novembro: 10,
  nov: 10,
  dezembro: 11,
  dez: 11,
};

/**
 * Tenta converter qualquer formato de data brasileira ou internacional para um objeto Date
 * Formatos suportados:
 * - YYYY-MM-DD (2024-03-15)
 * - DD/MM/YYYY ou DD-MM-YYYY (15/03/2024)
 * - 15 de março de 2024
 * - MM/YYYY ou março de 2024 (03/2024)
 * - YYYY (2024)
 */
export function parseDateFlexible(dateStr?: string | null): Date | null {
  if (!dateStr || typeof dateStr !== 'string') return null;
  const clean = dateStr.trim().toLowerCase();
  if (!clean) return null;

  // 1. Formato ISO YYYY-MM-DD
  const isoMatch = clean.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})/);
  if (isoMatch) {
    const year = parseInt(isoMatch[1], 10);
    const month = parseInt(isoMatch[2], 10) - 1;
    const day = parseInt(isoMatch[3], 10);
    const d = new Date(year, month, day);
    if (!isNaN(d.getTime())) return d;
  }

  // 2. Formato brasileiro DD/MM/YYYY ou DD-MM-YYYY
  const brMatch = clean.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})/);
  if (brMatch) {
    const day = parseInt(brMatch[1], 10);
    const month = parseInt(brMatch[2], 10) - 1;
    const year = parseInt(brMatch[3], 10);
    const d = new Date(year, month, day);
    if (!isNaN(d.getTime())) return d;
  }

  // 3. Formato extenso: "15 de março de 2024" ou "15 de mar de 2024"
  const extensoMatch = clean.match(/(\d{1,2})\s+(?:de\s+)?([a-zçãõ]+)\s+(?:de\s+)?(\d{4})/i);
  if (extensoMatch) {
    const day = parseInt(extensoMatch[1], 10);
    const monthName = extensoMatch[2].toLowerCase();
    const year = parseInt(extensoMatch[3], 10);
    const month = MONTHS_MAP[monthName] ?? MONTHS_MAP[monthName.substring(0, 3)];
    if (month !== undefined) {
      const d = new Date(year, month, day);
      if (!isNaN(d.getTime())) return d;
    }
  }

  // 4. Formato mês/ano: "03/2024" ou "março de 2024"
  const monthYearMatch = clean.match(/^(?:([a-zçãõ]+)|(\d{1,2}))(?:\s+de\s+|\/)(\d{4})/i);
  if (monthYearMatch) {
    let month = 0;
    if (monthYearMatch[1]) {
      const monthName = monthYearMatch[1].toLowerCase();
      month = MONTHS_MAP[monthName] ?? MONTHS_MAP[monthName.substring(0, 3)] ?? 0;
    } else if (monthYearMatch[2]) {
      month = parseInt(monthYearMatch[2], 10) - 1;
    }
    const year = parseInt(monthYearMatch[3], 10);
    // Para mês/ano, considerar o fim do mês como referência
    const d = new Date(year, month + 1, 0);
    if (!isNaN(d.getTime())) return d;
  }

  // 5. Procura por data completa em qualquer trecho do texto (ex: "Portaria de 15/08/2021 expedida...")
  const embeddedBrMatch = clean.match(/(\d{1,2})[\/\.-](\d{1,2})[\/\.-](\d{4})/);
  if (embeddedBrMatch) {
    const day = parseInt(embeddedBrMatch[1], 10);
    const month = parseInt(embeddedBrMatch[2], 10) - 1;
    const year = parseInt(embeddedBrMatch[3], 10);
    const d = new Date(year, month, day);
    if (!isNaN(d.getTime())) return d;
  }

  // 6. Procura ano isolado de 4 dígitos (ex: "2018", "vigência 2019")
  const yearMatch = clean.match(/\b(19\d{2}|20\d{2})\b/);
  if (yearMatch) {
    const year = parseInt(yearMatch[1], 10);
    // Considerar 31 de dezembro daquele ano como limite superior
    const d = new Date(year, 11, 31);
    if (!isNaN(d.getTime())) return d;
  }

  // Fallback nativo
  const fallback = new Date(dateStr);
  return isNaN(fallback.getTime()) ? null : fallback;
}

/**
 * Formata qualquer data para padrão DD/MM/AAAA amigável
 */
export function formatDateDisplay(dateInput?: string | Date | null): string {
  if (!dateInput) return 'Não informada';
  const d = typeof dateInput === 'string' ? parseDateFlexible(dateInput) : dateInput;
  if (!d || isNaN(d.getTime())) return typeof dateInput === 'string' ? dateInput : 'Inválida';
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

export interface DateComparisonResult {
  isPrior: boolean;
  hasEntryDate: boolean;
  entryDateFormatted?: string;
  documentDateFormatted?: string;
  reason?: string;
}

/**
 * Verifica se a data do documento/atividade é anterior à data de ingresso no serviço público.
 *
 * @param documentDateStr - Data do documento (dataDocumento, endDate, startDate ou periodoVigencia)
 * @param entryDateStr - Data de ingresso no serviço público informada no perfil
 */
export function checkDocumentPriorToEntryDate(
  documentDateStr?: string | null,
  entryDateStr?: string | null
): DateComparisonResult {
  if (!entryDateStr || !entryDateStr.trim()) {
    return { isPrior: false, hasEntryDate: false };
  }

  const entryDate = parseDateFlexible(entryDateStr);
  if (!entryDate || isNaN(entryDate.getTime())) {
    return { isPrior: false, hasEntryDate: false };
  }

  const entryDateFormatted = formatDateDisplay(entryDate);

  if (!documentDateStr || !documentDateStr.trim()) {
    return {
      isPrior: false,
      hasEntryDate: true,
      entryDateFormatted,
    };
  }

  const docDate = parseDateFlexible(documentDateStr);
  if (!docDate || isNaN(docDate.getTime())) {
    return {
      isPrior: false,
      hasEntryDate: true,
      entryDateFormatted,
    };
  }

  const documentDateFormatted = formatDateDisplay(docDate);

  // Comparações de data desconsiderando horas (apenas dia/mês/ano)
  const entryDateOnly = new Date(entryDate.getFullYear(), entryDate.getMonth(), entryDate.getDate()).getTime();
  const docDateOnly = new Date(docDate.getFullYear(), docDate.getMonth(), docDate.getDate()).getTime();

  const isPrior = docDateOnly < entryDateOnly;

  return {
    isPrior,
    hasEntryDate: true,
    entryDateFormatted,
    documentDateFormatted,
    reason: isPrior
      ? `Documento com data (${documentDateFormatted}) anterior à data de ingresso no serviço público (${entryDateFormatted}). Conforme a legislação do RSC, este item não pontua para o cálculo.`
      : undefined,
  };
}

/**
 * Extrai a data mais relevante de um item de RSC para validação
 */
export function getItemEffectiveDate(item: {
  dataDocumento?: string;
  endDate?: string;
  startDate?: string;
  periodoVigencia?: string;
}): string | undefined {
  if (item.dataDocumento && item.dataDocumento.trim()) return item.dataDocumento.trim();
  if (item.endDate && item.endDate.trim()) return item.endDate.trim();
  if (item.periodoVigencia && item.periodoVigencia.trim()) return item.periodoVigencia.trim();
  if (item.startDate && item.startDate.trim()) return item.startDate.trim();
  return undefined;
}
