import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { marked } from 'marked';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(passport.initialize());

// Connect to MongoDB with retry logic
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

connectDB();

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  field: String,
  githubId: String,
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

// Project Schema
const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: String,
  thumbnail: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tags: [String],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: String,
    createdAt: { type: Date, default: Date.now }
  }],
  githubUrl: String,
  demoUrl: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Project = mongoose.model('Project', projectSchema);

// GitHub OAuth Strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/auth/github/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
    try {
      let user = await User.findOne({ githubId: profile.id });
      
      if (!user) {
        user = await User.create({
          githubId: profile.id,
          name: profile.displayName || profile.username,
          email: profile.emails?.[0]?.value,
          field: 'Software Development'
        });
      }

      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
));

// Auth Routes
app.get('/api/auth/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

app.get('/api/auth/github/callback', 
  passport.authenticate('github', { session: false }),
  function(req, res) {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET);
    res.redirect(`http://localhost:5173/auth-callback?token=${token}`);
  }
);

app.get('/api/auth/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

app.post('/api/auth/signup', async (req, res) => {
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
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

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
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
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
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});