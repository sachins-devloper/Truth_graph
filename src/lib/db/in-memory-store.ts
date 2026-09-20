import { Investigation, InvestigationEvent } from '@/types';
import { DEMO_PRESETS } from '../demo-data/presets';

class InMemoryStore {
  private investigations: Map<string, Investigation> = new Map();
  private eventListeners: Map<string, Array<(event: InvestigationEvent) => void>> = new Map();

  constructor() {
    // Seed default demo presets
    DEMO_PRESETS.forEach((p) => {
      this.investigations.set(p.id, p);
    });
  }

  public saveInvestigation(inv: Investigation): Investigation {
    this.investigations.set(inv.id, inv);
    return inv;
  }

  public getInvestigation(id: string): Investigation | undefined {
    let item = this.investigations.get(id);
    if (!item) {
      // Check if ID matches a demo preset or prefix
      const matched = DEMO_PRESETS.find((p) => p.id === id || id.startsWith('inv-demo'));
      if (matched) {
        const cloned = { ...matched, id };
        if (cloned.report) cloned.report.investigation_id = id;
        this.saveInvestigation(cloned);
        return cloned;
      }
    }
    return item;
  }

  public listInvestigations(): Investigation[] {
    return Array.from(this.investigations.values()).sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }

  public deleteInvestigation(id: string): boolean {
    this.eventListeners.delete(id);
    return this.investigations.delete(id);
  }

  public addEvent(investigationId: string, event: InvestigationEvent): void {
    const inv = this.getInvestigation(investigationId);
    if (inv) {
      if (!inv.events) inv.events = [];
      inv.events.push(event);
      this.investigations.set(investigationId, inv);
    }

    const listeners = this.eventListeners.get(investigationId) || [];
    listeners.forEach((listener) => listener(event));
  }

  public subscribeEvents(investigationId: string, listener: (event: InvestigationEvent) => void): () => void {
    if (!this.eventListeners.has(investigationId)) {
      this.eventListeners.set(investigationId, []);
    }
    this.eventListeners.get(investigationId)!.push(listener);

    return () => {
      const listeners = this.eventListeners.get(investigationId) || [];
      this.eventListeners.set(
        investigationId,
        listeners.filter((l) => l !== listener)
      );
    };
  }
}

declare global {
  var inMemoryStoreInstance: InMemoryStore | undefined;
}

if (!global.inMemoryStoreInstance) {
  global.inMemoryStoreInstance = new InMemoryStore();
}

export const inMemoryStore = global.inMemoryStoreInstance;
