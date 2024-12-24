import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { User } from '../models/User';

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, field } = req.body;
    
    if (!name || !email || !password || !field) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      field
    });

    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || '');

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        field: user.field
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as { id: string };
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

router.get('/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get('/github/callback',
  passport.authenticate('github', { session: false }),
  (req, res) => {
    // Ensure req.user exists and has _id before generating the JWT
    if (req.user && req.user._id) {
      const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET || '');
      res.redirect(`http://localhost:5173/auth-callback?token=${token}`);
    } else {
      res.status(400).json({ error: 'User not found' });
    }
  }
);

export default router;
