import express from 'express';
import multer from 'multer';
import { Project } from '../models/Project';
import { auth } from '../middleware/auth';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', auth, upload.single('thumbnail'), async (req, res) => {
  try {
    const { title, description, content, tags, githubUrl, demoUrl } = req.body;
    const project = new Project({
      title,
      description,
      content,
      thumbnail: req.file?.path,
      author: req.user?._id,
      tags: JSON.parse(tags),
      githubUrl,
      demoUrl
    });

    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const { search, tags } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ]
      };
    }

    if (tags) {
      query = { ...query, tags: { $all: tags } };
    }

    const projects = await Project.find(query)
      .populate('author', 'name avatar')
      .sort({ createdAt: -1 });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('author', 'name avatar bio')
      .populate('comments.author', 'name avatar');

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;