# TruthGraph Backend 🛡️

FastAPI-powered asynchronous backend service for **TruthGraph**, providing live multi-engine search via SerpApi, contradiction detection, and automated claim verification.

---

## 📋 Prerequisites

- **Python**: 3.10+ (tested with Python 3.11, 3.12, 3.14)
- **Pip**: Latest version recommended
- **SerpApi API Key**: [Obtain from SerpApi](https://serpapi.com/)
- **LLM API Key**: OpenAI / NVIDIA NIM / Gemini-compatible endpoint

---

## 🚀 Quick Start Guide

### 1. Navigate to the Backend Directory

```powershell
cd d:\Me\Truth_graph\backend
```

### 2. Create a Virtual Environment (if not already created)

```powershell
# Create a virtual environment named .venv
python -m venv .venv
```

### 3. Activate the Virtual Environment

> [!NOTE]
> The project's virtual environment folder is named `.venv` (with a leading dot).

- **Windows PowerShell**:
  ```powershell
  .\.venv\Scripts\Activate.ps1
  ```
  *(If you encounter a script execution policy error, run `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` and retry)*

- **Windows Command Prompt (CMD)**:
  ```cmd
  .venv\Scripts\activate.bat
  ```

- **macOS / Linux**:
  ```bash
  source .venv/bin/activate
  ```

Once activated, your terminal prompt will be prefixed with `(.venv)`.

### 4. Install Dependencies

```powershell
# Install all required dependencies
pip install -r requirements.txt
```

*(To upgrade pip if prompted: `python -m pip install --upgrade pip`)*

### 5. Configure Environment Variables

Create a `.env` file in the `backend/` directory by copying `.env.example`:

```powershell
# Windows PowerShell
Copy-Item .env.example .env

# Bash / CMD
cp .env.example .env
```

Ensure your `.env` contains the required keys:

```env
SERPAPI_API_KEY=your_serpapi_api_key_here
LLM_API_KEY=your_llm_api_key_here
LLM_BASE_URL=https://integrate.api.nvidia.com/v1
LLM_MODEL=meta/llama-3.3-70b-instruct
DATABASE_URL=sqlite:///./truthgraph.db
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/truthgraph?retryWrites=true&w=majority
MAX_SEARCHES_PER_INVESTIGATION=10
```

---

## 🏃 Running the Application

### Option A: Using Uvicorn with Virtual Environment Python (Recommended)

From inside the `backend/` directory:

```powershell
# Directly using the virtual environment's Python (avoids Windows path conflicts)
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Or, if your virtual environment is already activated in your current terminal:

```powershell
python -m uvicorn app.main:app --reload --port 8000
```

### Option B: Running the Main Module Directly

```powershell
.\.venv\Scripts\python.exe -m app.main
```

> [!TIP]
> On Windows, running `.\.venv\Scripts\python.exe -m uvicorn ...` instead of the standalone `uvicorn` binary prevents `multiprocessing.spawn` reloader conflicts.

### Option C: Running from the Project Root

```powershell
cd ..
python -m uvicorn backend.app.main:app --reload --port 8000
```

---

## 🌐 API Endpoints & Documentation

Once the server is running:

| Description | URL |
| :--- | :--- |
| **API Root** | [http://127.0.0.1:8000/](http://127.0.0.1:8000/) |
| **Swagger Interactive Docs** | [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) |
| **ReDoc Documentation** | [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc) |
| **Health Check** | [http://127.0.0.1:8000/api/health](http://127.0.0.1:8000/api/health) |

---

## 🧪 Running Tests

To run the automated test suite with pytest:

```powershell
# From the backend directory
pytest

# Or run with verbose test output
python -m pytest -v
```

---

## 📁 Directory Structure

```
backend/
├── app/
│   ├── api/
│   │   └── routes/          # Health check and investigation API endpoints
│   ├── core/
│   │   └── config.py        # App settings and environment loader
│   ├── db/
│   │   └── database.py      # SQLAlchemy SQLite/PostgreSQL connection engine
│   ├── schemas/             # Pydantic validation schemas
│   ├── services/
│   │   ├── serpapi/         # SerpApi multi-engine search connector
│   │   ├── planner/         # AI search decomposition engine
│   │   └── contradiction/   # Source conflict and contradiction analyzer
│   └── main.py              # FastAPI application entrypoint & middleware
├── tests/
│   ├── test_health.py       # Health check route unit tests
│   └── test_serpapi.py      # SerpApi integration test suite
├── .env.example             # Example environment variables
├── requirements.txt         # Python package dependencies
└── README.md                # Backend setup and run guide
```

---

## 🛠️ Common Issues & Troubleshooting

1. **`The module 'venv' could not be loaded` / Command not found**:
   - The virtual environment folder is named `.venv` (with a leading dot). Use `.\.venv\Scripts\Activate.ps1`.
   - If `.venv` does not exist yet, create it with `python -m venv .venv`.

2. **`running scripts is disabled on this system` in PowerShell**:
   - Run: `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` in the current terminal session, then re-run `.\.venv\Scripts\Activate.ps1`.

3. **`ERROR: You must give at least one requirement to install`**:
   - Make sure to specify the `-r` flag: `pip install -r requirements.txt`.

4. **Port 8000 already in use**:
   - Start uvicorn on another port: `python -m uvicorn app.main:app --reload --port 8001`.
