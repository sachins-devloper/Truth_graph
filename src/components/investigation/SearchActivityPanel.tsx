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
        return { label: 'Google Web', icon: Globe, color: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'google_news':
        return { label: 'Google News', icon: Newspaper, color: 'bg-violet-50 text-violet-700 border-violet-200' };
      case 'google_maps':
        return { label: 'Google Maps', icon: MapPin, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'google_jobs':
        return { label: 'Google Jobs', icon: Briefcase, color: 'bg-amber-50 text-amber-700 border-amber-200' };
      case 'google_shopping':
        return { label: 'Google Shopping', icon: ShoppingCart, color: 'bg-cyan-50 text-cyan-700 border-cyan-200' };
      default:
        return { label: engine, icon: Search, color: 'bg-slate-100 text-slate-700 border-slate-200' };
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5 text-indigo-600" />
          <h3 className="font-bold text-slate-900 text-base">SerpApi Dynamic Search Activity</h3>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold">
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
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 bg-slate-50/60 border border-slate-200 rounded-xl hover:border-slate-300 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg border ${badge.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 font-mono">{badge.label}</span>
                    <span className="text-[11px] text-slate-500 font-mono">• {q.purpose}</span>
                  </div>
                  <p className="text-xs text-indigo-700 font-mono mt-0.5">&quot;{q.query}&quot;</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg self-end sm:self-auto font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{q.results_count || 6} results retrieved</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

