import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

const ProjectCard = ({ project }) => {
  // Helper to ensure URLs are absolute (add https:// if missing)
  const formatUrl = (url) => {
    if (!url) return null;
    return url.match(/^(http|https):\/\//) ? url : `https://${url}`;
  };

  const demoUrl = formatUrl(project.demoLink);
  const repoUrl = formatUrl(project.repoLink);

  return (
    <div className="group bg-zinc-900/50 backdrop-blur-sm rounded-2xl shadow-lg border border-zinc-800 overflow-hidden hover:border-indigo-500/50 hover:shadow-indigo-500/20 hover:-translate-y-2 transition-all duration-300 flex flex-col h-full">
      <div className="relative h-56 overflow-hidden bg-zinc-800">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/20 to-transparent opacity-60 pointer-events-none"></div>
        <div className="absolute top-3 right-3 bg-zinc-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-indigo-300 border border-zinc-800 pointer-events-none shadow-xl">
          {project.category}
        </div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
            {project.title}
        </h3>
        <p className="text-zinc-400 mb-5 line-clamp-3 text-sm flex-grow leading-relaxed">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech) => (
            <span 
              key={tech} 
              className="px-2.5 py-1 bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs rounded-md font-medium group-hover:border-indigo-500/30 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-auto">
          {demoUrl && (
            <a 
              href={demoUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg transition-all shadow-lg shadow-indigo-600/20"
            >
              <ExternalLink size={16} /> Demo
            </a>
          )}
          {repoUrl && (
            <a 
              href={repoUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors px-2 py-2"
            >
              <Github size={18} /> Source
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;