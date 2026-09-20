import {
  ContradictionItem,
  EvidenceItem,
  InvestigationCategory,
  InvestigationReport,
  SearchCoverageItem,
  SearchEngineType,
  SourceItem
} from '@/types';
import { llmProvider } from '../ai/provider';

export interface ReportGenerationInput {
  investigationId: string;
  question: string;
  category: InvestigationCategory;
  evidence: EvidenceItem[];
  contradictions: ContradictionItem[];
  searchesPerformed: Array<{ engine: SearchEngineType; query: string; results_count: number }>;
}

export class ReportGenerator {
  public async generateReport(input: ReportGenerationInput): Promise<InvestigationReport> {
    const { investigationId, question, category, evidence, contradictions, searchesPerformed } = input;

    // Calculate Search Coverage Matrix
    const engines: SearchEngineType[] = ['google', 'google_news', 'google_maps', 'google_jobs', 'google_shopping'];
    const coverage: SearchCoverageItem[] = engines.map((engine) => {
      const matching = searchesPerformed.filter((s) => s.engine === engine);
      const totalResults = matching.reduce((sum, item) => sum + item.results_count, 0);
      return {
        engine,
        queried: matching.length > 0,
        results_count: totalResults,
        queries_performed: matching.map((m) => m.query)
      };
    });

    // Unique Sources List
    const sourcesMap = new Map<string, SourceItem>();
    evidence.forEach((e) => {
      if (!sourcesMap.has(e.source_url)) {
        sourcesMap.set(e.source_url, {
          id: e.source_id,
          url: e.source_url,
          domain: e.source_domain,
          title: e.title,
          source_type: e.source_type,
          published_at: e.published_at,
          relevance_score: e.relevance_score,
          snippet: e.snippet
        });
      }
    });
    const sources = Array.from(sourcesMap.values());

    // Evidence Status Determination
    const supporting = evidence.filter((e) => e.evidence_type === 'supporting');
    const contradicting = evidence.filter((e) => e.evidence_type === 'contradicting');

    let evidence_status: InvestigationReport['evidence_status'] = 'Supported by Multiple Sources';
    let confidence_score = 0.78;

    if (evidence.length === 0) {
      evidence_status = 'Insufficient Evidence';
      confidence_score = 0.25;
    } else if (contradictions.length > 0 || (supporting.length > 0 && contradicting.length > 0)) {
      evidence_status = 'Conflicting Evidence';
      confidence_score = 0.52;
    } else if (supporting.length >= 3 && sources.length >= 2) {
      evidence_status = 'Strongly Supported';
      confidence_score = 0.92;
    } else if (supporting.length > 0) {
      evidence_status = 'Supported by Multiple Sources';
      confidence_score = 0.75;
    } else {
      evidence_status = 'Could Not Verify';
      confidence_score = 0.35;
    }

    const confidence_label =
      confidence_score >= 0.90
        ? 'Very Strong Evidence'
        : confidence_score >= 0.70
        ? 'Strong Evidence'
        : confidence_score >= 0.40
        ? 'Moderate Evidence'
        : 'Low Evidence Support';

    // Construct Timeline
    const timeline = evidence
      .filter((e) => Boolean(e.published_at))
      .map((e) => ({
        date: e.published_at || 'Undated',
        title: e.title,
        source_name: e.source_name,
        url: e.source_url
      }))
      .slice(0, 5);

    // Heuristic Summary and Findings
    let summary = `Investigation into "${question}" yielded ${evidence.length} evidence snippets across ${sources.length} independent web sources.`;
    if (contradictions.length > 0) {
      summary += ` Contradictory information was identified between sources.`;
    } else if (supporting.length > 0) {
      summary += ` Multiple sources confirm key elements of the claim.`;
    } else {
      summary += ` Available sources provide insufficient direct confirmation.`;
    }

    const key_findings: string[] = [
      `Search performed across ${coverage.filter((c) => c.queried).length} distinct search channels.`,
      `Found ${supporting.length} supporting evidence items and ${contradicting.length} contradicting signals.`,
      `Identified ${sources.length} distinct source domains including ${sources.map((s) => s.source_type).join(', ')}.`
    ];

    const uncertainties: string[] = [
      'Third-party web listings may lag official corporate announcements.',
      'Unconfirmed claims require direct primary contact verification.'
    ];

    const next_verification_steps: string[] = [
      'Cross-check findings directly on official organization career / press portals.',
      'Inspect publication dates of third-party references for freshness.'
    ];

    const fallbackReport: InvestigationReport = {
      id: `rep-${Date.now()}`,
      investigation_id: investigationId,
      title: `Investigation: ${question}`,
      original_question: question,
      category,
      summary,
      evidence_status,
      confidence_score,
      confidence_label,
      key_findings,
      supporting_evidence: supporting,
      contradicting_evidence: contradicting,
      contradictions,
      uncertainties,
      sources,
      search_coverage: coverage,
      next_verification_steps,
      timeline,
      created_at: new Date().toISOString()
    };

    if (!llmProvider.isAvailable()) {
      return fallbackReport;
    }

    // Synthesize refined natural language report via LLM
    try {
      const systemPrompt = `You are an expert Intelligence & Investigation Report Generator.
Synthesize retrieved evidence and source cross-checks into an executive investigation report.
Rules:
1. NEVER invent facts, fake URLs, or fabricate citations.
2. Use evidence-based terminology ('Strongly supported by available evidence', 'Conflicting evidence', 'Insufficient evidence').
3. Explain uncertainties clearly.
4. List actionable next verification steps.

Return JSON format:
{
  "summary": "2-3 sentence executive summary",
  "key_findings": ["Finding 1", "Finding 2", "Finding 3"],
  "uncertainties": ["Uncertainty 1", "Uncertainty 2"],
  "next_verification_steps": ["Step 1", "Step 2"]
}`;

      const evidenceSummaryText = evidence
        .map((e, idx) => `[${idx + 1}] (${e.evidence_type.toUpperCase()}) ${e.source_name}: ${e.summary}`)
        .join('\n');

      const contradictionText = contradictions
        .map((c) => `CONFLICT: ${c.claim_text} (Source A: ${c.evidence_a.source_name} vs Source B: ${c.evidence_b.source_name})`)
        .join('\n');

      const userPrompt = `Question: "${question}"\nCategory: ${category}\nEvidence Status: ${evidence_status}\n\nEvidence Collected:\n${evidenceSummaryText}\n\nContradictions:\n${contradictionText || 'None'}`;

      const aiRes = await llmProvider.generateStructuredJSON<{
        summary: string;
        key_findings: string[];
        uncertainties: string[];
        next_verification_steps: string[];
      }>(systemPrompt, userPrompt, {
        summary,
        key_findings,
        uncertainties,
        next_verification_steps
      });

      if (aiRes.summary) fallbackReport.summary = aiRes.summary;
      if (aiRes.key_findings && Array.isArray(aiRes.key_findings)) fallbackReport.key_findings = aiRes.key_findings;
      if (aiRes.uncertainties && Array.isArray(aiRes.uncertainties)) fallbackReport.uncertainties = aiRes.uncertainties;
      if (aiRes.next_verification_steps && Array.isArray(aiRes.next_verification_steps))
        fallbackReport.next_verification_steps = aiRes.next_verification_steps;
    } catch (err) {
      console.warn('[ReportGenerator] LLM synthesis skipped:', err);
    }

    return fallbackReport;
  }
}

export const reportGenerator = new ReportGenerator();
