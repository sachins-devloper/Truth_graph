'use client';

import React from 'react';
import { XCircle, CheckCircle2, ShieldCheck, Search, Cpu } from 'lucide-react';

export const Comparison: React.FC = () => {
  return (
    <section className="py-16 bg-slate-950 border-t border-b border-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3">
            Why Standard Search & Generic LLMs Fall Short
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            Traditional engines give isolated links. LLMs summarize, but hallucinate without verification. TruthGraph bridges live SerpApi web evidence with deep agent cross-checking.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Traditional Search / LLM */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
              <Search className="w-5 h-5 text-slate-500" />
              <h3 className="font-semibold text-lg text-slate-300">Traditional Search & Chatbots</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                <span>Provides raw snippets and unverified SEO web pages.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                <span>LLMs confidently present hallucinated dates or outdated stats as facts.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                <span>Fails to flag when Source A contradicts Source B.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                <span>Outputs binary &quot;True&quot; or &quot;False&quot; without showing evidence certainty.</span>
              </li>
            </ul>
          </div>

          {/* TruthGraph Investigation */}
          <div className="bg-slate-900/90 border border-indigo-500/40 rounded-2xl p-6 relative shadow-xl shadow-indigo-950/20">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-indigo-500/30">
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
              <h3 className="font-semibold text-lg text-white">TruthGraph AI Investigation Engine</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Queries SerpApi dynamically across Google Web, News, Maps, Jobs, and Shopping.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Detects source contradictions and flags expired listings or price anomalies.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Visualizes an interactive Evidence Node Graph mapping claims to verified sources.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Uses evidence-based status: &quot;Supported by Multiple Sources&quot; or &quot;Conflicting Evidence&quot;.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
