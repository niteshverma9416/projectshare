import React from 'react';
import { Upload, Users, MessageSquare, Github, Star, Code2 } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: 'Share Your Projects',
      description: 'Upload your projects with detailed descriptions, code samples, and live demos.',
    },
    {
      icon: Users,
      title: 'Connect with Developers',
      description: 'Find and connect with developers working on similar projects or technologies.',
    },
    {
      icon: MessageSquare,
      title: 'Get Feedback',
      description: 'Receive valuable feedback from experienced developers in your field.',
    },
    {
      icon: Github,
      title: 'GitHub Integration',
      description: 'Connect your GitHub account to easily import and showcase your repositories.',
    },
    {
      icon: Star,
      title: 'AI-Powered Suggestions',
      description: 'Get personalized project suggestions and improvements from our AI assistant.',
    },
    {
      icon: Code2,
      title: 'Collaborate',
      description: 'Find collaboration opportunities and work on exciting projects together.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How ProjectShare Works
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A platform for developers to share projects, get feedback, and collaborate with others.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 rounded-lg p-3">
                  <step.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold ml-4">{step.title}</h3>
              </div>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Getting Started Guide
          </h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                <span className="text-blue-600 font-semibold">1</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Create an Account</h3>
                <p className="text-gray-600 mt-1">
                  Sign up using your email or GitHub account to get started.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                <span className="text-blue-600 font-semibold">2</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Complete Your Profile</h3>
                <p className="text-gray-600 mt-1">
                  Add your skills, interests, and expertise to help others find you.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                <span className="text-blue-600 font-semibold">3</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Upload Your First Project</h3>
                <p className="text-gray-600 mt-1">
                  Share your work with the community and start getting feedback.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                <span className="text-blue-600 font-semibold">4</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Connect and Collaborate</h3>
                <p className="text-gray-600 mt-1">
                  Find other developers, join discussions, and collaborate on projects.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}