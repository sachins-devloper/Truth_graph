import { NextResponse } from 'next/server';
import { DEMO_PRESETS } from '@/lib/demo-data/presets';

export async function GET() {
  return NextResponse.json({ presets: DEMO_PRESETS });
}
