#!/usr/bin/env python3
import asyncio
import os
import sys

sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'backend'))

from dotenv import load_dotenv
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

from app.services.serpapi.client import serpapi_client

async def main():
    query = "SerpApi AI Agents India Hackathon 2026"
    print(f"Testing SerpApi Client with key: {serpapi_client.api_key[:8]}...")
    print(f"Executing query: '{query}'")
    results = await serpapi_client.search(query, engine="google", num_results=5)
    print(f"\nRetrieved {len(results)} live normalized search results:")
    for idx, res in enumerate(results):
        print(f"[{idx+1}] {res['title']} ({res['domain']})\n    URL: {res['url']}\n")

if __name__ == "__main__":
    asyncio.run(main())
