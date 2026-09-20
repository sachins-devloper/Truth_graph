'use client';

import React from 'react';
import { Search, BrainCircuit, Globe, Layers, AlertTriangle, GitFork } from 'lucide-react';

export const Workflow: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'User Inquiry',
      subtitle: 'Claim, Job, Deal, or Business',
      icon: Search,
      description: 'The user submits any claim, vacancy, e-commerce deal, or public statement to investigate.',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      num: '02',
      title: 'AI Search Planner',
      subtitle: 'Dynamic Query Strategy',
      icon: BrainCircuit,
      description: 'Formulates multi-angle search tasks targeting both primary verification and contradiction signals.',
      color: 'from-indigo-500 to-violet-500'
    },
    {
      num: '03',
      title: 'SerpApi Search',
      subtitle: 'Multi-Engine Live Acquisition',
      icon: Globe,
      description: 'Queries Google Web, News, Maps, Jobs, and Shopping concurrently via live REST endpoints.',
      color: 'from-violet-500 to-purple-500'
    },
    {
      num: '04',
      title: 'Evidence Extraction',
      subtitle: 'Stance & Relevance Scoring',
      icon: Layers,
      description: 'Normalizes snippets, scores relevance (0.0-1.0), and assigns stance (Supporting / Contradicting).',
      color: 'from-purple-500 to-cyan-500'
    },
    {
      num: '05',
      title: 'Contradiction Detector',
      subtitle: 'Cross-Check Engine',
      icon: AlertTriangle,
      description: 'Compares sources side-by-side to flag conflicts in dates, numbers, salary, or status.',
      color: 'from-cyan-500 to-emerald-500'
    },
    {
      num: '06',
      title: 'Evidence Graph & Report',
      subtitle: 'Interactive Citation Graph',
      icon: GitFork,
      description: 'Generates evidence-backed report with SVG node graph mapping claims directly to sources.',
      color: 'from-emerald-500 to-teal-500'
    }
  ];

  return (
    <section className="py-20 bg-slate-950 border-t border-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-indigo-400 font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-3 inline-block">
            System Workflow & Pipeline
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            How TruthGraph Investigates
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            From raw user input to a fully cross-checked, source-backed investigation report with interactive node visualization.
          </p>
        </div>

        {/* Workflow Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-6 relative transition-all hover:shadow-2xl hover:shadow-indigo-950/30 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} p-0.5 shadow-lg`}>
                    <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-indigo-300 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                  <span className="font-mono text-2xl font-black text-slate-700 group-hover:text-indigo-400 transition-colors">
                    {step.num}
                  </span>
                </div>

                <h3 className="font-bold text-lg text-white mb-1">{step.title}</h3>
                <span className="text-xs font-mono text-indigo-400 block mb-3">{step.subtitle}</span>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
