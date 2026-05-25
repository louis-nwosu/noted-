import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  provider: 'local' | 'google';
  googleId?: string;
  avatarUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, default: '' },
    provider: { type: String, enum: ['local', 'google'], default: 'local' },
    googleId: { type: String, sparse: true },
    avatarUrl: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);
