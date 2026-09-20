'use client';

import React from 'react';
import { Calendar, ExternalLink } from 'lucide-react';

interface TimelineItem {
  date: string;
  title: string;
  source_name: string;
  url: string;
}

interface SourceTimelineProps {
  timeline: TimelineItem[];
}

export const SourceTimeline: React.FC<SourceTimelineProps> = ({ timeline }) => {
  if (!timeline || timeline.length === 0) return null;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl mb-8">
      <div className="flex items-center gap-2 border-b border-slate-800 pb-4 mb-6">
        <Calendar className="w-5 h-5 text-indigo-400" />
        <h3 className="font-bold text-white text-base">Source Publication Timeline</h3>
      </div>

      <div className="relative border-l-2 border-indigo-500/30 ml-4 space-y-6">
        {timeline.map((item, idx) => (
          <div key={idx} className="relative pl-6">
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-indigo-600 border-2 border-slate-950 shadow-md shadow-indigo-500/50" />
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <span className="text-[11px] font-bold text-indigo-400 font-mono block mb-1">{item.date}</span>
              <h4 className="text-xs font-semibold text-white mb-1">{item.title}</h4>
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Source: {item.source_name}</span>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-400 hover:underline flex items-center gap-1"
                >
                  View <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
