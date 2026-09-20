'use client';

import React, { useState } from 'react';
import { GitFork, ShieldCheck, CheckCircle2, AlertTriangle, ExternalLink, X, Globe, Newspaper, MapPin, Briefcase, ShoppingCart } from 'lucide-react';
import { EvidenceItem, SearchEngineType } from '@/types';

interface EvidenceGraphProps {
  question: string;
  supportingEvidence: EvidenceItem[];
  contradictingEvidence: EvidenceItem[];
}

export const EvidenceGraph: React.FC<EvidenceGraphProps> = ({
  question,
  supportingEvidence,
  contradictingEvidence
}) => {
  const [selectedNode, setSelectedNode] = useState<EvidenceItem | null>(null);

  const getEngineIcon = (engine: SearchEngineType) => {
    switch (engine) {
      case 'google_news': return Newspaper;
      case 'google_maps': return MapPin;
      case 'google_jobs': return Briefcase;
      case 'google_shopping': return ShoppingCart;
      default: return Globe;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-12 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <GitFork className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-slate-900 text-lg">Interactive Evidence Claim Graph</h3>
          </div>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Click any node to inspect source citations and stance evidence
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm" />
            <span className="text-emerald-700 font-semibold">Supporting ({supportingEvidence.length})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500 shadow-sm" />
            <span className="text-rose-700 font-semibold">Contradicting ({contradictingEvidence.length})</span>
          </div>
        </div>
      </div>

      {/* Canvas Graph Visualization */}
      <div className="relative w-full overflow-x-auto py-8 px-4 flex justify-center bg-slate-50/70 rounded-xl border border-slate-200">
        <div className="flex flex-col items-center max-w-4xl w-full">
          {/* Central Claim Node */}
          <div className="bg-gradient-to-r from-indigo-50 via-violet-50 to-indigo-100 border-2 border-indigo-400 rounded-2xl p-5 shadow-md text-center max-w-lg z-10 relative">
            <span className="text-[10px] uppercase font-mono tracking-widest text-indigo-700 font-bold block mb-1">
              Subject of Investigation
            </span>
            <p className="text-sm sm:text-base font-bold text-slate-900 line-clamp-2">&quot;{question}&quot;</p>
          </div>

          {/* Connector Line */}
          <div className="w-0.5 h-10 bg-indigo-300 my-1" />

          {/* Evidence Branch Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {/* Supporting Evidence Branch */}
            <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-4 flex flex-col items-center">
              <div className="flex items-center gap-2 mb-4 px-3 py-1 bg-emerald-100 border border-emerald-300 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider font-mono">
                  Supporting Branch
                </span>
              </div>

              <div className="space-y-3 w-full">
                {supportingEvidence.length === 0 ? (
                  <p className="text-xs text-slate-500 italic text-center py-4">No supporting evidence items</p>
                ) : (
                  supportingEvidence.map((ev) => {
                    const Icon = getEngineIcon(ev.search_engine);
                    return (
                      <div
                        key={ev.id}
                        onClick={() => setSelectedNode(ev)}
                        className="bg-white border border-emerald-200 hover:border-emerald-400 p-3.5 rounded-xl cursor-pointer transition-all hover:shadow-md group"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-xs font-bold text-emerald-700 font-mono truncate">{ev.source_name}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono font-semibold">
                            {(ev.relevance_score * 100).toFixed(0)}% Relevance
                          </span>
                        </div>
                        <p className="text-xs text-slate-800 font-medium line-clamp-2 mb-2 group-hover:text-indigo-600 transition-colors">
                          {ev.title}
                        </p>
                        <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                          <span className="flex items-center gap-1">
                            <Icon className="w-3 h-3 text-indigo-600" />
                            {ev.search_engine}
                          </span>
                          <span className="text-indigo-600 group-hover:underline flex items-center gap-1 font-semibold">
                            Inspect <ExternalLink className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Contradicting Evidence Branch */}
            <div className="bg-rose-50/50 border border-rose-200 rounded-xl p-4 flex flex-col items-center">
              <div className="flex items-center gap-2 mb-4 px-3 py-1 bg-rose-100 border border-rose-300 rounded-full">
                <AlertTriangle className="w-4 h-4 text-rose-700" />
                <span className="text-xs font-bold text-rose-800 uppercase tracking-wider font-mono">
                  Contradicting Branch
                </span>
              </div>

              <div className="space-y-3 w-full">
                {contradictingEvidence.length === 0 ? (
                  <p className="text-xs text-slate-500 italic text-center py-4">No contradicting evidence items flagged</p>
                ) : (
                  contradictingEvidence.map((ev) => {
                    const Icon = getEngineIcon(ev.search_engine);
                    return (
                      <div
                        key={ev.id}
                        onClick={() => setSelectedNode(ev)}
                        className="bg-white border border-rose-200 hover:border-rose-400 p-3.5 rounded-xl cursor-pointer transition-all hover:shadow-md group"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-xs font-bold text-rose-700 font-mono truncate">{ev.source_name}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200 font-mono font-semibold">
                            {(ev.relevance_score * 100).toFixed(0)}% Relevance
                          </span>
                        </div>
                        <p className="text-xs text-slate-800 font-medium line-clamp-2 mb-2 group-hover:text-rose-700 transition-colors">
                          {ev.title}
                        </p>
                        <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                          <span className="flex items-center gap-1">
                            <Icon className="w-3 h-3 text-indigo-600" />
                            {ev.search_engine}
                          </span>
                          <span className="text-rose-600 group-hover:underline flex items-center gap-1 font-semibold">
                            Inspect <ExternalLink className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Node Detail Modal */}
      {selectedNode && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-lg w-full shadow-2xl relative">
            <button
              onClick={() => setSelectedNode(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span
                className={`text-xs font-bold uppercase px-2 py-0.5 rounded-full border font-mono ${
                  selectedNode.evidence_type === 'supporting'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-rose-50 text-rose-800 border-rose-300'
                }`}
              >
                {selectedNode.evidence_type} Evidence
              </span>
              <span className="text-xs text-slate-500 font-mono">• {selectedNode.source_type}</span>
            </div>

            <h4 className="text-base font-bold text-slate-900 mb-2">{selectedNode.title}</h4>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 mb-4 text-xs text-slate-700 leading-relaxed font-mono">
              &quot;{selectedNode.snippet}&quot;
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-200 text-xs">
              <span className="text-slate-600 font-mono">Source Domain: <strong>{selectedNode.source_domain}</strong></span>
              <a
                href={selectedNode.source_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-indigo-600 hover:underline font-semibold font-mono"
              >
                Visit URL <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

