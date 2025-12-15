import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/firebase';
import Layout from './components/Layout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Login from './pages/Login';
import Admin from './pages/Admin';
import { getAppData } from './services/storage';

const PrivateRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App = () => {
  const [data, setData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  const loadData = async () => {
    const fetchedData = await getAppData();
    setData(fetchedData);
  };

  useEffect(() => {
    // Initial Load
    loadData();

    // Listen for data updates
    const handleStorageChange = () => {
      loadData();
    };
    window.addEventListener('storage-update', handleStorageChange);

    // Listen for Auth State
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setAuthLoading(false);
    });

    return () => {
      window.removeEventListener('storage-update', handleStorageChange);
      unsubscribe();
    };
  }, []);

  if (!data || authLoading) {
    return <div className="h-screen flex items-center justify-center text-zinc-500">Loading Portfolio...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout profile={data.profile}><Home data={data} /></Layout>} />
        <Route path="/projects" element={<Layout profile={data.profile}><Projects data={data} /></Layout>} />
        
        {/* Admin Routes */}
        <Route path="/login" element={isAuthenticated ? <Navigate to="/admin/dashboard" /> : <Login />} />
        <Route 
          path="/admin/*" 
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
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