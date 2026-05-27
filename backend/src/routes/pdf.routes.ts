import { Router } from 'express';
import { authGuard } from '../middleware/authGuard';
import { uploadMiddleware } from '../middleware/uploadHandler';
import { uploadPdf } from '../controllers/pdf.controller';

const router = Router();

router.post('/upload', authGuard, uploadMiddleware, uploadPdf);

export default router;
