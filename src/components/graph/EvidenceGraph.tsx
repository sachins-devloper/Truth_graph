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
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl mb-12 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <GitFork className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-white text-lg">Interactive Evidence Claim Graph</h3>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Click any node to inspect source citations and stance evidence
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
            <span className="text-emerald-300">Supporting ({supportingEvidence.length})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50" />
            <span className="text-rose-300">Contradicting ({contradictingEvidence.length})</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas Graph Visualization */}
      <div className="relative w-full overflow-x-auto py-8 px-4 flex justify-center bg-slate-900/40 rounded-xl border border-slate-800/80">
        <div className="flex flex-col items-center max-w-4xl w-full">
          {/* Central Claim Node */}
          <div className="bg-gradient-to-r from-indigo-900 via-violet-900 to-slate-900 border-2 border-indigo-500 rounded-2xl p-5 shadow-2xl shadow-indigo-500/20 text-center max-w-lg z-10 relative">
            <span className="text-[10px] uppercase font-mono tracking-widest text-indigo-300 font-bold block mb-1">
              Subject of Investigation
            </span>
            <p className="text-sm sm:text-base font-bold text-white line-clamp-2">&quot;{question}&quot;</p>
          </div>

          {/* Connector Line */}
          <div className="w-0.5 h-10 bg-indigo-500/50 my-1" />

          {/* Evidence Branch Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {/* Supporting Evidence Branch */}
            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-4 flex flex-col items-center">
              <div className="flex items-center gap-2 mb-4 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider font-mono">
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
                        className="bg-slate-900/90 border border-emerald-500/40 hover:border-emerald-400 p-3.5 rounded-xl cursor-pointer transition-all hover:shadow-lg hover:shadow-emerald-950/50 group"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-xs font-bold text-emerald-400 font-mono truncate">{ev.source_name}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-mono">
                            {(ev.relevance_score * 100).toFixed(0)}% Relevance
                          </span>
                        </div>
                        <p className="text-xs text-slate-200 font-medium line-clamp-2 mb-2 group-hover:text-white transition-colors">
                          {ev.title}
                        </p>
                        <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                          <span className="flex items-center gap-1">
                            <Icon className="w-3 h-3 text-indigo-400" />
                            {ev.search_engine}
                          </span>
                          <span className="text-indigo-400 group-hover:underline flex items-center gap-1">
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
            <div className="bg-rose-950/20 border border-rose-500/30 rounded-xl p-4 flex flex-col items-center">
              <div className="flex items-center gap-2 mb-4 px-3 py-1 bg-rose-500/10 border border-rose-500/30 rounded-full">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span className="text-xs font-bold text-rose-300 uppercase tracking-wider font-mono">
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
                        className="bg-slate-900/90 border border-rose-500/40 hover:border-rose-400 p-3.5 rounded-xl cursor-pointer transition-all hover:shadow-lg hover:shadow-rose-950/50 group"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-xs font-bold text-rose-400 font-mono truncate">{ev.source_name}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/30 font-mono">
                            {(ev.relevance_score * 100).toFixed(0)}% Relevance
                          </span>
                        </div>
                        <p className="text-xs text-slate-200 font-medium line-clamp-2 mb-2 group-hover:text-white transition-colors">
                          {ev.title}
                        </p>
                        <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                          <span className="flex items-center gap-1">
                            <Icon className="w-3 h-3 text-indigo-400" />
                            {ev.search_engine}
                          </span>
                          <span className="text-rose-400 group-hover:underline flex items-center gap-1">
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
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-lg w-full shadow-2xl relative">
            <button
              onClick={() => setSelectedNode(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span
                className={`text-xs font-bold uppercase px-2 py-0.5 rounded-full border font-mono ${
                  selectedNode.evidence_type === 'supporting'
                    ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                    : 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                }`}
              >
                {selectedNode.evidence_type} Evidence
              </span>
              <span className="text-xs text-slate-400 font-mono">• {selectedNode.source_type}</span>
            </div>

            <h4 className="text-base font-bold text-white mb-2">{selectedNode.title}</h4>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 mb-4 text-xs text-slate-300 leading-relaxed font-mono">
              &quot;{selectedNode.snippet}&quot;
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
              <span className="text-slate-400 font-mono">Source Domain: <strong>{selectedNode.source_domain}</strong></span>
              <a
                href={selectedNode.source_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-indigo-400 hover:underline font-semibold font-mono"
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
