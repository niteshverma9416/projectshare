import axios from 'axios';

const API_URL = 'http://localhost:3000/';

export const api = axios.create({
  baseURL: API_URL, // Should match the backend's base URL
  withCredentials: true, // For handling cookies (if needed)
});


export interface SignInData {
  email: string;
  password: string;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
  field: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

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

export const signIn = async (data: SignInData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('api/auth/signin', data);
  return response.data;
};

export const signUp = async (data: SignUpData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/signup', data);
  return response.data;
};

export const getProjects = async (params?: { search?: string; tags?: string[] }) => {
  const response = await api.get<Project[]>('/projects', { params });
  return response.data;
};

export const getProjectById = async (id: string) => {
  const response = await api.get<Project>(`/projects/${id}`);
  return response.data;
};

export const createProject = async (data: FormData) => {
  const response = await api.post<Project>('/projects', data);
  return response.data;
};

export const addComment = async (projectId: string, content: string) => {
  const response = await api.post<Comment>(`/projects/${projectId}/comments`, { content });
  return response.data;
};

export const toggleLike = async (projectId: string) => {
  const response = await api.post<{ liked: boolean }>(`/projects/${projectId}/like`);
  return response.data;
};

export const followUser = async (userId: string) => {
  const response = await api.post<{ following: boolean }>(`/users/${userId}/follow`);
  return response.data;
};