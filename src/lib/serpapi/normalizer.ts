import { SearchEngineType, SearchResultItem, SourceType } from '@/types';

export function normalizeSearchResult(
  rawData: any,
  engine: SearchEngineType,
  query: string
): SearchResultItem[] {
  const items: SearchResultItem[] = [];
  const now = new Date().toISOString();

  if (engine === 'google') {
    const organic = rawData?.organic_results || [];
    organic.forEach((res: any, idx: number) => {
      if (!res.link) return;
      const domain = extractDomain(res.link);
      items.push({
        id: `google-${idx}-${Date.now()}`,
        title: res.title || 'Untitled Web Result',
        url: res.link,
        domain: domain,
        snippet: res.snippet || res.snippet_highlighted_words?.join(' ') || '',
        source_type: categorizeSourceType(domain, res.link),
        published_at: res.date || res.published_date || null,
        search_engine: 'google',
        raw_data: { position: res.position, rich_snippet: res.rich_snippet },
        created_at: now
      });
    });
  } else if (engine === 'google_news') {
    const newsResults = rawData?.news_results || rawData?.organic_results || [];
    newsResults.forEach((res: any, idx: number) => {
      const link = res.link || res.share_link;
      if (!link) return;
      const domain = extractDomain(link);
      items.push({
        id: `news-${idx}-${Date.now()}`,
        title: res.title || 'Untitled News Article',
        url: link,
        domain: domain,
        snippet: res.snippet || res.summary || '',
        source_type: 'news',
        published_at: res.date || res.published_date || null,
        search_engine: 'google_news',
        raw_data: { source: res.source?.name || res.source },
        created_at: now
      });
    });
  } else if (engine === 'google_maps') {
    const localResults = rawData?.local_results || rawData?.place_results || [];
    localResults.forEach((res: any, idx: number) => {
      const link = res.website || res.links?.website || res.place_id ? `https://maps.google.com/?cid=${res.place_id}` : 'https://maps.google.com';
      const domain = extractDomain(link);
      items.push({
        id: `maps-${idx}-${Date.now()}`,
        title: res.title || res.name || 'Local Business Listing',
        url: link,
        domain: domain,
        snippet: `Location: ${res.address || 'Address unavailable'} | Rating: ${res.rating || 'N/A'} stars (${res.reviews || 0} reviews) | Type: ${res.type || 'Business'}`,
        source_type: 'business_listing',
        published_at: null,
        search_engine: 'google_maps',
        raw_data: { address: res.address, rating: res.rating, reviews: res.reviews, phone: res.phone },
        created_at: now
      });
    });
  } else if (engine === 'google_jobs') {
    const jobsResults = rawData?.jobs_results || [];
    jobsResults.forEach((res: any, idx: number) => {
      const link = res.share_link || res.apply_options?.[0]?.link || res.job_id ? `https://www.google.com/search?q=${encodeURIComponent(query)}#htivrt=jobs` : 'https://google.com/jobs';
      const domain = extractDomain(link);
      items.push({
        id: `jobs-${idx}-${Date.now()}`,
        title: `${res.title} at ${res.company_name}`,
        url: link,
        domain: domain,
        snippet: `Company: ${res.company_name} | Location: ${res.location} | Posted: ${res.detected_extensions?.posted_at || 'Recently'} | Description: ${(res.description || '').slice(0, 200)}...`,
        source_type: 'company',
        published_at: res.detected_extensions?.posted_at || null,
        search_engine: 'google_jobs',
        raw_data: { company: res.company_name, location: res.location, via: res.via },
        created_at: now
      });
    });
  } else if (engine === 'google_shopping') {
    const shoppingResults = rawData?.shopping_results || [];
    shoppingResults.forEach((res: any, idx: number) => {
      const link = res.link || res.product_link || '';
      if (!link) return;
      const domain = extractDomain(link);
      items.push({
        id: `shopping-${idx}-${Date.now()}`,
        title: res.title || 'Product Listing',
        url: link,
        domain: domain,
        snippet: `Merchant: ${res.source || domain} | Price: ${res.price || 'N/A'} | Rating: ${res.rating || 'N/A'} (${res.reviews || 0} reviews)`,
        source_type: 'business_listing',
        published_at: null,
        search_engine: 'google_shopping',
        raw_data: { price: res.price, merchant: res.source, rating: res.rating },
        created_at: now
      });
    });
  }

  return deduplicateResults(items);
}

export function extractDomain(url: string): string {
  try {
    const parsed = new URL(url);
    return parsed.hostname.replace(/^www\./, '');
  } catch {
    return 'external-source';
  }
}

export function categorizeSourceType(domain: string, url: string): SourceType {
  const d = domain.toLowerCase();
  if (d.endsWith('.gov') || d.endsWith('.gov.in') || d.endsWith('.gov.uk') || d.includes('official.gov')) {
    return 'government';
  }
  if (
    d.includes('reuters.com') ||
    d.includes('bloomberg.com') ||
    d.includes('bbc.com') ||
    d.includes('thehindu.com') ||
    d.includes('timesofindia') ||
    d.includes('techcrunch.com') ||
    d.includes('moneycontrol.com') ||
    d.includes('economic-times')
  ) {
    return 'news';
  }
  if (
    d.includes('wikipedia.org') ||
    d.includes('reddit.com') ||
    d.includes('quora.com') ||
    d.includes('github.com') ||
    d.includes('medium.com')
  ) {
    return 'community';
  }
  if (d.includes('linkedin.com') || d.includes('twitter.com') || d.includes('x.com') || d.includes('facebook.com')) {
    return 'social_media';
  }
  if (d.includes('docs.') || d.includes('developer.') || url.includes('/docs/')) {
    return 'documentation';
  }
  return 'company';
}

export function deduplicateResults(results: SearchResultItem[]): SearchResultItem[] {
  const seenUrls = new Set<string>();
  const seenTitles = new Set<string>();
  const unique: SearchResultItem[] = [];

  for (const item of results) {
    const normalizedUrl = item.url.toLowerCase().split('#')[0].replace(/\/$/, '');
    const normalizedTitle = item.title.toLowerCase().trim().replace(/[^a-z0-9]/g, '');

    if (seenUrls.has(normalizedUrl) || seenTitles.has(normalizedTitle)) {
      continue;
    }

    seenUrls.add(normalizedUrl);
    seenTitles.add(normalizedTitle);
    unique.push(item);
  }

  return unique;
}
