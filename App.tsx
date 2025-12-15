import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Login from './pages/Login';
import Admin from './pages/Admin';
import { getAppData, checkAuth } from './services/storage';
import { AppData } from './types';

const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  const isAuthenticated = checkAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  const [data, setData] = useState<AppData | null>(null);

  const loadData = () => {
    setData(getAppData());
  };

  useEffect(() => {
    loadData();

    // Listen for updates from Admin panel (if multiple tabs or window dispatching)
    const handleStorageChange = () => {
      loadData();
    };

    window.addEventListener('storage-update', handleStorageChange);
    return () => window.removeEventListener('storage-update', handleStorageChange);
  }, []);

  if (!data) return <div className="h-screen flex items-center justify-center text-zinc-500">Loading Portfolio...</div>;

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout profile={data.profile}><Home data={data} /></Layout>} />
        <Route path="/projects" element={<Layout profile={data.profile}><Projects data={data} /></Layout>} />
        
        {/* Admin Routes */}
        <Route path="/login" element={<Login />} />
        <Route 
          path="/admin/*" 
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          } 
        />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;