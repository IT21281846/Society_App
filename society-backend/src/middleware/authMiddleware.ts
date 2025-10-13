import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// ✅ Extend Express Request type to include the decoded user
export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    role: 'ADMIN' | 'MEMBER';
  };
}

// ✅ Verify token and attach user data to request
export function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token missing.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET!) as AuthRequest['user'];
    req.user = verified;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token.' });
  }
}

// ✅ Middleware for Admin-only access
export function authorizeAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({ error: 'User not authenticated.' });
  }

  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }

  next();
}
