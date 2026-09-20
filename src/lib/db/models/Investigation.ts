import mongoose, { Schema, Document } from 'mongoose';
import { InvestigationCategory, InvestigationStatus } from '@/types';

export interface IInvestigation extends Document {
  title: string;
  original_question: string;
  category: InvestigationCategory;
  status: InvestigationStatus;
  queries: Array<{
    query: string;
    engine: string;
    purpose: string;
    priority?: number;
  }>;
  evidence_count: number;
  contradiction_count: number;
  report?: any;
  events?: any[];
  created_at: Date;
  completed_at?: Date;
}

const InvestigationSchema = new Schema<IInvestigation>({
  title: { type: String, required: true },
  original_question: { type: String, required: true },
  category: { type: String, required: true },
  status: { type: String, required: true, default: 'queued' },
  queries: [
    {
      query: { type: String, required: true },
      engine: { type: String, required: true },
      purpose: { type: String, required: true },
      priority: { type: Number, default: 1 }
    }
  ],
  evidence_count: { type: Number, default: 0 },
  contradiction_count: { type: Number, default: 0 },
  report: { type: Schema.Types.Mixed, default: null },
  events: [{ type: Schema.Types.Mixed, default: [] }],
  created_at: { type: Date, default: Date.now },
  completed_at: { type: Date, default: null }
});

export const InvestigationModel =
  mongoose.models.Investigation || mongoose.model<IInvestigation>('Investigation', InvestigationSchema);
