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
      
      {/* Attractive Hero Section */}
      <section className="min-h-[90vh] flex items-center justify-center relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full py-20 md:py-0 overflow-hidden">
        {/* Visual Spotlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08)_0%,transparent_70%)] pointer-events-none"></div>

        <div className="flex flex-col items-center text-center gap-8 lg:gap-10 w-full relative z-10">
            <div className="reveal">
                <span className="inline-flex items-center gap-2 py-2 px-6 rounded-full bg-indigo-500/5 border border-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8 backdrop-blur-md shadow-2xl animate-pulse">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                    Digital Craftsman • Available for Hire
                </span>
                
                <h1 className="text-6xl sm:text-8xl lg:text-[10rem] font-black tracking-tighter text-white mb-6 leading-[0.85] select-none">
                  {profile.name}
                  <span className="block text-3xl sm:text-5xl lg:text-7xl mt-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-violet-400 via-emerald-400 to-cyan-400 font-black pb-2 tracking-tight">
                    {profile.title}
                  </span>
                </h1>
                
                <p className="text-lg sm:text-2xl text-zinc-400 mb-12 max-w-3xl mx-auto leading-relaxed reveal delay-100 font-medium tracking-tight">
                  {profile.tagline}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center reveal delay-200">
                  <Link
                    to="/projects"
                    className="group inline-flex items-center justify-center px-10 py-4.5 bg-white text-black text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-indigo-500 hover:text-white transition-all shadow-xl shadow-white/5 transform hover:-translate-y-1 active:scale-95"
                  >
                    View Repository <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                  </Link>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center px-10 py-4.5 border border-zinc-800 text-xs font-black uppercase tracking-[0.2em] rounded-2xl text-zinc-300 bg-zinc-950/50 hover:bg-zinc-900 hover:text-white transition-all backdrop-blur-sm hover:border-zinc-500 active:scale-95 shadow-2xl"
                  >
                    Get in Touch <Mail className="ml-2" size={18} />
                  </a>
                </div>

                <div className="mt-16 flex flex-col items-center gap-6 reveal delay-300">
                    <div className="flex gap-4">
                        {[
                            { icon: <Github size={22} />, link: profile.github, color: 'hover:text-white hover:bg-zinc-800' },
                            { icon: <Linkedin size={22} />, link: profile.linkedin, color: 'hover:text-blue-400 hover:bg-blue-500/10' },
                            { icon: <Mail size={22} />, link: `mailto:${profile.email}`, color: 'hover:text-emerald-400 hover:bg-emerald-500/10' }
                        ].map((social, i) => (
                            <a 
                                key={i}
                                href={social.link} 
                                target="_blank" 
                                rel="noreferrer" 
                                className={`p-4 bg-zinc-900/40 rounded-2xl border border-zinc-800/50 text-zinc-500 transition-all duration-300 hover:scale-110 shadow-2xl backdrop-blur-md animate-float ${social.color}`}
                                style={{ animationDelay: `${i * 0.2}s` }}
                            >
                                {social.icon}
                            </a>
                        ))}
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
                        <span className="text-indigo-400 font-black uppercase tracking-widest text-xs">The Background</span>
                    </div>
                    <h2 className="text-5xl lg:text-6xl font-black mb-10 text-white tracking-tighter">I engineer systems for <br/><span className="text-zinc-500">the modern web.</span></h2>
                    <div className="prose prose-invert text-zinc-400 text-xl leading-relaxed mb-10 font-medium tracking-tight">
                        <p className="whitespace-pre-wrap">{profile.about}</p>
                    </div>
                    <div className="flex items-center gap-4 text-zinc-300 bg-zinc-900/50 p-5 rounded-3xl border border-zinc-800/50 w-fit backdrop-blur-md shadow-2xl">
                        <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center border border-indigo-500/20">
                            <MapPin size={20} className="text-indigo-500" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-[0.2em]">Based in <span className="text-white">{profile.location}</span></span>
                    </div>
                </div>
                
                {/* Mobile and Desktop boxes - Updated Vision color and mobile layout */}
                <div className="order-1 lg:order-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
                    <div className="bg-zinc-900/40 p-8 sm:p-10 rounded-[2.5rem] border border-zinc-800/50 backdrop-blur-xl hover:border-indigo-500/40 transition-all group reveal delay-100 shadow-2xl relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/5 blur-3xl group-hover:bg-indigo-500/10 transition-colors"></div>
                        <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-500 transition-all border border-indigo-500/20 shadow-xl shadow-indigo-500/10">
                             <Briefcase className="text-indigo-400 group-hover:text-white transition-colors" size={28} />
                        </div>
                        <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">Experience</h3>
                        <p className="text-zinc-500 text-sm leading-relaxed font-bold tracking-tight">
                          {profile.experience || "Building scalable applications and digital solutions for over 5 years."}
                        </p>
                    </div>
                    <div className="bg-zinc-900/40 p-8 sm:p-10 rounded-[2.5rem] border border-zinc-800/50 backdrop-blur-xl hover:border-emerald-500/40 transition-all group reveal delay-200 shadow-2xl relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/5 blur-3xl group-hover:bg-emerald-500/10 transition-colors"></div>
                        <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-500 transition-all border border-emerald-500/20 shadow-xl shadow-emerald-500/10">
                             <Sparkles className="text-emerald-400 group-hover:text-white transition-colors" size={28} />
                        </div>
                        <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">Vision</h3>
                        <p className="text-zinc-500 text-sm leading-relaxed font-bold tracking-tight">
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
          <div className="inline-block p-2 px-5 bg-zinc-900 rounded-full border border-zinc-800 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-6 backdrop-blur-sm">Expertise</div>
          <h2 className="text-6xl lg:text-8xl font-black text-white mb-6 tracking-tighter leading-none">Technical <span className="text-zinc-700">Arsenal.</span></h2>
          <p className="text-zinc-500 max-w-2xl mx-auto font-bold tracking-tight">The technologies and tools I use to bring ideas to life.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(groupedSkills).map(([category, items], idx) => (
            <div key={category} className={`reveal delay-${(idx + 1) * 100} group bg-zinc-900/20 border border-zinc-800/40 rounded-[2.5rem] p-10 backdrop-blur-md hover:bg-zinc-900/40 transition-all duration-500 shadow-2xl`}>
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-zinc-950 rounded-2xl border border-zinc-800 group-hover:scale-110 transition-transform shadow-xl">
                  {getCategoryIcon(category)}
                </div>
                <h3 className="text-xl font-black text-white uppercase tracking-[0.1em]">{category}</h3>
              </div>
              <div className="space-y-8">
                {items.map((skill) => (
                  <div key={skill.id} className="relative">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-black text-zinc-400 group-hover:text-white transition-colors uppercase tracking-[0.15em]">{skill.name}</span>
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
                    <span className="text-cyan-400 font-black uppercase tracking-widest text-xs">Repository</span>
                  </div>
                  <h2 className="text-6xl lg:text-8xl font-black text-white mb-4 tracking-tighter leading-none">Featured <span className="text-zinc-700">Work.</span></h2>
                  <p className="text-zinc-500 font-bold tracking-tight">Handpicked selection of production systems.</p>
              </div>
              <Link to="/projects" className="group inline-flex items-center px-10 py-4 bg-zinc-900 border border-zinc-800 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-white hover:text-black transition-all shadow-2xl">
                  Explore Gallery <ArrowRight size={16} className="ml-3 group-hover:translate-x-1 transition-transform" />
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
                <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 blur-[100px] -z-10"></div>
                
                <div className="text-center mb-16">
                    <div className="inline-block p-2 px-5 bg-zinc-950 rounded-full border border-zinc-800 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-6 backdrop-blur-sm">Connect</div>
                    <h2 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter">Let's <span className="text-indigo-400">Initialize.</span></h2>
                    <p className="text-zinc-400 max-w-xl mx-auto font-bold leading-relaxed text-xl tracking-tight">Have a challenge? I have the tools to solve it. Drop me a line and let's discuss your vision.</p>
                </div>

                {submitStatus === 'success' ? (
                    <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-[2rem] p-12 text-center animate-fade-in shadow-2xl backdrop-blur-xl">
                        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl border border-emerald-500/30">
                            <CheckCircle2 className="text-emerald-500" size={40} />
                        </div>
                        <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Connection Established!</h3>
                        <p className="text-zinc-400 font-bold max-w-sm mx-auto tracking-tight">Transmission received. I'll reach out shortly to discuss the details.</p>
                    </div>
                ) : (
                    <form onSubmit={handleEnquirySubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="group">
                                <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-3 ml-2">Identified As</label>
                                <input 
                                    type="text" 
                                    required
                                    value={formState.name}
                                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                                    className="w-full bg-zinc-950/50 border border-zinc-800/80 rounded-2xl px-6 py-4.5 text-white font-bold focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder-zinc-700"
                                    placeholder="Full Name"
                                />
                            </div>
                            <div className="group">
                                <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-3 ml-2">Secure Email</label>
                                <input 
                                    type="email" 
                                    required
                                    value={formState.email}
                                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                                    className="w-full bg-zinc-950/50 border border-zinc-800/80 rounded-2xl px-6 py-4.5 text-white font-bold focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all placeholder-zinc-700"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-3 ml-2">Brief Transmission</label>
                            <textarea 
                                rows={5}
                                required
                                value={formState.message}
                                onChange={(e) => setFormState({...formState, message: e.target.value})}
                                className="w-full bg-zinc-950/50 border border-zinc-800/80 rounded-3xl px-6 py-5.5 text-white font-bold focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder-zinc-700 resize-none leading-relaxed"
                                placeholder="Tell me about your project or objective..."
                            />
                        </div>
                        
                        <div className="flex flex-col md:flex-row items-center justify-between pt-6 gap-6">
                             <div className="flex items-center gap-3 text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] group">
                                <Globe size={16} className="group-hover:text-indigo-400 transition-colors" />
                                <span>Direct Node: <a href={`mailto:${profile.email}`} className="text-zinc-300 hover:text-white hover:underline transition-all decoration-indigo-500/50">{profile.email}</a></span>
                             </div>
                             <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full md:w-auto inline-flex items-center justify-center px-12 py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-indigo-600 hover:text-white transition-all shadow-[0_20px_40px_rgba(255,255,255,0.05)] disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95 shadow-xl"
                            >
                                {isSubmitting ? 'Transmitting Data...' : <>Launch Project <Send size={16} className="ml-3" /></>}
                            </button>
                        </div>
                        {submitStatus === 'error' && (
                            <p className="text-rose-500 text-[10px] font-black uppercase tracking-[0.3em] text-center animate-pulse">Encryption Error. Link failure detected.</p>
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