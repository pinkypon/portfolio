import React from "react";

const Header = () => {
  return (
    <header className="mx-auto items-center justify-between px-8 pt-10 text-sm relative z-10 flex max-w-7xl">
      <p className="font-bold tracking-wide text-xl">Portfolio</p>
      <nav className="lg:flex items-center hidden gap-8">
        <a
          href="/bstW86ZTQvl5LipWZici#about"
          className="hover:underline dark:text-neutral-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          About
        </a>
        <a
          href="/bstW86ZTQvl5LipWZici#projects"
          className="hover:underline dark:text-neutral-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          Projects
        </a>
        <a
          href="/bstW86ZTQvl5LipWZici#skills"
          className="hover:underline dark:text-neutral-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          Skills
        </a>
        <a
          href="/bstW86ZTQvl5LipWZici#contact"
          className="hover:underline dark:text-neutral-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          Contact
        </a>
      </nav>
      <div className="lg:flex items-center hidden gap-4">
        <button
          type="button"
          className="inline-flex border border-transparent transition-colors hover:bg-neutral-700 dark:hover:bg-neutral-600 items-center justify-center rounded-md bg-neutral-900 px-4 py-2 font-medium text-neutral-100 dark:bg-neutral-800"
        >
          Hire Me
        </button>
      </div>
      <button type="button" className="relative z-20 lg:hidden">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" id="Windframe_eTk8ck2Pb"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /> </svg>
      </button>
    </header>
  );
};

export default Header;