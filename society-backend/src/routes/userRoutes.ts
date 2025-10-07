import { Router } from 'express'
import prisma from '../prismaClient'

const router = Router()

// Create new user
router.post('/', async (req, res) => {
  try {
    const { email, password, firstName, lastName, role } = req.body
    const user = await prisma.user.create({
      data: { email, password, firstName, lastName, role },
    })
    res.json(user)
  } catch (error) {
    res.status(400).json({ error: 'Error creating user', details: error })
  }
})

// Get all users
router.get('/', async (_req, res) => {
  const users = await prisma.user.findMany({ include: { payments: true } })
  res.json(users)
})

// Get user by ID
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const user = await prisma.user.findUnique({
    where: { id },
    include: { payments: true },
  })
  if (!user) return res.status(404).json({ error: 'User not found' })
  res.json(user)
})

// Update user
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const { firstName, lastName, role } = req.body
  try {
    const user = await prisma.user.update({
      where: { id },
      data: { firstName, lastName, role },
    })
    res.json(user)
  } catch {
    res.status(400).json({ error: 'Error updating user' })
  }
})

// Delete user
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    await prisma.user.delete({ where: { id } })
    res.json({ message: 'User deleted' })
  } catch {
    res.status(400).json({ error: 'Error deleting user' })
  }
})

export default router
