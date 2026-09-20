# TruthGraph API Reference

## Base URL
`/api`

## Endpoints

### 1. Create Investigation
- **POST** `/api/investigations`
- **Body**:
  ```json
  {
    "question": "Is Example Technologies hiring backend engineers in Chennai?",
    "category": "job_company"
  }
  ```
- **Response**:
  ```json
  {
    "investigation": {
      "id": "inv-123456",
      "status": "queued",
      "original_question": "..."
    }
  }
  ```

### 2. List Investigations
- **GET** `/api/investigations`

### 3. Get Investigation Details
- **GET** `/api/investigations/{id}`

### 4. Stream Live SSE Events
- **GET** `/api/investigations/{id}/events`
- **Format**: `text/event-stream`

### 5. SerpApi Test Search
- **POST** `/api/search/test`
- **Body**:
  ```json
  {
    "query": "Example company hiring",
    "engine": "google_jobs"
  }
  ```
