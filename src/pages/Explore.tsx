import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { ProjectCard } from '../components/ProjectCard';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

const SAMPLE_PROJECTS = [
  {
    id: '1',
    title: 'AI-Powered Task Manager',
    description: 'A smart task management application that uses AI to prioritize and categorize tasks automatically.',
    author: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    },
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800',
    likes: 128,
    comments: 24,
    tags: ['React', 'TypeScript', 'AI', 'Machine Learning'],
  },
  {
    id: '2',
    title: 'Real-time Collaboration Tool',
    description: 'A collaborative workspace for developers with real-time code sharing and video chat capabilities.',
    author: {
      name: 'Alex Morgan',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    },
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
    likes: 256,
    comments: 42,
    tags: ['WebRTC', 'Socket.io', 'React', 'Node.js'],
  },
];

export function Explore() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = Array.from(
    new Set(SAMPLE_PROJECTS.flatMap((project) => project.tags))
  );

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  const filteredProjects = SAMPLE_PROJECTS.filter((project) => {
    const matchesSearch = project.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => project.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Explore Projects
          </h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="search"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
                icon={<Search className="h-5 w-5 text-gray-400" />}
              />
            </div>
            <Button variant="outline">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedTags.includes(tag)
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
}