import mongoose, { Schema, Document } from 'mongoose';

export interface IAudioAttachment {
  url: string;
  transcriptText: string;
  durationSeconds: number;
  recordedAt: Date;
}

export interface INote extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  content: object;
  plainTextPreview: string;
  coverImage: string | null;
  tags: string[];
  isPrivate: boolean;
  shareToken: string | null;
  shareMode: 'view' | 'comment' | null;
  wordCount: number;
  readingTime: number;
  audioAttachments: IAudioAttachment[];
  pinnedAt: Date | null;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const AudioAttachmentSchema = new Schema<IAudioAttachment>(
  {
    url: { type: String, required: true },
    transcriptText: { type: String, default: '' },
    durationSeconds: { type: Number, default: 0 },
    recordedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const NoteSchema = new Schema<INote>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, default: 'Untitled', trim: true },
    content: { type: Schema.Types.Mixed, default: {} },
    plainTextPreview: { type: String, default: '', maxlength: 200 },
    coverImage: { type: String, default: null },
    tags: [{ type: String, trim: true }],
    isPrivate: { type: Boolean, default: true },
    shareToken: { type: String, default: null, sparse: true },
    shareMode: { type: String, enum: ['view', 'comment', null], default: null },
    wordCount: { type: Number, default: 0 },
    readingTime: { type: Number, default: 0 },
    audioAttachments: [AudioAttachmentSchema],
    pinnedAt: { type: Date, default: null },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

NoteSchema.index({ userId: 1, createdAt: -1 });
NoteSchema.index({ userId: 1, isPrivate: 1 });
NoteSchema.index({ title: 'text', plainTextPreview: 'text' });

export default mongoose.model<INote>('Note', NoteSchema);
