import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Link as LinkIcon } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function UploadProject() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    githubUrl: '',
    demoUrl: '',
    content: '',
    thumbnail: null as File | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        if (key === 'tags') {
          form.append(key, JSON.stringify(value.split(',').map(tag => tag.trim())));
        } else {
          form.append(key, value);
        }
      }
    });

    try {
      const response = await fetch('http://localhost:3000/api/projects', {
        method: 'POST',
        body: form,
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        navigate(`/projects/${data.id}`);
      }
    } catch (error) {
      console.error('Error uploading project:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData({ ...formData, thumbnail: e.target.files[0] });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Upload Project</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Project Title"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Thumbnail
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="thumbnail"
                />
                <label
                  htmlFor="thumbnail"
                  className="flex flex-col items-center cursor-pointer"
                >
                  <Upload className="h-12 w-12 text-gray-400" />
                  <span className="mt-2 text-sm text-gray-500">
                    Click to upload thumbnail
                  </span>
                </label>
              </div>
            </div>

            <Input
              label="Description"
              as="textarea"
              rows={3}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />

            <Input
              label="Tags (comma-separated)"
              placeholder="React, TypeScript, AI"
              required
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            />

            <Input
              label="GitHub URL"
              type="url"
              icon={<LinkIcon className="h-5 w-5 text-gray-400" />}
              value={formData.githubUrl}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
            />

            <Input
              label="Demo URL"
              type="url"
              icon={<LinkIcon className="h-5 w-5 text-gray-400" />}
              value={formData.demoUrl}
              onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Content (Markdown)
              </label>
              <textarea
                required
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={10}
                className="w-full rounded-md border border-gray-300 shadow-sm p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="## Overview&#10;&#10;Describe your project here using Markdown..."
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button type="submit">Upload Project</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}