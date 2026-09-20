'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/landing/Hero';
import { Comparison } from '@/components/landing/Comparison';
import { Features } from '@/components/landing/Features';
import { Workflow } from '@/components/landing/Workflow';
import { UseCases } from '@/components/landing/UseCases';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Workflow />
        <UseCases />
        <Comparison />
        <Features />
      </main>
      <Footer />
    </div>
  );
}

