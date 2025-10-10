import express from 'express';
import prisma from '../prisma';

const router = express.Router();

// Get all months
router.get('/', async (req, res) => {
  const months = await prisma.month.findMany({
    include: { payments: true },
    orderBy: { startDate: 'asc' },
  });
  res.json(months);
});

// Create a new month
router.post('/', async (req, res) => {
  const { name, startDate, endDate } = req.body;
  try {
    const month = await prisma.month.create({
      data: { name, startDate: new Date(startDate), endDate: new Date(endDate) },
    });
    res.json(month);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to create month' });
  }
});

// Get a single month with payments
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const month = await prisma.month.findUnique({
      where: { id: Number(id) },
      include: { payments: { include: { user: true } } },
    });
    res.json(month);
  } catch (error) {
    res.status(404).json({ error: 'Month not found' });
  }
});

export default router;
