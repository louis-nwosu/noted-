import { Request, Response } from 'express';
import { uploadFile } from '../services/media.service';
import { extractPdfText, summarizePdfText } from '../services/pdf.service';
import MediaAsset from '../models/MediaAsset.model';

export async function uploadPdf(req: Request, res: Response) {
  try {
    const userId = req.user!.userId;
    const file = req.file;
    const noteId = req.body.noteId;

    if (!file) {
      res.status(400).json({ success: false, error: { code: 'NO_FILE', message: 'No file provided.' } });
      return;
    }

    if (file.mimetype !== 'application/pdf') {
      res.status(400).json({ success: false, error: { code: 'INVALID_TYPE', message: 'Only PDF files are accepted.' } });
      return;
    }

    const uploadResult = await uploadFile(file.buffer, file.originalname, file.mimetype);

    const rawText = await extractPdfText(file.buffer);

    const isScanned = rawText.trim().length < 20;

    const summary = isScanned ? '' : await summarizePdfText(rawText);

    if (noteId) {
      await MediaAsset.create({
        userId,
        noteId,
        type: 'file',
        url: uploadResult.url,
        filename: uploadResult.filename,
        sizeBytes: uploadResult.sizeBytes,
        mimeType: uploadResult.mimeType,
        rawText: rawText.slice(0, 5000),
        summary,
      });
    }

    res.status(201).json({
      success: true,
      data: {
        url: uploadResult.url,
        filename: uploadResult.filename,
        rawText: rawText.slice(0, 5000),
        summary,
        isScanned,
      },
    });
  } catch (err: any) {
    console.error('PDF upload error:', err);
    res.status(500).json({ success: false, error: { code: 'PDF_ERROR', message: err.message || 'Failed to process PDF.' } });
  }
}
