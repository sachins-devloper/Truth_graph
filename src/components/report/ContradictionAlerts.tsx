'use client';

import React from 'react';
import { AlertTriangle, ExternalLink } from 'lucide-react';
import { ContradictionItem } from '@/types';

interface ContradictionAlertsProps {
  contradictions: ContradictionItem[];
}

export const ContradictionAlerts: React.FC<ContradictionAlertsProps> = ({ contradictions }) => {
  if (!contradictions || contradictions.length === 0) {
    return null;
  }

  return (
    <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 shadow-sm mb-8">
      <div className="flex items-center gap-2 border-b border-rose-200 pb-4 mb-4">
        <AlertTriangle className="w-5 h-5 text-rose-600 animate-pulse" />
        <h3 className="font-bold text-rose-900 text-lg">CONFLICT DETECTED — Source Discrepancies ({contradictions.length})</h3>
      </div>

      <div className="space-y-6">
        {contradictions.map((item, idx) => (
          <div key={idx} className="bg-white border border-rose-200 rounded-xl p-5 shadow-sm">
            <h4 className="font-bold text-slate-900 text-sm sm:text-base mb-3 font-mono">
              Claim Discrepancy: &quot;{item.claim_text}&quot;
            </h4>

            {/* Side-by-side comparison */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              {/* Evidence A */}
              <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200">
                <span className="text-[10px] uppercase font-mono text-emerald-800 font-bold block mb-1">
                  Source A — {item.evidence_a.source_name}
                </span>
                <p className="text-xs text-slate-800 font-mono mb-2">&quot;{item.evidence_a.content}&quot;</p>
                {item.evidence_a.date && (
                  <span className="text-[11px] text-slate-500 font-mono">Published: {item.evidence_a.date}</span>
                )}
              </div>

              {/* Evidence B */}
              <div className="bg-rose-50/60 p-4 rounded-xl border border-rose-200">
                <span className="text-[10px] uppercase font-mono text-rose-800 font-bold block mb-1">
                  Source B — {item.evidence_b.source_name}
                </span>
                <p className="text-xs text-slate-800 font-mono mb-2">&quot;{item.evidence_b.content}&quot;</p>
                {item.evidence_b.date && (
                  <span className="text-[11px] text-slate-500 font-mono">Published: {item.evidence_b.date}</span>
                )}
              </div>
            </div>

            {/* Analysis & Cause */}
            <div className="p-3 bg-rose-100/60 rounded-lg border border-rose-200 text-xs text-rose-900">
              <strong>Engine Assessment:</strong> {item.explanation}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

