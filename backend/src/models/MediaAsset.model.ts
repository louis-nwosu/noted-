import mongoose, { Schema, Document } from 'mongoose';

export interface IMediaAsset extends Document {
  userId: mongoose.Types.ObjectId;
  noteId: mongoose.Types.ObjectId;
  type: 'image' | 'video';
  url: string;
  thumbnailUrl: string | null;
  filename: string;
  sizeBytes: number;
  mimeType: string;
  uploadedAt: Date;
}

const MediaAssetSchema = new Schema<IMediaAsset>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    noteId: { type: Schema.Types.ObjectId, ref: 'Note', required: true },
    type: { type: String, enum: ['image', 'video'], required: true },
    url: { type: String, required: true },
    thumbnailUrl: { type: String, default: null },
    filename: { type: String, required: true },
    sizeBytes: { type: Number, required: true },
    mimeType: { type: String, required: true },
  },
  { timestamps: { createdAt: 'uploadedAt', updatedAt: false } }
);

export default mongoose.model<IMediaAsset>('MediaAsset', MediaAssetSchema);
