import React from "react";

const ProjectCard = ({ title, description, techStack, imageAlt, imageUrl }) => {
  return (
    <div className="bg-white/70 dark:bg-white/5 rounded-2xl border border-zinc-300/70 dark:border-white/20 p-6 space-y-4 hover:bg-white/90 dark:hover:bg-white/10 transition-colors">
      <div className="aspect-video bg-gradient-to-br rounded-xl from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800 overflow-hidden">
        <img alt={imageAlt} src={imageUrl} className="object-cover w-full h-full" />
      </div>
      <div className="space-y-3">
        <p className="text-xl font-semibold">{title}</p>
        <p className="text-gray-700/80 dark:text-neutral-300/80">{description}</p>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech, index) => (
            <span key={index} className="px-3 py-1 text-xs bg-neutral-200 dark:bg-neutral-700 rounded-full">{tech}</span>
          ))}
        </div>
        <div className="flex gap-3">
          <button type="button" className="hover:underline dark:text-neutral-300 text-sm">Live Demo</button>
          <button type="button" className="hover:underline dark:text-neutral-300 text-sm">GitHub</button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;