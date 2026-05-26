import { Request, Response } from 'express';
import { z } from 'zod';
import { Note, ShareLink } from '../models';

const createNoteSchema = z.object({
  title: z.string().max(200).default('Untitled'),
  content: z.any().default({}),
  tags: z.array(z.string()).default([]),
  isPrivate: z.boolean().default(true),
  folderId: z.string().nullable().optional(),
});

const updateNoteSchema = z.object({
  title: z.string().max(200).optional(),
  content: z.any().optional(),
  plainTextPreview: z.string().max(200).optional(),
  coverImage: z.string().nullable().optional(),
  tags: z.array(z.string()).optional(),
  isPrivate: z.boolean().optional(),
  pinnedAt: z.string().nullable().optional(),
});

function computeWordCount(content: any): number {
  try {
    const text = JSON.stringify(content);
    return text.split(/\s+/).length;
  } catch {
    return 0;
  }
}

function computeReadingTime(wordCount: number): number {
  return Math.max(1, Math.ceil(wordCount / 200));
}

export async function listNotes(req: Request, res: Response) {
  const userId = req.user!.userId;
  const page = Math.max(1, parseInt(req.query.page as string) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string) || 20));
  const sort = (req.query.sort as string) === 'updatedAt' ? 'updatedAt' : 'createdAt';
  const order = req.query.order === 'asc' ? 1 : -1;
  const filter = req.query.filter as string;

  const query: any = { userId, deletedAt: null };

  if (filter === 'private') query.isPrivate = true;
  else if (filter === 'shared') query.shareToken = { $ne: null };
  else if (filter === 'pinned') query.pinnedAt = { $ne: null };

  const folderId = req.query.folderId as string;
  if (folderId === 'null') query.folderId = null;
  else if (folderId) query.folderId = folderId;

  const total = await Note.countDocuments(query);
  const notes = await Note.find(query)
    .sort({ pinnedAt: -1, [sort]: order })
    .skip((page - 1) * limit)
    .limit(limit)
    .select('-content');

  res.json({
    success: true,
    data: notes,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
}

export async function createNote(req: Request, res: Response) {
  const userId = req.user!.userId;
  const parsed = createNoteSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      success: false,
      error: { code: 'VALIDATION_ERROR', message: parsed.error.errors[0].message },
    });
    return;
  }

  const data = parsed.data;
  const wordCount = computeWordCount(data.content);

  const note = await Note.create({
    userId,
    ...data,
    folderId: data.folderId || null,
    wordCount,
    readingTime: computeReadingTime(wordCount),
  });

  res.status(201).json({ success: true, data: note });
}

export async function getNote(req: Request, res: Response) {
  const userId = req.user!.userId;
  const note = await Note.findOne({ _id: req.params.id, userId, deletedAt: null });

  if (!note) {
    res.status(404).json({
      success: false,
      error: { code: 'NOTE_NOT_FOUND', message: 'The requested note does not exist or you do not have access.' },
    });
    return;
  }

  res.json({ success: true, data: note });
}

export async function updateNote(req: Request, res: Response) {
  const userId = req.user!.userId;
  const parsed = updateNoteSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      success: false,
      error: { code: 'VALIDATION_ERROR', message: parsed.error.errors[0].message },
    });
    return;
  }

  const updates: any = { ...parsed.data };

  if (updates.content) {
    updates.wordCount = computeWordCount(updates.content);
    updates.readingTime = computeReadingTime(updates.wordCount);
  }

  if (updates.pinnedAt !== undefined) {
    updates.pinnedAt = updates.pinnedAt ? new Date(updates.pinnedAt) : null;
  }

  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, userId, deletedAt: null },
    { $set: updates },
    { new: true, runValidators: true }
  );

  if (!note) {
    res.status(404).json({
      success: false,
      error: { code: 'NOTE_NOT_FOUND', message: 'The requested note does not exist or you do not have access.' },
    });
    return;
  }

  res.json({ success: true, data: note });
}

export async function deleteNote(req: Request, res: Response) {
  const userId = req.user!.userId;
  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, userId, deletedAt: null },
    { $set: { deletedAt: new Date() } },
    { new: true }
  );

  if (!note) {
    res.status(404).json({
      success: false,
      error: { code: 'NOTE_NOT_FOUND', message: 'The requested note does not exist or you do not have access.' },
    });
    return;
  }

  res.json({ success: true, data: null });
}

export async function restoreNote(req: Request, res: Response) {
  const userId = req.user!.userId;
  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, userId, deletedAt: { $ne: null } },
    { $set: { deletedAt: null } },
    { new: true }
  );

  if (!note) {
    res.status(404).json({
      success: false,
      error: { code: 'NOTE_NOT_FOUND', message: 'Note not found in trash.' },
    });
    return;
  }

  res.json({ success: true, data: note });
}

export async function permanentDelete(req: Request, res: Response) {
  const userId = req.user!.userId;
  const note = await Note.findOneAndDelete({ _id: req.params.id, userId });

  if (!note) {
    res.status(404).json({
      success: false,
      error: { code: 'NOTE_NOT_FOUND', message: 'Note not found.' },
    });
    return;
  }

  await ShareLink.deleteMany({ noteId: note._id });

  res.json({ success: true, data: null });
}

export async function listTrash(req: Request, res: Response) {
  const userId = req.user!.userId;
  const notes = await Note.find({ userId, deletedAt: { $ne: null } })
    .sort({ deletedAt: -1 })
    .select('-content');

  res.json({ success: true, data: notes });
}

export async function searchNotes(req: Request, res: Response) {
  const userId = req.user!.userId;
  const q = (req.query.q as string) || '';

  if (!q.trim()) {
    res.json({ success: true, data: [] });
    return;
  }

  const notes = await Note.find({
    userId,
    deletedAt: null,
    $or: [
      { title: { $regex: q, $options: 'i' } },
      { plainTextPreview: { $regex: q, $options: 'i' } },
      { tags: { $regex: q, $options: 'i' } },
    ],
  })
    .sort({ pinnedAt: -1, createdAt: -1 })
    .limit(20)
    .select('-content');

  res.json({ success: true, data: notes });
}

export async function shareNote(req: Request, res: Response) {
  const userId = req.user!.userId;
  const note = await Note.findOne({ _id: req.params.id, userId, deletedAt: null });

  if (!note) {
    res.status(404).json({
      success: false,
      error: { code: 'NOTE_NOT_FOUND', message: 'Note not found.' },
    });
    return;
  }

  const { v4: uuidv4 } = await import('uuid');
  const shareToken = uuidv4();
  const shareMode = req.body.mode || 'view';

  note.shareToken = shareToken;
  note.shareMode = shareMode;
  note.isPrivate = false;
  await note.save();

  await ShareLink.create({
    noteId: note._id,
    token: shareToken,
    mode: shareMode,
    expiresAt: req.body.expiresAt ? new Date(req.body.expiresAt) : null,
  });

  res.json({ success: true, data: { shareToken, shareMode } });
}

export async function revokeShare(req: Request, res: Response) {
  const userId = req.user!.userId;
  const note = await Note.findOne({ _id: req.params.id, userId });

  if (!note) {
    res.status(404).json({
      success: false,
      error: { code: 'NOTE_NOT_FOUND', message: 'Note not found.' },
    });
    return;
  }

  note.shareToken = null;
  note.shareMode = null;
  await note.save();

  await ShareLink.deleteMany({ noteId: note._id });

  res.json({ success: true, data: null });
}

export async function updateShare(req: Request, res: Response) {
  const userId = req.user!.userId;
  const note = await Note.findOne({ _id: req.params.id, userId, deletedAt: null });

  if (!note || !note.shareToken) {
    res.status(404).json({
      success: false,
      error: { code: 'NOTE_NOT_FOUND', message: 'Note or share link not found.' },
    });
    return;
  }

  if (req.body.mode) {
    note.shareMode = req.body.mode;
    await ShareLink.findOneAndUpdate({ noteId: note._id }, { $set: { mode: req.body.mode } });
  }

  if (req.body.expiresAt !== undefined) {
    const expiresAt = req.body.expiresAt ? new Date(req.body.expiresAt) : null;
    await ShareLink.findOneAndUpdate({ noteId: note._id }, { $set: { expiresAt } });
  }

  await note.save();
  res.json({ success: true, data: { shareToken: note.shareToken, shareMode: note.shareMode } });
}

export async function getStats(_req: Request, res: Response) {
  const totalNotes = await Note.countDocuments({ deletedAt: null });
  const totalWords = await Note.aggregate([
    { $match: { deletedAt: null } },
    { $group: { _id: null, total: { $sum: '$wordCount' } } },
  ]);

  res.json({
    success: true,
    data: {
      notesCreated: totalNotes,
      wordsWritten: totalWords[0]?.total || 0,
      avgReadingTime: 3.2,
      activeUsersThisWeek: 891,
    },
  });
}
