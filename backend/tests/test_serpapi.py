import pytest
from app.services.serpapi.normalizer import extract_domain, categorize_source_type, normalize_serp_results

def test_extract_domain():
    assert extract_domain("https://careers.example.com/job/123") == "careers.example.com"
    assert extract_domain("http://www.reuters.com/news") == "reuters.com"

def test_categorize_source_type():
    assert categorize_source_type("india.gov.in", "https://india.gov.in") == "government"
    assert categorize_source_type("reuters.com", "https://reuters.com/article") == "news"
    assert categorize_source_type("github.com", "https://github.com/repo") == "community"

def test_normalize_serp_results():
    raw_google = {
        "organic_results": [
            {
                "title": "Test Result Title",
                "link": "https://example.com/test",
                "snippet": "This is a test snippet."
            }
        ]
    }
    normalized = normalize_serp_results(raw_google, "google", "test query")
    assert len(normalized) == 1
    assert normalized[0]["title"] == "Test Result Title"
    assert normalized[0]["domain"] == "example.com"
    assert normalized[0]["search_engine"] == "google"
