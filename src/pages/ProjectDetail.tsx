import React from 'react';
import { useParams } from 'react-router-dom';
import { Heart, Share2, MessageSquare, Github, Globe } from 'lucide-react';
import { Button } from '../components/Button';
import { CommentSection } from '../components/CommentSection';

const SAMPLE_PROJECT = {
  id: '1',
  title: 'AI-Powered Task Manager',
  description: 'A smart task management application that uses AI to prioritize and categorize tasks automatically.',
  content: `
## Overview

This project combines modern task management with artificial intelligence to help users better organize their work. The AI analyzes task patterns, due dates, and completion rates to suggest optimal task ordering and time management strategies.

## Features

- AI-powered task prioritization
- Natural language processing for task creation
- Automated categorization
- Smart reminders and notifications
- Performance analytics and insights

## Technical Stack

- Frontend: React with TypeScript
- Backend: Node.js with Express
- AI/ML: TensorFlow.js
- Database: PostgreSQL
  `,
  author: {
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    bio: 'Full-stack developer passionate about AI and machine learning',
  },
  thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800',
  likes: 128,
  comments: [
    {
      id: '1',
      author: {
        name: 'Alex Morgan',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      },
      content: 'Really impressive use of AI for task management! Have you considered adding support for team collaboration?',
      timestamp: '2 hours ago',
    },
    {
      id: '2',
      author: {
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      },
      content: 'The UI looks clean and intuitive. Would love to see how the AI prioritization works in practice.',
      timestamp: '5 hours ago',
    },
  ],
  tags: ['React', 'TypeScript', 'AI', 'Machine Learning'],
  links: {
    github: 'https://github.com/example/ai-task-manager',
    demo: 'https://ai-task-manager.demo',
  },
};

export function ProjectDetail() {
  const { id } = useParams();
  const project = SAMPLE_PROJECT; // In a real app, fetch project by id

  const handleAddComment = (content: string) => {
    console.log('New comment:', content);
    // In a real app, send to API
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-64 object-cover"
          />
          
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <img
                  src={project.author.avatar}
                  alt={project.author.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-medium text-gray-900">
                    {project.author.name}
                  </h3>
                  <p className="text-sm text-gray-500">{project.author.bio}</p>
                </div>
              </div>
              <Button>Follow</Button>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {project.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center space-x-6 mb-8">
              <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600">
                <Heart className="h-5 w-5" />
                <span>{project.likes}</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600">
                <MessageSquare className="h-5 w-5" />
                <span>{project.comments.length}</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600">
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </button>
            </div>

            <div className="prose max-w-none mb-8">
              {project.content}
            </div>

            <div className="flex space-x-4 mb-8">
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">
                  <Github className="h-5 w-5 mr-2" />
                  View on GitHub
                </Button>
              </a>
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">
                  <Globe className="h-5 w-5 mr-2" />
                  Live Demo
                </Button>
              </a>
            </div>

            <div className="border-t pt-8">
              <CommentSection
                comments={project.comments}
                onAddComment={handleAddComment}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}