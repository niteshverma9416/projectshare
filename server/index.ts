import express from 'express';
import cors from 'cors';
import { connectDB } from './config/database';
import { configurePassport } from './config/passport';
import authRoutes from './routes/auth';
import projectRoutes from './routes/projects';
import passport from 'passport';
import path from 'path';

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(passport.initialize());

// Configure passport
configurePassport();

// Connect to database
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});