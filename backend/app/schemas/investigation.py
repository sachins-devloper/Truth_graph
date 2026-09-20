from pydantic import BaseModel, Field
from typing import List, Optional, Any, Dict

class InvestigationCreate(BaseModel):
    question: Optional[str] = None
    demo_preset_id: Optional[str] = None
    category: Optional[str] = None

class InvestigationQuerySchema(BaseModel):
    query: str
    engine: str
    purpose: str
    priority: int = 1

class InvestigationResponse(BaseModel):
    id: str
    title: str
    original_question: str
    category: str
    status: str
    queries: Optional[List[Dict[str, Any]]] = None
    evidence_count: int = 0
    contradiction_count: int = 0
    report: Optional[Dict[str, Any]] = None
    created_at: str
    completed_at: Optional[str] = None
