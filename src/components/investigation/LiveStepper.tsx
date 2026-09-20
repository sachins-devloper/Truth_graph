'use client';

import React from 'react';
import { CheckCircle2, Clock, Loader2, AlertCircle } from 'lucide-react';
import { InvestigationStatus } from '@/types';

interface LiveStepperProps {
  status: InvestigationStatus;
}

export const LiveStepper: React.FC<LiveStepperProps> = ({ status }) => {
  const steps = [
    { id: 'queued', label: 'Queued' },
    { id: 'planning', label: 'Research Plan' },
    { id: 'searching', label: 'SerpApi Search' },
    { id: 'analyzing', label: 'Evidence Extract' },
    { id: 'cross_checking', label: 'Cross-Check' },
    { id: 'generating_report', label: 'Generating Report' },
    { id: 'completed', label: 'Completed' }
  ];

  const getCurrentStepIndex = () => {
    switch (status) {
      case 'queued': return 0;
      case 'planning': return 1;
      case 'searching': return 2;
      case 'analyzing': return 3;
      case 'cross_checking': return 4;
      case 'generating_report': return 5;
      case 'completed': return 6;
      case 'failed': return -1;
      default: return 0;
    }
  };

  const currentIndex = getCurrentStepIndex();

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-8">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider font-mono">
          Investigation Progress
        </span>
        <span className="text-xs text-slate-500 font-mono">
          Status: <strong className="text-slate-900 uppercase font-bold">{status.replace('_', ' ')}</strong>
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-7 gap-2">
        {steps.map((step, idx) => {
          const isDone = currentIndex > idx || status === 'completed';
          const isCurrent = currentIndex === idx && status !== 'completed';
          const isFailed = status === 'failed';

          return (
            <div
              key={step.id}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                isDone
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : isCurrent
                  ? 'bg-indigo-50 border-indigo-300 text-indigo-900 shadow-sm'
                  : isFailed
                  ? 'bg-rose-50 border-rose-200 text-rose-800'
                  : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}
            >
              <div className="mb-1.5">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-indigo-600 animate-spin" />
                ) : isFailed ? (
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                ) : (
                  <Clock className="w-4 h-4 text-slate-400" />
                )}
              </div>
              <span className="text-[11px] font-semibold leading-tight">{step.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

