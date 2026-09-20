import os

class Settings:
    PROJECT_NAME: str = "TruthGraph API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    SERPAPI_API_KEY: str = os.getenv("SERPAPI_API_KEY", "")
    LLM_API_KEY: str = os.getenv("LLM_API_KEY", "")
    LLM_BASE_URL: str = os.getenv("LLM_BASE_URL", "https://api.openai.com/v1")
    LLM_MODEL: str = os.getenv("LLM_MODEL", "gpt-4o-mini")
    
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./truthgraph.db")
    MONGODB_URI: str = os.getenv("MONGODB_URI", "")
    MAX_SEARCHES_PER_INVESTIGATION: int = int(os.getenv("MAX_SEARCHES_PER_INVESTIGATION", "10"))

settings = Settings()
