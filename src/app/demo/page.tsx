'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Sparkles, Building2, ShoppingBag, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { DEMO_PRESETS } from '@/lib/demo-data/presets';

export default function DemoPage() {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleRunDemo = async (presetId: string) => {
    setLoadingId(presetId);
    try {
      const res = await fetch('/api/investigations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ demo_preset_id: presetId })
      });
      const data = await res.json();
      if (data.investigation?.id) {
        router.push(`/investigate/${data.investigation.id}`);
      } else {
        setLoadingId(null);
      }
    } catch (err) {
      console.error(err);
      setLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Header />

      <main className="flex-grow max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Hackathon Demonstration Mode</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Experience TruthGraph Live
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
            Select any pre-configured SerpApi investigation scenario below to witness real-time planning, multi-engine search execution, contradiction detection, and interactive evidence graphing.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {DEMO_PRESETS.map((preset, idx) => (
            <div
              key={preset.id}
              className="bg-white border border-slate-200 hover:border-indigo-300 p-6 rounded-2xl flex flex-col justify-between transition-all hover:shadow-md group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] uppercase font-mono px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold">
                    Demo {idx + 1} • {preset.category.replace('_', ' ')}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-indigo-600 transition-colors">
                  {preset.title}
                </h3>

                <p className="text-xs text-slate-500 font-mono mb-4 line-clamp-3">
                  &quot;{preset.original_question}&quot;
                </p>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1 mb-6">
                  <div className="flex items-center justify-between text-slate-600 font-mono">
                    <span>Engines:</span>
                    <span className="text-indigo-700 font-bold">{preset.queries?.length || 4} SerpApi Engines</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600 font-mono">
                    <span>Evidence Stance:</span>
                    <span className="text-emerald-700 font-bold">{preset.report?.evidence_status}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600 font-mono">
                    <span>Contradictions:</span>
                    <span className="text-rose-700 font-bold">{preset.contradiction_count} Flagged</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleRunDemo(preset.id)}
                disabled={loadingId === preset.id}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-xs py-3 rounded-xl transition-all shadow-md shadow-indigo-600/20 disabled:opacity-50"
              >
                {loadingId === preset.id ? (
                  <span>Launching Demo...</span>
                ) : (
                  <>
                    <span>Run Demo Investigation</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

