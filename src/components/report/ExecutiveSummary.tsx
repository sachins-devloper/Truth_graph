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
        return 'bg-emerald-50 text-emerald-800 border-emerald-300';
      case 'Supported by Multiple Sources':
        return 'bg-indigo-50 text-indigo-800 border-indigo-300';
      case 'Conflicting Evidence':
        return 'bg-rose-50 text-rose-800 border-rose-300';
      case 'Insufficient Evidence':
      case 'Could Not Verify':
        return 'bg-amber-50 text-amber-800 border-amber-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm mb-8 relative overflow-hidden">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-slate-200 pb-6 mb-6">
        <div>
          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-widest font-mono">
            TruthGraph Investigation Report
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">{report.title}</h2>
          <p className="text-xs text-slate-500 font-mono mt-1">Inquiry: &quot;{report.original_question}&quot;</p>
        </div>

        {/* Evidence Status Badge & Confidence */}
        <div className="flex flex-col items-start md:items-end gap-2 flex-shrink-0">
          <span className={`px-4 py-2 rounded-xl border text-sm font-bold tracking-wide font-mono shadow-sm ${getStatusColor(report.evidence_status)}`}>
            {report.evidence_status}
          </span>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <span>Evidence Confidence:</span>
            <strong className="text-indigo-700">{report.confidence_label} ({(report.confidence_score * 100).toFixed(0)}%)</strong>
          </div>
        </div>
      </div>

      {/* Executive Summary Paragraph */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-2">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono mb-2">Executive Summary</h4>
        <p className="text-slate-800 text-sm sm:text-base leading-relaxed">{report.summary}</p>
      </div>
    </div>
  );
};

