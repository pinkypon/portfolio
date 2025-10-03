import React from "react";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-zinc-300/70 dark:border-white/20">
      <div className="mx-auto px-8 py-8 max-w-7xl">
        <div className="md:flex-row justify-between items-center flex flex-col gap-4">
          <p className="text-sm text-gray-700/80 dark:text-neutral-300/80">© 2024 Portfolio. All rights reserved.</p>
          <div className="flex gap-6">
            <button type="button" className="hover:underline dark:text-neutral-300 text-sm">Twitter</button>
            <button type="button" className="hover:underline dark:text-neutral-300 text-sm">LinkedIn</button>
            <button type="button" className="hover:underline dark:text-neutral-300 text-sm">GitHub</button>
            <button type="button" className="hover:underline dark:text-neutral-300 text-sm">Dribbble</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;