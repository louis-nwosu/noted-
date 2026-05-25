import mongoose, { Schema, Document } from 'mongoose';

export interface IShareLink extends Document {
  noteId: mongoose.Types.ObjectId;
  token: string;
  mode: 'view' | 'comment';
  expiresAt: Date | null;
  accessCount: number;
  createdAt: Date;
}

const ShareLinkSchema = new Schema<IShareLink>(
  {
    noteId: { type: Schema.Types.ObjectId, ref: 'Note', required: true },
    token: { type: String, required: true, unique: true },
    mode: { type: String, enum: ['view', 'comment'], required: true },
    expiresAt: { type: Date, default: null },
    accessCount: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

ShareLinkSchema.index({ noteId: 1 });

export default mongoose.model<IShareLink>('ShareLink', ShareLinkSchema);
