# TruthGraph 🛡️

> **"Don't just search. Investigate."**

**TruthGraph** is an AI Investigation Engine built for the **SerpApi India Hackathon 2026** (*AI Agents Track*). 

Instead of relying on LLM knowledge alone or returning flat web links, TruthGraph deconstructs user inquiries into dynamic search plans, executes multi-engine live searches via SerpApi, extracts factual evidence, cross-checks sources for explicit contradictions, and visualizes findings on an interactive evidence claim graph.

---

## 🎯 The Core Problem & Philosophy

People search the internet every day, but traditional search engines return isolated links and sponsored snippets. Generative LLMs summarize information, but frequently hallucinate facts or fail to verify claims.

TruthGraph solves this by enforcing a transparent, evidence-first investigation pipeline:

```
                       USER QUESTION
                             │
                             ▼
                   1. AI SEARCH PLANNER
            Formulates multi-angle search queries
                             │
                             ▼
              2. SERPAPI MULTI-ENGINE SEARCH
     (Google Web • Google News • Google Maps • Google Jobs • Google Shopping)
                             │
                             ▼
             3. EVIDENCE EXTRACTION & STANCE
      Categorizes snippets: Supporting / Contradicting / Contextual
                             │
                             ▼
             4. CONTRADICTION ENGINE (CROSS-CHECK)
      Compares sources side-by-side to flag conflicts (dates, prices, status)
                             │
                             ▼
            5. REPORT & INTERACTIVE EVIDENCE GRAPH
      Source-backed report + interactive SVG claim node graph
```

---

## 🌟 Key Features

- **🌐 Multi-Engine SerpApi Intelligence**:
  Dynamically routes queries to **Google Web**, **Google News**, **Google Maps**, **Google Jobs**, and **Google Shopping** depending on investigation intent.

- **⚠️ Contradiction Detection Engine**:
  Compares evidence items side-by-side to detect date mismatches, status discrepancies, pricing anomalies, or outdated listings.

- **GitFork Interactive Evidence Graph**:
  Renders an interactive SVG node graph mapping original user claims to supporting (green) and contradicting (red) evidence branches with click-to-inspect source cards.

- **⚡ Real-Time SSE Event Streaming**:
  Watch the AI agent construct search plans, query SerpApi engines, and cross-check evidence live step-by-step.

- **🔒 Source-Backed Transparency**:
  Every statement links back to retrieved web sources. TruthGraph never fabricates citations or claims certainty when evidence is missing.

- **🍃 MongoDB Atlas Persistence**:
  Persists all investigations, extracted evidence, flagged contradictions, and generated reports permanently.

---

## 🏗️ Technical Architecture & Stack

```
truthgraph/
├── backend/          # Python 3.14 + FastAPI + SQLAlchemy + SerpApi + Pytest
│   ├── app/
│   │   ├── api/routes/   # Health check & API endpoints
│   │   ├── services/     # SerpApi connector, AI planner, Evidence & Contradiction engines
│   │   └── core/         # Settings & environment configuration
│   └── tests/            # Pytest test suite (100% passing)
├── src/              # Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS
│   ├── app/              # Routes (/investigate, /investigate/[id], /dashboard, /api)
│   ├── components/       # Header, LiveStepper, SearchActivityPanel, EvidenceGraph, Report
│   └── lib/              # Database, SerpApi normalizer, AI provider, MongoDB store
├── docs/             # Architecture, API endpoints & 3-minute hackathon demo script
└── scripts/          # Live SerpApi test script & demo seeders
```

---

## ⚡ Setup & Running Locally

### 1. Environment Configuration

Edit `.env` in the project root (and `backend/.env` for Python backend):

```env
SERPAPI_API_KEY=your_serpapi_api_key_here
NVIDIA_API_KEY=your_nvidia_nim_api_key_here
LLM_BASE_URL=https://integrate.api.nvidia.com/v1
LLM_MODEL=meta/llama-3.3-70b-instruct
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/truthgraph?retryWrites=true&w=majority
MAX_SEARCHES_PER_INVESTIGATION=10
```

### 2. Run Next.js Full-Stack Application (Frontend + Next.js API & SSE)

```bash
# Install dependencies
npm install

# Start Next.js development server
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 3. Run FastAPI Python Backend (Optional Standalone Microservice)

```bash
# Activate virtual environment
.\.venv\Scripts\Activate.ps1

# Run Uvicorn backend server
python -m uvicorn backend.app.main:app --reload
```
View FastAPI Swagger interactive docs at **[http://localhost:8000/docs](http://localhost:8000/docs)**.

### 4. Running Backend Tests

```bash
cd backend
python -m pytest
```

---

## 📽️ 3-Minute Hackathon Demo Script

1. **0:00 - 0:20 | The Problem**:
   *"Traditional search engines give links; LLMs hallucinate. TruthGraph is an AI investigation engine that searches live web sources, cross-checks evidence, and flags source contradictions."*

2. **0:20 - 0:50 | Launch Investigation**:
   - Open **[http://localhost:3000](http://localhost:3000)**.
   - Enter: *"Is Example Technologies currently hiring backend software engineers in Chennai?"*

3. **0:50 - 1:40 | Real-Time Execution & Contradiction Detection**:
   - Show the **SerpApi Search Activity Panel** querying Google Web, Jobs, News, and Maps simultaneously.
   - Highlight the **Conflict Alert**: Source A (Official Site) lists active Sept 2026 hiring vs. Source B (Glassdoor) showing an expired Nov 2025 listing.

4. **1:40 - 2:30 | Interactive Evidence Graph**:
   - Click nodes on the **Interactive Evidence Graph** to inspect source snippets, domains, and relevance scores.

5. **2:30 - 3:00 | Architecture & SerpApi Impact**:
   - Explain how SerpApi powers the core live data acquisition layer across web, news, maps, jobs, and shopping.

---

## 📄 License

Distributed under the [MIT License](LICENSE).
