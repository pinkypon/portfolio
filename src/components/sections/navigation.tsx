import React from "react";

interface NavigationProps {
  scrolled: boolean;
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  scrolled,
  activeSection,
  scrollToSection,
}) => {
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center
        transition-all duration-1000 sm:duration-1000 ease-out
        ${scrolled ? "mt-2 sm:mt-5" : "mt-0"}`}
    >
      <div
        className={`
          transition-all duration-400 sm:duration-1500 ease-out
          ${
            scrolled
              ? "w-[95%] md:w-[80%] lg:w-[50%] max-w-3xl bg-black/20 backdrop-blur-xl shadow-2xl shadow-black/50 rounded-2xl border border-purple-400/20"
              : "w-full max-w-6xl bg-transparent shadow-none rounded-none border-transparent"
          }
        `}
      >
        <div
          className={`mx-auto px-3 sm:px-4 md:px-6 transition-all duration-1000 ease-out ${
            scrolled ? "py-2" : "py-4 sm:py-6"
          }`}
        >
          <div className="flex justify-between items-center">
            {/* Logo Section */}
            <div className="flex items-center gap-2 sm:gap-3">
              <img
                src="logo.webp"
                alt="Logo"
                className="object-contain w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
              />
            </div>

            {/* Navigation - Always visible, responsive sizing */}
            <div className="flex items-center space-x-4 sm:space-x-6 md:space-x-8">
              {["home", "about", "projects", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize hover:text-purple-400 transition-all duration-300 relative font-medium text-sm sm:text-base
                    ${
                      activeSection === item
                        ? "text-purple-400"
                        : scrolled
                        ? "text-white"
                        : "text-gray-200"
                    }`}
                >
                  {item}
                  {activeSection === item && (
                    <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all duration-300"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Glassmorphism border effect */}
        {scrolled && (
          <div className="absolute inset-0 rounded-2xl pointer-events-none">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-400/20 to-transparent rounded-full transition-all duration-1000 ease-out"></div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
