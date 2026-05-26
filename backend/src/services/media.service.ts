import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

export interface UploadResult {
  url: string;
  thumbnailUrl: string | null;
  filename: string;
  sizeBytes: number;
  mimeType: string;
}

const UPLOADS_DIR = path.join(__dirname, '../../uploads');

function ensureUploadsDir() {
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
}

export async function uploadFile(
  buffer: Buffer,
  originalname: string,
  mimetype: string
): Promise<UploadResult> {
  ensureUploadsDir();

  const ext = originalname.split('.').pop() || 'bin';
  const filename = `${uuidv4()}.${ext}`;
  const filepath = path.join(UPLOADS_DIR, filename);

  fs.writeFileSync(filepath, buffer);

  const sizeBytes = buffer.length;

  let thumbnailUrl: string | null = null;
  if (mimetype.startsWith('image/')) {
    thumbnailUrl = `/uploads/${filename}`;
  }

  return {
    url: `/uploads/${filename}`,
    thumbnailUrl,
    filename,
    sizeBytes,
    mimeType: mimetype,
  };
}
