import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Rocket, MessageSquare, Code2 } from 'lucide-react';
import { Button } from '../components/Button';

export function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Share Your Projects.</span>
            <span className="block text-blue-600">Connect with Developers.</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Join a community of developers sharing projects, getting feedback, and collaborating with others who share your interests.
          </p>
          <div className="mt-10 flex justify-center gap-x-6">
            <Link to="/signup">
              <Button size="lg" className="px-8">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/explore">
              <Button variant="outline" size="lg" className="px-8">
                Explore Projects
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Everything you need to showcase your work
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Share your projects with the world and get valuable feedback from other developers.
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="relative p-6 bg-white rounded-lg shadow-md">
              <div className="absolute top-6 left-6">
                <span className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-md">
                  <Code2 className="h-6 w-6 text-blue-600" />
                </span>
              </div>
              <div className="ml-16">
                <h3 className="text-xl font-medium text-gray-900">Project Showcase</h3>
                <p className="mt-2 text-base text-gray-500">
                  Upload and showcase your projects with rich documentation and live demos.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="relative p-6 bg-white rounded-lg shadow-md">
              <div className="absolute top-6 left-6">
                <span className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-md">
                  <Users className="h-6 w-6 text-blue-600" />
                </span>
              </div>
              <div className="ml-16">
                <h3 className="text-xl font-medium text-gray-900">Connect</h3>
                <p className="mt-2 text-base text-gray-500">
                  Find and connect with developers working on similar projects.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="relative p-6 bg-white rounded-lg shadow-md">
              <div className="absolute top-6 left-6">
                <span className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-md">
                  <MessageSquare className="h-6 w-6 text-blue-600" />
                </span>
              </div>
              <div className="ml-16">
                <h3 className="text-xl font-medium text-gray-900">Feedback</h3>
                <p className="mt-2 text-base text-gray-500">
                  Get valuable feedback from experienced developers in your field.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to dive in?</span>
            <span className="block text-blue-200">Join our community today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  Get started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}