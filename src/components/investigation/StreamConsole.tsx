'use client';

import React, { useState } from 'react';
import { Terminal, ChevronDown, ChevronUp, Sparkles, AlertTriangle, CheckCircle } from 'lucide-react';
import { InvestigationEvent } from '@/types';

interface StreamConsoleProps {
  events: InvestigationEvent[];
}

export const StreamConsole: React.FC<StreamConsoleProps> = ({ events }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl mb-8">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-slate-900/80 border-b border-slate-800 hover:bg-slate-900 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-indigo-400" />
          <span className="font-mono text-xs font-bold text-slate-200 uppercase tracking-wider">
            Live Agent Execution Log ({events.length} Events)
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        )}
      </button>

      {isExpanded && (
        <div className="p-4 font-mono text-xs max-h-60 overflow-y-auto space-y-2 bg-slate-950">
          {events.length === 0 ? (
            <div className="text-slate-600 italic">Waiting for SSE events stream...</div>
          ) : (
            events.map((evt, idx) => {
              const isError = evt.event_type.includes('failed');
              const isContradiction = evt.event_type.includes('contradiction');
              const isSuccess = evt.event_type.includes('completed');

              return (
                <div key={idx} className="flex items-start gap-3">
                  <span className="text-slate-600 select-none">
                    {new Date(evt.timestamp).toLocaleTimeString()}
                  </span>
                  <span
                    className={`font-semibold uppercase text-[10px] px-1.5 py-0.5 rounded ${
                      isError
                        ? 'bg-rose-500/20 text-rose-400'
                        : isContradiction
                        ? 'bg-amber-500/20 text-amber-400'
                        : isSuccess
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-indigo-500/20 text-indigo-300'
                    }`}
                  >
                    {evt.event_type}
                  </span>
                  <span
                    className={
                      isError
                        ? 'text-rose-300'
                        : isContradiction
                        ? 'text-amber-300 font-bold'
                        : 'text-slate-300'
                    }
                  >
                    {evt.message}
                  </span>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
