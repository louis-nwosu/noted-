import { v4 as uuidv4 } from 'uuid';

export interface UploadResult {
  url: string;
  thumbnailUrl: string | null;
  filename: string;
  sizeBytes: number;
  mimeType: string;
}

export async function uploadFile(
  buffer: Buffer,
  originalname: string,
  mimetype: string
): Promise<UploadResult> {
  const ext = originalname.split('.').pop() || 'bin';
  const filename = `${uuidv4()}.${ext}`;

  return {
    url: `/uploads/${filename}`,
    thumbnailUrl: mimetype.startsWith('video/') ? null : `/uploads/thumb_${filename}`,
    filename,
    sizeBytes: buffer.length,
    mimeType: mimetype,
  };
}
