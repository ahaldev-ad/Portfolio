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
      <div className="fixed top-0 left-0 right-0 h-[1px] bg-indigo-500/30 z-[60]"></div>

      {/* Refined Floating Background Blobs - Subtle & Previous feel */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none select-none opacity-40">
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-5%] left-[10%] w-[700px] h-[700px] bg-violet-600/10 rounded-full blur-[140px] animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-900/50 h-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between h-full items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="group flex items-center gap-2">
                <div className="w-7 h-7 bg-white text-black rounded flex items-center justify-center font-black text-xs">
                    {profile.name.charAt(0)}
                </div>
                <span className="text-base font-black text-white tracking-tighter">
                  {profile.name}
                </span>
              </Link>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                    location.pathname === link.path
                      ? 'text-white bg-white/5 border border-white/10'
                      : 'text-zinc-500 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-zinc-400">
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-zinc-950 border-b border-zinc-900 animate-fade-in">
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block text-xs font-black uppercase tracking-[0.2em] ${
                    location.pathname === link.path ? 'text-indigo-400' : 'text-zinc-500'
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

      {/* Footer - Subtle as previous */}
      <footer className="bg-zinc-950 border-t border-zinc-900 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-black text-white">{profile.name}</h3>
              <p className="text-zinc-600 text-[10px] uppercase font-bold tracking-widest mt-1">{profile.tagline}</p>
            </div>
            
            <div className="flex gap-4">
              <a href={profile.github} className="text-zinc-600 hover:text-white transition-colors"><Github size={18} /></a>
              <a href={profile.linkedin} className="text-zinc-600 hover:text-white transition-colors"><Linkedin size={18} /></a>
              <a href={`mailto:${profile.email}`} className="text-zinc-600 hover:text-white transition-colors"><Mail size={18} /></a>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-zinc-900/50 flex justify-between items-center">
             <div className="text-[9px] text-zinc-700 uppercase font-black tracking-widest">
                © {new Date().getFullYear()}
             </div>
             <Link to="/admin" className="text-zinc-900 hover:text-indigo-900 transition-colors text-[9px] uppercase font-black tracking-widest select-none">
                CP-AXES
             </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;