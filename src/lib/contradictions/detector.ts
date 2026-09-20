import { ContradictionItem, EvidenceItem } from '@/types';
import { llmProvider } from '../ai/provider';

export class ContradictionDetector {
  public async detectContradictions(
    investigationId: string,
    question: string,
    evidenceList: EvidenceItem[]
  ): Promise<ContradictionItem[]> {
    if (!evidenceList || evidenceList.length < 2) {
      return [];
    }

    const contradictions: ContradictionItem[] = [];

    // First check heuristic patterns for opposing evidence types or conflicting dates
    const supporting = evidenceList.filter((e) => e.evidence_type === 'supporting');
    const contradicting = evidenceList.filter((e) => e.evidence_type === 'contradicting');

    if (supporting.length > 0 && contradicting.length > 0) {
      const sup = supporting[0];
      const con = contradicting[0];

      contradictions.push({
        id: `con-0-${Date.now()}`,
        investigation_id: investigationId,
        claim_text: `Status & Recency of: ${question}`,
        evidence_a: {
          source_name: sup.source_name,
          source_url: sup.source_url,
          content: sup.summary,
          date: sup.published_at
        },
        evidence_b: {
          source_name: con.source_name,
          source_url: con.source_url,
          content: con.summary,
          date: con.published_at
        },
        explanation: `Source A (${sup.source_name}) presents active supporting evidence, whereas Source B (${con.source_name}) contains contradictory or outdated signals.`,
        status: 'active_conflict'
      });
    }

    if (!llmProvider.isAvailable()) {
      return contradictions;
    }

    // Deep contradiction scan using LLM structured output
    try {
      const systemPrompt = `You are an AI Contradiction Engine.
Analyze a list of evidence items gathered from search engines for a given claim.
Identify explicit conflicts or inconsistencies between different sources (e.g., dates, figures, founding year, salary, availability, location, active hiring status).

Return JSON format:
{
  "contradictions": [
    {
      "claim_text": "Exact statement where sources disagree",
      "evidence_a": {
        "source_name": "...",
        "source_url": "...",
        "content": "...",
        "date": "..."
      },
      "evidence_b": {
        "source_name": "...",
        "source_url": "...",
        "content": "...",
        "date": "..."
      },
      "explanation": "Why these two sources conflict and potential cause (e.g. outdated listing vs official page)",
      "status": "active_conflict|resolved_outdated|different_context"
    }
  ]
}`;

      const evidenceText = evidenceList
        .map(
          (e, i) =>
            `[Source ${i + 1}] Name: ${e.source_name} | URL: ${e.source_url} | Date: ${e.published_at || 'Unknown'} | Content: ${e.summary}`
        )
        .join('\n\n');

      const userPrompt = `Question: "${question}"\n\nEvidence Collected:\n${evidenceText}`;

      const res = await llmProvider.generateStructuredJSON<{ contradictions: ContradictionItem[] }>(
        systemPrompt,
        userPrompt,
        { contradictions: [] }
      );

      if (res.contradictions && Array.isArray(res.contradictions)) {
        res.contradictions.forEach((c, idx) => {
          contradictions.push({
            ...c,
            id: `con-llm-${idx}-${Date.now()}`,
            investigation_id: investigationId
          });
        });
      }
    } catch (err) {
      console.warn('[ContradictionDetector] Deep scan failed:', err);
    }

    return this.deduplicateContradictions(contradictions);
  }

  private deduplicateContradictions(items: ContradictionItem[]): ContradictionItem[] {
    const seen = new Set<string>();
    return items.filter((item) => {
      const key = `${item.claim_text.toLowerCase().trim()}-${item.evidence_a.source_name}-${item.evidence_b.source_name}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }
}

export const contradictionDetector = new ContradictionDetector();
