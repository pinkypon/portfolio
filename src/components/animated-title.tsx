import React, { useState, useEffect, useRef } from "react";

const AnimatedTitle: React.FC = () => {
  const [currentTitle, setCurrentTitle] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const titles = ["Full Stack Developer", "Software Engineer"];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentTitle((prev) => (prev + 1) % titles.length);
        setIsAnimating(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="text-4xl sm:text-5xl md:text-5xl font-bold text-white h-16 sm:h-20 md:h-15 flex items-center justify-center text-center">
      <span
        className={`transition-all duration-500 ${
          isAnimating
            ? "opacity-0 transform translate-y-4 scale-95"
            : "opacity-100 transform translate-y-0 scale-100"
        }`}
      >
        {titles[currentTitle]}
      </span>
    </h1>
  );
};

export default AnimatedTitle;
