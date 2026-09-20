'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { InputForm } from '@/components/investigation/InputForm';
import { InvestigationCategory } from '@/types';

function NewInvestigationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [isLoading, setIsLoading] = useState(false);

  const handleStartInvestigation = async (question: string, category?: InvestigationCategory) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/investigations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, category })
      });

      const data = await response.json();
      if (data.investigation?.id) {
        router.push(`/investigate/${data.investigation.id}`);
      } else {
        alert('Failed to launch investigation. Please try again.');
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to backend.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery.trim()) {
      handleStartInvestigation(initialQuery.trim());
    }
  }, [initialQuery]);

  return <InputForm onSubmit={handleStartInvestigation} isLoading={isLoading} />;
}

export default function NewInvestigationPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <Suspense fallback={<div className="text-center p-8 text-xs text-slate-500 font-mono">Loading investigation form...</div>}>
          <NewInvestigationForm />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
