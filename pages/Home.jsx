import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, MapPin, Briefcase, GraduationCap, Code2, Database, Layout, Terminal, Send, CheckCircle2 } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import { sendEnquiry } from '../services/storage';

const Home = ({ data }) => {
  const { profile, skills, projects } = data;
  const featuredProjects = projects.slice(0, 2);
  
  // Contact Form State
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

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
        case 'Frontend': return <Layout size={20} />;
        case 'Backend': return <Database size={20} />;
        case 'Tools': return <Terminal size={20} />;
        case 'Design': return <Code2 size={20} />;
        default: return <Code2 size={20} />;
    }
  };

  return (
    <div className="flex flex-col">
      
      {/* Full Screen Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col items-center text-center gap-8 lg:gap-12 w-full">
            <div className="animate-fade-in-up">
                <span className="inline-block py-1 px-3 rounded-full bg-indigo-900/30 border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-6 backdrop-blur-md">
                    Available for freelance work
                </span>
                <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight text-white mb-6">
                  {profile.name}
                  <span className="block text-3xl sm:text-4xl lg:text-5xl mt-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 font-extrabold pb-2">
                    {profile.title}
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                  {profile.tagline}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/projects"
                    className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transform hover:-translate-y-1"
                  >
                    View Projects <ArrowRight className="ml-2" size={20} />
                  </Link>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center px-8 py-4 border border-zinc-700 text-base font-bold rounded-xl text-zinc-300 bg-zinc-900/50 hover:bg-zinc-800 hover:text-white transition-all backdrop-blur-sm hover:border-zinc-500"
                  >
                    Contact Me <Mail className="ml-2" size={20} />
                  </a>
                </div>
            </div>
            
            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-zinc-600">
                <div className="w-6 h-10 border-2 border-zinc-600 rounded-full flex justify-center pt-2">
                    <div className="w-1 h-2 bg-zinc-600 rounded-full"></div>
                </div>
            </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-white">About Me</h2>
                    <div className="prose prose-invert text-zinc-400 text-lg leading-relaxed mb-8">
                        <p className="whitespace-pre-wrap">{profile.about}</p>
                    </div>
                    <div className="flex items-center gap-3 text-zinc-300 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800 w-fit">
                        <MapPin size={24} className="text-indigo-500" />
                        <span>Based in <span className="font-semibold text-white">{profile.location}</span></span>
                    </div>
                </div>
                
                <div className="order-1 lg:order-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-zinc-900/40 p-8 rounded-2xl border border-zinc-800/60 backdrop-blur-sm hover:border-indigo-500/50 transition-colors group">
                        <div className="w-12 h-12 bg-indigo-900/50 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                             <Briefcase className="text-indigo-400" size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Experience</h3>
                        <p className="text-zinc-500 text-sm">
                          {profile.experience || "Building scalable applications and digital solutions for over 5 years."}
                        </p>
                    </div>
                    <div className="bg-zinc-900/40 p-8 rounded-2xl border border-zinc-800/60 backdrop-blur-sm hover:border-violet-500/50 transition-colors group">
                        <div className="w-12 h-12 bg-violet-900/50 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                             <GraduationCap className="text-violet-400" size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Learning</h3>
                        <p className="text-zinc-500 text-sm">
                          {profile.learning || "Constantly exploring new technologies, frameworks, and design patterns."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Technical Arsenal</h2>
            <p className="text-zinc-500 max-w-2xl mx-auto">Tools and technologies I use to craft exceptional digital experiences.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.keys(groupedSkills).map((category) => (
                <div key={category} className="bg-zinc-900/40 backdrop-blur-md p-6 rounded-2xl border border-zinc-800 hover:border-indigo-500/30 hover:bg-zinc-900/60 transition-all group">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 bg-zinc-800 rounded-lg text-indigo-400 group-hover:text-white group-hover:bg-indigo-600 transition-colors">
                            {getCategoryIcon(category)}
                        </div>
                        <h3 className="font-bold text-lg text-white">{category}</h3>
                    </div>
                    <div className="space-y-4">
                        {groupedSkills[category].map(skill => (
                            <div key={skill.id}>
                                <div className="flex justify-between mb-1.5">
                                    <span className="text-sm font-medium text-zinc-300">{skill.name}</span>
                                    <span className="text-xs text-zinc-500">{skill.level}%</span>
                                </div>
                                <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                                    <div 
                                        className="bg-indigo-500 h-1.5 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" 
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
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-zinc-900/50">
        <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4">
            <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">Featured Work</h2>
                <p className="text-zinc-500">Highlights from my portfolio.</p>
            </div>
            <Link to="/projects" className="inline-flex items-center font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                View All Projects <ArrowRight size={16} className="ml-2" />
            </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
      </section>

      {/* Contact / Enquiry Section */}
      <section id="contact" className="py-24 bg-zinc-900/30 relative">
         <div className="max-w-4xl mx-auto px-4">
             <div className="bg-zinc-900/80 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-zinc-800 shadow-2xl">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-white mb-4">Let's Start a Project</h2>
                    <p className="text-zinc-400">Have an idea? I'd love to help you bring it to life. Send me a message!</p>
                </div>

                {submitStatus === 'success' ? (
                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-8 text-center animate-fade-in">
                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 className="text-green-500" size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                        <p className="text-zinc-400">Thanks for reaching out. I'll get back to you as soon as possible.</p>
                    </div>
                ) : (
                    <form onSubmit={handleEnquirySubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-2">Your Name</label>
                                <input 
                                    type="text" 
                                    required
                                    value={formState.name}
                                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                                    className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder-zinc-600"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-2">Email Address</label>
                                <input 
                                    type="email" 
                                    required
                                    value={formState.email}
                                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                                    className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder-zinc-600"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">Message</label>
                            <textarea 
                                rows={4}
                                required
                                value={formState.message}
                                onChange={(e) => setFormState({...formState, message: e.target.value})}
                                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder-zinc-600"
                                placeholder="Tell me about your project..."
                            />
                        </div>
                        
                        <div className="flex items-center justify-between pt-2">
                             <div className="text-zinc-500 text-sm">
                                or email directly at <a href={`mailto:${profile.email}`} className="text-indigo-400 hover:underline">{profile.email}</a>
                             </div>
                             <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="inline-flex items-center justify-center px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Sending...' : <>Send Message <Send size={18} className="ml-2" /></>}
                            </button>
                        </div>
                        {submitStatus === 'error' && (
                            <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>
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