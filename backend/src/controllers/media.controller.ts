import { Request, Response } from 'express';
import { uploadFile } from '../services/media.service';
import { unfurlUrl } from '../services/unfurl.service';
import { MediaAsset } from '../models';

export async function uploadMedia(req: Request, res: Response) {
  const userId = req.user!.userId;
  const noteId = req.body.noteId;

  if (!req.file) {
    res.status(400).json({
      success: false,
      error: { code: 'NO_FILE', message: 'No file provided.' },
    });
    return;
  }

  if (!noteId) {
    res.status(400).json({
      success: false,
      error: { code: 'NOTE_ID_REQUIRED', message: 'noteId is required.' },
    });
    return;
  }

  const result = await uploadFile(req.file.buffer, req.file.originalname, req.file.mimetype);

  const asset = await MediaAsset.create({
    userId,
    noteId,
    type: req.file.mimetype.startsWith('video/') ? 'video' : 'image',
    url: result.url,
    thumbnailUrl: result.thumbnailUrl,
    filename: result.filename,
    sizeBytes: result.sizeBytes,
    mimeType: result.mimeType,
  });

  res.status(201).json({ success: true, data: { ...result, id: asset._id } });
}

export async function unfurl(req: Request, res: Response) {
  const url = req.query.url as string;

  if (!url) {
    res.status(400).json({
      success: false,
      error: { code: 'URL_REQUIRED', message: 'url query parameter is required.' },
    });
    return;
  }

  try {
    new URL(url);
  } catch {
    res.status(400).json({
      success: false,
      error: { code: 'INVALID_URL', message: 'Invalid URL format.' },
    });
    return;
  }

  const result = await unfurlUrl(url);
  res.json({ success: true, data: result });
}
