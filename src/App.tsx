import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignUp } from './pages/SignUp';
import { SignIn } from './pages/SignIn';
import { Landing } from './pages/Landing';
import { Explore } from './pages/Explore';
import { ProjectDetail } from './pages/ProjectDetail';
import { UploadProject } from './pages/UploadProject';
import { AuthCallback } from './pages/AuthCallback';
import { Dashboard } from './pages/Dashboard';
import { HowItWorks } from './pages/HowItWorks';
import { Navbar } from './components/Navbar';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/upload" element={<UploadProject />} />
          <Route path="/auth-callback" element={<AuthCallback />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;