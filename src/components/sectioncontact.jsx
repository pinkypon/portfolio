import React from "react";

const SectionContact = () => {
  return (
    <section className="py-16" id="contact">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <p className="text-3xl font-bold lg:text-4xl">Let's Work Together</p>
          <p className="text-gray-700/80 mx-auto dark:text-neutral-300/80 max-w-2xl">Ready to bring your ideas to life? Let's discuss your next project and create something amazing together.</p>
        </div>
        <div className="sm:flex-row justify-center flex flex-col gap-4">
          <button type="button" className="inline-flex border border-transparent transition-colors hover:bg-neutral-700 dark:hover:bg-neutral-600 items-center justify-center rounded-md bg-neutral-900 px-8 py-3 font-medium text-neutral-100 dark:bg-neutral-800">Get In Touch</button>
          <button type="button" className="inline-flex border border-zinc-300/70 dark:border-white/20 transition-colors hover:bg-black/5 dark:hover:bg-white/10 items-center justify-center rounded-md bg-white/70 dark:bg-white/10 px-8 py-3 font-medium">Download Resume</button>
        </div>
      </div>
    </section>
  );
};

export default SectionContact;