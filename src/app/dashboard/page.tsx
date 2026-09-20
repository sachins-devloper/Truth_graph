'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LayoutDashboard, Search, ArrowRight } from 'lucide-react';
import { Investigation } from '@/types';

export default function DashboardPage() {
  const [investigations, setInvestigations] = useState<Investigation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/investigations')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP Error ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data && Array.isArray(data.investigations)) {
          setInvestigations(data.investigations);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.warn('Dashboard fetch warning:', err);
        setLoading(false);
      });
  }, []);

  const total = investigations.length;
  const totalEvidence = investigations.reduce((sum, inv) => sum + (inv.evidence_count || 0), 0);
  const totalContradictions = investigations.reduce((sum, inv) => sum + (inv.contradiction_count || 0), 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Header />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between border-b border-slate-800 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <LayoutDashboard className="w-6 h-6 text-indigo-400" />
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Investigation Dashboard</h1>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-1">Real-time overview of AI search investigations</p>
          </div>

          <Link
            href="/investigate"
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow-md shadow-indigo-600/30"
          >
            <Search className="w-4 h-4" />
            <span>New Investigation</span>
          </Link>
        </div>

        {/* Stats Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
            <span className="text-xs font-mono text-slate-400 uppercase font-semibold block mb-1">Total Investigations</span>
            <span className="text-3xl font-extrabold text-white">{total}</span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
            <span className="text-xs font-mono text-slate-400 uppercase font-semibold block mb-1">Evidence Collected</span>
            <span className="text-3xl font-extrabold text-emerald-400">{totalEvidence}</span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
            <span className="text-xs font-mono text-slate-400 uppercase font-semibold block mb-1">Source Conflicts Flagged</span>
            <span className="text-3xl font-extrabold text-rose-400">{totalContradictions}</span>
          </div>
        </div>

        {/* Recent Investigations List */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <h3 className="font-bold text-white text-base mb-4 font-mono">Recent Investigation Reports</h3>

          {loading ? (
            <p className="text-xs text-slate-500 py-4 font-mono">Loading investigations...</p>
          ) : investigations.length === 0 ? (
            <p className="text-xs text-slate-500 py-4 font-mono">No investigations found yet. Start one above!</p>
          ) : (
            <div className="space-y-3">
              {investigations.map((inv) => (
                <div
                  key={inv.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-slate-950 border border-slate-800 rounded-xl hover:border-indigo-500/40 transition-all group"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                        {inv.category ? inv.category.replace('_', ' ') : 'general'}
                      </span>
                      <span className="text-xs font-mono text-slate-500">
                        {new Date(inv.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {inv.title}
                    </h4>
                    <p className="text-xs text-slate-400 font-mono mt-0.5 line-clamp-1">
                      &quot;{inv.original_question}&quot;
                    </p>
                  </div>

                  <Link
                    href={`/investigate/${inv.id}`}
                    className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-mono font-semibold self-end sm:self-auto bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-indigo-500/40 transition-all"
                  >
                    <span>View Report</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
