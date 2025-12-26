import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';

const Layout = ({ children, profile }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const timeoutId = setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }, 100);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
  ];

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden bg-zinc-950">
      
      {/* Dynamic Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[100px] animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[140px] animate-blob" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/70 backdrop-blur-md border-b border-zinc-900/50 h-14">
        <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-6 h-6 bg-white text-black rounded flex items-center justify-center font-black text-[10px]">
              {profile.name.charAt(0)}
            </div>
            <span className="text-sm font-black text-white tracking-tighter uppercase">{profile.name}</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                  location.pathname === link.path ? 'text-white bg-white/5 border border-white/10' : 'text-zinc-500 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-zinc-400">
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-zinc-950/95 border-b border-zinc-900 animate-fade-in p-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block text-[10px] font-black uppercase tracking-widest ${
                  location.pathname === link.path ? 'text-emerald-400' : 'text-zinc-500'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </nav>

      <main className="flex-grow pt-14">
        {children}
      </main>

      <footer className="bg-zinc-950 border-t border-zinc-900/50 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-base font-black text-white uppercase tracking-tight">{profile.name}</h3>
            <p className="text-zinc-600 text-[9px] uppercase font-bold tracking-[0.2em] mt-1">{profile.tagline}</p>
          </div>
          
          <div className="flex gap-4">
            <a href={profile.github} className="text-zinc-700 hover:text-white transition-colors"><Github size={16} /></a>
            <a href={profile.linkedin} className="text-zinc-700 hover:text-white transition-colors"><Linkedin size={16} /></a>
            <a href={`mailto:${profile.email}`} className="text-zinc-700 hover:text-white transition-colors"><Mail size={16} /></a>
          </div>
          
          <div className="flex items-center gap-6">
            <span className="text-[9px] text-zinc-800 uppercase font-black tracking-widest">© {new Date().getFullYear()}</span>
            <Link to="/admin" className="text-zinc-900 hover:text-zinc-700 transition-colors text-[9px] font-black uppercase tracking-[0.3em]">
              CP-AXES
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;