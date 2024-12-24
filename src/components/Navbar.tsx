import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code2, LogOut } from 'lucide-react';
import { Button } from './Button';
import { useAuth } from '../contexts/AuthContext';

export function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Code2 className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">ProjectShare</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/explore" className="text-gray-600 hover:text-gray-900">
              Explore
            </Link>
            <Link to="/how-it-works" className="text-gray-600 hover:text-gray-900">
              How it Works
            </Link>
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="outline" size="sm">Dashboard</Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSignOut}
                  className="text-red-600 hover:text-red-700"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Link to="/signin">
                  <Button variant="outline" size="sm">Sign in</Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">Sign up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}