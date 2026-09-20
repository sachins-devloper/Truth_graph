'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/landing/Hero';
import { Comparison } from '@/components/landing/Comparison';
import { Features } from '@/components/landing/Features';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Comparison />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
