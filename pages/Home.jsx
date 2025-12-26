import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, MapPin, Briefcase, GraduationCap, Code2, Database, Layout, Terminal, Send, CheckCircle2, Github, Linkedin, Cpu, Globe, Sparkles } from 'lucide-react';
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
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pt-16 md:pt-0">
        <div className="flex flex-col items-center text-center gap-8 lg:gap-10 w-full">
            <div className="reveal">
                <span className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-bold uppercase tracking-[0.2em] mb-8 backdrop-blur-md shadow-2xl">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                    Digital Craftsman
                </span>
                <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black tracking-tighter text-white mb-6 leading-[0.9]">
                  {profile.name}
                  <span className="block text-4xl sm:text-5xl lg:text-6xl mt-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-violet-400 via-rose-400 to-cyan-400 font-extrabold pb-2 tracking-tight">
                    {profile.title}
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed reveal delay-100 font-medium">
                  {profile.tagline}
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center reveal delay-200">
                  <Link
                    to="/projects"
                    className="inline-flex items-center justify-center px-10 py-4 bg-white text-black text-sm font-black uppercase tracking-widest rounded-2xl hover:bg-indigo-500 hover:text-white transition-all shadow-[0_20px_40px_rgba(255,255,255,0.05)] transform hover:-translate-y-1"
                  >
                    My Work <ArrowRight className="ml-2" size={18} />
                  </Link>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center px-10 py-4 border border-zinc-800 text-sm font-black uppercase tracking-widest rounded-2xl text-zinc-300 bg-zinc-950/50 hover:bg-zinc-900 hover:text-white transition-all backdrop-blur-sm hover:border-zinc-500"
                  >
                    Say Hello <Mail className="ml-2" size={18} />
                  </a>
                </div>

                <div className="mt-16 flex flex-col items-center gap-6 reveal delay-300">
                    <div className="flex gap-4">
                        <a href={profile.github} target="_blank" rel="noreferrer" className="p-4 bg-zinc-900/40 rounded-2xl border border-zinc-800/50 text-zinc-400 hover:text-indigo-400 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all duration-300 hover:scale-110 shadow-2xl">
                            <Github size={22} />
                        </a>
                        <a href={profile.linkedin} target="_blank" rel="noreferrer" className="p-4 bg-zinc-900/40 rounded-2xl border border-zinc-800/50 text-zinc-400 hover:text-blue-400 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-300 hover:scale-110 shadow-2xl">
                            <Linkedin size={22} />
                        </a>
                         <a href={`mailto:${profile.email}`} className="p-4 bg-zinc-900/40 rounded-2xl border border-zinc-800/50 text-zinc-400 hover:text-rose-400 hover:border-rose-500/50 hover:bg-rose-500/5 transition-all duration-300 hover:scale-110 shadow-2xl">
                            <Mail size={22} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="order-2 lg:order-1 reveal">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-[2px] w-8 bg-indigo-500"></div>
                        <span className="text-indigo-400 font-black uppercase tracking-widest text-xs">The Story</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-black mb-10 text-white tracking-tighter">I build things for <br/><span className="text-zinc-500">the modern web.</span></h2>
                    <div className="prose prose-invert text-zinc-400 text-lg leading-relaxed mb-10 font-medium">
                        <p className="whitespace-pre-wrap">{profile.about}</p>
                    </div>
                    <div className="flex items-center gap-4 text-zinc-300 bg-zinc-900/50 p-5 rounded-3xl border border-zinc-800/50 w-fit backdrop-blur-md shadow-2xl">
                        <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center border border-indigo-500/20">
                            <MapPin size={20} className="text-indigo-500" />
                        </div>
                        <span className="text-sm font-bold uppercase tracking-wide">Based in <span className="text-white">{profile.location}</span></span>
                    </div>
                </div>
                
                <div className="order-1 lg:order-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="bg-zinc-900/30 p-10 rounded-[2.5rem] border border-zinc-800/50 backdrop-blur-xl hover:border-indigo-500/30 transition-all group reveal delay-100 shadow-2xl">
                        <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-500 transition-all border border-indigo-500/20">
                             <Briefcase className="text-indigo-400 group-hover:text-white transition-colors" size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Experience</h3>
                        <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                          {profile.experience || "Building scalable applications and digital solutions for over 5 years."}
                        </p>
                    </div>
                    <div className="bg-zinc-900/30 p-10 rounded-[2.5rem] border border-zinc-800/50 backdrop-blur-xl hover:border-rose-500/30 transition-all group reveal delay-200 shadow-2xl">
                        <div className="w-16 h-16 bg-rose-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-rose-500 transition-all border border-rose-500/20">
                             <Sparkles className="text-rose-400 group-hover:text-white transition-colors" size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Vision</h3>
                        <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                          {profile.learning || "Constantly exploring new technologies, frameworks, and design patterns."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Skills Arsenal Section */}
      <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-zinc-900/30">
        <div className="reveal mb-20 text-center">
          <div className="inline-block p-2 px-4 bg-zinc-900 rounded-full border border-zinc-800 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-6">Expertise</div>
          <h2 className="text-5xl lg:text-7xl font-black text-white mb-6 tracking-tighter">Technical <span className="text-zinc-700">Arsenal.</span></h2>
          <p className="text-zinc-500 max-w-2xl mx-auto font-medium">The technologies and tools I use to bring ideas to life.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(groupedSkills).map(([category, items], idx) => (
            <div key={category} className={`reveal delay-${(idx + 1) * 100} group bg-zinc-900/20 border border-zinc-800/40 rounded-[2.5rem] p-10 backdrop-blur-md hover:bg-zinc-900/40 transition-all duration-500 shadow-2xl`}>
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-zinc-950 rounded-2xl border border-zinc-800 group-hover:scale-110 transition-transform shadow-xl">
                  {getCategoryIcon(category)}
                </div>
                <h3 className="text-xl font-black text-white uppercase tracking-wider">{category}</h3>
              </div>
              <div className="space-y-8">
                {items.map((skill) => (
                  <div key={skill.id} className="relative">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-bold text-zinc-400 group-hover:text-white transition-colors uppercase tracking-widest">{skill.name}</span>
                      <span className="text-[10px] font-black text-zinc-600 bg-zinc-950/80 px-2 py-0.5 rounded border border-zinc-800 uppercase tracking-tighter">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-900 shadow-inner">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ease-out delay-500 bg-gradient-to-r shadow-[0_0_10px_rgba(0,0,0,0.5)]
                          ${category === 'Frontend' ? 'from-indigo-600 to-indigo-400 shadow-indigo-500/20' : 
                            category === 'Backend' ? 'from-violet-600 to-violet-400 shadow-violet-500/20' : 
                            category === 'Design' ? 'from-rose-600 to-rose-400 shadow-rose-500/20' : 'from-emerald-600 to-emerald-400 shadow-emerald-500/20'}`}
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
        <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-zinc-900/30">
          <div className="flex flex-col sm:flex-row justify-between items-end mb-20 gap-8 reveal">
              <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-[2px] w-8 bg-cyan-500"></div>
                    <span className="text-cyan-400 font-black uppercase tracking-widest text-xs">Portfolio</span>
                  </div>
                  <h2 className="text-5xl lg:text-7xl font-black text-white mb-4 tracking-tighter">Featured <span className="text-zinc-700">Work.</span></h2>
                  <p className="text-zinc-500 font-medium">Selected projects from my archive.</p>
              </div>
              <Link to="/projects" className="group inline-flex items-center px-8 py-3 bg-zinc-900 border border-zinc-800 text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-white hover:text-black transition-all shadow-2xl">
                  View Repository <ArrowRight size={16} className="ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {featuredProjects.map((project, index) => (
                  <div key={project.id} className={`reveal delay-${(index + 1) * 100}`}>
                      <ProjectCard project={project} />
                  </div>
              ))}
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-32 relative">
         <div className="max-w-5xl mx-auto px-4">
             <div className="bg-zinc-900/40 backdrop-blur-3xl p-10 md:p-20 rounded-[3rem] border border-zinc-800/50 shadow-[0_50px_100px_rgba(0,0,0,0.5)] reveal overflow-hidden relative">
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] -z-10"></div>
                
                <div className="text-center mb-16">
                    <div className="inline-block p-2 px-4 bg-zinc-950 rounded-full border border-zinc-800 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-6">Connect</div>
                    <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">Let's <span className="text-indigo-400">Collaborate.</span></h2>
                    <p className="text-zinc-400 max-w-xl mx-auto font-medium leading-relaxed text-lg">Have a vision? I have the tools to make it real. Drop me a line and let's discuss your next project.</p>
                </div>

                {submitStatus === 'success' ? (
                    <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-[2rem] p-12 text-center animate-fade-in shadow-2xl backdrop-blur-xl">
                        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl border border-emerald-500/30">
                            <CheckCircle2 className="text-emerald-500" size={40} />
                        </div>
                        <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Mission Sent!</h3>
                        <p className="text-zinc-400 font-medium max-w-sm mx-auto">Thanks for reaching out. I'll transmit a response shortly.</p>
                    </div>
                ) : (
                    <form onSubmit={handleEnquirySubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="group">
                                <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-3 ml-2">Name</label>
                                <input 
                                    type="text" 
                                    required
                                    value={formState.name}
                                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                                    className="w-full bg-zinc-950/50 border border-zinc-800/80 rounded-2xl px-6 py-4 text-white font-medium focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder-zinc-700"
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div className="group">
                                <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-3 ml-2">Email</label>
                                <input 
                                    type="email" 
                                    required
                                    value={formState.email}
                                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                                    className="w-full bg-zinc-950/50 border border-zinc-800/80 rounded-2xl px-6 py-4 text-white font-medium focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all placeholder-zinc-700"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-3 ml-2">Message</label>
                            <textarea 
                                rows={5}
                                required
                                value={formState.message}
                                onChange={(e) => setFormState({...formState, message: e.target.value})}
                                className="w-full bg-zinc-950/50 border border-zinc-800/80 rounded-3xl px-6 py-5 text-white font-medium focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all placeholder-zinc-700 resize-none"
                                placeholder="Tell me about your project..."
                            />
                        </div>
                        
                        <div className="flex flex-col md:flex-row items-center justify-between pt-6 gap-6">
                             <div className="flex items-center gap-3 text-zinc-500 text-xs font-bold uppercase tracking-widest group">
                                <Globe size={16} className="group-hover:text-indigo-400 transition-colors" />
                                <span>Direct: <a href={`mailto:${profile.email}`} className="text-zinc-300 hover:text-white hover:underline transition-all decoration-indigo-500/50">{profile.email}</a></span>
                             </div>
                             <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full md:w-auto inline-flex items-center justify-center px-12 py-5 bg-white text-black text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-indigo-600 hover:text-white transition-all shadow-[0_20px_40px_rgba(255,255,255,0.05)] disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
                            >
                                {isSubmitting ? 'Transmitting...' : <>Initialize Connection <Send size={16} className="ml-3" /></>}
                            </button>
                        </div>
                        {submitStatus === 'error' && (
                            <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest text-center animate-pulse">Encryption Error. Please retry.</p>
                        )}
                    </form>
                )}
             </div>
         </div>
      </section>
    </div>
  );
};

export default Home;