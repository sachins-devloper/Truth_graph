# 3-Minute Hackathon Demo Script — TruthGraph

## 0:00 - 0:20 | Problem Statement
"Traditional search engines return links. LLMs summarize, but hallucinate without verification. TruthGraph is an AI investigation engine that searches live web sources, cross-checks evidence, and flags source contradictions."

## 0:20 - 0:50 | Live Investigation Launch
1. Open `/demo` or `/investigate`.
2. Input query: *"Is Example Technologies currently hiring backend software engineers in Chennai?"*
3. Show the live **SerpApi Search Activity Panel** querying Google Web, Google Jobs, Google News, and Google Maps simultaneously.

## 0:50 - 1:40 | Real-time Execution & Contradiction Detection
1. Highlight the **Live Stepper** moving from Planning -> Search -> Evidence -> Cross-check.
2. Show the **Conflict Alert**:
   - Source A (Official Site / LinkedIn) lists active September 2026 hiring.
   - Source B (Glassdoor Aggregator) shows an expired role from November 2025.

## 1:40 - 2:30 | Interactive Evidence Graph & Report
1. Click nodes on the **Interactive Evidence Graph** to inspect source snippets and relevance scores.
2. Review the **Search Coverage Matrix** and verified source links.

## 2:30 - 3:00 | Architecture & SerpApi Impact
"SerpApi is the core data acquisition foundation of TruthGraph. By querying web, news, maps, jobs, and shopping dynamically, TruthGraph converts raw web search into actionable evidence intelligence."
