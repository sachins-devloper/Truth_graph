import { InvestigationCategory, SearchEngineType, SearchTask } from '@/types';
import { llmProvider } from '../ai/provider';

export interface SearchPlan {
  category: InvestigationCategory;
  title: string;
  core_claims: string[];
  tasks: SearchTask[];
}

export class SearchPlanner {
  public async createPlan(question: string): Promise<SearchPlan> {
    const systemPrompt = `You are an expert AI Investigation Planner.
Your task is to analyze an investigation query and produce a structured research plan.
Determine the investigation category: 'claim_verification' | 'job_company' | 'product_shopping' | 'business_local' | 'travel_plan' | 'public_info' | 'general_research'.

Create 3 to 5 targeted search queries across SerpApi search engines.
Select engines from: 'google', 'google_news', 'google_maps', 'google_jobs', 'google_shopping'.
Rule: Select engines that strictly match the context.
Include both primary verification queries and contradiction-seeking queries (e.g., searching for scam, outdated, alternative dates, competitor pricing, or complaints).

Return JSON format:
{
  "category": "...",
  "title": "Short descriptive title of investigation",
  "core_claims": ["claim 1", "claim 2"],
  "tasks": [
    { "query": "...", "engine": "google|google_news|google_maps|google_jobs|google_shopping", "purpose": "...", "priority": 1 }
  ]
}`;

    const userPrompt = `Investigate this request: "${question}"`;

    const defaultCategory = this.detectCategoryHeuristic(question);
    const defaultTasks = this.generateDefaultTasks(question, defaultCategory);

    const fallback: SearchPlan = {
      category: defaultCategory,
      title: `Investigation: ${question.slice(0, 50)}...`,
      core_claims: [question],
      tasks: defaultTasks
    };

    if (!llmProvider.isAvailable()) {
      return fallback;
    }

    const res = await llmProvider.generateStructuredJSON<SearchPlan>(systemPrompt, userPrompt, fallback);
    
    // Ensure tasks array is clean and engine types are valid
    if (!res.tasks || !Array.isArray(res.tasks) || res.tasks.length === 0) {
      res.tasks = defaultTasks;
    }

    res.tasks = res.tasks.map((t) => ({
      ...t,
      engine: this.validateEngine(t.engine)
    }));

    return res;
  }

  private validateEngine(engine: string): SearchEngineType {
    const valid: SearchEngineType[] = ['google', 'google_news', 'google_maps', 'google_jobs', 'google_shopping'];
    return valid.includes(engine as any) ? (engine as SearchEngineType) : 'google';
  }

  private detectCategoryHeuristic(q: string): InvestigationCategory {
    const lower = q.toLowerCase();
    if (lower.includes('hiring') || lower.includes('job') || lower.includes('career') || lower.includes('salary') || lower.includes('developer') || lower.includes('engineer')) {
      return 'job_company';
    }
    if (lower.includes('price') || lower.includes('deal') || lower.includes('laptop') || lower.includes('buy') || lower.includes('discount') || lower.includes('shopping')) {
      return 'product_shopping';
    }
    if (lower.includes('restaurant') || lower.includes('open') || lower.includes('located') || lower.includes('store') || lower.includes('address') || lower.includes('location')) {
      return 'business_local';
    }
    if (lower.includes('trip') || lower.includes('flight') || lower.includes('hotel') || lower.includes('travel') || lower.includes('itinerary')) {
      return 'travel_plan';
    }
    if (lower.includes('raised') || lower.includes('funding') || lower.includes('government') || lower.includes('announced') || lower.includes('claim')) {
      return 'claim_verification';
    }
    return 'general_research';
  }

  private generateDefaultTasks(q: string, category: InvestigationCategory): SearchTask[] {
    const tasks: SearchTask[] = [
      { query: q, engine: 'google', purpose: 'Primary web verification', priority: 1 }
    ];

    if (category === 'job_company') {
      tasks.push(
        { query: `${q} jobs careers`, engine: 'google_jobs', purpose: 'Check official and aggregator job listings', priority: 1 },
        { query: `${q} latest news hiring`, engine: 'google_news', purpose: 'Check recent company news and announcements', priority: 2 },
        { query: `${q} office location`, engine: 'google_maps', purpose: 'Verify official office existence and presence', priority: 2 }
      );
    } else if (category === 'product_shopping') {
      tasks.push(
        { query: q, engine: 'google_shopping', purpose: 'Compare live market pricing across merchants', priority: 1 },
        { query: `${q} review scam price comparison`, engine: 'google', purpose: 'Search for price discrepancies and user reviews', priority: 2 },
        { query: `${q} discount deal news`, engine: 'google_news', purpose: 'Verify official deal announcements', priority: 2 }
      );
    } else if (category === 'business_local') {
      tasks.push(
        { query: q, engine: 'google_maps', purpose: 'Check live operational status, location, and reviews', priority: 1 },
        { query: `${q} news updates closed`, engine: 'google_news', purpose: 'Check recent local news or closure announcements', priority: 2 }
      );
    } else {
      tasks.push(
        { query: `${q} news`, engine: 'google_news', purpose: 'Verify recency in news reporting', priority: 1 },
        { query: `${q} controversy contradictory claims false`, engine: 'google', purpose: 'Search explicitly for opposing or debunking evidence', priority: 2 }
      );
    }

    return tasks;
  }
}

export const searchPlanner = new SearchPlanner();
