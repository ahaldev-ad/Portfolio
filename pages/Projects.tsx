import React, { useState } from 'react';
import { AppData, Project } from '../types';
import ProjectCard from '../components/ProjectCard';

interface ProjectsProps {
  data: AppData;
}

const Projects: React.FC<ProjectsProps> = ({ data }) => {
  const [filter, setFilter] = useState<string>('All');
  
  const categories = ['All', ...Array.from(new Set(data.projects.map(p => p.category)))];

  const filteredProjects = filter === 'All' 
    ? data.projects 
    : data.projects.filter(p => p.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">My Projects</h1>
        <p className="text-zinc-600 max-w-2xl mx-auto">
          A showcase of my technical projects, experiments, and production applications.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === cat
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-zinc-500">
          No projects found in this category.
        </div>
      )}
    </div>
  );
};

export default Projects;