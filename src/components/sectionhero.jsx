'use client';
import React from "react";

const SectionHero = () => {
  return (
    <section className="lg:py-24 py-16">
      <div className="text-center space-y-8">
        <div className="space-y-6">
          <div className="items-center justify-center px-3 py-1 rounded-full bg-white/70 text-sm dark:bg-white/10 inline-flex gap-2 border border-zinc-300/70 dark:border-white/20">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span className="text-gray-700 dark:text-neutral-300">Available for Work</span>
          </div>
          <p className="text-5xl font-bold leading-tight lg:text-7xl">Creative Web Developer</p>
          <p className="text-lg text-gray-700/80 mx-auto dark:text-neutral-300/80 max-w-2xl">I craft beautiful and functional web experiences that bring ideas to life. Specializing in modern technologies and user-centered design.</p>
        </div>
        <div className="justify-center flex">
          <button type="button" className="inline-flex border border-transparent transition-colors hover:bg-neutral-700 dark:hover:bg-neutral-600 items-center justify-center rounded-md bg-neutral-900 px-8 py-3 font-medium text-neutral-100 dark:bg-neutral-800">View My Work</button>
        </div>
      </div>
    </section>
  );
};

export default SectionHero;