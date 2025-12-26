import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, MapPin, Briefcase, Code2, Database, Layout, Terminal, Send, CheckCircle2, Github, Linkedin, Cpu, Globe, Sparkles } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import { sendEnquiry } from '../services/storage';

const Home = ({ data }) => {
  const { profile, skills, projects } = data;
  
  const featuredProjects = projects.filter(p => p.isFeatured);
  
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const success = await sendEnquiry(formState);
    if (success) {
      setSubmitStatus('success');
      setFormState({ name: '', email: '', message: '' });
    } else {
      setSubmitStatus('error');
    }
    setIsSubmitting(false);
    setTimeout(() => setSubmitStatus(null), 5000);
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const getCategoryIcon = (category) => {
    switch(category) {
        case 'Frontend': return <Layout size={20} className="text-indigo-400" />;
        case 'Backend': return <Database size={20} className="text-violet-400" />;
        case 'Tools': return <Terminal size={20} className="text-emerald-400" />;
        case 'Design': return <Code2 size={20} className="text-rose-400" />;
        default: return <Cpu size={20} className="text-indigo-400" />;
    }
  };

  return (
    <div className="flex flex-col">
      
      {/* Hero Section - Restored Proportions */}
      <section className="min-h-[85vh] flex items-center justify-center relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full py-20 overflow-hidden">
        <div className="flex flex-col items-center text-center gap-6 w-full relative z-10">
            <div className="reveal active">
                <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-indigo-500/5 border border-indigo-500/10 text-indigo-400 text-[9px] font-black uppercase tracking-[0.3em] mb-6 backdrop-blur-md">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500"></span>
                    </span>
                    Available for New Projects
                </span>
                
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-4 leading-tight">
                  {profile.name}
                  <span className="block text-2xl sm:text-4xl lg:text-5xl mt-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-violet-400 to-emerald-400 font-black">
                    {profile.title}
                  </span>
                </h1>
                
                <p className="text-base sm:text-lg text-zinc-500 mb-10 max-w-2xl mx-auto leading-relaxed reveal delay-100">
                  {profile.tagline}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center reveal delay-200">
                  <Link
                    to="/projects"
                    className="group inline-flex items-center justify-center px-8 py-3.5 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-xl shadow-white/5 active:scale-95"
                  >
                    Explore Work <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={14} />
                  </Link>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center px-8 py-3.5 border border-zinc-800 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl text-zinc-400 bg-zinc-950/50 hover:bg-zinc-900 hover:text-white transition-all active:scale-95"
                  >
                    Get in Touch <Mail className="ml-2" size={14} />
                  </a>
                </div>

                <div className="mt-12 flex justify-center gap-3 reveal delay-300">
                    {[
                        { icon: <Github size={18} />, link: profile.github },
                        { icon: <Linkedin size={18} />, link: profile.linkedin },
                        { icon: <Mail size={18} />, link: `mailto:${profile.email}` }
                    ].map((social, i) => (
                        <a 
                            key={i}
                            href={social.link} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="p-3 bg-zinc-900/40 rounded-xl border border-zinc-800/50 text-zinc-500 transition-all hover:text-white hover:border-zinc-700 hover:-translate-y-1 animate-float"
                            style={{ animationDelay: `${i * 0.3}s` }}
                        >
                            {social.icon}
                        </a>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* About Section - Emerald Vision & Refined Mobile Layout */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <div className="reveal">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-[1px] w-6 bg-indigo-500"></div>
                        <span className="text-indigo-400 font-bold uppercase tracking-widest text-[10px]">The Narrative</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-black mb-8 text-white tracking-tight">I design and deploy <br/><span className="text-zinc-600 font-medium">high-performance systems.</span></h2>
                    <div className="prose prose-invert text-zinc-500 text-base leading-relaxed mb-8">
                        <p className="whitespace-pre-wrap">{profile.about}</p>
                    </div>
                    <div className="flex items-center gap-3 text-zinc-400 bg-zinc-900/30 p-4 rounded-2xl border border-zinc-800/50 w-fit">
                        <MapPin size={16} className="text-indigo-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest">{profile.location}</span>
                    </div>
                </div>
                
                {/* Refined Mobile Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                    <div className="bg-zinc-900/30 p-6 rounded-3xl border border-zinc-800/50 hover:border-indigo-500/30 transition-all group reveal delay-100">
                        <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-indigo-500 transition-all border border-indigo-500/20">
                             <Briefcase className="text-indigo-400 group-hover:text-white transition-colors" size={20} />
                        </div>
                        <h3 className="text-lg font-black text-white mb-2 uppercase tracking-tight">Experience</h3>
                        <p className="text-zinc-500 text-xs leading-relaxed font-medium">
                          {profile.experience || "Years of engineering digital excellence."}
                        </p>
                    </div>
                    <div className="bg-zinc-900/30 p-6 rounded-3xl border border-zinc-800/50 hover:border-emerald-500/30 transition-all group reveal delay-200">
                        <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-emerald-500 transition-all border border-emerald-500/20">
                             <Sparkles className="text-emerald-400 group-hover:text-white transition-colors" size={20} />
                        </div>
                        <h3 className="text-lg font-black text-white mb-2 uppercase tracking-tight">Vision</h3>
                        <p className="text-zinc-500 text-xs leading-relaxed font-medium">
                          {profile.learning || "Pushing boundaries with emerging tech."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Skills Arsenal Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-zinc-900/20">
        <div className="reveal mb-16 text-center">
          <div className="inline-block px-3 py-1 bg-zinc-900 rounded-full border border-zinc-800 text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-4">Technical Stack</div>
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-4 tracking-tighter">My <span className="text-zinc-700">Expertise.</span></h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(groupedSkills).map(([category, items], idx) => (
            <div key={category} className={`reveal delay-${(idx + 1) * 100} bg-zinc-900/20 border border-zinc-800/40 rounded-3xl p-8 backdrop-blur-sm hover:bg-zinc-900/40 transition-all`}>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 bg-zinc-950 rounded-xl border border-zinc-800">
                  {getCategoryIcon(category)}
                </div>
                <h3 className="text-sm font-black text-white uppercase tracking-widest">{category}</h3>
              </div>
              <div className="space-y-6">
                {items.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{skill.name}</span>
                      <span className="text-[9px] font-black text-zinc-600">{skill.level}%</span>
                    </div>
                    <div className="h-1 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-900">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ease-out delay-500 bg-gradient-to-r
                          ${category === 'Frontend' ? 'from-indigo-600 to-indigo-400' : 
                            category === 'Backend' ? 'from-violet-600 to-violet-400' : 
                            category === 'Design' ? 'from-rose-600 to-rose-400' : 'from-emerald-600 to-emerald-400'}`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-zinc-900/20">
          <div className="flex flex-col sm:flex-row justify-between items-end mb-16 gap-6 reveal">
              <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-[1px] w-6 bg-cyan-500"></div>
                    <span className="text-cyan-400 font-bold uppercase tracking-widest text-[10px]">Portfolio</span>
                  </div>
                  <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tighter">Case <span className="text-zinc-700">Studies.</span></h2>
              </div>
              <Link to="/projects" className="group inline-flex items-center px-6 py-3 bg-zinc-900 border border-zinc-800 text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-white hover:text-black transition-all">
                  Full Gallery <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredProjects.map((project, index) => (
                  <div key={project.id} className={`reveal delay-${(index + 1) * 100}`}>
                      <ProjectCard project={project} />
                  </div>
              ))}
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-24 relative">
         <div className="max-w-4xl mx-auto px-4">
             <div className="bg-zinc-900/30 backdrop-blur-2xl p-8 md:p-16 rounded-[2.5rem] border border-zinc-800/50 reveal relative">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter">Let's <span className="text-indigo-400">Sync.</span></h2>
                    <p className="text-zinc-500 font-bold text-sm tracking-tight">Drop a transmission to start a conversation.</p>
                </div>

                {submitStatus === 'success' ? (
                    <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-3xl p-10 text-center animate-fade-in">
                        <CheckCircle2 className="text-emerald-500 mx-auto mb-4" size={32} />
                        <h3 className="text-xl font-black text-white mb-2">Message Received</h3>
                        <p className="text-zinc-500 text-sm">Transmission successful. Awaiting connection.</p>
                    </div>
                ) : (
                    <form onSubmit={handleEnquirySubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input 
                                type="text" 
                                required
                                value={formState.name}
                                onChange={(e) => setFormState({...formState, name: e.target.value})}
                                className="w-full bg-zinc-950/50 border border-zinc-800/80 rounded-xl px-5 py-3.5 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all"
                                placeholder="Full Name"
                            />
                            <input 
                                type="email" 
                                required
                                value={formState.email}
                                onChange={(e) => setFormState({...formState, email: e.target.value})}
                                className="w-full bg-zinc-950/50 border border-zinc-800/80 rounded-xl px-5 py-3.5 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all"
                                placeholder="Email Address"
                            />
                        </div>
                        <textarea 
                            rows={4}
                            required
                            value={formState.message}
                            onChange={(e) => setFormState({...formState, message: e.target.value})}
                            className="w-full bg-zinc-950/50 border border-zinc-800/80 rounded-2xl px-5 py-4 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all resize-none"
                            placeholder="Message body..."
                        />
                        
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                             <div className="text-zinc-600 text-[9px] font-black uppercase tracking-widest">
                                <Globe size={12} className="inline mr-2" /> Encrypted Endpoint
                             </div>
                             <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-3.5 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-indigo-600 hover:text-white transition-all disabled:opacity-50 active:scale-95 shadow-xl"
                            >
                                {isSubmitting ? 'Transmitting...' : <>Send Message <Send size={14} className="ml-2" /></>}
                            </button>
                        </div>
                    </form>
                )}
             </div>
         </div>
      </section>
    </div>
  );
};

export default Home;