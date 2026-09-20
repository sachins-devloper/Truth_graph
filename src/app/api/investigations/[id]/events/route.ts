import { NextRequest } from 'next/server';
import { inMemoryStore } from '@/lib/db/in-memory-store';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      // Send initial past events if any
      const inv = inMemoryStore.getInvestigation(id);
      if (inv && inv.events) {
        inv.events.forEach((evt) => {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(evt)}\n\n`));
        });
      }

      // Subscribe to new real-time events
      const unsubscribe = inMemoryStore.subscribeEvents(id, (event) => {
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
          if (event.event_type === 'investigation_completed' || event.event_type === 'investigation_failed') {
            setTimeout(() => {
              controller.close();
            }, 1000);
          }
        } catch {
          unsubscribe();
        }
      });

      req.signal.addEventListener('abort', () => {
        unsubscribe();
      });
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive'
    }
  });
}
