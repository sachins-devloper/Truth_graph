'use client';

import React from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle2, HelpCircle, ArrowRight } from 'lucide-react';
import { InvestigationReport } from '@/types';

interface ExecutiveSummaryProps {
  report: InvestigationReport;
}

export const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ report }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Strongly Supported':
        return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';
      case 'Supported by Multiple Sources':
        return 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30';
      case 'Conflicting Evidence':
        return 'bg-rose-500/10 text-rose-300 border-rose-500/30';
      case 'Insufficient Evidence':
      case 'Could Not Verify':
        return 'bg-amber-500/10 text-amber-300 border-amber-500/30';
      default:
        return 'bg-slate-500/10 text-slate-300 border-slate-500/30';
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl mb-8 relative overflow-hidden">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-slate-800 pb-6 mb-6">
        <div>
          <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest font-mono">
            TruthGraph Investigation Report
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">{report.title}</h2>
          <p className="text-xs text-slate-400 font-mono mt-1">Inquiry: &quot;{report.original_question}&quot;</p>
        </div>

        {/* Evidence Status Badge & Confidence */}
        <div className="flex flex-col items-start md:items-end gap-2 flex-shrink-0">
          <span className={`px-4 py-2 rounded-xl border text-sm font-bold tracking-wide font-mono shadow-md ${getStatusColor(report.evidence_status)}`}>
            {report.evidence_status}
          </span>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>Evidence Confidence:</span>
            <strong className="text-indigo-300">{report.confidence_label} ({(report.confidence_score * 100).toFixed(0)}%)</strong>
          </div>
        </div>
      </div>

      {/* Executive Summary Paragraph */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 mb-6">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono mb-2">Executive Summary</h4>
        <p className="text-slate-200 text-sm sm:text-base leading-relaxed">{report.summary}</p>
      </div>
    </div>
  );
};
