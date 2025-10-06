import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiLaravel,
  SiPhp,
} from "react-icons/si";
import LogoLoop from "../LogoLoop";
import ShinyText from "../ShinyText";
import AnimatedTitle from "../animated-title";
import Javier from "../git-button";
import Hasan from "../hasan-button";
import Particles from "../bg/particles";

const techLogos = [
  {
    node: <SiLaravel className="w-full h-full" />,
    title: "Laravel",
    ariaLabel: "Laravel",
  },
  {
    node: <SiReact className="w-full h-full" />,
    title: "React",
    ariaLabel: "React",
  },
  {
    node: <SiTypescript className="w-full h-full" />,
    title: "TypeScript",
    ariaLabel: "TypeScript",
  },
  {
    node: <SiPhp className="w-full h-full" />,
    title: "PHP",
    ariaLabel: "PHP",
  },
  {
    node: <SiTailwindcss className="w-full h-full" />,
    title: "Tailwind CSS",
    ariaLabel: "Tailwind CSS",
  },
];

const HeroSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const isMobile = window.innerWidth < 768;

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative z-10 md:pt-40"
    >
      {/* Prism Background - Positioned absolutely behind content */}
      <div className="absolute inset-0 -z-10 overflow-">
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={isMobile ? 40 : 60} // 👈 Fewer on mobile
          particleSpread={10}
          speed={isMobile ? 0.02 : 0.1} // 👈 Slower on mobile
          particleBaseSize={isMobile ? 120 : 100} // 👈 Larger but fewer
          moveParticlesOnHover={false}
          alphaParticles={true}
          disableRotation={true}
        />
      </div>

      {/* Content - Now sits on top of the Prism background */}
      <div className="text-center max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Name */}
        <div className="">
          <h2 className="text-4xl font-semibold sm:text-5xl text-white">
            <ShinyText
              text="Jem Garcia"
              disabled={false}
              speed={5}
              className="custom-class"
            />
          </h2>
        </div>

        {/* Animated Title */}
        <AnimatedTitle />

        <p className="text-gray-300 text-base max-w-sm mx-auto leading-relaxed mt-2 sm:mt-3 px-4 sm:px-6">
          Building seamless digital experiences with Laravel, React, and the
          latest in web innovation.
        </p>
        <p className="text-center text-gray-400 mb-8 sm:mb-5 leading-relaxed max-w-2xl mx-auto"></p>

        {/* Contact Actions - Fixed Button Width */}
        <div className="flex flex-col items-center gap-4 mb-8 sm:mb-16 px-4">
          {/* Row 1 - Hasan + LinkedIn side by side */}
          <div className="flex gap-3 sm:gap-4 justify-center">
            <div className="w-auto">
              <Hasan />
            </div>
            <div className="w-auto">
              <Javier
                url="https://www.linkedin.com/in/jem-garcia/"
                icon="linkedin"
                label="LinkedIn"
              />
            </div>
          </div>

          {/* Row 2 - Email with actual email address */}
          <div className="w-auto border border-white/10 rounded-full">
            <button
              onClick={() => {
                navigator.clipboard.writeText("markjemdee01@gmail.com");
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="group relative px-3 py-1 rounded-full text-gray-50 transition-all duration-300 shadow-lg flex items-center gap-2"
              aria-label="Copy email address"
            >
              {/* Email text */}
              <span className="text-xs">markjemdee01@gmail.com</span>

              {/* Copy Icon - shows copy icon normally, checkmark when copied */}
              {copied ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              )}

              {/* Tooltip */}
              <span
                className={`absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-neutral-800 text-xs rounded transition-opacity whitespace-nowrap ${
                  copied ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
              >
                {copied ? "✓ Copied!" : "Copy email"}
              </span>
            </button>
          </div>
        </div>

        {/* Logo Loop - Mobile Optimized */}
        <div
          style={{
            height: "120px",
            position: "relative",
            overflow: "hidden",
          }}
          className="sm:h-[200px]"
        >
          {/* Mobile Version */}
          <div className="px-70 sm:hidden">
            <LogoLoop
              logos={techLogos}
              speed={80}
              direction="left"
              logoHeight={30}
              gap={28}
              pauseOnHover
              scaleOnHover
              ariaLabel="Technology partners"
            />
          </div>

          {/* Desktop Version */}
          <div className="hidden sm:block sm:px-40 md:px-30">
            <LogoLoop
              logos={techLogos}
              speed={120}
              direction="left"
              logoHeight={30}
              gap={40}
              pauseOnHover
              scaleOnHover
              ariaLabel="Technology partners"
            />
          </div>
        </div>

        <div className="mt-4 sm:mt-8 animate-bounce">
          <ChevronDown className="w-6 sm:w-8 h-6 sm:h-8 mx-auto text-gray-400" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
