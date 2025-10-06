import React, { useState, useEffect } from "react";
import {
  ExternalLink,
  Github,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Linkedin,
  Globe,
} from "lucide-react";
import ShinyText from "../components/ShinyText";
import StarBorder from "../components/star-border";
import { Link, useNavigate } from "react-router-dom";

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

export default function SingleProjectPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // Single project data
  const project = {
    id: 1,
    title: "ChatAI",
    description: "AI chat assistant.",
    dateDeployed: "July 15, 2025",
    images: [
      "/chatai/1.webp",
      "/chatai/2.webp",
      "/chatai/3.webp",
      "/chatai/4.webp",
      "/chatai/5.webp",
    ],
    stack: [
      "Laravel",
      "Alphine.JS",
      "Vite",
      "TablePlus",
      "TailwindCSS",
      "Render",
      "DeepSeek",
      "Blade",
      "Google OAuth",
      "Herd",
      "MVC",
      "Github",
    ],
    details: [
      "Full-stack ChatGPT-style web app with real-time AI chat.",
      "Conversation management: create, save, delete.",
      "MVC architecture for clean, scalable code.",
      "Secure authentication: Google login, email verification, guest mode.",
      "Access control and error handling for reliable AI interaction.",
    ],
    liveUrl: "https://chat-ai-uify.onrender.com/",
    githubUrl: "https://github.com/pinkypon/chat-ai",
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + project.images.length) % project.images.length
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 px-2 py-1 bg-black/40 backdrop-blur-md rounded-lg text-gray-300 hover:text-white"
        >
          <ArrowLeft size={10} />
          <span className="text-xs">Back</span>
        </button>
      </div>

      {/* Project Content */}
      <section className="min-h-screen py-15 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Project Header */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h2 className="text-2xl font-bold text-white">
                <ShinyText
                  text={project.title}
                  disabled={false}
                  speed={5}
                  className="custom-class"
                />
              </h2>

              <StarBorder
                as="div"
                color="purple"
                speed="5s"
                innerClassName="py-2 px-2"
              >
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-400">Deployed</span>
                </div>
              </StarBorder>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-xs">
                {project.description}
              </span>
              <span className="text-gray-400 text-xs">
                {project.dateDeployed}
              </span>
            </div>
          </div>
          {/* Image Gallery */}
          <div className="mb-16">
            <div className="relative group">
              <div className="relative overflow-hidden rounded-md">
                <img
                  src={project.images[currentImageIndex]}
                  alt={`${project.title} - Screenshot ${currentImageIndex + 1}`}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-40" />
              </div>

              {project.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/90 text-white p-1 rounded-full transition-all duration-300"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/90 text-white p-1 rounded-full transition-all duration-300"
                  >
                    <ChevronRight size={16} />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {project.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          idx === currentImageIndex
                            ? "bg-white w-8"
                            : "bg-white/50 hover:bg-white/75"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Project Details Grid */}
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Left Column - Tech Stack */}
            <div className="order-2 md:order-1">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-3 mb-8">
                {project.stack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-4 py-1 bg-gray-900 rounded-lg text-xs text-blue-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Links
              </h3>
              <div className="flex gap-3">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition-all duration-300 text-xs font-medium"
                >
                  <ExternalLink size={16} />
                  Live Demo
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-gray-700 rounded-md hover:border-gray-500 hover:bg-gray-900/50 transition-all duration-300 text-xs font-medium"
                >
                  <Github size={16} />
                  Source Code
                </a>
              </div>
            </div>

            {/* Right Column - Key Features */}
            <div className="order-1 md:order-2">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Key Features
              </h3>
              <ul className="space-y-4">
                {project.details.map((detail, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-gray-300 text-sm"
                  >
                    <span className="text-white text-xl">▹</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 sm:py-10 border-t border-gray-800 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Mobile: Stacked but compact */}
          <div className="flex flex-col gap-3 sm:hidden relative z-10">
            {/* Logo */}
            <div className="flex items-center justify-center gap-1">
              <img
                src="../logo.webp"
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
                href="/"
                className="text-gray-400 hover:text-white transition-colors duration-300 text-xs"
              >
                Home
              </a>
              <a
                href="/#about"
                className="text-gray-400 hover:text-white transition-colors duration-300 text-xs"
              >
                About
              </a>
              <a
                href="/#projects"
                className="text-gray-400 hover:text-white transition-colors duration-300 text-xs"
              >
                Projects
              </a>
              <a
                href="/#contact"
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
                src="../logo.webp"
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

            <nav className="flex gap-6">
              <a
                href="/"
                className="text-gray-400 hover:text-white transition-colors duration-300 text-xs"
              >
                Home
              </a>
              <a
                href="/#about"
                className="text-gray-400 hover:text-white transition-colors duration-300 text-xs"
              >
                About
              </a>
              <a
                href="/#projects"
                className="text-gray-400 hover:text-white transition-colors duration-300 text-xs"
              >
                Projects
              </a>
              <a
                href="/#contact"
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
    </div>
  );
}
