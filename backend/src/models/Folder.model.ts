import mongoose, { Schema, Document } from "mongoose";

export interface IFolder extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  parentId: mongoose.Types.ObjectId | null;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const FolderSchema = new Schema<IFolder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    name: { type: String, required: true, trim: true, maxlength: 100 },
    parentId: { type: Schema.Types.ObjectId, ref: "Folder", default: null, index: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

FolderSchema.index({ userId: 1, parentId: 1, order: 1 });

export default mongoose.model<IFolder>("Folder", FolderSchema);
