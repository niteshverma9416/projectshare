import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Github, Code2 } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

export function SignUp() {
  const navigate = useNavigate();
  const { signIn: authSignIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    field: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/api/auth/signup', formData);
      const { token, user } = response.data;
      authSignIn(token, user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGitHubSignUp = () => {
    window.location.href = 'http://localhost:3000/api/auth/github';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Code2 className="h-12 w-12 text-blue-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Join ProjectShare to share your work and connect with developers
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <Input
              label="Email address"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <Input
              label="Password"
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />

            <Input
              label="Field of expertise"
              type="text"
              placeholder="e.g., Frontend Development, Machine Learning"
              required
              value={formData.field}
              onChange={(e) => setFormData({ ...formData, field: e.target.value })}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Sign up'}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <Button
                variant="outline"
                className="w-full"
                onClick={handleGitHubSignUp}
                disabled={isLoading}
              >
                <Github className="h-5 w-5 mr-2" />
                GitHub
              </Button>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/signin" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}