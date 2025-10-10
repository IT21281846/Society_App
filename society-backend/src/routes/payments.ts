import express from 'express';
import prisma from '../prisma';

const router = express.Router();

// Get all payments
router.get('/', async (req, res) => {
  const payments = await prisma.payment.findMany({
    include: { user: true, month: true },
    orderBy: { createdAt: 'desc' },
  });
  res.json(payments);
});

// Create a new payment
router.post('/', async (req, res) => {
  const { amount, userId, monthId } = req.body;
  try {
    const payment = await prisma.payment.create({
      data: {
        amount,
        user: { connect: { id: userId } },
        month: monthId ? { connect: { id: monthId } } : undefined,
      },
    });
    res.json(payment);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to create payment' });
  }
});

// Update payment status
router.put('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updated = await prisma.payment.update({
      where: { id: Number(id) },
      data: { status },
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: 'Unable to update payment status' });
  }
});

export default router;
