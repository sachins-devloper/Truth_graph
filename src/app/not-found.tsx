import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Header />
      <main className="flex-grow flex items-center justify-center p-8">
        <div className="text-center bg-slate-900 border border-slate-800 p-8 rounded-2xl max-w-md shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-2">404 — Page Not Found</h2>
          <p className="text-xs text-slate-400 mb-6 font-mono">The page or investigation workspace you are looking for does not exist.</p>
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-indigo-600/30"
          >
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
