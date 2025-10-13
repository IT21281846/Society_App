import express from 'express';
import prisma from '../prisma';
import { authenticateToken, authorizeAdmin } from '../middleware/authMiddleware';

const router = express.Router();

// Get all users (protected)
router.get('/', authenticateToken, async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Admin-only route
router.get('/admin/dashboard', authenticateToken, authorizeAdmin, (req, res) => {
  res.json({ message: 'Welcome Admin!' });
});


export default router;
