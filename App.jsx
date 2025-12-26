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
    try {
        const fetchedData = await getAppData();
        setData(fetchedData);
    } catch (err) {
        console.error("Failed to fetch initial data", err);
    }
  };

  useEffect(() => {
    loadData();

    // Storage updates from dashboard
    const handleStorageChange = () => {
      loadData();
    };
    window.addEventListener('storage-update', handleStorageChange);

    // Local Demo Auth check
    const demoAuth = localStorage.getItem('portfolio_auth_demo') === 'true';

    // Firebase Auth listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user || demoAuth);
      setAuthLoading(false);
    });

    return () => {
      window.removeEventListener('storage-update', handleStorageChange);
      unsubscribe();
    };
  }, []);

  if (!data || authLoading) {
    return (
      <div className="h-screen bg-zinc-950 flex flex-col items-center justify-center text-zinc-500 gap-4">
        <div className="w-12 h-12 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
        <p className="text-xs font-bold uppercase tracking-[0.3em] animate-pulse">Syncing Portfolio...</p>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout profile={data.profile}><Home data={data} /></Layout>} />
        <Route path="/projects" element={<Layout profile={data.profile}><Projects data={data} /></Layout>} />
        
        {/* Admin Routes */}
        <Route path="/login" element={isAuthenticated ? <Navigate to="/admin" /> : <Login />} />
        
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