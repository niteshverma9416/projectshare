export interface User {
  id: string;
  name: string;
  email: string;
  field: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  content: string;
  thumbnail: string | null;
  author: User;
  tags: string[];
  likes: string[];
  comments: Comment[];
  githubUrl?: string;
  demoUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  createdAt: string;
}