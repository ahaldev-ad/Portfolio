import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-zinc-100 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden bg-zinc-200">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-zinc-700 shadow-sm">
          {project.category}
        </div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-zinc-900 mb-2">{project.title}</h3>
        <p className="text-zinc-600 mb-4 line-clamp-3 text-sm flex-grow">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech) => (
            <span 
              key={tech} 
              className="px-2 py-1 bg-zinc-100 text-zinc-600 text-xs rounded-md font-medium"
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
              className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              <ExternalLink size={16} /> Live Demo
            </a>
          )}
          {project.repoLink && (
            <a 
              href={project.repoLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
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