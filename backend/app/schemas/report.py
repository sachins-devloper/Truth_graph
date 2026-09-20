from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class ReportSchema(BaseModel):
    id: str
    investigation_id: str
    title: str
    original_question: str
    category: str
    summary: str
    evidence_status: str
    confidence_score: float
    confidence_label: str
    key_findings: List[str]
    supporting_evidence: List[Dict[str, Any]]
    contradicting_evidence: List[Dict[str, Any]]
    contradictions: List[Dict[str, Any]]
    uncertainties: List[str]
    sources: List[Dict[str, Any]]
    search_coverage: List[Dict[str, Any]]
    next_verification_steps: List[str]
    timeline: List[Dict[str, Any]]
    created_at: str
