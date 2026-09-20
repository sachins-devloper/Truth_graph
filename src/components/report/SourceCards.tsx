'use client';

import React from 'react';
import { ExternalLink, Globe, ShieldCheck, Newspaper, Building2 } from 'lucide-react';
import { SourceItem } from '@/types';

interface SourceCardsProps {
  sources: SourceItem[];
}

export const SourceCards: React.FC<SourceCardsProps> = ({ sources }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-indigo-600" />
          <h3 className="font-bold text-slate-900 text-base">Verified Source References ({sources.length})</h3>
        </div>
        <span className="text-xs font-mono text-slate-500">Never fabricated • Click to inspect</span>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {sources.map((src, idx) => (
          <div
            key={idx}
            className="bg-slate-50/60 p-4 rounded-xl border border-slate-200 hover:border-indigo-300 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-indigo-700 font-mono truncate">{src.domain}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600">
                  {src.source_type}
                </span>
              </div>
              <h4 className="text-xs font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                {src.title}
              </h4>
              {src.snippet && (
                <p className="text-[11px] text-slate-600 line-clamp-2 font-mono mb-3">&quot;{src.snippet}&quot;</p>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-200 text-[11px]">
              <span className="text-slate-500 font-mono">
                {src.published_at ? `Date: ${src.published_at}` : 'Undated'}
              </span>
              <a
                href={src.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-indigo-600 hover:underline font-semibold font-mono"
              >
                Inspect Source <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

