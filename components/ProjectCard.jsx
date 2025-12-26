import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

const ProjectCard = ({ project }) => {
  // Helper to ensure URLs are absolute
  const formatUrl = (url) => {
    if (!url) return null;
    return url.match(/^(http|https):\/\//) ? url : `https://${url}`;
  };

  const demoUrl = formatUrl(project.demoLink);
  const repoUrl = formatUrl(project.repoLink);

  const getCategoryStyles = (category) => {
    switch(category) {
      case 'Web': return {
        badge: 'text-indigo-300 bg-indigo-950/80 border-indigo-500/30',
        hover: 'hover:border-indigo-500/50 hover:shadow-indigo-500/10',
        gradient: 'from-indigo-600/20',
        accent: 'text-indigo-400'
      };
      case 'Mobile': return {
        badge: 'text-cyan-300 bg-cyan-950/80 border-cyan-500/30',
        hover: 'hover:border-cyan-500/50 hover:shadow-cyan-500/10',
        gradient: 'from-cyan-600/20',
        accent: 'text-cyan-400'
      };
      case 'Design': return {
        badge: 'text-rose-300 bg-rose-950/80 border-rose-500/30',
        hover: 'hover:border-rose-500/50 hover:shadow-rose-500/10',
        gradient: 'from-rose-600/20',
        accent: 'text-rose-400'
      };
      default: return {
        badge: 'text-emerald-300 bg-emerald-950/80 border-emerald-500/30',
        hover: 'hover:border-emerald-500/50 hover:shadow-emerald-500/10',
        gradient: 'from-emerald-600/20',
        accent: 'text-emerald-400'
      };
    }
  };

  const styles = getCategoryStyles(project.category);

  return (
    <div className={`group bg-zinc-900/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-zinc-800/50 overflow-hidden transition-all duration-500 flex flex-col h-full ${styles.hover}`}>
      <div className="relative h-60 overflow-hidden bg-zinc-800">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        
        <div className={`absolute inset-0 bg-gradient-to-t ${styles.gradient} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
        
        <div className={`absolute top-4 right-4 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-2xl pointer-events-none z-10 transition-all group-hover:scale-110 ${styles.badge}`}>
          {project.category}
        </div>
      </div>
      
      <div className="p-8 flex-grow flex flex-col relative">
        <div className="flex justify-between items-start mb-3">
            <h3 className={`text-2xl font-bold text-white transition-colors duration-300 ${styles.accent.replace('text-', 'group-hover:text-')}`}>
                {project.title}
            </h3>
        </div>
        
        <p className="text-zinc-400 mb-6 line-clamp-3 text-sm flex-grow leading-relaxed font-medium">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {project.technologies.map((tech) => (
            <span 
              key={tech} 
              className="px-3 py-1 bg-zinc-950/50 border border-zinc-800/50 text-zinc-500 text-[10px] rounded-full font-bold uppercase tracking-wider group-hover:border-zinc-700 transition-colors"
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
              className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white bg-zinc-950 hover:bg-white hover:text-black border border-zinc-800 px-5 py-2.5 rounded-xl transition-all shadow-xl`}
            >
              <ExternalLink size={14} /> Preview
            </a>
          )}
          {repoUrl && (
            <a 
              href={repoUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors px-2 py-2"
            >
              <Github size={16} /> Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;