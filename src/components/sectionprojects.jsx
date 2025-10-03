'use client';
import React from "react";
import ProjectCard from "@/ProjectCard";

const SectionProjects = () => {
  return (
    <section className="py-16" id="projects">
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <p className="text-3xl font-bold lg:text-4xl">Featured Projects</p>
          <p className="text-gray-700/80 mx-auto dark:text-neutral-300/80 max-w-2xl">A collection of my recent web development projects showcasing various technologies and design approaches.</p>
        </div>
        <div className="lg:grid-cols-2 grid gap-8">
          <ProjectCard 
            title="E-Commerce Platform" 
            description="Full-stack e-commerce solution with React, Node.js, and Stripe integration. Features include user authentication, product catalog, and payment processing."
            techStack={["React", "Node.js", "MongoDB", "Stripe"]}
            imageAlt="E-Commerce Platform"
            imageUrl="https://placehold.co/600x400/333/fff?text=E-Commerce+App"
          />
          <ProjectCard 
            title="Task Management App" 
            description="Collaborative task management tool with real-time updates, drag-and-drop functionality, and team collaboration features."
            techStack={["Vue.js", "Firebase", "Tailwind CSS"]}
            imageAlt="Task Management App"
            imageUrl="https://placehold.co/600x400/333/fff?text=Task+Manager"
          />
          <ProjectCard 
            title="Creative Portfolio Site" 
            description="Responsive portfolio website with smooth animations, dark mode support, and optimized performance built with Next.js."
            techStack={["Next.js", "TypeScript", "Framer Motion"]}
            imageAlt="Portfolio Website"
            imageUrl="https://placehold.co/600x400/333/fff?text=Portfolio+Site"
          />
          <ProjectCard 
            title="Weather Dashboard" 
            description="Interactive weather application with location search, 7-day forecast, and beautiful weather animations powered by OpenWeather API."
            techStack={["Angular", "RxJS", "Chart.js"]}
            imageAlt="Weather Dashboard"
            imageUrl="https://placehold.co/600x400/333/fff?text=Weather+App"
          />
          <ProjectCard 
            title="Social Media Platform" 
            description="Full-featured social platform with real-time messaging, image sharing, user profiles, and content discovery algorithms."
            techStack={["React Native", "GraphQL", "PostgreSQL"]}
            imageAlt="Social Media Platform"
            imageUrl="https://placehold.co/600x400/333/fff?text=Social+Platform"
          />
          <ProjectCard 
            title="Analytics Dashboard" 
            description="Comprehensive analytics dashboard with real-time data visualization, custom reporting, and advanced filtering capabilities."
            techStack={["Svelte", "D3.js", "Express.js"]}
            imageAlt="Analytics Dashboard"
            imageUrl="https://placehold.co/600x400/333/fff?text=Analytics+Dashboard"
          />
        </div>
      </div>
    </section>
  );
};

export default SectionProjects;