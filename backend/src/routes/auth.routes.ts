import { Router } from 'express';
import { register, login, logout, refresh, googleAuth, getMe } from '../controllers/auth.controller';
import { rateLimiter } from '../middleware/rateLimiter';
import { authGuard } from '../middleware/authGuard';

const router = Router();

router.post('/register', rateLimiter(5, 60000), register);
router.post('/login', rateLimiter(10, 60000), login);
router.post('/logout', logout);
router.post('/refresh', refresh);
router.post('/google', googleAuth);
router.get('/me', authGuard, getMe);

export default router;
