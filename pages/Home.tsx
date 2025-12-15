import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Mail, MapPin } from 'lucide-react';
import { AppData } from '../types';
import ProjectCard from '../components/ProjectCard';

interface HomeProps {
  data: AppData;
}

const Home: React.FC<HomeProps> = ({ data }) => {
  const { profile, skills, projects } = data;
  const featuredProjects = projects.slice(0, 2);

  return (
    <div className="flex flex-col gap-24 pb-24">
      
      {/* Hero Section */}
      <section className="relative pt-20 lg:pt-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-block px-3 py-1 mb-4 text-sm font-semibold tracking-wider text-indigo-600 uppercase bg-indigo-50 rounded-full">
              Available for hire
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 mb-6">
              Hi, I'm {profile.name}. <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                {profile.title}
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-zinc-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {profile.tagline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/projects"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
              >
                View My Work <ArrowRight className="ml-2" size={18} />
              </Link>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center justify-center px-6 py-3 border border-zinc-200 text-base font-medium rounded-lg text-zinc-700 bg-white hover:bg-zinc-50 hover:border-zinc-300 transition-all"
              >
                Contact Me <Mail className="ml-2" size={18} />
              </a>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[400px] lg:h-[400px] mx-auto">
              <div className="absolute inset-0 bg-indigo-600 rounded-[2rem] rotate-6 opacity-10"></div>
              <img
                src={profile.heroImage}
                alt={profile.name}
                className="absolute inset-0 w-full h-full object-cover rounded-[2rem] shadow-2xl border-4 border-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About & Skills Section */}
      <section className="bg-white py-20 border-y border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* About */}
            <div>
              <h2 className="text-3xl font-bold text-zinc-900 mb-6">About Me</h2>
              <div className="prose prose-zinc text-zinc-600 leading-relaxed mb-8">
                <p className="whitespace-pre-wrap">{profile.about}</p>
              </div>
              <div className="flex items-center gap-2 text-zinc-500 mb-8">
                <MapPin size={18} />
                <span>{profile.location}</span>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-3xl font-bold text-zinc-900 mb-8">Skills & Expertise</h2>
              <div className="space-y-6">
                {skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-zinc-700">{skill.name}</span>
                      <span className="text-xs font-medium text-zinc-500">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-zinc-100 rounded-full h-2.5">
                      <div
                        className="bg-indigo-600 h-2.5 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-10 flex flex-wrap gap-2">
                 <h3 className="w-full text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-2">Tech Stack</h3>
                 {skills.map(s => (
                    <span key={s.id + '_badge'} className="px-3 py-1 bg-zinc-50 border border-zinc-200 rounded-full text-xs font-medium text-zinc-600">
                        {s.name}
                    </span>
                 ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
            <div>
                <h2 className="text-3xl font-bold text-zinc-900 mb-2">Featured Projects</h2>
                <p className="text-zinc-500">A selection of my recent work.</p>
            </div>
            <Link to="/projects" className="hidden sm:flex items-center font-medium text-indigo-600 hover:text-indigo-700">
                View All <ArrowRight size={16} className="ml-1" />
            </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
        
        <div className="mt-8 text-center sm:hidden">
             <Link to="/projects" className="inline-flex items-center font-medium text-indigo-600 hover:text-indigo-700">
                View All Projects <ArrowRight size={16} className="ml-1" />
            </Link>
        </div>
      </section>

      {/* Simple Contact CTA */}
      <section className="bg-zinc-900 text-white py-20">
         <div className="max-w-4xl mx-auto px-4 text-center">
             <h2 className="text-3xl md:text-4xl font-bold mb-6">Interested in working together?</h2>
             <p className="text-zinc-400 text-lg mb-8">
                 I'm currently open to new opportunities and freelance projects. Let's discuss how I can help you achieve your goals.
             </p>
             <a href={`mailto:${profile.email}`} className="inline-block bg-white text-zinc-900 px-8 py-3 rounded-lg font-bold hover:bg-zinc-100 transition-colors">
                 Get in Touch
             </a>
         </div>
      </section>
    </div>
  );
};

export default Home;