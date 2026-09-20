'use client';

import React, { useState } from 'react';
import { Terminal, ChevronDown, ChevronUp } from 'lucide-react';
import { InvestigationEvent } from '@/types';

interface StreamConsoleProps {
  events: InvestigationEvent[];
}

export const StreamConsole: React.FC<StreamConsoleProps> = ({ events }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!events || events.length === 0) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm mb-8 transition-all">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
      >
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-indigo-600" />
          <span className="font-mono text-xs font-semibold text-slate-800">
            Agent Execution Logs <span className="text-slate-500 font-normal">({events.length} events logged)</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600 font-semibold">
            {isExpanded ? 'Hide Console' : 'View Console Log'}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-slate-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-500" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="p-4 font-mono text-xs max-h-56 overflow-y-auto space-y-2 bg-slate-900 text-slate-200 border-t border-slate-200 rounded-b-xl">
          {events.map((evt, idx) => {
            const isError = evt.event_type.includes('failed');
            const isContradiction = evt.event_type.includes('contradiction');
            const isSuccess = evt.event_type.includes('completed');

            return (
              <div key={idx} className="flex items-start gap-3">
                <span className="text-slate-500 select-none text-[11px]">
                  {new Date(evt.timestamp).toLocaleTimeString()}
                </span>
                <span
                  className={`font-semibold uppercase text-[10px] px-1.5 py-0.5 rounded ${
                    isError
                      ? 'bg-rose-500/20 text-rose-300'
                      : isContradiction
                      ? 'bg-amber-500/20 text-amber-300'
                      : isSuccess
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-indigo-500/20 text-indigo-300'
                  }`}
                >
                  {evt.event_type.replace('_', ' ')}
                </span>
                <span
                  className={
                    isError
                      ? 'text-rose-300'
                      : isContradiction
                      ? 'text-amber-300 font-semibold'
                      : 'text-slate-200'
                  }
                >
                  {evt.message}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

