'use client';

import React, { useEffect, useState, use } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LiveStepper } from '@/components/investigation/LiveStepper';
import { SearchActivityPanel } from '@/components/investigation/SearchActivityPanel';
import { StreamConsole } from '@/components/investigation/StreamConsole';
import { EvidenceGraph } from '@/components/graph/EvidenceGraph';
import { ExecutiveSummary } from '@/components/report/ExecutiveSummary';
import { ContradictionAlerts } from '@/components/report/ContradictionAlerts';
import { KeyFindings } from '@/components/report/KeyFindings';
import { SearchCoverageGrid } from '@/components/report/SearchCoverageGrid';
import { SourceTimeline } from '@/components/report/SourceTimeline';
import { SourceCards } from '@/components/report/SourceCards';
import { Investigation, InvestigationEvent } from '@/types';

export default function InvestigationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [investigation, setInvestigation] = useState<Investigation | null>(null);
  const [events, setEvents] = useState<InvestigationEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial fetch
    fetch(`/api/investigations/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data && data.investigation) {
          setInvestigation(data.investigation);
          if (data.investigation.events) {
            setEvents(data.investigation.events);
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.warn('Fetch error:', err);
        setLoading(false);
      });

    // SSE Event Stream Subscription
    const eventSource = new EventSource(`/api/investigations/${id}/events`);

    eventSource.onmessage = (event) => {
      try {
        const evt: InvestigationEvent = JSON.parse(event.data);
        setEvents((prev) => {
          if (prev.some((e) => e.id === evt.id)) return prev;
          return [...prev, evt];
        });

        // Refetch investigation details on status change
        if (
          evt.event_type === 'planning_completed' ||
          evt.event_type === 'search_completed' ||
          evt.event_type === 'contradiction_found' ||
          evt.event_type === 'report_generated' ||
          evt.event_type === 'investigation_completed'
        ) {
          fetch(`/api/investigations/${id}`)
            .then((r) => {
              if (r.ok) return r.json();
              return null;
            })
            .then((d) => {
              if (d && d.investigation) setInvestigation(d.investigation);
            })
            .catch(console.warn);
        }
      } catch (err) {
        console.warn('SSE JSON error:', err);
      }
    };

    eventSource.onerror = (err) => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center p-8">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm font-mono text-slate-400">Loading Investigation Workspace...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!investigation) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center p-8">
          <div className="text-center bg-slate-900 border border-slate-800 p-8 rounded-2xl max-w-md">
            <h2 className="text-xl font-bold text-white mb-2">Investigation Not Found</h2>
            <p className="text-xs text-slate-400 mb-4">The requested investigation ID could not be found.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const report = investigation.report;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Header />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Real-Time Stepper */}
        <LiveStepper status={investigation.status} />

        {/* Live Search Engine Activity Panel */}
        {investigation.queries && investigation.queries.length > 0 && (
          <SearchActivityPanel queries={investigation.queries as any} />
        )}

        {/* Real-time SSE Execution Console */}
        <StreamConsole events={events} />

        {/* Complete Report & Evidence Graph View */}
        {report && (
          <>
            <ExecutiveSummary report={report} />

            {/* Contradiction Alert Cards */}
            {report.contradictions && report.contradictions.length > 0 && (
              <ContradictionAlerts contradictions={report.contradictions} />
            )}

            {/* Interactive Evidence Node Graph */}
            <EvidenceGraph
              question={report.original_question}
              supportingEvidence={report.supporting_evidence || []}
              contradictingEvidence={report.contradicting_evidence || []}
            />

            {/* Key Findings & Uncertainties */}
            <KeyFindings
              findings={report.key_findings || []}
              uncertainties={report.uncertainties || []}
              nextSteps={report.next_verification_steps || []}
            />

            {/* Multi-Engine Search Coverage Matrix */}
            {report.search_coverage && report.search_coverage.length > 0 && (
              <SearchCoverageGrid coverage={report.search_coverage} />
            )}

            {/* Source Publication Timeline */}
            {report.timeline && report.timeline.length > 0 && (
              <SourceTimeline timeline={report.timeline} />
            )}

            {/* Verified Clickable Source Cards */}
            {report.sources && report.sources.length > 0 && (
              <SourceCards sources={report.sources} />
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
