import { NextRequest, NextResponse } from 'next/server';
import { inMemoryStore } from '@/lib/db/in-memory-store';
import { DEMO_PRESETS } from '@/lib/demo-data/presets';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let inv = inMemoryStore.getInvestigation(id);

  if (!inv) {
    // Return a default demo preset fallback if ID was generated during a previous server instance
    const preset = DEMO_PRESETS[0];
    inv = { ...preset, id, created_at: new Date().toISOString() };
    if (inv.report) inv.report.investigation_id = id;
    inMemoryStore.saveInvestigation(inv);
  }

  return NextResponse.json({ investigation: inv });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const deleted = inMemoryStore.deleteInvestigation(id);

  if (!deleted) {
    return NextResponse.json({ error: 'Investigation not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: `Investigation ${id} deleted` });
}
