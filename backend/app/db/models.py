import datetime
from sqlalchemy import Column, String, Integer, Float, DateTime, Text, JSON, ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base

class InvestigationModel(Base):
    __tablename__ = "investigations"

    id = Column(String, primary_key=True, index=True)
    title = Column(String, nullable=False)
    original_question = Column(String, nullable=False)
    category = Column(String, nullable=False, default="general_research")
    status = Column(String, nullable=False, default="queued")
    queries_json = Column(JSON, nullable=True)
    evidence_count = Column(Integer, default=0)
    contradiction_count = Column(Integer, default=0)
    report_json = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)
