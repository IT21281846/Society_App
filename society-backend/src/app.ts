import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user';
import paymentRoutes from './routes/payments'
import monthRoutes from './routes/months'
import authRoutes from './routes/auth';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173', 
    credentials: true,              
  })
);

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/payments', paymentRoutes)
app.use('/api/months', monthRoutes)

app.get('/', (req, res) => {
  res.send('Backend running successfully 🚀');
});

export default app;
