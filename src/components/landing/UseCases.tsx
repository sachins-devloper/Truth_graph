'use client';

import React from 'react';
import { Building2, ShoppingBag, CheckCircle, MapPin, Plane, Globe, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const UseCases: React.FC = () => {
  const cases = [
    {
      icon: Building2,
      category: 'Job & Company Investigation',
      example: '"Is Example Technologies currently hiring backend software engineers in Chennai?"',
      description: 'Cross-checks official careers portal, Google Jobs listings, press releases, and physical office locations on Google Maps to flag expired job postings.',
      badge: 'Google Jobs + Maps'
    },
    {
      icon: ShoppingBag,
      category: 'Product & Deal Fraud Analysis',
      example: '"Is the UltraBook Pro M3 laptop deal on ElectroStore legit at ₹19,999?"',
      description: 'Benchmarks live pricing across Amazon, Flipkart, and Croma via Google Shopping to detect 75%+ price deviation phishing scams.',
      badge: 'Google Shopping'
    },
    {
      icon: CheckCircle,
      category: 'Funding & Financial Claim Check',
      example: '"Did CleanTech AI raise ₹100 crore in Series A funding in 2026?"',
      description: 'Verifies announcements against financial press outlets (Economic Times, TechCrunch via Google News) to resolve USD vs INR currency confusion.',
      badge: 'Google News'
    },
    {
      icon: MapPin,
      category: 'Local Business Verification',
      example: '"Is Anjappar Chettinad Restaurant open on Mount Road Chennai today?"',
      description: 'Checks operating hours, ratings, customer reviews, address verification, and closure announcements.',
      badge: 'Google Maps'
    },
    {
      icon: Plane,
      category: 'Travel Feasibility Check',
      example: '"Can I realistically complete a 5-day trip covering Leh, Nubra, and Pangong in October?"',
      description: 'Investigates flight schedules, hotel availability, road permit rules, seasonal mountain pass closures, and travel distances.',
      badge: 'Google Search + Travel'
    },
    {
      icon: Globe,
      category: 'Public Info & Policy Check',
      example: '"Is the EV subsidy policy active for electric two-wheelers in Tamil Nadu?"',
      description: 'Searches official government portals (.gov.in), official gazette notifications, and recency of policy enforcement.',
      badge: 'Government Portals'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-emerald-700 font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 mb-3 inline-block">
            Real-World Project Usage
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Investigation Use Cases
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
            TruthGraph adapts its research strategy dynamically across 6 primary investigation domains.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((uc, idx) => {
            const Icon = uc.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50/80 border border-slate-200/90 hover:border-indigo-300 rounded-2xl p-6 flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-indigo-500/10 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-indigo-600" />
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white text-indigo-700 border border-slate-200 font-semibold">
                      {uc.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 mb-2">{uc.category}</h3>
                  <p className="text-xs font-mono text-indigo-800 mb-3 bg-white p-2.5 rounded-xl border border-slate-200/80 font-medium">
                    {uc.example}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans mb-4">{uc.description}</p>
                </div>

                <Link
                  href={`/investigate?q=${encodeURIComponent(uc.example.replace(/^"|"$/g, ''))}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold font-mono text-indigo-600 hover:text-indigo-800 transition-colors pt-3 border-t border-slate-200"
                >
                  <span>Investigate This Scenario</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
