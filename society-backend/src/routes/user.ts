import express from 'express';
import prisma from '../prisma';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

// Get all users (protected)
router.get('/', authenticateToken, async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

export default router;
