import { Router } from 'express'
import prisma from '../prisma'

const router = Router()

// Create payment
router.post('/', async (req, res) => {
  try {
    const { amount, status, paidAt, userId } = req.body
    const payment = await prisma.payment.create({
      data: { amount, status, paidAt, userId },
    })
    res.json(payment)
  } catch (error) {
    res.status(400).json({ error: 'Error creating payment', details: error })
  }
})

// Get all payments
router.get('/', async (_req, res) => {
  const payments = await prisma.payment.findMany({ include: { user: true } })
  res.json(payments)
})

// Get payments by user ID
router.get('/user/:userId', async (req, res) => {
  const userId = Number(req.params.userId)
  const payments = await prisma.payment.findMany({
    where: { userId },
    include: { user: true },
  })
  res.json(payments)
})

// Update payment status
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const { status, paidAt } = req.body
  try {
    const payment = await prisma.payment.update({
      where: { id },
      data: { status, paidAt },
    })
    res.json(payment)
  } catch {
    res.status(400).json({ error: 'Error updating payment' })
  }
})

// Delete payment
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    await prisma.payment.delete({ where: { id } })
    res.json({ message: 'Payment deleted' })
  } catch {
    res.status(400).json({ error: 'Error deleting payment' })
  }
})

export default router
