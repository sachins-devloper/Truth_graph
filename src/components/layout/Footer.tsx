'use client';

import React from 'react';
import { ShieldCheck, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100/80 border-t border-slate-200/80 py-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 border border-indigo-200 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <span className="font-bold text-slate-900 text-sm">TruthGraph</span>
              <p className="text-xs text-slate-500">Built for SerpApi India Hackathon 2026 • AI Agents Track</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-600">
            <a
              href="https://serpapi.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-indigo-600 flex items-center gap-1 transition-colors font-medium"
            >
              Powered by SerpApi <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-slate-300">•</span>
            <span>Google Web • News • Maps • Jobs • Shopping</span>
            <span className="text-slate-300">•</span>
            <span className="text-indigo-600 font-mono font-semibold">SEARCH → INVESTIGATE → CROSS-CHECK → EXPLAIN</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
