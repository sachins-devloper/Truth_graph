import { NextRequest, NextResponse } from 'next/server';
import { inMemoryStore } from '@/lib/db/in-memory-store';
import { investigationOrchestrator } from '@/lib/agent/investigator';
import { DEMO_PRESETS } from '@/lib/demo-data/presets';
import { connectToDatabase } from '@/lib/db/mongodb';
import { InvestigationModel } from '@/lib/db/models/Investigation';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question, demo_preset_id } = body;

    if (!question && !demo_preset_id) {
      return NextResponse.json({ error: 'Question or demo_preset_id is required' }, { status: 400 });
    }

    if (demo_preset_id) {
      const preset = DEMO_PRESETS.find((p) => p.id === demo_preset_id);
      if (preset) {
        const id = `inv-demo-${Date.now()}`;
        const cloned = { ...preset, id, created_at: new Date().toISOString() };
        if (cloned.report) cloned.report.investigation_id = id;
        inMemoryStore.saveInvestigation(cloned);
        
        // Trigger async execution
        investigationOrchestrator.executeInvestigation(id, cloned.original_question).catch(console.error);

        return NextResponse.json({ investigation: cloned });
      }
    }

    const id = `inv-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const original_question = question.trim();

    // Trigger async pipeline
    investigationOrchestrator.executeInvestigation(id, original_question).catch(console.error);

    const initial = inMemoryStore.getInvestigation(id);
    return NextResponse.json({
      investigation: initial || {
        id,
        title: `Investigation: ${original_question.slice(0, 50)}`,
        original_question,
        category: 'general_research',
        status: 'queued',
        created_at: new Date().toISOString()
      }
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed to create investigation' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    // Combine inMemoryStore with any persistent MongoDB entries if present
    const local = inMemoryStore.listInvestigations();
    if (local.length === 0) {
      // Seed with demo presets if store is empty
      DEMO_PRESETS.forEach((p) => inMemoryStore.saveInvestigation(p));
      return NextResponse.json({ investigations: inMemoryStore.listInvestigations() });
    }
    return NextResponse.json({ investigations: local });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed to fetch investigations' }, { status: 500 });
  }
}
