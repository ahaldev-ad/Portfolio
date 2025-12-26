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
      
      {/* Attractive Hero Section with Mild Gradient Noise */}
      <section className="min-h-[85vh] flex items-center justify-center relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pt-16 md:pt-0 overflow-hidden">
        {/* Spotlight Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.02)_0%,transparent_70%)] pointer-events-none"></div>

        <div className="flex flex-col items-center text-center gap-6 w-full relative z-10">
            <div className="reveal active">
                <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 text-[9px] font-black uppercase tracking-[0.3em] mb-6 backdrop-blur-sm">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </span>
                    Digital Craftsman • Available
                </span>
                
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-4 leading-tight">
                  {profile.name}
                  <span className="block text-2xl sm:text-4xl lg:text-5xl mt-1 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-emerald-400 to-cyan-400 font-bold tracking-tight">
                    {profile.title}
                  </span>
                </h1>
                
                <p className="text-base sm:text-lg text-zinc-500 mb-10 max-w-xl mx-auto leading-relaxed reveal delay-100 font-medium tracking-tight">
                  {profile.tagline}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center reveal delay-200">
                  <Link
                    to="/projects"
                    className="group inline-flex items-center justify-center px-8 py-3.5 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-emerald-500 hover:text-white transition-all shadow-xl active:scale-95"
                  >
                    View Projects <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={14} />
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
                            className="p-3 bg-zinc-900/40 rounded-xl border border-zinc-800/50 text-zinc-500 transition-all hover:text-white hover:border-zinc-700 animate-float"
                            style={{ animationDelay: `${i * 0.4}s` }}
                        >
                            {social.icon}
                        </a>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* About Section - Emerald Vision Box */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <div className="reveal">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-[1px] w-6 bg-emerald-500"></div>
                        <span className="text-emerald-400 font-black uppercase tracking-widest text-[9px]">The Narrative</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-black mb-8 text-white tracking-tight">I design and deploy <br/><span className="text-zinc-600 font-medium italic">modern digital architectures.</span></h2>
                    <div className="prose prose-invert text-zinc-500 text-sm leading-relaxed mb-8 font-medium">
                        <p className="whitespace-pre-wrap">{profile.about}</p>
                    </div>
                    <div className="flex items-center gap-3 text-zinc-400 bg-zinc-900/30 p-4 rounded-xl border border-zinc-800/50 w-fit">
                        <MapPin size={16} className="text-emerald-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest">{profile.location}</span>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-zinc-900/30 p-8 rounded-3xl border border-zinc-800/50 hover:border-indigo-500/30 transition-all group reveal delay-100 shadow-xl">
                        <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-500 transition-all border border-indigo-500/10">
                             <Briefcase className="text-indigo-400 group-hover:text-white transition-colors" size={24} />
                        </div>
                        <h3 className="text-lg font-black text-white mb-2 uppercase tracking-tight">Experience</h3>
                        <p className="text-zinc-500 text-xs leading-relaxed font-bold">
                          {profile.experience || "Engineering robust software for the next generation of web applications."}
                        </p>
                    </div>
                    {/* Vision Box - Changed to Emerald Green */}
                    <div className="bg-zinc-900/30 p-8 rounded-3xl border border-zinc-800/50 hover:border-emerald-500/30 transition-all group reveal delay-200 shadow-xl">
                        <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-500 transition-all border border-emerald-500/10">
                             <Sparkles className="text-emerald-400 group-hover:text-white transition-colors" size={24} />
                        </div>
                        <h3 className="text-lg font-black text-white mb-2 uppercase tracking-tight text-emerald-400/80">Vision</h3>
                        <p className="text-zinc-500 text-xs leading-relaxed font-bold">
                          {profile.learning || "Integrating deep technical efficiency with clean, minimal aesthetic design."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Skills Arsenal Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-zinc-900/20">
        <div className="reveal mb-16 text-center">
          <div className="inline-block px-3 py-1 bg-zinc-900 rounded border border-zinc-800 text-[8px] font-black uppercase tracking-[0.4em] text-zinc-600 mb-4">Technical Stack</div>
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-4 tracking-tighter leading-none">The <span className="text-zinc-700">Arsenal.</span></h2>
          <p className="text-zinc-500 max-w-xl mx-auto font-bold tracking-tight text-sm uppercase">Curated tools for high-performance development.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(groupedSkills).map(([category, items], idx) => (
            <div key={category} className={`reveal delay-${(idx + 1) * 100} group bg-zinc-900/20 border border-zinc-800/40 rounded-2xl p-8 backdrop-blur-sm hover:bg-zinc-900/40 transition-all`}>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 bg-zinc-950 rounded-xl border border-zinc-800 group-hover:scale-110 transition-transform">
                  {getCategoryIcon(category)}
                </div>
                <h3 className="text-xs font-black text-white uppercase tracking-widest">{category}</h3>
              </div>
              <div className="space-y-6">
                {items.map((skill) => (
                  <div key={skill.id} className="relative">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-black text-zinc-500 group-hover:text-white transition-colors uppercase tracking-[0.15em]">{skill.name}</span>
                      <span className="text-[9px] font-black text-zinc-700">{skill.level}%</span>
                    </div>
                    <div className="h-1 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-900 shadow-inner">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ease-out delay-500
                          ${category === 'Frontend' ? 'bg-indigo-600 shadow-indigo-500/20' : 
                            category === 'Backend' ? 'bg-violet-600 shadow-violet-500/20' : 
                            category === 'Design' ? 'bg-rose-600 shadow-rose-500/20' : 'bg-emerald-600 shadow-emerald-500/20'}`}
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
                    <span className="text-cyan-400 font-black uppercase tracking-widest text-[10px]">Case Studies</span>
                  </div>
                  <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tighter">Featured <span className="text-zinc-700">Deployments.</span></h2>
              </div>
              <Link to="/projects" className="group inline-flex items-center px-8 py-3 bg-zinc-900 border border-zinc-800 text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-white hover:text-black transition-all">
                  Full Repository <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
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
      <section id="contact" className="py-24 relative px-4">
         <div className="max-w-4xl mx-auto">
             <div className="bg-zinc-900/30 backdrop-blur-2xl p-10 md:p-16 rounded-[2.5rem] border border-zinc-800/50 reveal relative overflow-hidden">
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[80px] -z-10"></div>
                
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter">Let's <span className="text-emerald-400 italic">Sync.</span></h2>
                    <p className="text-zinc-500 font-bold text-sm tracking-tight uppercase tracking-widest">Initialization of a new connection.</p>
                </div>

                {submitStatus === 'success' ? (
                    <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-3xl p-12 text-center animate-fade-in shadow-xl">
                        <CheckCircle2 className="text-emerald-500 mx-auto mb-4" size={32} />
                        <h3 className="text-xl font-black text-white mb-2 uppercase">Transmission Successful</h3>
                        <p className="text-zinc-500 text-sm font-bold">Data packet received. Response protocol initiated.</p>
                    </div>
                ) : (
                    <form onSubmit={handleEnquirySubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input 
                                type="text" 
                                required
                                value={formState.name}
                                onChange={(e) => setFormState({...formState, name: e.target.value})}
                                className="w-full bg-zinc-950/50 border border-zinc-800/80 rounded-xl px-5 py-4 text-white text-sm font-bold focus:outline-none focus:border-emerald-500 transition-all placeholder-zinc-700"
                                placeholder="IDENTIFICATION (NAME)"
                            />
                            <input 
                                type="email" 
                                required
                                value={formState.email}
                                onChange={(e) => setFormState({...formState, email: e.target.value})}
                                className="w-full bg-zinc-950/50 border border-zinc-800/80 rounded-xl px-5 py-4 text-white text-sm font-bold focus:outline-none focus:border-emerald-500 transition-all placeholder-zinc-700"
                                placeholder="ENDPOINT (EMAIL)"
                            />
                        </div>
                        <textarea 
                            rows={4}
                            required
                            value={formState.message}
                            onChange={(e) => setFormState({...formState, message: e.target.value})}
                            className="w-full bg-zinc-950/50 border border-zinc-800/80 rounded-2xl px-5 py-4.5 text-white text-sm font-bold focus:outline-none focus:border-emerald-500 transition-all resize-none placeholder-zinc-700"
                            placeholder="COMMUNICATION BODY..."
                        />
                        
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-2">
                             <div className="text-zinc-600 text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                                <Globe size={14} /> Node Location: {profile.location}
                             </div>
                             <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full md:w-auto inline-flex items-center justify-center px-10 py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-emerald-600 hover:text-white transition-all disabled:opacity-50 active:scale-95 shadow-2xl"
                            >
                                {isSubmitting ? 'Transmitting...' : <>Send Payload <Send size={14} className="ml-2" /></>}
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