import { RSCItem, UserProfile } from '../types';
import { getApiHeaders } from './apiKey';

export interface ConsolidatedFamilyTexts {
  experienciaProfissionalTexto: string; // Bloco A (max 1500 chars)
  diferencialAtuacaoTexto: string;      // Bloco B (max 600 chars)
  impactosSaberesTexto: string;         // Bloco C (max 600 chars)
  justificationText?: string;
  sourceCount: number;
}

/**
 * Agrupa itens de RSC por família (mesmo directiveId e categoryCode)
 */
export function getFamilyKey(item: RSCItem): string {
  return `${item.directiveId}___${(item.categoryCode || 'geral').trim().toUpperCase()}`;
}

/**
 * Consolidação local e inteligente dos textos complementares A, B e C
 * Respeita estritamente os limites de caracteres do SEI (1500 / 600 / 600).
 */
export function consolidateFamilyTextsLocal(
  items: RSCItem[],
  userProfile?: UserProfile
): ConsolidatedFamilyTexts {
  if (!items || items.length === 0) {
    return {
      experienciaProfissionalTexto: '',
      diferencialAtuacaoTexto: '',
      impactosSaberesTexto: '',
      sourceCount: 0,
    };
  }

  const cargo = userProfile?.cargo || 'Técnico-Administrativo em Educação';
  const lotacao = userProfile?.lotacao || 'UFCG';
  const categoryCode = items[0].categoryCode || 'Item';
  const categoryName = items[0].categoryName || 'Atividades de RSC';

  // 1. Bloco A: Experiência Profissional (max 1500 caracteres)
  const itensDescritos = items.map((item, idx) => {
    const emissor = item.orgaoEmissor || item.issuer || 'UFCG';
    const vigencia = item.periodoVigencia || item.dataDocumento || (item.startDate ? `${item.startDate}${item.endDate ? ` a ${item.endDate}` : ''}` : '');
    const ch = item.workloadHours ? ` (${item.workloadHours}h)` : '';
    const vigenciaStr = vigencia ? `, com período/vigência de ${vigencia}` : '';
    const baseText = item.experienciaProfissionalTexto?.trim();

    if (baseText && baseText.length > 30) {
      return `(${idx + 1}) [${item.title}] Realizado junto a ${emissor}${vigenciaStr}${ch}: ${baseText}`;
    }
    return `(${idx + 1}) [${item.title}] Desempenhado junto a ${emissor}${vigenciaStr}${ch}, demonstrando domínio técnico na área temática do critério ${categoryCode}.`;
  });

  let blocoA = `No exercício do cargo de ${cargo} na ${lotacao}, no âmbito do Critério ${categoryCode} (${categoryName}), foram desempenhadas de forma contínua e qualificada as seguintes atividades comprobatórias:\n\n${itensDescritos.join('\n\n')}\n\nEssas experiências consolidam a maturidade funcional e a aplicação consistente de competências técnicas e gerenciais a serviço da instituição.`;
  if (blocoA.length > 1480) {
    blocoA = blocoA.substring(0, 1475) + '...';
  }

  // 2. Bloco B: Diferencial de Atuação (max 600 caracteres)
  const diferenciais = items
    .map((i) => i.diferencialAtuacaoTexto?.trim())
    .filter((t): t is string => Boolean(t && t.length > 15));

  let blocoB = '';
  if (diferenciais.length > 0) {
    blocoB = `O conjunto das atividades do Critério ${categoryCode} evidenciou proatividade técnica e liderança institucional na ${lotacao}. ${diferenciais.join(' ')}`;
  } else {
    blocoB = `O diferencial de atuação nas atividades vinculadas ao Critério ${categoryCode} manifestou-se na capacidade técnica de solucionar demandas de alta complexidade, otimizando fluxos de trabalho e prestando suporte qualificado aos setores acadêmicos e administrativos da ${lotacao}.`;
  }
  if (blocoB.length > 590) {
    blocoB = blocoB.substring(0, 585) + '...';
  }

  // 3. Bloco C: Impactos dos Saberes Adquiridos (max 600 caracteres)
  const impactos = items
    .map((i) => i.impactosSaberesTexto?.trim())
    .filter((t): t is string => Boolean(t && t.length > 15));

  let blocoC = '';
  if (impactos.length > 0) {
    blocoC = `Os saberes consolidados resultaram em melhorias tangíveis na rotina da ${lotacao}. ${impactos.join(' ')}`;
  } else {
    blocoC = `Os saberes acumulados nas atividades do Critério ${categoryCode} geraram impactos diretos na modernização dos procedimentos da ${lotacao}, aprimorando a governança pública, a qualidade do atendimento e o alinhamento estratégico da instituição com os padrões do PCCTAE.`;
  }
  if (blocoC.length > 590) {
    blocoC = blocoC.substring(0, 585) + '...';
  }

  return {
    experienciaProfissionalTexto: blocoA,
    diferencialAtuacaoTexto: blocoB,
    impactosSaberesTexto: blocoC,
    sourceCount: items.length,
  };
}

/**
 * Consolidação com IA (Gemini) dos textos complementares A, B e C para a família
 */
export async function consolidateFamilyTextsWithAI(
  items: RSCItem[],
  userProfile?: UserProfile
): Promise<ConsolidatedFamilyTexts> {
  try {
    const res = await fetch('/api/consolidate-family-texts', {
      method: 'POST',
      headers: getApiHeaders(),
      body: JSON.stringify({
        items,
        userProfile,
        categoryCode: items[0]?.categoryCode,
        categoryName: items[0]?.categoryName,
        directiveId: items[0]?.directiveId,
      }),
    });

    if (!res.ok) {
      // Fallback para consolidação local em caso de erro da API
      return consolidateFamilyTextsLocal(items, userProfile);
    }

    const data = await res.json();
    return {
      experienciaProfissionalTexto: data.experienciaProfissionalTexto || '',
      diferencialAtuacaoTexto: data.diferencialAtuacaoTexto || '',
      impactosSaberesTexto: data.impactosSaberesTexto || '',
      justificationText: data.justificationText,
      sourceCount: items.length,
    };
  } catch (err) {
    console.warn('Fallback para consolidação local dos textos da família:', err);
    return consolidateFamilyTextsLocal(items, userProfile);
  }
}
