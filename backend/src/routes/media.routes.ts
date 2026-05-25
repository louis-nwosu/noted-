import { Router } from 'express';
import { authGuard } from '../middleware/authGuard';
import { uploadMiddleware } from '../middleware/uploadHandler';
import { uploadMedia, unfurl } from '../controllers/media.controller';

const router = Router();

router.post('/upload', authGuard, uploadMiddleware, uploadMedia);
router.get('/unfurl', unfurl);

export default router;
