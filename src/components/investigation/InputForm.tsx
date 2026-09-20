'use client';

import React, { useState } from 'react';
import { Search, Sparkles, Building2, ShoppingBag, CheckCircle, MapPin, Plane, Globe, ArrowRight } from 'lucide-react';
import { InvestigationCategory } from '@/types';

interface InputFormProps {
  onSubmit: (question: string, category?: InvestigationCategory) => void;
  isLoading?: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [question, setQuestion] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<InvestigationCategory | 'auto'>('auto');

  const categories = [
    { id: 'job_company', label: 'Job & Company', icon: Building2 },
    { id: 'product_shopping', label: 'Product & Deals', icon: ShoppingBag },
    { id: 'claim_verification', label: 'Claim Check', icon: CheckCircle },
    { id: 'business_local', label: 'Local Business', icon: MapPin },
    { id: 'travel_plan', label: 'Travel Plan', icon: Plane },
    { id: 'public_info', label: 'Public Info', icon: Globe }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    onSubmit(question.trim(), selectedCategory === 'auto' ? undefined : selectedCategory);
  };

  const samplePrompts = [
    { label: 'Verify Hiring in Chennai', text: 'Is Example Technologies currently hiring backend software engineers in Chennai?' },
    { label: 'Check Laptop Deal Fraud', text: 'Is the UltraBook Pro M3 laptop deal on ElectroStore legit at ₹19,999?' },
    { label: 'Verify Funding Claim', text: 'Did CleanTech AI raise ₹100 crore in Series A funding in 2026?' },
    { label: 'Local Restaurant Operational Status', text: 'Is Anjappar Chettinad Restaurant open on Mount Road Chennai today?' }
  ];

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">Start AI Investigation</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
          What claim, company, job, deal, or information do you want to investigate?
        </h2>

        {/* Input Box */}
        <div className="relative mb-6">
          <textarea
            rows={3}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your claim or question... e.g. Is Company X currently hiring software developers in Chennai?"
            className="w-full bg-slate-950/90 border border-slate-700/80 rounded-xl p-4 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
          />
        </div>

        {/* Category Pills */}
        <div className="mb-6">
          <span className="text-xs text-slate-400 font-medium block mb-2">Category Focus (Optional):</span>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory('auto')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                selectedCategory === 'auto'
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
              }`}
            >
              Auto-Detect
            </button>
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id as InvestigationCategory)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="text-slate-500">Quick prompts:</span>
            {samplePrompts.map((p, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setQuestion(p.text)}
                className="text-indigo-400 hover:underline font-medium"
              >
                {p.label}
              </button>
            ))}
          </div>

          <button
            type="submit"
            disabled={isLoading || !question.trim()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold text-sm px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Launching Agent...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Start Live Investigation</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
