import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, MessageSquare } from 'lucide-react';
import { Button } from '../components/Button';
import { ProjectCard } from '../components/ProjectCard';
import { AIChat } from '../components/AIChat';

const SAMPLE_PROJECTS = [
  {
    id: '1',
    title: 'AI-Powered Task Manager',
    description: 'A smart task management application that uses AI to prioritize tasks.',
    author: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    },
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800',
    likes: 128,
    comments: 24,
    tags: ['React', 'TypeScript', 'AI'],
  },
];

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Your Dashboard</h1>
          <Link to="/upload">
            <Button>
              <Plus className="h-5 w-5 mr-2" />
              New Project
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Your Projects</h2>
              <div className="space-y-6">
                {SAMPLE_PROJECTS.map((project) => (
                  <ProjectCard key={project.id} {...project} />
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Recommended Projects</h2>
              <div className="space-y-6">
                {SAMPLE_PROJECTS.map((project) => (
                  <ProjectCard key={project.id} {...project} />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-4">
                <Link to="/upload">
                  <Button variant="outline" className="w-full justify-start">
                    <Plus className="h-5 w-5 mr-2" />
                    Upload New Project
                  </Button>
                </Link>
                <Link to="/explore">
                  <Button variant="outline" className="w-full justify-start">
                    <Search className="h-5 w-5 mr-2" />
                    Explore Projects
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Start a Discussion
                </Button>
              </div>
            </div>

            <AIChat />
          </div>
        </div>
      </div>
    </div>
  );
}