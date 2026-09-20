export type InvestigationCategory =
  | 'claim_verification'
  | 'job_company'
  | 'product_shopping'
  | 'business_local'
  | 'travel_plan'
  | 'public_info'
  | 'general_research';

export type InvestigationStatus =
  | 'queued'
  | 'planning'
  | 'searching'
  | 'analyzing'
  | 'cross_checking'
  | 'generating_report'
  | 'completed'
  | 'failed';

export type EvidenceType =
  | 'supporting'
  | 'contradicting'
  | 'contextual'
  | 'neutral'
  | 'uncertain';

export type SourceType =
  | 'official'
  | 'government'
  | 'news'
  | 'company'
  | 'documentation'
  | 'business_listing'
  | 'community'
  | 'social_media'
  | 'unknown';

export type SearchEngineType =
  | 'google'
  | 'google_news'
  | 'google_maps'
  | 'google_jobs'
  | 'google_shopping'
  | 'youtube';

export interface SearchTask {
  query: string;
  engine: SearchEngineType;
  purpose: string;
  priority: number;
}

export interface SearchResultItem {
  id: string;
  query_id?: string;
  title: string;
  url: string;
  domain: string;
  snippet: string;
  source_type: SourceType;
  published_at?: string | null;
  search_engine: SearchEngineType;
  raw_data?: Record<string, any>;
  created_at: string;
}

export interface ClaimItem {
  id: string;
  investigation_id: string;
  claim_text: string;
  claim_type: string;
  status: 'strongly_supported' | 'supported' | 'mixed' | 'conflicting' | 'insufficient' | 'could_not_verify';
  confidence: number;
  explanation: string;
  supporting_evidence_ids: string[];
  contradicting_evidence_ids: string[];
}

export interface EvidenceItem {
  id: string;
  investigation_id: string;
  source_id: string;
  source_name: string;
  source_domain: string;
  source_url: string;
  source_type: SourceType;
  claim_id?: string;
  title: string;
  snippet: string;
  published_at?: string | null;
  evidence_type: EvidenceType;
  relevance_score: number;
  summary: string;
  search_engine: SearchEngineType;
  created_at: string;
}

export interface ContradictionItem {
  id: string;
  investigation_id: string;
  claim_text: string;
  evidence_a: {
    source_name: string;
    source_url: string;
    content: string;
    date?: string | null;
  };
  evidence_b: {
    source_name: string;
    source_url: string;
    content: string;
    date?: string | null;
  };
  explanation: string;
  status: 'active_conflict' | 'resolved_outdated' | 'different_context';
}

export interface SourceItem {
  id: string;
  url: string;
  domain: string;
  title: string;
  source_type: SourceType;
  published_at?: string | null;
  relevance_score?: number;
  snippet?: string;
}

export interface SearchCoverageItem {
  engine: SearchEngineType;
  queried: boolean;
  results_count: number;
  queries_performed: string[];
}

export interface InvestigationReport {
  id: string;
  investigation_id: string;
  title: string;
  original_question: string;
  category: InvestigationCategory;
  summary: string;
  evidence_status: 'Strongly Supported' | 'Supported by Multiple Sources' | 'Mixed Evidence' | 'Conflicting Evidence' | 'Insufficient Evidence' | 'Could Not Verify';
  confidence_score: number; // 0.0 to 1.0 (evidence confidence)
  confidence_label: string; // low, moderate, strong, very_strong
  key_findings: string[];
  supporting_evidence: EvidenceItem[];
  contradicting_evidence: EvidenceItem[];
  contradictions: ContradictionItem[];
  uncertainties: string[];
  sources: SourceItem[];
  search_coverage: SearchCoverageItem[];
  next_verification_steps: string[];
  timeline: Array<{
    date: string;
    title: string;
    source_name: string;
    url: string;
  }>;
  created_at: string;
}

export interface InvestigationEvent {
  id: string;
  investigation_id: string;
  event_type:
    | 'investigation_started'
    | 'planning_started'
    | 'planning_completed'
    | 'search_started'
    | 'search_completed'
    | 'evidence_found'
    | 'contradiction_found'
    | 'analysis_started'
    | 'report_generated'
    | 'investigation_completed'
    | 'investigation_failed';
  message: string;
  metadata?: Record<string, any>;
  timestamp: string;
}

export interface Investigation {
  id: string;
  title: string;
  original_question: string;
  category: InvestigationCategory;
  status: InvestigationStatus;
  user_id?: string;
  created_at: string;
  completed_at?: string | null;
  queries?: Array<{ query: string; engine: SearchEngineType; purpose: string }>;
  report?: InvestigationReport | null;
  events?: InvestigationEvent[];
  evidence_count?: number;
  contradiction_count?: number;
}
