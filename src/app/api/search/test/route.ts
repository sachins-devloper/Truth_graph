import { NextRequest, NextResponse } from 'next/server';
import { serpApiClient } from '@/lib/serpapi/client';
import { SearchEngineType } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query, engine = 'google' } = body;

    if (!query) {
      return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    const results = await serpApiClient.search({
      query,
      engine: engine as SearchEngineType,
      numResults: 6
    });

    return NextResponse.json({
      engine,
      query,
      has_api_key: serpApiClient.hasApiKey(),
      results_count: results.length,
      results
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Search execution failed' }, { status: 500 });
  }
}
