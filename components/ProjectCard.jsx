import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

const ProjectCard = ({ project }) => {
  return (
    <div className="group bg-zinc-900/50 backdrop-blur-sm rounded-2xl shadow-lg border border-zinc-800 overflow-hidden hover:border-indigo-500/50 hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden bg-zinc-800">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent opacity-60"></div>
        <div className="absolute top-3 right-3 bg-zinc-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-indigo-400 border border-zinc-800">
          {project.category}
        </div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">{project.title}</h3>
        <p className="text-zinc-400 mb-4 line-clamp-3 text-sm flex-grow leading-relaxed">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech) => (
            <span 
              key={tech} 
              className="px-2.5 py-1 bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs rounded-md font-medium"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-auto">
          {project.demoLink && (
            <a 
              href={project.demoLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <ExternalLink size={16} /> Live Demo
            </a>
          )}
          {project.repoLink && (
            <a 
              href={project.repoLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-white transition-colors"
            >
              <Github size={16} /> Source
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;