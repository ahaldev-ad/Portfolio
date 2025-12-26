import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';

const Layout = ({ children, profile }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  // Scroll Reveal Observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const timeoutId = setTimeout(() => {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(el => observer.observe(el));
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
      
      {/* Top Decorator Line */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 z-[60] shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>

      {/* Enhanced Floating Background Blobs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none select-none">
        <div className="absolute top-[-5%] left-[-10%] w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[140px] mix-blend-screen animate-blob"></div>
        <div className="absolute top-[10%] right-[-15%] w-[700px] h-[700px] bg-emerald-600/15 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[15%] w-[900px] h-[900px] bg-violet-600/15 rounded-full blur-[160px] mix-blend-screen animate-blob animation-delay-4000"></div>
        <div className="absolute top-[40%] left-[40%] w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-[130px] mix-blend-screen animate-blob animation-delay-3000 opacity-50"></div>
        
        {/* Subtle Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-900/50 h-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between h-full items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="group flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                    <span className="text-white font-bold text-sm">{profile.name.charAt(0)}</span>
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-violet-300 to-cyan-300 group-hover:from-white group-hover:to-white transition-all duration-300">
                  {profile.name}
                </span>
              </Link>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 flex items-center gap-2 ${
                    location.pathname === link.path
                      ? 'text-white bg-white/10 shadow-inner border border-white/10'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-zinc-400 hover:text-white transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-zinc-950/95 backdrop-blur-2xl border-b border-zinc-900 animate-fade-in">
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-lg font-bold transition-all ${
                    location.pathname === link.path
                      ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20'
                      : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-900 py-16 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500 mb-2">{profile.name}</h3>
              <p className="text-zinc-500 text-sm max-w-xs">{profile.tagline}</p>
            </div>
            
            <div className="flex items-center gap-4">
              <a href={profile.github} target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center bg-zinc-900 rounded-full text-zinc-400 hover:text-white hover:bg-indigo-600 transition-all duration-300">
                <Github size={20} />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center bg-zinc-900 rounded-full text-zinc-400 hover:text-white hover:bg-blue-600 transition-all duration-300">
                <Linkedin size={20} />
              </a>
              <a href={`mailto:${profile.email}`} className="w-10 h-10 flex items-center justify-center bg-zinc-900 rounded-full text-zinc-400 hover:text-white hover:bg-rose-600 transition-all duration-300">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-zinc-900/50 flex flex-col sm:flex-row justify-between items-center gap-4">
             <div className="text-[10px] text-zinc-600 uppercase tracking-[0.2em] font-bold">
                © {new Date().getFullYear()} {profile.name} • Built with Passion
             </div>
             <Link to="/admin" className="text-zinc-900 hover:text-indigo-900 transition-colors text-[10px] uppercase font-black tracking-widest select-none">
                Control Panel
             </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;