import axios from 'axios';
import { User } from '../types';

const API_URL = 'http://localhost:3000/api';

export interface SignUpData {
  name: string;
  email: string;
  password: string;
  field: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const signUp = async (data: SignUpData): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/auth/signup', data);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Failed to sign up');
  }
};

export const signIn = async (data: SignInData): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/auth/signin', data);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Failed to sign in');
  }
};

export const initiateGitHubAuth = () => {
  window.location.href = `${API_URL}/auth/github`;
};