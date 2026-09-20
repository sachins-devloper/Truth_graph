import httpx
import logging
from typing import List, Dict, Any, Optional
from app.core.config import settings
from app.services.serpapi.normalizer import normalize_serp_results

logger = logging.getLogger("truthgraph.serpapi")

class SerpApiClient:
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or settings.SERPAPI_API_KEY

    def has_api_key(self) -> bool:
        return bool(self.api_key and self.api_key.strip())

    async def search(self, query: str, engine: str = "google", num_results: int = 8) -> List[Dict[str, Any]]:
        if not self.has_api_key():
            logger.warning(f"SerpApi API key not configured. Returning empty search results for query: '{query}'")
            return []

        params = {
            "api_key": self.api_key,
            "engine": engine,
            "q": query,
            "num": str(num_results)
        }

        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                resp = await client.get("https://serpapi.com/search.json", params=params)
                if resp.status_code != 200:
                    logger.error(f"SerpApi HTTP {resp.status_code}: {resp.text}")
                    return []
                raw_data = resp.json()
                return normalize_serp_results(raw_data, engine, query)
        except Exception as err:
            logger.error(f"SerpApi request failed for '{query}': {err}")
            return []

serpapi_client = SerpApiClient()
