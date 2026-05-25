import { Router, Request, Response } from 'express';
import { Note, ShareLink } from '../models';

const router = Router();

router.get('/:token', async (req: Request, res: Response) => {
  const { token } = req.params;

  const shareLink = await ShareLink.findOne({ token });
  if (!shareLink) {
    res.status(404).json({
      success: false,
      error: { code: 'SHARE_LINK_NOT_FOUND', message: 'This share link does not exist.' },
    });
    return;
  }

  if (shareLink.expiresAt && shareLink.expiresAt < new Date()) {
    res.status(410).json({
      success: false,
      error: { code: 'SHARE_LINK_EXPIRED', message: 'This share link has expired.' },
    });
    return;
  }

  const note = await Note.findOne({ shareToken: token, deletedAt: null }).populate(
    'userId',
    'name email avatarUrl'
  );

  if (!note) {
    res.status(404).json({
      success: false,
      error: { code: 'NOTE_NOT_FOUND', message: 'The shared note no longer exists.' },
    });
    return;
  }

  shareLink.accessCount += 1;
  await shareLink.save();

  res.json({
    success: true,
    data: {
      title: note.title,
      content: note.content,
      plainTextPreview: note.plainTextPreview,
      coverImage: note.coverImage,
      tags: note.tags,
      wordCount: note.wordCount,
      readingTime: note.readingTime,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
      author: (note.userId as any),
      mode: shareLink.mode,
    },
  });
});

export default router;
