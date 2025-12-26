import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Briefcase, Code2, Database, Layout, Terminal, Send, CheckCircle2, Github, Linkedin, Cpu, Globe, Sparkles, MousePointer2, Settings } from 'lucide-react';
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
      
      {/* Hero Section - Matching Image Exactly */}
      <section className="min-h-screen flex flex-col items-center justify-center relative px-4 overflow-hidden">
        
        {/* Centered Content Wrapper */}
        <div className="flex flex-col items-center text-center max-w-3xl z-10">
          
          {/* Availability Badge */}
          <div className="reveal active mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/5 border border-indigo-500/10 text-[10px] font-medium text-zinc-400">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              Available for freelance work
            </div>
          </div>

          {/* Name & Title */}
          <div className="reveal active delay-100 mb-6">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight leading-none mb-2">
              {profile.name}
            </h1>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-indigo-400 tracking-tight">
              {profile.title}
            </h2>
          </div>

          {/* Tagline */}
          <p className="reveal active delay-200 text-zinc-400 text-lg mb-12 max-w-lg font-medium leading-relaxed">
            {profile.tagline}
          </p>

          {/* Action Buttons */}
          <div className="reveal active delay-300 flex flex-col sm:flex-row gap-4 mb-16 w-full sm:w-auto">
            <Link
              to="/projects"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
            >
              View Projects <ArrowRight size={18} />
            </Link>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-zinc-800 bg-zinc-950/50 text-white text-sm font-bold rounded-xl hover:bg-zinc-900 transition-all active:scale-95"
            >
              Contact Me <Mail size={18} />
            </a>
          </div>

          {/* Social Icons */}
          <div className="reveal active delay-400 flex items-center gap-4 mb-24">
            <a href={profile.github} target="_blank" rel="noreferrer" className="w-11 h-11 flex items-center justify-center rounded-full border border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-600 transition-all">
              <Github size={20} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="w-11 h-11 flex items-center justify-center rounded-full border border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-600 transition-all">
              <Linkedin size={20} />
            </a>
            <a href={`mailto:${profile.email}`} className="w-11 h-11 flex items-center justify-center rounded-full border border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-600 transition-all">
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* Bottom Categories Bar */}
        <div className="absolute bottom-20 left-0 right-0 z-10 reveal active delay-500 border-t border-zinc-900/50 pt-10">
          <div className="max-w-7xl mx-auto px-4 flex justify-center items-center gap-8 sm:gap-12 md:gap-16">
            <div className="flex items-center gap-2 text-zinc-600 group hover:text-zinc-400 transition-colors">
              <Cpu size={14} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Engineering</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-600 group hover:text-zinc-400 transition-colors">
              <Globe size={14} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Development</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-600 group hover:text-zinc-400 transition-colors">
              <Layout size={14} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Design</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600 animate-bounce">
          <div className="w-5 h-8 border-2 border-zinc-800 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-1.5 bg-zinc-700 rounded-full"></div>
          </div>
        </div>

      </section>

      {/* About Section */}
      <section className="py-24 border-t border-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <div className="reveal">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-[1px] w-6 bg-indigo-500"></div>
                        <span className="text-indigo-400 font-black uppercase tracking-widest text-[10px]">The Narrative</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-black mb-8 text-white tracking-tight">Engineering solutions for <br/><span className="text-zinc-600 font-medium italic">modern digital platforms.</span></h2>
                    <div className="prose prose-invert text-zinc-500 text-sm leading-relaxed mb-8 font-medium">
                        <p className="whitespace-pre-wrap">{profile.about}</p>
                    </div>
                    <div className="flex items-center gap-3 text-zinc-400 bg-zinc-900/30 p-4 rounded-xl border border-zinc-800/50 w-fit">
                        <MapPin size={16} className="text-indigo-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest">{profile.location}</span>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-zinc-900/30 p-8 rounded-3xl border border-zinc-800/50 hover:border-indigo-500/30 transition-all group reveal shadow-xl">
                        <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-500 transition-all border border-indigo-500/10">
                             <Briefcase className="text-indigo-400 group-hover:text-white transition-colors" size={24} />
                        </div>
                        <h3 className="text-lg font-black text-white mb-2 uppercase tracking-tight">Experience</h3>
                        <p className="text-zinc-500 text-xs leading-relaxed font-bold">
                          {profile.experience || "Building scalable systems and digital tools for the web."}
                        </p>
                    </div>
                    <div className="bg-zinc-900/30 p-8 rounded-3xl border border-zinc-800/50 hover:border-emerald-500/30 transition-all group reveal shadow-xl">
                        <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-500 transition-all border border-emerald-500/10">
                             <Sparkles className="text-emerald-400 group-hover:text-white transition-colors" size={24} />
                        </div>
                        <h3 className="text-lg font-black text-white mb-2 uppercase tracking-tight text-emerald-400/80">Vision</h3>
                        <p className="text-zinc-500 text-xs leading-relaxed font-bold">
                          {profile.learning || "Pushing the boundaries of what is possible with code and design."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Skills Arsenal */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-zinc-900/20">
        <div className="reveal mb-16 text-center">
          <div className="inline-block px-3 py-1 bg-zinc-900 rounded border border-zinc-800 text-[8px] font-black uppercase tracking-[0.4em] text-zinc-600 mb-4">Skill Matrix</div>
          <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tighter leading-none">The <span className="text-zinc-700">Arsenal.</span></h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(groupedSkills).map(([category, items], idx) => (
            <div key={category} className="reveal bg-zinc-900/20 border border-zinc-800/40 rounded-2xl p-8 backdrop-blur-sm hover:bg-zinc-900/40 transition-all">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 bg-zinc-950 rounded-xl border border-zinc-800">
                  {getCategoryIcon(category)}
                </div>
                <h3 className="text-xs font-black text-white uppercase tracking-widest">{category}</h3>
              </div>
              <div className="space-y-6">
                {items.map((skill) => (
                  <div key={skill.id} className="relative">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.15em]">{skill.name}</span>
                      <span className="text-[9px] font-black text-zinc-700">{skill.level}%</span>
                    </div>
                    <div className="h-1 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-900">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ease-out
                          ${category === 'Frontend' ? 'bg-indigo-600' : 
                            category === 'Backend' ? 'bg-violet-600' : 
                            category === 'Design' ? 'bg-rose-600' : 'bg-emerald-600'}`}
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
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-zinc-900/20">
          <div className="flex flex-col sm:flex-row justify-between items-end mb-16 gap-6 reveal">
              <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-[1px] w-6 bg-cyan-500"></div>
                    <span className="text-cyan-400 font-black uppercase tracking-widest text-[10px]">Selected Work</span>
                  </div>
                  <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tighter">Case <span className="text-zinc-700">Studies.</span></h2>
              </div>
              <Link to="/projects" className="group inline-flex items-center px-8 py-3 bg-zinc-900 border border-zinc-800 text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-white hover:text-black transition-all">
                  Full Gallery <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredProjects.map((project) => (
                  <div key={project.id} className="reveal">
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
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter">Let's <span className="text-indigo-400 italic">Sync.</span></h2>
                    <p className="text-zinc-500 font-bold text-sm tracking-tight uppercase tracking-widest">Initialization of a new connection.</p>
                </div>

                {submitStatus === 'success' ? (
                    <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-3xl p-12 text-center animate-fade-in shadow-xl">
                        <CheckCircle2 className="text-emerald-500 mx-auto mb-4" size={32} />
                        <h3 className="text-xl font-black text-white mb-2 uppercase">Message Received</h3>
                        <p className="text-zinc-500 text-sm font-bold">Data packet received. I'll reach out shortly.</p>
                    </div>
                ) : (
                    <form onSubmit={handleEnquirySubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input 
                                type="text" 
                                required
                                value={formState.name}
                                onChange={(e) => setFormState({...formState, name: e.target.value})}
                                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-5 py-4 text-white text-sm font-bold focus:outline-none focus:border-indigo-500 transition-all placeholder-zinc-700"
                                placeholder="NAME"
                            />
                            <input 
                                type="email" 
                                required
                                value={formState.email}
                                onChange={(e) => setFormState({...formState, email: e.target.value})}
                                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-5 py-4 text-white text-sm font-bold focus:outline-none focus:border-indigo-500 transition-all placeholder-zinc-700"
                                placeholder="EMAIL"
                            />
                        </div>
                        <textarea 
                            rows={4}
                            required
                            value={formState.message}
                            onChange={(e) => setFormState({...formState, message: e.target.value})}
                            className="w-full bg-zinc-950/50 border border-zinc-800 rounded-2xl px-5 py-4.5 text-white text-sm font-bold focus:outline-none focus:border-indigo-500 transition-all resize-none placeholder-zinc-700"
                            placeholder="COMMUNICATION..."
                        />
                        
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-2">
                             <div className="text-zinc-600 text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                                <Globe size={14} /> Node: {profile.location}
                             </div>
                             <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full md:w-auto inline-flex items-center justify-center px-10 py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-indigo-600 hover:text-white transition-all disabled:opacity-50 active:scale-95 shadow-2xl"
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