import express from 'express'
import userRoutes from './routes/userRoutes'
import paymentRoutes from './routes/paymentRoutes'

const app = express()
app.use(express.json()) // Parse JSON requests

// Routes
app.use('/api/users', userRoutes)
app.use('/api/payments', paymentRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
