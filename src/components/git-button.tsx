import React from "react";
import { Github, Download, Linkedin } from "lucide-react";

interface ButtonProps {
  icon?: "github" | "download" | "linkedin";
  label?: string;
  onClick?: () => void;
}

const Button = ({
  icon = "github",
  label = "Button",
  onClick,
}: ButtonProps) => {
  const icons: Record<string, React.ReactNode> = {
    github: (
      <svg
        className="w-6 h-6 fill-neutral-50"
        height={100}
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 100 100"
        width={100}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M50,1.23A50,50,0,0,0,34.2,98.68c2.5.46,3.41-1.09,3.41-2.41s0-4.33-.07-8.5c-13.91,3-16.84-6.71-16.84-6.71-2.28-5.77-5.55-7.31-5.55-7.31-4.54-3.1.34-3,.34-3,5,.35,7.66,5.15,7.66,5.15C27.61,83.5,34.85,81.3,37.7,80a10.72,10.72,0,0,1,3.17-6.69C29.77,72.07,18.1,67.78,18.1,48.62A19.34,19.34,0,0,1,23.25,35.2c-.52-1.26-2.23-6.34.49-13.23,0,0,4.19-1.34,13.75,5.13a47.18,47.18,0,0,1,25,0C72.07,20.63,76.26,22,76.26,22c2.72,6.89,1,12,.49,13.23a19.28,19.28,0,0,1,5.14,13.42c0,19.21-11.69,23.44-22.83,24.67,1.8,1.55,3.4,4.6,3.4,9.26,0,6.69-.06,12.08-.06,13.72,0,1.34.9,2.89,3.44,2.4A50,50,0,0,0,50,1.23Z" />
      </svg>
    ),
    download: <Download className="w-4 h-4" />,
    linkedin: <Linkedin className="w-4 h-4" />,
  };

  return (
    <button
      onClick={onClick}
      className="group flex justify-center items-center gap-2 duration-500 hover:text-neutral-300 relative bg-neutral-900 px-5 
      py-3 text-left p-3 text-gray-50 text-sm font-bold rounded-lg 
      overflow-hidden after:absolute after:z-10 after:w-12 after:h-12 after:content-[''] 
      after:bg-sky-900 after:-left-8 after:top-8 after:rounded-full after:blur-lg after:animate-pulse 
      hover:after:animate-none cursor-pointer shadow-[0_4px_6px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]"
    >
      {icons[icon] || icons.github}
      <span className="relative">
        {label}
        {/* Smooth underline */}
        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gray-400 transition-all duration-300 group-hover:w-full"></span>
      </span>
    </button>
  );
};

export default Button;
