import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Backend running successfully 🚀');
});

export default app;
