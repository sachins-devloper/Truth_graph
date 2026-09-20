'use client';

import React from 'react';
import { Layers, AlertTriangle, GitFork, FileText, Zap, Compass } from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      icon: Layers,
      title: 'Multi-Engine SerpApi Intelligence',
      description: 'Dynamically routes searches to Google Web, Google News, Google Maps, Google Jobs, and Google Shopping based on investigation intent.'
    },
    {
      icon: AlertTriangle,
      title: 'Contradiction Detection Engine',
      description: 'Compares evidence statements side-by-side to highlight dates, numbers, salary, or status mismatches between independent web sources.'
    },
    {
      icon: GitFork,
      title: 'Interactive Evidence Graph',
      description: 'Renders an interactive SVG node graph mapping original claims to supporting, contradicting, and neutral evidence branches.'
    },
    {
      icon: FileText,
      title: 'Source-Backed Executive Reports',
      description: 'Generates structured reports complete with evidence confidence scores, uncertainties, timelines, and clickable source links.'
    },
    {
      icon: Zap,
      title: 'Real-Time SSE Event Streaming',
      description: 'Watch the AI investigation agent execute search tasks, extract claims, and cross-check evidence live step-by-step.'
    },
    {
      icon: Compass,
      title: '6 Primary Investigation Categories',
      description: 'Supports Job & Company verification, Product deal analysis, Funding claim verification, Local business checks, Travel feasibility, and Public info.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Engineered for Deep AI Investigation
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
            TruthGraph goes beyond surface-level summaries to bring transparent, evidence-first intelligence to every user query.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 hover:border-indigo-300 rounded-2xl p-6 transition-all hover:shadow-xl hover:shadow-indigo-500/10 group"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">{feat.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-sans">{feat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
