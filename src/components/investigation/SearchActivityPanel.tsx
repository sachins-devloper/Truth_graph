'use client';

import React from 'react';
import { Search, Globe, Newspaper, MapPin, Briefcase, ShoppingCart, CheckCircle2 } from 'lucide-react';
import { SearchEngineType } from '@/types';

interface QueryItem {
  query: string;
  engine: SearchEngineType;
  purpose: string;
  results_count?: number;
}

interface SearchActivityPanelProps {
  queries: QueryItem[];
}

export const SearchActivityPanel: React.FC<SearchActivityPanelProps> = ({ queries }) => {
  const getEngineBadge = (engine: SearchEngineType) => {
    switch (engine) {
      case 'google':
        return { label: 'Google Web', icon: Globe, color: 'bg-blue-500/10 text-blue-400 border-blue-500/30' };
      case 'google_news':
        return { label: 'Google News', icon: Newspaper, color: 'bg-violet-500/10 text-violet-400 border-violet-500/30' };
      case 'google_maps':
        return { label: 'Google Maps', icon: MapPin, color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' };
      case 'google_jobs':
        return { label: 'Google Jobs', icon: Briefcase, color: 'bg-amber-500/10 text-amber-400 border-amber-500/30' };
      case 'google_shopping':
        return { label: 'Google Shopping', icon: ShoppingCart, color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' };
      default:
        return { label: engine, icon: Search, color: 'bg-slate-500/10 text-slate-400 border-slate-500/30' };
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl mb-8">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5 text-indigo-400" />
          <h3 className="font-bold text-white text-base">SerpApi Dynamic Search Activity</h3>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
          {queries.length} Search Engines Dispatched
        </span>
      </div>

      <div className="space-y-3">
        {queries.map((q, idx) => {
          const badge = getEngineBadge(q.engine);
          const Icon = badge.icon;
          return (
            <div
              key={idx}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl hover:border-slate-700 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg border ${badge.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-200 font-mono">{badge.label}</span>
                    <span className="text-[11px] text-slate-500 font-mono">• {q.purpose}</span>
                  </div>
                  <p className="text-xs text-indigo-300 font-mono mt-0.5">&quot;{q.query}&quot;</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg self-end sm:self-auto">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{q.results_count || 6} results retrieved</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
