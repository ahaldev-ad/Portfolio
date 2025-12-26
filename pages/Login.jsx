import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Key, ArrowRight, Sparkles } from 'lucide-react';
import { loginUser } from '../services/storage';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
        const success = await loginUser(email, password);
        if (success) {
            navigate('/admin');
        } else {
            setError('Authentication failed. Check your credentials.');
        }
    } catch (err) {
        setError('System error. Please try the Demo access below.');
    } finally {
        setLoading(false);
    }
  };

  // Quick bypass for users who haven't set up Firebase Auth yet
  const handleDemoAccess = () => {
    localStorage.setItem('portfolio_auth_demo', 'true');
    window.location.reload(); // Force app to pick up the demo state and redirect to /admin
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>

      <div className="bg-zinc-900/50 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] border border-zinc-800 shadow-2xl w-full max-w-md relative z-10 reveal active">
        <div className="flex justify-center mb-8">
          <div className="relative group">
              <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="bg-gradient-to-br from-indigo-500 to-violet-600 p-5 rounded-2xl shadow-xl relative">
                <Lock className="text-white" size={32} />
              </div>
          </div>
        </div>
        
        <h2 className="text-3xl font-black text-center text-white mb-2 tracking-tighter">Admin Access</h2>
        <p className="text-zinc-500 text-center text-sm mb-10 font-medium">Identify yourself to manage the matrix.</p>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-indigo-400 transition-colors" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-950/50 border border-zinc-800 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder-zinc-700"
                  placeholder="Admin Email"
                  required
                />
            </div>
            <div className="relative group">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-violet-400 transition-colors" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-950/50 border border-zinc-800 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all placeholder-zinc-700"
                  placeholder="Secure Password"
                  required
                />
            </div>
          </div>
          
          {error && (
            <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-xs font-bold text-center">
                {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black py-4 px-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-600 hover:text-white transition-all shadow-xl shadow-white/5 disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading ? 'Initializing...' : <>Access Dashboard <ArrowRight size={16} /></>}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-zinc-800 flex flex-col gap-4">
            <button 
                onClick={handleDemoAccess}
                className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
            >
                <Sparkles size={14} /> Try Demo Dashboard
            </button>
            <p className="text-center text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
                Authorized Access Only • Port 443 Encrypted
            </p>
        </div>
      </div>
    </div>
  );
};

export default Login;