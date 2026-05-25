import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { User } from '../models';

const registerSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(128),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

function generateTokens(userId: string, email: string) {
  const accessToken = jwt.sign(
    { userId, email },
    process.env.JWT_SECRET!,
    { expiresIn: '15m' } as jwt.SignOptions
  );

  const refreshToken = jwt.sign(
    { userId, email },
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: '7d' } as jwt.SignOptions
  );

  return { accessToken, refreshToken };
}

function setTokenCookie(res: Response, refreshToken: string) {
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/api/auth',
  });
}

export async function register(req: Request, res: Response) {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      success: false,
      error: { code: 'VALIDATION_ERROR', message: parsed.error.errors[0].message },
    });
    return;
  }

  const { name, email, password } = parsed.data;

  const existing = await User.findOne({ email });
  if (existing) {
    res.status(409).json({
      success: false,
      error: { code: 'EMAIL_EXISTS', message: 'An account with this email already exists.' },
    });
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, passwordHash, provider: 'local' });

  const tokens = generateTokens(user._id.toString(), user.email);
  setTokenCookie(res, tokens.refreshToken);

  res.status(201).json({
    success: true,
    data: {
      user: { id: user._id, name: user.name, email: user.email, avatarUrl: user.avatarUrl },
      accessToken: tokens.accessToken,
    },
  });
}

export async function login(req: Request, res: Response) {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      success: false,
      error: { code: 'VALIDATION_ERROR', message: 'Invalid email or password format.' },
    });
    return;
  }

  const { email, password } = parsed.data;

  const user = await User.findOne({ email });
  if (!user || !user.passwordHash) {
    res.status(401).json({
      success: false,
      error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password.' },
    });
    return;
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    res.status(401).json({
      success: false,
      error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password.' },
    });
    return;
  }

  const tokens = generateTokens(user._id.toString(), user.email);
  setTokenCookie(res, tokens.refreshToken);

  res.json({
    success: true,
    data: {
      user: { id: user._id, name: user.name, email: user.email, avatarUrl: user.avatarUrl },
      accessToken: tokens.accessToken,
    },
  });
}

export async function logout(_req: Request, res: Response) {
  res.clearCookie('refreshToken', { path: '/api/auth' });
  res.json({ success: true, data: null });
}

export async function refresh(req: Request, res: Response) {
  const token = req.cookies?.refreshToken;
  if (!token) {
    res.status(401).json({
      success: false,
      error: { code: 'NO_REFRESH_TOKEN', message: 'Refresh token not found.' },
    });
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as { userId: string; email: string };
    const user = await User.findById(payload.userId);
    if (!user) {
      res.status(401).json({
        success: false,
        error: { code: 'USER_NOT_FOUND', message: 'User no longer exists.' },
      });
      return;
    }

    const tokens = generateTokens(user._id.toString(), user.email);
    setTokenCookie(res, tokens.refreshToken);

    res.json({
      success: true,
      data: { accessToken: tokens.accessToken },
    });
  } catch {
    res.status(401).json({
      success: false,
      error: { code: 'INVALID_REFRESH_TOKEN', message: 'Invalid or expired refresh token.' },
    });
  }
}

export async function getMe(req: Request, res: Response) {
  const user = await User.findById(req.user!.userId).select('-passwordHash');
  if (!user) {
    res.status(404).json({
      success: false,
      error: { code: 'USER_NOT_FOUND', message: 'User not found.' },
    });
    return;
  }

  res.json({
    success: true,
    data: { id: user._id, name: user.name, email: user.email, avatarUrl: user.avatarUrl },
  });
}

export async function googleAuth(req: Request, res: Response) {
  const { email, name, googleId, avatarUrl } = req.body;
  if (!email || !googleId) {
    res.status(400).json({
      success: false,
      error: { code: 'VALIDATION_ERROR', message: 'Email and googleId are required.' },
    });
    return;
  }

  let user = await User.findOne({ googleId });
  if (!user) {
    user = await User.findOne({ email });
    if (user) {
      user.googleId = googleId;
      user.provider = 'google';
      await user.save();
    } else {
      user = await User.create({
        name: name || email.split('@')[0],
        email,
        provider: 'google',
        googleId,
        avatarUrl: avatarUrl || null,
      });
    }
  }

  const tokens = generateTokens(user._id.toString(), user.email);
  setTokenCookie(res, tokens.refreshToken);

  res.json({
    success: true,
    data: {
      user: { id: user._id, name: user.name, email: user.email, avatarUrl: user.avatarUrl },
      accessToken: tokens.accessToken,
    },
  });
}
