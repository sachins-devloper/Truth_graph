# TruthGraph System Architecture

TruthGraph is designed as an AI Investigation Engine that uses live SerpApi search streams to cross-check claims, detect source contradictions, and generate source-backed reports.

## High-Level Architecture

```
                       USER QUESTION
                             │
                             ▼
                    AI Investigation Planner
                             │
       ┌─────────────────────┼─────────────────────┐
       ▼                     ▼                     ▼
 Google Web            Google News           Google Maps
   (SerpApi)             (SerpApi)             (SerpApi)
       │                     │                     │
       └─────────────────────┼─────────────────────┘
                             ▼
                    Evidence Extraction Engine
                             │
                             ▼
                   Contradiction Detector
                             │
                             ▼
                   Investigation Report
                             │
                             ▼
                  Interactive Evidence Graph
```

## Core Components

1. **SerpApi Multi-Engine Connector** (`src/lib/serpapi/client.ts` & `backend/app/services/serpapi/`):
   - Dynamically targets Google Web, Google News, Google Maps, Google Jobs, and Google Shopping.

2. **Search Planner** (`src/lib/agent/search_planner.ts`):
   - Deconstructs user prompt into targeted search tasks across engines.

3. **Evidence Extraction Engine** (`src/lib/evidence/extractor.ts`):
   - Normalizes raw web snippets and assigns evidence types (`supporting`, `contradicting`, `contextual`, `neutral`, `uncertain`) with relevance scores.

4. **Contradiction Detector** (`src/lib/contradictions/detector.ts`):
   - Compares statements across sources to identify conflicts in dates, numbers, salary, or status.

5. **Report & Evidence Graph Generator** (`src/lib/reports/generator.ts`):
   - Builds source-backed reports with evidence confidence scores and interactive SVG node graphs.
