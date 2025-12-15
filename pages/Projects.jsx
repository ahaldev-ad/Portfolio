import React, { useState } from 'react';
import ProjectCard from '../components/ProjectCard';

const Projects = ({ data }) => {
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', ...Array.from(new Set(data.projects.map(p => p.category)))];

  const filteredProjects = filter === 'All' 
    ? data.projects 
    : data.projects.filter(p => p.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
      <div className="text-center mb-16 reveal">
        <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 drop-shadow-sm">
          My Projects
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
          A showcase of my technical projects, experiments, and production applications.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-16 reveal delay-100">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
              filter === cat
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-105'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white hover:border-zinc-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div key={project.id} className={`reveal delay-${Math.min((index % 3) * 100, 300)}`}>
               <ProjectCard project={project} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-zinc-500 reveal border border-dashed border-zinc-800 rounded-xl bg-zinc-900/30">
          No projects found in this category.
        </div>
      )}
    </div>
  );
};

export default Projects;