import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageSquare, Share2 } from 'lucide-react';
import { Button } from './Button';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  author: {
    name: string;
    avatar: string;
  };
  thumbnail?: string;
  likes: number;
  comments: number;
  tags: string[];
}

export function ProjectCard({
  id,
  title,
  description,
  author,
  thumbnail,
  likes,
  comments,
  tags,
}: ProjectCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {thumbnail && (
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <img
            src={author.avatar}
            alt={author.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-medium text-gray-900">{author.name}</p>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          <Link to={`/projects/${id}`} className="hover:text-blue-600">
            {title}
          </Link>
        </h3>
        
        <p className="text-gray-600 mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex space-x-4">
            <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
              <Heart className="h-5 w-5" />
              <span>{likes}</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
              <MessageSquare className="h-5 w-5" />
              <span>{comments}</span>
            </button>
          </div>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
}