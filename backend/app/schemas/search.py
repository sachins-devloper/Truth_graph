from pydantic import BaseModel
from typing import Optional, Dict, Any

class SearchTaskSchema(BaseModel):
    query: str
    engine: str
    purpose: str
    priority: int = 1

class SearchResultSchema(BaseModel):
    id: str
    title: str
    url: str
    domain: str
    snippet: str
    source_type: str
    published_at: Optional[str] = None
    search_engine: str
    raw_data: Optional[Dict[str, Any]] = None
    created_at: str
