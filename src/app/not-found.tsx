import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Header />
      <main className="flex-grow flex items-center justify-center p-8">
        <div className="text-center bg-white border border-slate-200 p-8 rounded-2xl max-w-md shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">404 — Page Not Found</h2>
          <p className="text-xs text-slate-500 mb-6 font-mono">The page or investigation workspace you are looking for does not exist.</p>
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-indigo-600/20"
          >
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

