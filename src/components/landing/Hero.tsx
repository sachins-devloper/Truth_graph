'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const Hero: React.FC = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const launchInvestigation = async (qText: string) => {
    if (!qText.trim() || isLoading) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/investigations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: qText.trim() })
      });
      const data = await res.json();
      if (data.investigation?.id) {
        router.push(`/investigate/${data.investigation.id}`);
      } else {
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    launchInvestigation(query);
  };

  const sampleQueries = [
    'Is Example Technologies currently hiring backend engineers in Chennai?',
    'Is the UltraBook Pro M3 laptop deal on ElectroStore legit at ₹19,999?',
    'Did CleanTech AI raise ₹100 crore in Series A funding in 2026?'
  ];

  return (
    <div className="relative pt-12 pb-20 overflow-hidden">
      {/* Background glow graphics */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold tracking-wide uppercase mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>SerpApi AI Investigation Engine • 2026</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Don&apos;t just search.{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
            Investigate.
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
          An AI agent engine that searches the live web via SerpApi, cross-checks evidence across multiple engines, detects source contradictions, and delivers source-backed investigation reports.
        </p>

        {/* Investigation Search Bar */}
        <form onSubmit={handleStart} className="max-w-2xl mx-auto mb-8">
          <div className="relative flex items-center bg-slate-900/90 border border-slate-700/80 rounded-2xl p-2 shadow-2xl shadow-indigo-950/40 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
            <Search className="w-6 h-6 text-indigo-400 ml-3 flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What claim, job, company, product, or information do you want to investigate?"
              className="w-full bg-transparent px-4 py-3 text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none"
            />
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="flex-shrink-0 flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-md shadow-indigo-600/30 disabled:opacity-50"
            >
              {isLoading ? (
                <span>Launching...</span>
              ) : (
                <>
                  <span>Investigate</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Sample Prompt Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
          <span className="text-xs text-slate-400 font-medium mr-2">Try an investigation:</span>
          {sampleQueries.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuery(sample);
                launchInvestigation(sample);
              }}
              className="text-xs text-slate-300 hover:text-indigo-300 bg-slate-900/80 hover:bg-indigo-950/60 border border-slate-800 hover:border-indigo-500/40 px-3 py-1.5 rounded-lg transition-all text-left truncate max-w-[280px] sm:max-w-none"
            >
              {sample}
            </button>
          ))}
        </div>

        {/* Pipeline Preview Visualizer */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl max-w-4xl mx-auto text-left">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
              <span className="font-semibold text-sm text-slate-200">TruthGraph Execution Pipeline</span>
            </div>
            <span className="text-xs font-mono text-slate-500">CLAIM → PLAN → SEARCH → CROSS-CHECK → REPORT</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 text-center">
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80">
              <span className="text-[10px] uppercase font-mono text-indigo-400 block mb-1">01. Claim</span>
              <span className="text-xs text-slate-300 font-medium">User Input</span>
            </div>
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80">
              <span className="text-[10px] uppercase font-mono text-indigo-400 block mb-1">02. Planner</span>
              <span className="text-xs text-slate-300 font-medium">AI Search Strategy</span>
            </div>
            <div className="p-3 bg-indigo-950/40 rounded-xl border border-indigo-500/30">
              <span className="text-[10px] uppercase font-mono text-indigo-300 block mb-1">03. SerpApi</span>
              <span className="text-xs text-indigo-200 font-medium">Web / News / Jobs / Maps</span>
            </div>
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80">
              <span className="text-[10px] uppercase font-mono text-indigo-400 block mb-1">04. Evidence</span>
              <span className="text-xs text-slate-300 font-medium">Claim Extraction</span>
            </div>
            <div className="p-3 bg-rose-950/40 rounded-xl border border-rose-500/30">
              <span className="text-[10px] uppercase font-mono text-rose-400 block mb-1">05. Cross-Check</span>
              <span className="text-xs text-rose-200 font-medium">Contradiction Engine</span>
            </div>
            <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-500/30">
              <span className="text-[10px] uppercase font-mono text-emerald-400 block mb-1">06. Report</span>
              <span className="text-xs text-emerald-200 font-medium">Evidence-Backed Graph</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
