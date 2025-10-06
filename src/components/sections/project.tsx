import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ShinyText from "../ShinyText";
import CardSwap, { Card } from "../card-swap";

const cardTexts = [
  {
    title: "Taskly",
    subtitle: (
      <Link
        to="projects/taskly"
        className="inline-flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-slate-400 hover:text-white transition-all duration-200 group"
      >
        <span className="pl-4 sm:pl-5">Click to see details</span>
        <svg
          className="w-3 h-3 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </Link>
    ),
  },
  {
    title: "ChatAI",
    subtitle: (
      <Link
        to="projects/chatai"
        className="inline-flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-slate-400 hover:text-white transition-all duration-200 group"
      >
        <span className="pl-4 sm:pl-5">Click to see details</span>
        <svg
          className="w-3 h-3 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </Link>
    ),
  },
];

const cardConfigs = {
  mobile: {
    wrapperClass:
      "block md:hidden relative w-full max-w-[280px] h-[420px] flex-shrink-0 mx-auto overflow-hidden",
    width: 270,
    height: 405,
    cardDistance: 20,
    verticalDistance: 25,
  },
  tablet: {
    wrapperClass:
      "hidden md:block lg:hidden relative w-full max-w-[400px] h-[500px] flex-shrink-0 mx-auto overflow-hidden",
    width: 380,
    height: 400,
    cardDistance: 30,
    verticalDistance: 35,
  },
  desktop: {
    wrapperClass:
      "hidden lg:block relative w-[500px] h-[580px] flex-shrink-0 overflow-hidden",
    width: 480,
    height: 450,
    cardDistance: 70,
    verticalDistance: 80,
  },
};

const ProjectsSection: React.FC = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setScreenSize("mobile");
      } else if (window.innerWidth < 1024) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const config = cardConfigs[screenSize];

  return (
    <section id="projects" className="py-17 sm:py-25 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-4xl font-bold mb-3 sm:mb-4 text-white">
            <ShinyText
              text="Featured Projects"
              disabled={false}
              speed={5}
              className="custom-class"
            />
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mb-4 rounded-full"></div>
          <p className="text-gray-400 max-w-2xl mx-auto px-4">
            Explore my recent projects showcasing full-stack development with
            Laravel, React, and modern web technologies
          </p>
        </div>
        <div className="relative w-full sm:h-[500px] rounded-2xl flex items-center">
          {/* Text content - Left side */}
          <div className="flex-1 px-4 md:px-8 lg:px-16 flex flex-col justify-center items-center text-center relative overflow-visible">
            <div className="relative overflow-visible">
              {/* Animated gradient accent */}
              <div className="absolute -inset-1 sm:-inset-6 md:-inset-8 lg:-inset-12 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl animate-pulse" />

              {/* Main content */}
              <div className="relative z-10">
                {/* Title with gradient text */}
                <h1 className="text-3xl font-bold mb-3 md:mb-4 leading-tight bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                  {cardTexts[activeCard].title}
                </h1>

                {/* Decorative line */}
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4 rounded-full" />

                {/* Subtitle with better contrast */}
                <p className="text-gray-100 text-base md:text-lg lg:text-xl leading-relaxed max-w-xl">
                  {cardTexts[activeCard].subtitle}
                </p>

                {/* Optional: floating accent elements */}
                <div className="absolute -top-8 -left-8 w-16 h-16 bg-blue-500/10 rounded-full blur-xl" />
                <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-purple-500/10 rounded-full blur-xl" />
              </div>
            </div>
          </div>

          {/* CardSwap - Right side */}
          <div className={config.wrapperClass}>
            <CardSwap
              width={config.width}
              height={config.height}
              cardDistance={config.cardDistance}
              verticalDistance={config.verticalDistance}
              delay={6000}
              onFrontChange={setActiveCard}
            >
              <Card className="bg-zinc-950 border border-white/10 overflow-hidden cursor-pointer">
                <div className="relative h-48 sm:h-52 lg:h-60 overflow-hidden">
                  <img
                    src="./taskly/1.webp"
                    alt="Taskly Project"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>
                <div className="p-4 sm:p-5 lg:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    Taskly
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-400 mb-4">
                    Task management application
                  </p>
                  <div className="flex gap-2 sm:gap-3 flex-wrap">
                    <span className="px-2.5 sm:px-3 py-1 bg-gray-900 border border-gray-800 rounded-full text-xs sm:text-sm text-blue-400">
                      Laravel
                    </span>
                    <span className="px-2.5 sm:px-3 py-1 bg-gray-900 border border-gray-800 rounded-full text-xs sm:text-sm text-blue-400">
                      React
                    </span>
                  </div>
                </div>
              </Card>

              <Card className="bg-zinc-950 border border-white/10 overflow-hidden cursor-pointer">
                <div className="relative h-48 sm:h-52 lg:h-60 overflow-hidden">
                  <img
                    src="./chatai/1.webp"
                    alt="Chat AI Project"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>
                <div className="p-4 sm:p-5 lg:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    Chat AI
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-400 mb-4">
                    AI-powered chat interface
                  </p>
                  <div className="flex gap-2 sm:gap-3 flex-wrap">
                    <span className="px-2.5 sm:px-3 py-1 bg-gray-900 border border-gray-800 rounded-full text-xs sm:text-sm text-blue-400">
                      Laravel
                    </span>
                    <span className="px-2.5 sm:px-3 py-1 bg-gray-900 border border-gray-800 rounded-full text-xs sm:text-sm text-blue-400">
                      Alpine.JS
                    </span>
                  </div>
                </div>
              </Card>
            </CardSwap>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
