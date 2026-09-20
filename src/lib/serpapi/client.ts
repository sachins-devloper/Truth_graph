import { SearchEngineType, SearchResultItem, SourceType } from '@/types';
import { normalizeSearchResult } from './normalizer';

const SERPAPI_KEY = process.env.SERPAPI_API_KEY || '';

export interface SerpApiSearchOptions {
  query: string;
  engine?: SearchEngineType;
  location?: string;
  numResults?: number;
}

export class SerpApiClient {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || SERPAPI_KEY;
  }

  public hasApiKey(): boolean {
    return Boolean(this.apiKey && this.apiKey.trim().length > 0);
  }

  public async search(options: SerpApiSearchOptions): Promise<SearchResultItem[]> {
    const { query, engine = 'google', location = 'India', numResults = 8 } = options;

    if (!this.hasApiKey()) {
      console.warn(`[SerpApi] API Key missing. Returning fallback empty search array for ${engine}: "${query}"`);
      return [];
    }

    try {
      const params = new URLSearchParams({
        api_key: this.apiKey,
        engine: engine,
        q: query,
        num: numResults.toString(),
      });

      if (location) {
        params.append('location', location);
      }

      const url = `https://serpapi.com/search.json?${params.toString()}`;
      const response = await fetch(url, {
        headers: { 'User-Agent': 'TruthGraph-InvestigationEngine/1.0' },
        next: { revalidate: 3600 }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[SerpApi] HTTP Error ${response.status} for ${engine}:`, errorText);
        return [];
      }

      const rawData = await response.json();
      return normalizeSearchResult(rawData, engine, query);
    } catch (err: any) {
      console.error(`[SerpApi] Search execution failed for ${engine}: "${query}"`, err?.message || err);
      return [];
    }
  }
}

export const serpApiClient = new SerpApiClient();
