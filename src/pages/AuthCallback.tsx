import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signIn } = useAuth();
  
  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      signIn(token, { id: '', name: '', email: '', field: '' }); // User data will be fetched in AuthContext
      navigate('/explore');
    } else {
      navigate('/signin');
    }
  }, [searchParams, signIn, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold">Completing authentication...</h2>
        <p className="text-gray-500 mt-2">Please wait while we sign you in.</p>
      </div>
    </div>
  );
}