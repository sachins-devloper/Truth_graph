'use client';

import React from 'react';
import { Layers, Globe, Newspaper, MapPin, Briefcase, ShoppingCart, Check, Minus } from 'lucide-react';
import { SearchCoverageItem, SearchEngineType } from '@/types';

interface SearchCoverageGridProps {
  coverage: SearchCoverageItem[];
}

export const SearchCoverageGrid: React.FC<SearchCoverageGridProps> = ({ coverage }) => {
  const getEngineDetails = (engine: SearchEngineType) => {
    switch (engine) {
      case 'google': return { name: 'Google Web', icon: Globe };
      case 'google_news': return { name: 'Google News', icon: Newspaper };
      case 'google_maps': return { name: 'Google Maps', icon: MapPin };
      case 'google_jobs': return { name: 'Google Jobs', icon: Briefcase };
      case 'google_shopping': return { name: 'Google Shopping', icon: ShoppingCart };
      default: return { name: engine, icon: Layers };
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl mb-8">
      <div className="flex items-center gap-2 border-b border-slate-800 pb-4 mb-4">
        <Layers className="w-5 h-5 text-indigo-400" />
        <h3 className="font-bold text-white text-base">SerpApi Multi-Engine Coverage Matrix</h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {coverage.map((c, idx) => {
          const details = getEngineDetails(c.engine);
          const Icon = details.icon;
          return (
            <div
              key={idx}
              className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                c.queried
                  ? 'bg-indigo-950/40 border-indigo-500/40 text-white'
                  : 'bg-slate-950/40 border-slate-800 text-slate-600 opacity-60'
              }`}
            >
              <div className="mb-2 p-2 rounded-lg bg-slate-900 border border-slate-800">
                <Icon className={`w-5 h-5 ${c.queried ? 'text-indigo-400' : 'text-slate-600'}`} />
              </div>
              <span className="text-xs font-bold font-mono mb-1">{details.name}</span>
              <div className="flex items-center gap-1 text-[11px] font-mono">
                {c.queried ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300">{c.results_count} Hits</span>
                  </>
                ) : (
                  <>
                    <Minus className="w-3.5 h-3.5 text-slate-600" />
                    <span>Not Needed</span>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
