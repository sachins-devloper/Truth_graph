'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Search, LayoutDashboard } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 via-violet-600 to-cyan-600 p-0.5 shadow-md shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-slate-900">
                TruthGraph
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/80 tracking-wider uppercase font-mono">
                SerpApi AI
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-mono hidden sm:block">Don&apos;t just search. Investigate.</p>
          </div>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/investigate"
            className="flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-100/80 rounded-xl transition-colors border border-transparent hover:border-slate-200"
          >
            <Search className="w-4 h-4 text-indigo-600" />
            <span>New Investigation</span>
          </Link>

          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-100/80 rounded-xl transition-colors border border-transparent hover:border-slate-200"
          >
            <LayoutDashboard className="w-4 h-4 text-violet-600" />
            <span>Dashboard</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};
