import React from "react";
import { Github, Linkedin, Globe } from "lucide-react";
import ShinyText from "../ShinyText";

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/pinkypon",
    hoverColor: "hover:text-purple-400",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/jem-garcia/",
    hoverColor: "hover:text-blue-400",
  },
  {
    name: "Indeed",
    icon: Globe,
    url: "https://profile.indeed.com/?hl=en_PH&co=PH&from=gnav-homepage",
    hoverColor: "hover:text-cyan-400",
  },
];

const Footer: React.FC = () => {
  return (
    <footer className="py-6 sm:py-10 border-t border-gray-800 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Mobile: Stacked but compact */}
        <div className="flex flex-col gap-3 sm:hidden relative z-10">
          {/* Logo */}
          <div className="flex items-center justify-center gap-1">
            <img
              src="logo.webp"
              alt="Logo"
              className="w-4 h-4 object-contain"
            />
            <h2 className="text-sm font-bold text-white">
              <ShinyText
                text="Jem Garcia"
                disabled={false}
                speed={5}
                className="custom-class"
              />
            </h2>
          </div>

          {/* Nav */}
          <nav className="flex justify-center gap-4">
            <a
              href="#home"
              className="text-gray-400 hover:text-white transition-colors duration-300 text-xs"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-gray-400 hover:text-white transition-colors duration-300 text-xs"
            >
              About
            </a>
            <a
              href="#projects"
              className="text-gray-400 hover:text-white transition-colors duration-300 text-xs"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="text-gray-400 hover:text-white transition-colors duration-300 text-xs"
            >
              Contact
            </a>
          </nav>

          {/* Social + Copyright */}
          <div className="flex justify-center items-center gap-4">
            <div className="flex gap-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-400 ${link.hoverColor} transition-all duration-300 transform hover:scale-110`}
                    aria-label={link.name}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
            <span className="text-gray-600">|</span>
            <p className="text-gray-500 text-xs">
              © {new Date().getFullYear()}
            </p>
          </div>
        </div>

        {/* Desktop: Single line */}
        <div className="hidden sm:flex items-center justify-between relative z-10">
          <div className="flex items-center gap-1">
            <img
              src="logo.webp"
              alt="Jem Garcia Logo"
              className="w-4 h-4 object-contain"
            />
            <h2 className="text-sm font-bold text-white">
              <ShinyText
                text="Jem Garcia"
                disabled={false}
                speed={5}
                className="custom-class"
              />
            </h2>
          </div>

          <nav className="flex gap-6">
            <a
              href="#home"
              className="text-gray-400 hover:text-white transition-colors duration-300 text-xs"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-gray-400 hover:text-white transition-colors duration-300 text-xs"
            >
              About
            </a>
            <a
              href="#projects"
              className="text-gray-400 hover:text-white transition-colors duration-300 text-xs"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="text-gray-400 hover:text-white transition-colors duration-300 text-xs"
            >
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-6">
            <div className="flex gap-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-400 ${link.hoverColor} transition-all duration-300 transform hover:scale-110`}
                    aria-label={link.name}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
            <p className="text-gray-500 text-xs">
              © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
