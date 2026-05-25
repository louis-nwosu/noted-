import { Router } from 'express';
import { authGuard } from '../middleware/authGuard';
import {
  listNotes,
  createNote,
  getNote,
  updateNote,
  deleteNote,
  restoreNote,
  permanentDelete,
  searchNotes,
  shareNote,
  revokeShare,
  updateShare,
} from '../controllers/notes.controller';

const router = Router();

router.use(authGuard);

router.get('/', listNotes);
router.post('/', createNote);
router.get('/search', searchNotes);
router.get('/:id', getNote);
router.put('/:id', updateNote);
router.patch('/:id', updateNote);
router.delete('/:id', deleteNote);
router.post('/:id/restore', restoreNote);
router.delete('/:id/permanent', permanentDelete);
router.post('/:id/share', shareNote);
router.delete('/:id/share', revokeShare);
router.patch('/:id/share', updateShare);

export default router;
