
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import LandingPage from '@/components/LandingPage';
import Auth from '@/components/Auth';
import MainDashboard from '@/components/MainDashboard';

const Index = () => {
  const { user, loading } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If user is authenticated, show dashboard
  if (user) {
    return <MainDashboard />;
  }

  // If auth modal is open, show auth component
  if (showAuth) {
    return <Auth onClose={() => setShowAuth(false)} />;
  }

  // Show landing page for non-authenticated users
  return <LandingPage onAuthClick={() => setShowAuth(true)} />;
};

export default Index;
