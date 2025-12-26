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
    setSubmitStatus(success ? 'success' : 'error');
    if (success) setFormState({ name: '', email: '', message: '' });
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
        case 'Frontend': return <Layout size={18} className="text-indigo-400" />;
        case 'Backend': return <Database size={18} className="text-violet-400" />;
        case 'Tools': return <Terminal size={18} className="text-emerald-400" />;
        case 'Design': return <Code2 size={18} className="text-rose-400" />;
        default: return <Cpu size={18} className="text-indigo-400" />;
    }
  };

  return (
    <div className="flex flex-col">
      
      {/* Refined Hero Section */}
      <section className="min-h-[80vh] flex items-center justify-center relative px-6 max-w-7xl mx-auto w-full overflow-hidden py-16 md:py-0">
        {/* Spotlight Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.03)_0%,transparent_70%)]"></div>

        <div className="flex flex-col items-center text-center gap-4 relative z-10">
            <div className="reveal active">
                <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 text-[8px] font-black uppercase tracking-[0.4em] mb-4 backdrop-blur-sm">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </span>
                    Now Available
                </span>
                
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-white mb-2 leading-tight">
                  {profile.name}
                  <span className="block text-xl sm:text-3xl lg:text-4xl mt-1 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-emerald-400 to-cyan-400 font-bold tracking-tight">
                    {profile.title}
                  </span>
                </h1>
                
                <p className="text-sm sm:text-base text-zinc-500 mb-8 max-w-xl mx-auto leading-relaxed reveal delay-100 font-medium">
                  {profile.tagline}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center reveal delay-200">
                  <Link
                    to="/projects"
                    className="group inline-flex items-center justify-center px-6 py-3 bg-white text-black text-[9px] font-black uppercase tracking-[0.2em] rounded-lg hover:bg-emerald-500 hover:text-white transition-all shadow-xl active:scale-95"
                  >
                    View Projects <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={12} />
                  </Link>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center px-6 py-3 border border-zinc-800 text-[9px] font-black uppercase tracking-[0.2em] rounded-lg text-zinc-400 bg-zinc-950/40 hover:bg-zinc-900 hover:text-white transition-all active:scale-95"
                  >
                    Contact <Mail className="ml-2" size={12} />
                  </a>
                </div>

                <div className="mt-10 flex justify-center gap-2 reveal delay-300">
                    {[
                        { icon: <Github size={16} />, link: profile.github },
                        { icon: <Linkedin size={16} />, link: profile.linkedin },
                        { icon: <Mail size={16} />, link: `mailto:${profile.email}` }
                    ].map((social, i) => (
                        <a 
                            key={i}
                            href={social.link} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="p-2.5 bg-zinc-900/30 rounded-lg border border-zinc-800/40 text-zinc-500 transition-all hover:text-white hover:border-zinc-700 animate-float"
                            style={{ animationDelay: `${i * 0.4}s` }}
                        >
                            {social.icon}
                        </a>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* About Section - Emerald Color & Mobile Card Polish */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-7 reveal">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="h-[1px] w-5 bg-emerald-500"></div>
                        <span className="text-emerald-400 font-black uppercase tracking-widest text-[9px]">The Visionary</span>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-black mb-6 text-white tracking-tight leading-tight">Developing the next generation of <br/><span className="text-zinc-600 font-medium italic">digital architecture.</span></h2>
                    <div className="text-zinc-500 text-sm leading-relaxed mb-8 font-medium">
                        <p className="whitespace-pre-wrap">{profile.about}</p>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400 bg-zinc-900/20 p-3 rounded-xl border border-zinc-800/50 w-fit">
                        <MapPin size={12} className="text-emerald-500" />
                        <span className="text-[9px] font-black uppercase tracking-widest">{profile.location}</span>
                    </div>
                </div>
                
                {/* Refined Mobile Grid - Stacked with better rhythm */}
                <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                    <div className="bg-zinc-900/30 p-5 rounded-2xl border border-zinc-800/50 hover:border-indigo-500/20 transition-all group reveal delay-100">
                        <div className="w-8 h-8 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-500 transition-all border border-indigo-500/10 shadow-lg shadow-indigo-500/5">
                             <Briefcase className="text-indigo-400 group-hover:text-white transition-colors" size={16} />
                        </div>
                        <h3 className="text-sm font-black text-white mb-1 uppercase tracking-tight">Experience</h3>
                        <p className="text-zinc-500 text-[10px] leading-relaxed font-bold">
                          {profile.experience || "Engineering robust software for high-growth startups."}
                        </p>
                    </div>
                    <div className="bg-zinc-900/30 p-5 rounded-2xl border border-zinc-800/50 hover:border-emerald-500/20 transition-all group reveal delay-200">
                        <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-500 transition-all border border-emerald-500/10 shadow-lg shadow-emerald-500/5">
                             <Sparkles className="text-emerald-400 group-hover:text-white transition-colors" size={16} />
                        </div>
                        <h3 className="text-sm font-black text-white mb-1 uppercase tracking-tight text-emerald-400/80">Vision</h3>
                        <p className="text-zinc-500 text-[10px] leading-relaxed font-bold">
                          {profile.learning || "Integrating AI and edge computing into web workflows."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Skills Arsenal Section */}
      <section className="py-20 max-w-7xl mx-auto px-6 border-t border-zinc-900/20">
        <div className="reveal mb-12">
          <div className="inline-block px-2 py-0.5 bg-zinc-900 rounded border border-zinc-800 text-[8px] font-black uppercase tracking-[0.3em] text-zinc-600 mb-3">Skill Matrix</div>
          <h2 className="text-3xl font-black text-white tracking-tighter">The <span className="text-zinc-700">Stack.</span></h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(groupedSkills).map(([category, items], idx) => (
            <div key={category} className={`reveal delay-${(idx + 1) * 100} bg-zinc-900/20 border border-zinc-800/40 rounded-2xl p-6 backdrop-blur-sm hover:bg-zinc-900/40 transition-all`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-zinc-950 rounded-lg border border-zinc-800">
                  {getCategoryIcon(category)}
                </div>
                <h3 className="text-[10px] font-black text-white uppercase tracking-widest">{category}</h3>
              </div>
              <div className="space-y-4">
                {items.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">{skill.name}</span>
                      <span className="text-[8px] font-black text-zinc-700">{skill.level}%</span>
                    </div>
                    <div className="h-1 w-full bg-zinc-950 rounded-full border border-zinc-900">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ease-out delay-500
                          ${category === 'Frontend' ? 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.2)]' : 
                            category === 'Backend' ? 'bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.2)]' : 
                            category === 'Design' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.2)]' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.2)]'}`}
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

      {/* Featured Projects Preview */}
      {featuredProjects.length > 0 && (
        <section className="py-20 max-w-7xl mx-auto px-6 border-t border-zinc-900/20">
          <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4 reveal">
              <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-[1px] w-5 bg-cyan-500"></div>
                    <span className="text-cyan-400 font-bold uppercase tracking-widest text-[9px]">Selected Works</span>
                  </div>
                  <h2 className="text-3xl font-black text-white tracking-tighter">Featured <span className="text-zinc-700">Deployments.</span></h2>
              </div>
              <Link to="/projects" className="group inline-flex items-center px-5 py-2.5 bg-zinc-900 border border-zinc-800 text-white text-[8px] font-black uppercase tracking-[0.2em] rounded-lg hover:bg-white hover:text-black transition-all">
                  Full Gallery <ArrowRight size={12} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredProjects.map((project, index) => (
                  <div key={project.id} className={`reveal delay-${(index + 1) * 100}`}>
                      <ProjectCard project={project} />
                  </div>
              ))}
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-20 relative px-6">
         <div className="max-w-3xl mx-auto">
             <div className="bg-zinc-900/30 backdrop-blur-2xl p-8 md:p-14 rounded-3xl border border-zinc-800/50 reveal relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/5 blur-[60px]"></div>
                
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-3 tracking-tighter">Let's <span className="text-emerald-400 italic">Sync.</span></h2>
                    <p className="text-zinc-500 font-bold text-xs tracking-tight uppercase">Encryption-ready communication line.</p>
                </div>

                {submitStatus === 'success' ? (
                    <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-8 text-center animate-fade-in shadow-xl">
                        <CheckCircle2 className="text-emerald-500 mx-auto mb-3" size={28} />
                        <h3 className="text-sm font-black text-white mb-1 uppercase">Transmission Success</h3>
                        <p className="text-zinc-600 text-[10px] font-bold">Data packet received. Response protocol initiated.</p>
                    </div>
                ) : (
                    <form onSubmit={handleEnquirySubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input 
                                type="text" 
                                required
                                value={formState.name}
                                onChange={(e) => setFormState({...formState, name: e.target.value})}
                                className="w-full bg-zinc-950/40 border border-zinc-800 rounded-lg px-4 py-3 text-white text-xs font-bold focus:outline-none focus:border-emerald-500 transition-all placeholder-zinc-700"
                                placeholder="IDENTIFICATION (NAME)"
                            />
                            <input 
                                type="email" 
                                required
                                value={formState.email}
                                onChange={(e) => setFormState({...formState, email: e.target.value})}
                                className="w-full bg-zinc-950/40 border border-zinc-800 rounded-lg px-4 py-3 text-white text-xs font-bold focus:outline-none focus:border-emerald-500 transition-all placeholder-zinc-700"
                                placeholder="ENDPOINT (EMAIL)"
                            />
                        </div>
                        <textarea 
                            rows={4}
                            required
                            value={formState.message}
                            onChange={(e) => setFormState({...formState, message: e.target.value})}
                            className="w-full bg-zinc-950/40 border border-zinc-800 rounded-xl px-4 py-3.5 text-white text-xs font-bold focus:outline-none focus:border-emerald-500 transition-all resize-none placeholder-zinc-700"
                            placeholder="COMMUNICATION BODY..."
                        />
                        
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                             <div className="text-zinc-600 text-[8px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
                                <Globe size={10} /> Secure Node: {profile.email}
                             </div>
                             <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-white text-black text-[9px] font-black uppercase tracking-[0.2em] rounded-lg hover:bg-emerald-500 hover:text-white transition-all disabled:opacity-50 active:scale-95 shadow-2xl"
                            >
                                {isSubmitting ? 'Transmitting...' : <>Send Payload <Send size={12} className="ml-2" /></>}
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