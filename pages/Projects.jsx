import React, { useState } from 'react';
import ProjectCard from '../components/ProjectCard';

const Projects = ({ data }) => {
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', ...Array.from(new Set(data.projects.map(p => p.category)))];

  const filteredProjects = filter === 'All' 
    ? data.projects 
    : data.projects.filter(p => p.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div className="text-center mb-16 reveal">
        <h1 className="text-4xl font-bold text-zinc-900 font-sans mb-4 text-white">My Projects</h1>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          A showcase of my technical projects, experiments, and production applications.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-12 reveal delay-100">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === cat
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white'
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
        <div className="text-center py-20 text-zinc-500 reveal">
          No projects found in this category.
        </div>
      )}
    </div>
  );
};

export default Projects;