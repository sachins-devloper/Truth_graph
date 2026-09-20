import { z } from 'zod';

export const SearchTaskSchema = z.object({
  query: z.string(),
  engine: z.enum(['google', 'google_news', 'google_maps', 'google_jobs', 'google_shopping', 'youtube']),
  purpose: z.string(),
  priority: z.number().default(1)
});

export const SearchPlanSchema = z.object({
  investigation_type: z.enum([
    'claim_verification',
    'job_company',
    'product_shopping',
    'business_local',
    'travel_plan',
    'public_info',
    'general_research'
  ]),
  user_question: z.string(),
  core_claims_to_check: z.array(z.string()),
  queries: z.array(SearchTaskSchema)
});

export const ExtractedClaimSchema = z.object({
  claim_text: z.string(),
  claim_type: z.string(),
  status: z.enum(['strongly_supported', 'supported', 'mixed', 'conflicting', 'insufficient', 'could_not_verify']),
  confidence: z.number().min(0).max(1),
  explanation: z.string()
});

export const ContradictionSchema = z.object({
  claim_text: z.string(),
  evidence_a: z.object({
    source_name: z.string(),
    source_url: z.string(),
    content: z.string(),
    date: z.string().nullable().optional()
  }),
  evidence_b: z.object({
    source_name: z.string(),
    source_url: z.string(),
    content: z.string(),
    date: z.string().nullable().optional()
  }),
  explanation: z.string(),
  status: z.enum(['active_conflict', 'resolved_outdated', 'different_context'])
});

export const ReportSchema = z.object({
  summary: z.string(),
  evidence_status: z.enum([
    'Strongly Supported',
    'Supported by Multiple Sources',
    'Mixed Evidence',
    'Conflicting Evidence',
    'Insufficient Evidence',
    'Could Not Verify'
  ]),
  confidence_score: z.number().min(0).max(1),
  key_findings: z.array(z.string()),
  uncertainties: z.array(z.string()),
  next_verification_steps: z.array(z.string())
});
