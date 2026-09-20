from pydantic import BaseModel
from typing import Optional

class EvidenceItemSchema(BaseModel):
    id: str
    investigation_id: str
    source_id: str
    source_name: str
    source_domain: str
    source_url: str
    source_type: str
    title: str
    snippet: str
    published_at: Optional[str] = None
    evidence_type: str
    relevance_score: float
    summary: str
    search_engine: str
    created_at: str
