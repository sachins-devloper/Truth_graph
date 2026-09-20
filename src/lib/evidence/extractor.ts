import { EvidenceItem, EvidenceType, SearchResultItem } from '@/types';
import { llmProvider } from '../ai/provider';

export class EvidenceExtractor {
  public async extractEvidence(
    investigationId: string,
    question: string,
    searchResults: SearchResultItem[]
  ): Promise<EvidenceItem[]> {
    if (!searchResults || searchResults.length === 0) {
      return [];
    }

    const evidenceList: EvidenceItem[] = [];

    // Fallback heuristic extraction
    for (let i = 0; i < searchResults.length; i++) {
      const res = searchResults[i];
      const evidenceType = this.heuristicEvidenceType(question, res.snippet, res.title);
      const relevanceScore = this.calculateRelevanceScore(question, res.snippet, res.title);

      evidenceList.push({
        id: `ev-${i}-${Date.now()}`,
        investigation_id: investigationId,
        source_id: res.id,
        source_name: res.domain,
        source_domain: res.domain,
        source_url: res.url,
        source_type: res.source_type,
        title: res.title,
        snippet: res.snippet,
        published_at: res.published_at,
        evidence_type: evidenceType,
        relevance_score: relevanceScore,
        summary: res.snippet.slice(0, 180) + (res.snippet.length > 180 ? '...' : ''),
        search_engine: res.search_engine,
        created_at: new Date().toISOString()
      });
    }

    if (!llmProvider.isAvailable()) {
      return evidenceList;
    }

    // Refine with LLM if available
    try {
      const systemPrompt = `You are an AI Evidence Extraction Engine.
Given a user query and a list of search snippets, analyze each snippet for relevance and evidence stance.
Assign evidence_type: 'supporting' | 'contradicting' | 'contextual' | 'neutral' | 'uncertain'.
Calculate relevance_score between 0.0 and 1.0.

Return JSON:
{
  "items": [
    {
      "index": 0,
      "evidence_type": "supporting|contradicting|contextual|neutral|uncertain",
      "relevance_score": 0.85,
      "summary": "Concise 1-2 sentence evidence summary"
    }
  ]
}`;

      const snippetsText = searchResults
        .map((r, idx) => `[${idx}] Title: ${r.title} | Snippet: ${r.snippet} | URL: ${r.url}`)
        .join('\n');

      const userPrompt = `Query: "${question}"\n\nSearch Results:\n${snippetsText}`;

      const aiRes = await llmProvider.generateStructuredJSON<{ items: Array<{ index: number; evidence_type: EvidenceType; relevance_score: number; summary: string }> }>(
        systemPrompt,
        userPrompt,
        { items: [] }
      );

      if (aiRes.items && Array.isArray(aiRes.items)) {
        aiRes.items.forEach((refined) => {
          if (evidenceList[refined.index]) {
            evidenceList[refined.index].evidence_type = refined.evidence_type || evidenceList[refined.index].evidence_type;
            evidenceList[refined.index].relevance_score = refined.relevance_score || evidenceList[refined.index].relevance_score;
            if (refined.summary) {
              evidenceList[refined.index].summary = refined.summary;
            }
          }
        });
      }
    } catch (err) {
      console.warn('[EvidenceExtractor] LLM refinement skipped:', err);
    }

    return evidenceList;
  }

  private heuristicEvidenceType(question: string, snippet: string, title: string): EvidenceType {
    const text = (title + ' ' + snippet).toLowerCase();
    
    if (text.includes('scam') || text.includes('fake') || text.includes('closed') || text.includes('debunk') || text.includes('outdated') || text.includes('no longer') || text.includes('expired')) {
      return 'contradicting';
    }
    if (text.includes('official') || text.includes('hiring') || text.includes('active') || text.includes('available') || text.includes('verified') || text.includes('confirmed')) {
      return 'supporting';
    }
    if (text.includes('uncertain') || text.includes('unconfirmed') || text.includes('rumor') || text.includes('alleged')) {
      return 'uncertain';
    }
    return 'contextual';
  }

  private calculateRelevanceScore(question: string, snippet: string, title: string): number {
    const qWords = question.toLowerCase().split(/\s+/).filter(w => w.length > 3);
    if (qWords.length === 0) return 0.7;

    const text = (title + ' ' + snippet).toLowerCase();
    let matches = 0;
    for (const word of qWords) {
      if (text.includes(word)) matches++;
    }

    const score = 0.4 + (matches / qWords.length) * 0.55;
    return parseFloat(Math.min(1.0, score).toFixed(2));
  }
}

export const evidenceExtractor = new EvidenceExtractor();
