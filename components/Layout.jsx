import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';

const Layout = ({ children, profile }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
  ];

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

    // Small timeout to ensure DOM is ready after route transition
    const timeoutId = setTimeout(() => {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(el => observer.observe(el));
    }, 100);

    return () => {
        observer.disconnect();
        clearTimeout(timeoutId);
    };
  }, [location.pathname]); // Re-run effect when route changes

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      
      {/* Neon Gradient Blobs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-violet-600/20 rounded-full blur-[100px] mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[150px] mix-blend-screen"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 h-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400">
                {profile.name}
              </Link>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-indigo-400'
                      : 'text-zinc-400 hover:text-zinc-100'
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
                className="text-zinc-400 hover:text-zinc-100 focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-zinc-900 border-b border-zinc-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === link.path
                      ? 'bg-indigo-900/50 text-indigo-300'
                      : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
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
      <footer className="bg-zinc-950 border-t border-zinc-900 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold text-white">{profile.name}</h3>
              <p className="text-zinc-500 text-sm mt-1">{profile.tagline}</p>
            </div>
            <div className="flex space-x-6">
              <a href={profile.github} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href={`mailto:${profile.email}`} className="text-zinc-400 hover:text-white transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-zinc-900 flex justify-between items-center">
             <div className="text-xs text-zinc-600">
                © {new Date().getFullYear()} {profile.name}. All rights reserved.
             </div>
             {/* Hidden Admin Link - Bottom Right */}
             <Link to="/admin" className="text-zinc-900 hover:text-zinc-800 transition-colors text-[10px] select-none" aria-label="Admin Access">
                Admin
             </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;