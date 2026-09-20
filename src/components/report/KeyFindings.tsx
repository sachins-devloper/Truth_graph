'use client';

import React from 'react';
import { CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';

interface KeyFindingsProps {
  findings: string[];
  uncertainties: string[];
  nextSteps: string[];
}

export const KeyFindings: React.FC<KeyFindingsProps> = ({ findings, uncertainties, nextSteps }) => {
  return (
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      {/* Key Findings */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <h3 className="font-bold text-white text-base">Key Factual Findings</h3>
        </div>
        <ul className="space-y-3">
          {findings.map((f, i) => (
            <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Uncertainties & Next Steps */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-4">
          <HelpCircle className="w-5 h-5 text-amber-400" />
          <h3 className="font-bold text-white text-base">Uncertainties & Next Verification Steps</h3>
        </div>

        <div className="space-y-4">
          <div>
            <span className="text-[11px] font-bold text-amber-400 uppercase font-mono block mb-2">Important Uncertainties</span>
            <ul className="space-y-2">
              {uncertainties.map((u, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className="text-amber-400">•</span>
                  <span>{u}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-3 border-t border-slate-800">
            <span className="text-[11px] font-bold text-indigo-400 uppercase font-mono block mb-2">Suggested Next Verification</span>
            <ul className="space-y-2">
              {nextSteps.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className="text-indigo-400">→</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
