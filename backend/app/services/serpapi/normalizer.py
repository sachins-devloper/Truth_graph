import datetime
from typing import List, Dict, Any
from urllib.parse import urlparse

def extract_domain(url: str) -> str:
    try:
        parsed = urlparse(url)
        return parsed.netloc.replace("www.", "")
    except Exception:
        return "external-source"

def categorize_source_type(domain: str, url: str) -> str:
    d = domain.lower()
    if d.endswith(".gov") or d.endswith(".gov.in") or d.endswith(".gov.uk"):
        return "government"
    if any(m in d for m in ["reuters.com", "bloomberg.com", "bbc.com", "thehindu.com", "timesofindia", "techcrunch.com"]):
        return "news"
    if any(m in d for m in ["wikipedia.org", "reddit.com", "quora.com", "github.com"]):
        return "community"
    if any(m in d for m in ["linkedin.com", "twitter.com", "x.com", "facebook.com"]):
        return "social_media"
    if "docs." in d or "/docs/" in url:
        return "documentation"
    return "company"

def normalize_serp_results(raw_data: Dict[str, Any], engine: str, query: str) -> List[Dict[str, Any]]:
    items = []
    now = datetime.datetime.utcnow().isoformat()

    if engine == "google":
        organic = raw_data.get("organic_results", [])
        for idx, res in enumerate(organic):
            link = res.get("link")
            if not link:
                continue
            domain = extract_domain(link)
            items.append({
                "id": f"g-{idx}-{now}",
                "title": res.get("title", "Untitled Web Result"),
                "url": link,
                "domain": domain,
                "snippet": res.get("snippet", ""),
                "source_type": categorize_source_type(domain, link),
                "published_at": res.get("date") or res.get("published_date"),
                "search_engine": "google",
                "created_at": now
            })

    elif engine == "google_news":
        news = raw_data.get("news_results", []) or raw_data.get("organic_results", [])
        for idx, res in enumerate(news):
            link = res.get("link") or res.get("share_link")
            if not link:
                continue
            domain = extract_domain(link)
            items.append({
                "id": f"gn-{idx}-{now}",
                "title": res.get("title", "Untitled News Article"),
                "url": link,
                "domain": domain,
                "snippet": res.get("snippet", ""),
                "source_type": "news",
                "published_at": res.get("date") or res.get("published_date"),
                "search_engine": "google_news",
                "created_at": now
            })

    elif engine == "google_maps":
        places = raw_data.get("local_results", []) or raw_data.get("place_results", [])
        for idx, res in enumerate(places):
            link = res.get("website") or (f"https://maps.google.com/?cid={res.get('place_id')}" if res.get("place_id") else "https://maps.google.com")
            domain = extract_domain(link)
            items.append({
                "id": f"gm-{idx}-{now}",
                "title": res.get("title") or res.get("name", "Local Business Listing"),
                "url": link,
                "domain": domain,
                "snippet": f"Location: {res.get('address', 'N/A')} | Rating: {res.get('rating', 'N/A')} stars ({res.get('reviews', 0)} reviews)",
                "source_type": "business_listing",
                "published_at": None,
                "search_engine": "google_maps",
                "created_at": now
            })

    elif engine == "google_jobs":
        jobs = raw_data.get("jobs_results", [])
        for idx, res in enumerate(jobs):
            link = res.get("share_link") or "https://google.com/jobs"
            domain = extract_domain(link)
            items.append({
                "id": f"gj-{idx}-{now}",
                "title": f"{res.get('title')} at {res.get('company_name')}",
                "url": link,
                "domain": domain,
                "snippet": f"Company: {res.get('company_name')} | Location: {res.get('location')} | Posted: {res.get('detected_extensions', {}).get('posted_at', 'Recently')}",
                "source_type": "company",
                "published_at": res.get("detected_extensions", {}).get("posted_at"),
                "search_engine": "google_jobs",
                "created_at": now
            })

    elif engine == "google_shopping":
        shopping = raw_data.get("shopping_results", [])
        for idx, res in enumerate(shopping):
            link = res.get("link") or res.get("product_link")
            if not link:
                continue
            domain = extract_domain(link)
            items.append({
                "id": f"gs-{idx}-{now}",
                "title": res.get("title", "Product Listing"),
                "url": link,
                "domain": domain,
                "snippet": f"Merchant: {res.get('source', domain)} | Price: {res.get('price', 'N/A')} | Rating: {res.get('rating', 'N/A')}",
                "source_type": "business_listing",
                "published_at": None,
                "search_engine": "google_shopping",
                "created_at": now
            })

    return items
