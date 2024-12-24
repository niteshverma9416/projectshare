import mongoose from 'mongoose';

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

export const Project = mongoose.model('Project', projectSchema);