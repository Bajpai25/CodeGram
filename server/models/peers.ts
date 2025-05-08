// peer.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IPeer extends Document {
  name: string;
  linkedInLink?: string;
  education?: string;
  skills?: string[];
  achievements?: string;
  batch?: string;
  company?: string;
}

const PeerSchema: Schema = new Schema({
  name: { type: String, required: true },
  linkedInLink: { type: String },
  education: { type: String },
  skills: { type: [String], default: [] },
  achievements: { type: String },
  batch: { type: String },
  company: { type: String },
}, { timestamps: true });

export default mongoose.model<IPeer>('Peer', PeerSchema);