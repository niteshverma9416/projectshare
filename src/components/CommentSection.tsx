import React, { useState } from 'react';
import { Button } from './Button';

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
}

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (content: string) => void;
}

export function CommentSection({ comments, onAddComment }: CommentSectionProps) {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Comments</h3>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full rounded-md border border-gray-300 shadow-sm p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          rows={3}
        />
        <Button type="submit">Post Comment</Button>
      </form>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-3">
            <img
              src={comment.author.avatar}
              alt={comment.author.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-gray-900">
                    {comment.author.name}
                  </span>
                  <span className="text-sm text-gray-500">{comment.timestamp}</span>
                </div>
                <p className="text-gray-600">{comment.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}