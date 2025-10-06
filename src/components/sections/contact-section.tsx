import React from "react";
import ShinyText from "../ShinyText";
import StarBorder from "../star-border";
import Beams from "../beams";

const ContactSection: React.FC = () => {
  return (
    <section
      id="contact"
      className="py-70 sm:py-60 md:py-65 lg:py-55 relative z-10 bg-black"
    >
      <div className="absolute inset-0 z-0 opacity-20 sm:opacity-30">
        <Beams
          beamWidth={2}
          beamHeight={15}
          beamNumber={12}
          lightColor="#ffffff"
          speed={4}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={0}
        />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center items-center mb-8 sm:mb-12 md:mb-16">
          {/* Available indicator */}
          <StarBorder
            as="div"
            className="inline-block mb-3 sm:mb-4"
            color="purple"
            speed="5s"
            innerClassName="py-2 px-2"
          >
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-400">Available for work</span>
            </div>
          </StarBorder>

          <h2 className="text-4xl font-bold mb-3 sm:mb-4 text-white px-4">
            <ShinyText
              text="Connect"
              disabled={false}
              speed={5}
              className="custom-class"
            />
          </h2>
          <div className="w-16 sm:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mb-3 sm:mb-4 rounded-full"></div>

          <p className="text-lg sm:text-lg md:text-xl lg:text-2xl text-gray-400 px-4">
            Ready to collaborate on your next project?
          </p>

          <p className="text-gray-300 text-xs max-w-sm mx-auto leading-relaxed mt-2 sm:mt-3 px-4 sm:px-6">
            I'm open to full-time roles and freelance projects. If you're
            looking for someone to bring clarity, creativity, and clean code to
            your team — let's connect.
          </p>

          <div className="flex justify-center mt-6 sm:mt-8">
            <a
              href="https://www.linkedin.com/in/jem-garcia/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-1 font-semibold cursor-pointer"
            >
              {/* Text with overlay effect */}
              <span className="relative inline-block text-xs">
                <span className="text-gray-400 group-hover:text-transparent transition-colors duration-300">
                  Get in Touch
                </span>
                <span className="absolute left-0 top-0 overflow-hidden text-white font-bold w-0 group-hover:w-full transition-all duration-300 ease-out whitespace-nowrap">
                  Get in Touch
                </span>
              </span>

              {/* Arrow SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-[12px] w-[12px] text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-200 delay-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>

              {/* Underline effect */}
              <span className="absolute left-0 -bottom-[5px] h-[1.5px] w-0 bg-white group-hover:w-full transition-all duration-300 ease-out" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
