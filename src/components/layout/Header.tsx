'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Search, LayoutDashboard } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-violet-600 to-cyan-500 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                TruthGraph
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 tracking-wider uppercase">
                SerpApi AI
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono hidden sm:block">Don&apos;t just search. Investigate.</p>
          </div>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/investigate"
            className="flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-900 rounded-xl transition-colors border border-transparent hover:border-slate-800"
          >
            <Search className="w-4 h-4 text-indigo-400" />
            <span>New Investigation</span>
          </Link>

          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-900 rounded-xl transition-colors border border-transparent hover:border-slate-800"
          >
            <LayoutDashboard className="w-4 h-4 text-violet-400" />
            <span>Dashboard</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};
