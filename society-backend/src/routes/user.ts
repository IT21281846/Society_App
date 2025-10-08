import express from 'express';
import prisma from '../prisma';

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Create a new user
router.post('/', async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await prisma.user.create({
      data: { name, email },
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'Email must be unique' });
  }
});

export default router;
