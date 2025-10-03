import React, { useState, useEffect, useRef } from "react";
import {
  Download,
  ExternalLink,
  Mail,
  Copy,
  Check,
  Github,
  Linkedin,
  Code,
  User,
  ChevronDown,
  X,
  Eye,
  Menu,
  GraduationCap,
  Calendar,
  MapPin,
  Phone,
  Briefcase,
  Globe,
} from "lucide-react";
import LogoLoop from "./components/LogoLoop";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiLaravel,
  SiPhp,
} from "react-icons/si";
import ShinyText from "./components/ShinyText";
import CardSwap, { Card } from "./components/card-swap";
import AnimatedTitle from "./components/animated-title";
import Beams from "./components/Beams";
import StarBorder from "./components/star-border";
import Javier from "./components/git-button";
import Hasan from "./components/hasan-button";

// Add Google Fonts
interface Star {
  id: number;
  x: number;
  y: number;
  z: number;
  speed: number;
  color: string;
  brightness: number;
  trailLength: number;
  isMoving: boolean;
}

interface Project {
  title: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  features?: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string | null;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

interface ContactButtonProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  action: {
    type: "copy" | "link" | "download";
    value: string;
  };
  variant?: "primary" | "secondary" | "outline" | "success";
}

// Modal Component for Project Details
const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-800">
        <div className="sticky top-0 bg-gray-900 border-b border-gray-800 px-4 sm:px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl sm:text-2xl font-bold text-white pr-4">
            {project.title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors flex-shrink-0"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          {/* Project Image */}
          <div className="aspect-video bg-gray-800 rounded-xl mb-6 overflow-hidden border border-gray-700">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Code className="w-20 h-20 text-gray-600" />
              </div>
            )}
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 sm:px-4 py-2 bg-gray-800 text-gray-300 rounded-full text-sm font-medium border border-gray-700"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Description */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg sm:text-xl font-semibold text-white">
              About this project
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
              {project.fullDescription}
            </p>

            {project.features && (
              <>
                <h4 className="text-base sm:text-lg font-semibold text-white mt-6">
                  Key Features
                </h4>
                <ul className="list-disc list-inside space-y-2 text-gray-400 text-sm sm:text-base">
                  {project.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors border border-gray-700 justify-center"
              >
                <Github className="w-5 h-5" />
                <span>View Code</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg transition-all justify-center"
              >
                <ExternalLink className="w-5 h-5" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// footer links
const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/yourusername",
    hoverColor: "hover:text-purple-400",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://linkedin.com/in/yourusername",
    hoverColor: "hover:text-blue-400",
  },
  {
    name: "Indeed",
    icon: Globe,
    url: "https://profile.indeed.com/yourusername",
    hoverColor: "hover:text-cyan-400",
  },
];

// logo loop 1
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

// 3D Starfield with Static + Moving Stars for Optimal Performance
const StarfieldAnimation: React.FC = () => {
  const [movingStars, setMovingStars] = useState<Star[]>([]);
  const [staticStars, setStaticStars] = useState<Star[]>([]);

  useEffect(() => {
    const createStar = (isMoving = true): Star => {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 500 + 50;

      return {
        id: Math.random(),
        x:
          Math.cos(angle) * radius +
          (typeof window !== "undefined" ? window.innerWidth / 2 : 400),
        y:
          Math.sin(angle) * radius +
          (typeof window !== "undefined" ? window.innerHeight / 2 : 400),
        z: Math.random() * 1000 + 1,
        speed: isMoving ? Math.random() * 3 + 0.5 : 0,
        color:
          Math.random() < 0.4
            ? "#ffffff"
            : Math.random() < 0.7
            ? "#ffff99"
            : "#ffd700",
        brightness: Math.random() * 0.8 + 0.2,
        trailLength: Math.random() * 80 + 20,
        isMoving: isMoving,
      };
    };

    const initialStaticStars = Array.from({ length: 200 }, () =>
      createStar(false)
    );
    setStaticStars(initialStaticStars);

    const initialMovingStars = Array.from({ length: 25 }, () =>
      createStar(true)
    );
    setMovingStars(initialMovingStars);

    let animationId: number;
    let lastTime = 0;
    const frameRate = 60;
    const frameInterval = 1000 / frameRate;

    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= frameInterval) {
        setMovingStars((prevStars) =>
          prevStars.map((star) => {
            let newZ = star.z - star.speed;
            let newX = star.x;
            let newY = star.y;

            if (newZ <= 0) {
              newZ = 1000;
              const angle = Math.random() * Math.PI * 2;
              const radius = Math.random() * 500 + 50;
              newX =
                Math.cos(angle) * radius +
                (typeof window !== "undefined" ? window.innerWidth / 2 : 400);
              newY =
                Math.sin(angle) * radius +
                (typeof window !== "undefined" ? window.innerHeight / 2 : 400);
            }

            return {
              ...star,
              x: newX,
              y: newY,
              z: newZ,
            };
          })
        );
        lastTime = currentTime;
      }
      animationId = requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  const renderStar = (star: Star, isStatic = false) => {
    const centerX = typeof window !== "undefined" ? window.innerWidth / 2 : 400;
    const centerY =
      typeof window !== "undefined" ? window.innerHeight / 2 : 400;

    const perspective = 1000;
    const projectedX = (star.x - centerX) * (perspective / star.z) + centerX;
    const projectedY = (star.y - centerY) * (perspective / star.z) + centerY;

    const size = Math.max(0.5, (1000 - star.z) / 200);
    const opacity = Math.min(1, ((1000 - star.z) / 1000) * star.brightness);
    const trailOpacity = opacity * 0.3;
    const trailLength = !isStatic ? (1000 - star.z) / 10 : 0;

    const windowWidth = typeof window !== "undefined" ? window.innerWidth : 800;
    const windowHeight =
      typeof window !== "undefined" ? window.innerHeight : 600;

    if (
      projectedX < -100 ||
      projectedX > windowWidth + 100 ||
      projectedY < -100 ||
      projectedY > windowHeight + 100 ||
      star.z > 700
    ) {
      return null;
    }

    return (
      <div key={star.id}>
        {!isStatic && trailLength > 1 && (
          <div
            className="absolute"
            style={{
              left: projectedX,
              top: projectedY,
              width: `${Math.max(1, trailLength)}px`,
              height: "1px",
              background: `linear-gradient(90deg, ${star.color}${Math.floor(
                trailOpacity * 255
              )
                .toString(16)
                .padStart(2, "0")} 0%, transparent 100%)`,
              transform: `translate(-50%, -50%) rotate(${Math.atan2(
                projectedY - centerY,
                projectedX - centerX
              )}rad)`,
              transformOrigin: "left center",
            }}
          />
        )}

        <div
          className="absolute rounded-full"
          style={{
            left: projectedX,
            top: projectedY,
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: star.color,
            opacity: isStatic ? opacity * 0.7 : opacity,
            transform: "translate(-50%, -50%)",
            boxShadow: !isStatic
              ? `0 0 ${size * 4}px ${star.color}`
              : `0 0 ${size * 2}px ${star.color}`,
            filter: `blur(${Math.max(0, (size - 2) * 0.3)}px)`,
          }}
        />

        {!isStatic && size > 3 && (
          <div
            className="absolute rounded-full"
            style={{
              left: projectedX,
              top: projectedY,
              width: `${size * 2.5}px`,
              height: `${size * 2.5}px`,
              background: `radial-gradient(circle, ${star.color}15 0%, transparent 70%)`,
              transform: "translate(-50%, -50%)",
              opacity: opacity * 0.4,
            }}
          />
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
      <div className="absolute inset-0">
        {staticStars.map((star) => renderStar(star, true))}
        {movingStars.map((star) => renderStar(star, false))}
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0,0,0,0.3) 100%)",
        }}
      />
    </div>
  );
};

// About Me
const timelineData = [
  {
    type: "experience",
    date: "2022 - Present",
    title: "Senior Frontend Developer",
    organization: "TechCorp Solutions",
    description:
      "Leading React development for enterprise applications serving 100K+ users. Architected reusable component libraries and improved team productivity by 40%.",
    skills: ["React", "TypeScript", "Next.js", "GraphQL"],
  },
  {
    type: "education",
    date: "2023",
    title: "AWS Certified Developer",
    organization: "Amazon Web Services",
    description:
      "Professional certification in cloud development, serverless architecture, and deployment strategies.",
    skills: ["AWS", "Lambda", "DynamoDB", "CloudFormation"],
  },
  {
    type: "education",
    date: "2022",
    title: "React Advanced Patterns",
    organization: "Meta Blueprint",
    description:
      "Advanced certification covering modern React patterns, performance optimization, and scalable architecture design.",
    skills: ["React", "Performance", "Architecture", "Testing"],
  },
  {
    type: "experience",
    date: "2020 - 2022",
    title: "Frontend Developer",
    organization: "Creative Digital Agency",
    description:
      "Developed responsive web applications for diverse clients. Collaborated with design teams to create pixel-perfect implementations.",
    skills: ["Vue.js", "JavaScript", "SCSS", "WordPress"],
  },
  {
    type: "experience",
    date: "2019 - 2020",
    title: "Junior Web Developer",
    organization: "StartUp Labs",
    description:
      "Built full-stack applications from concept to deployment. Gained experience in modern development workflows and agile methodologies.",
    skills: ["HTML5", "CSS3", "JavaScript", "Node.js"],
  },
  {
    type: "education",
    date: "2015 - 2019",
    title: "Bachelor of Science in Computer Science",
    organization: "University of California, Berkeley",
    description:
      "Magna Cum Laude • GPA 3.8/4.0. Specialized in web technologies, algorithms, and software engineering. Dean's List recipient.",
    skills: [
      "Computer Science",
      "Algorithms",
      "Database Systems",
      "Software Engineering",
    ],
  },
];

// Enhanced Project Card Component
const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => (
  <div className="group bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-xl p-4 sm:p-6 hover:border-gray-700 transition-all duration-300 hover:bg-gray-900/50 hover:transform hover:scale-[1.02]">
    <div className="aspect-video bg-gray-900 rounded-lg mb-4 overflow-hidden border border-gray-800 relative">
      {project.image ? (
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Code className="w-12 sm:w-16 h-12 sm:h-16 text-gray-600" />
        </div>
      )}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <button
          onClick={() => onClick(project)}
          className="px-3 sm:px-4 py-2 bg-white text-black rounded-lg font-medium flex items-center gap-2 hover:bg-gray-100 transition-colors text-sm"
        >
          <Eye className="w-4 h-4" />
          View Details
        </button>
      </div>
    </div>
    <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
      {project.title}
    </h3>
    <p className="text-gray-400 mb-4 text-sm leading-relaxed">
      {project.description}
    </p>
    <div className="flex flex-wrap gap-2 mb-4">
      {project.technologies.slice(0, 3).map((tech) => (
        <span
          key={tech}
          className="px-2 sm:px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-medium border border-gray-700"
        >
          {tech}
        </span>
      ))}
      {project.technologies.length > 3 && (
        <span className="px-2 sm:px-3 py-1 bg-gray-700 text-gray-400 rounded-full text-xs">
          +{project.technologies.length - 3} more
        </span>
      )}
    </div>
    <div className="flex flex-col sm:flex-row gap-3">
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors border border-gray-700 justify-center"
        >
          <Github className="w-4 h-4" />
          <span className="text-sm">Code</span>
        </a>
      )}
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg transition-all justify-center"
        >
          <ExternalLink className="w-4 h-4" />
          <span className="text-sm">Live Demo</span>
        </a>
      )}
    </div>
  </div>
);

// Contact Button
const ContactButton: React.FC<ContactButtonProps> = ({
  icon: Icon,
  label,
  action,
  variant = "outline",
}) => {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    if (action.type === "copy") {
      navigator.clipboard.writeText(action.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else if (action.type === "link") {
      window.open(action.value, "_blank");
    } else if (action.type === "download") {
      const link = document.createElement("a");
      link.href = action.value;
      link.download = "Jem_Garcia_CV.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const baseClasses =
    "flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg w-full sm:w-auto justify-center";

  const variants = {
    primary:
      "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-purple-500/25",
    secondary:
      "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-blue-500/25",
    outline:
      "border-2 border-gray-700 hover:border-purple-400 hover:bg-gray-900/50 bg-gray-900/30 backdrop-blur-sm",
    success:
      "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-green-500/25",
  };

  return (
    <button
      onClick={handleClick}
      className={`${baseClasses} ${variants[variant]}`}
    >
      {copied ? (
        <Check className="w-4 sm:w-5 h-4 sm:h-5" />
      ) : (
        <Icon className="w-4 sm:w-5 h-4 sm:h-5" />
      )}
      <span className="font-medium text-sm sm:text-base">
        {copied ? "Copied!" : label}
      </span>
    </button>
  );
};

//projects card text
const cardTexts = [
  {
    title: "Taskly",
    subtitle: (
      <a
        href="#"
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
      </a>
    ),
  },
  {
    title: "ChatAI",
    subtitle: (
      <a
        href="#"
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
      </a>
    ),
  },
];

//projects card text
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

// Button links
const handleGithubClick = () => {
  window.open("https://github.com/yourusername", "_blank");
};

const handleDownload = () => {
  // Your download logic
  console.log("Downloading...");
};

const handleLinkedIn = () => {
  window.open("https://linkedin.com/in/yourprofile", "_blank");
};

// Main Portfolio Component
const Portfolio: React.FC = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );
  const [copied, setCopied] = useState(false);

  //projects card text
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

    handleResize(); // run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //projects card text
  const config = cardConfigs[screenSize];

  // about me animation
  const handleFilterChange = (newFilter: string) => {
    if (newFilter !== activeFilter) {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveFilter(newFilter);
        setTimeout(() => {
          setIsAnimating(false);
        }, 50);
      }, 300);
    }
  };
  const filteredData =
    activeFilter === "all"
      ? timelineData
      : timelineData.filter((item) => item.type === activeFilter);

  const getCascadeAnimationClasses = (index: number) => {
    const baseClasses = "transition-all duration-700 ease-out";
    if (isAnimating) {
      return `${baseClasses} opacity-0 -translate-x-12 blur-sm`;
    } else {
      return `${baseClasses} opacity-100 translate-x-0 blur-0`;
    }
  };

  const getItemDelay = (index: number) => {
    if (isAnimating) return {};
    return { transitionDelay: `${index * 80}ms` };
  };
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScrollSections = () => {
      const sections = ["home", "about", "projects", "contact"];
      const scrollPosition = window.scrollY + 200; // Offset for navbar height

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollSections);
    handleScrollSections();

    return () => window.removeEventListener("scroll", handleScrollSections);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setIsMobileMenuOpen(false);
    }
  };

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  return (
    <div
      className="min-h-screen bg-black text-white relative overflow-x-hidden"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <StarfieldAnimation />

      {/* Enhanced Navigation with Mobile Support */}
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
          ? "w-[95%] md:w-[50%] max-w-3xl bg-black/20 backdrop-blur-xl shadow-2xl shadow-black/50 rounded-2xl border border-purple-400/20"
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
                  src="logo.png"
                  alt="Logo"
                  className="object-contain w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12"
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

      {/* Enhanced Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative z-10 md:pt-40"
      >
        <div className="text-center max-w-4xl mx-auto px-4 sm:px-6">
          {/* Name */}
          <div className="mb-2">
            <h2 className="text-5xl sm:text-6xl font-semibold text-white">
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

          <p className="text-center text-gray-400 mb-8 sm:mb-5 leading-relaxed">
            Crafting modern web experiences with{" "}
            <span className="text-purple-400">Laravel</span>,{" "}
            <span className="text-pink-400">React</span>, and <br />
            cutting-edge technologies
          </p>

          {/* Contact Actions - Fixed Button Width */}
          <div className="flex flex-col items-center gap-4 mb-8 sm:mb-16 px-4">
            {/* Row 1 - Hasan + LinkedIn side by side */}
            <div className="flex gap-3 sm:gap-4 justify-center">
              <div className="w-auto">
                <Hasan />
              </div>
              <div className="w-auto">
                <Javier icon="linkedin" label="LinkedIn" />
              </div>
            </div>

            {/* Row 2 - Email with actual email address */}
            <div className="w-auto border border-white/10 rounded-full">
              <button
                onClick={() => {
                  navigator.clipboard.writeText("jem.garcia@email.com");
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="group relative px-3 py-1 rounded-full text-gray-50 transition-all duration-300 shadow-lg flex items-center gap-2"
                aria-label="Copy email address"
              >
                {/* Email text */}
                <span className="text-xs">jem.garcia@email.com</span>

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

          {/* <div className="w-auto">
              <ContactButton
                icon={Download}
                label="Download CV"
                action={{ type: "download", value: "/path/to/your/cv.pdf" }}
                variant="primary"
              />
            </div>
            <div className="w-auto">
              <ContactButton
                icon={Linkedin}
                label="LinkedIn"
                action={{
                  type: "link",
                  value: "https://linkedin.com/in/your-profile",
                }}
                variant="secondary"
              />
            </div>
            <div className="w-auto">
              <ContactButton
                icon={Mail}
                label="Copy Email"
                action={{ type: "copy", value: "jem.garcia@email.com" }}
                variant="outline"
              />
              
            </div> */}

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
            <div className="px-55 sm:hidden">
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
            <div className="hidden sm:block sm:px-20 md:px-0">
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

      {/* Enhanced About Section */}
      <section id="about" className="py-12 sm:py-20 relative z-10">
        <div className="min-h-screen py-12 sm:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-3 sm:mb-4 text-white">
                <ShinyText
                  text="About Me"
                  disabled={false}
                  speed={5}
                  className="custom-class"
                />
              </h2>
              {/* <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-white">
                About Me
              </h2> */}
              <div className="w-24 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
            </div>
            {/* Professional Frame */}
            <div className="p-4 sm:p-6 md:p-8 lg:p-12">
              {/* Navigation */}
              <div className="flex justify-center mb-8 sm:mb-10 md:mb-12">
                <div className="p-1 inline-flex">
                  <button
                    onClick={() => handleFilterChange("all")}
                    disabled={isAnimating}
                    className={`px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-md font-medium transition-all ${
                      activeFilter === "all"
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25"
                        : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                    } ${isAnimating ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    Timeline
                  </button>
                  <button
                    onClick={() => handleFilterChange("experience")}
                    disabled={isAnimating}
                    className={`flex items-center px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-md font-medium transition-all ${
                      activeFilter === "experience"
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25"
                        : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                    } ${isAnimating ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    Experience
                  </button>
                  <button
                    onClick={() => handleFilterChange("education")}
                    disabled={isAnimating}
                    className={`flex items-center px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-md font-medium transition-all ${
                      activeFilter === "education"
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25"
                        : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                    } ${isAnimating ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    Education
                  </button>
                </div>
              </div>

              {/* Timeline */}
              <div className="h-[100vh] overflow-y-auto pr-2 scrollbar-minimal">
                <div className="relative">
                  {/* Vertical Line */}
                  <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-0.5 rounded-full"></div>

                  <div className="space-y-8 sm:space-y-10 md:space-y-12">
                    {filteredData.map((item, index) => (
                      <div
                        key={`${activeFilter}-${item.title || index}`}
                        className={`flex relative ${getCascadeAnimationClasses(
                          index
                        )}`}
                        style={getItemDelay(index)}
                      >
                        {/* Circle on Line */}
                        <div className="absolute left-4 sm:left-6 w-2 sm:w-3 h-2 sm:h-3 bg-white rounded-full -translate-x-1/2 mt-1 animate-pulse"></div>

                        {/* Date */}
                        <div className="flex pl-8 sm:pl-10 w-20 sm:w-28 md:w-32 flex-shrink-0">
                          <span className="font-medium text-white text-xs sm:text-sm">
                            {item.date}
                          </span>
                        </div>

                        {/* Details */}
                        <div className="flex-1 ml-4 sm:ml-6 md:ml-8">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 sm:mb-4">
                            <div className="flex-1">
                              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                                {item.title}
                              </h3>
                              <p className="text-gray-400 font-medium mb-3 sm:mb-4">
                                {item.organization}
                              </p>
                            </div>
                            <div className="ml-0 sm:ml-6 flex-shrink-0 mb-4 sm:mb-0">
                              <div
                                className={`w-8 sm:w-10 h-8 sm:h-10 rounded-lg flex items-center justify-center ${
                                  item.type === "experience"
                                    ? "bg-blue-50 border border-blue-200"
                                    : "bg-purple-50 border border-purple-200"
                                }`}
                              >
                                {item.type === "experience" ? (
                                  <Code className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                                ) : (
                                  <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                                )}
                              </div>
                            </div>
                          </div>

                          <p className="text-gray-300 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                            {item.description}
                          </p>

                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {item.skills.map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className="px-2 sm:px-3 py-1 bg-gray-800 text-gray-200 rounded-full text-xs sm:text-sm border border-gray-600"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Summary
              <div className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-gray-700">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
                  <div>
                    <div className="text-xl sm:text-2xl font-semibold text-white mb-1">
                      5+
                    </div>
                    <div className="text-xs sm:text-sm text-gray-400">
                      Years Experience
                    </div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-semibold text-white mb-1">
                      20+
                    </div>
                    <div className="text-xs sm:text-sm text-gray-400">
                      Projects Delivered
                    </div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-semibold text-white mb-1">
                      4
                    </div>
                    <div className="text-xs sm:text-sm text-gray-400">Certifications</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-semibold text-white mb-1">
                      100K+
                    </div>
                    <div className="text-xs sm:text-sm text-gray-400">Users Impacted</div>
                  </div>
                </div>
              </div> */}

      {/* Enhanced Projects Section */}
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
              {/* Content with enhanced visual appeal */}
              <div className="relative overflow-visible">
                {/* Animated gradient accent - smaller on mobile */}
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
            {/* CardSwap - Right side, partially visible */}
            {/* Desktop version - hidden on mobile and tablet */}
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
                      src="taskly.png"
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
                      <span className="px-2.5 sm:px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs sm:text-sm text-white">
                        Laravel
                      </span>
                      <span className="px-2.5 sm:px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs sm:text-sm text-white">
                        React
                      </span>
                    </div>
                  </div>
                </Card>

                <Card className="bg-zinc-950 border border-white/10 overflow-hidden cursor-pointer">
                  <div className="relative h-48 sm:h-52 lg:h-60 overflow-hidden">
                    <img
                      src="chatai.png"
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
                      <span className="px-2.5 sm:px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs sm:text-sm text-white">
                        Laravel
                      </span>
                      <span className="px-2.5 sm:px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs sm:text-sm text-white">
                        Alpine.JS
                      </span>
                    </div>
                  </div>
                </Card>
              </CardSwap>
            </div>
            {/* <div className="hidden lg:block relative w-[500px] h-full flex-shrink-0">
              <CardSwap
                width={500}
                height={400}
                cardDistance={70}
                verticalDistance={80}
                delay={6000}
                onFrontChange={setActiveCard}
              >
                <Card className="bg-black overflow-hidden cursor-pointer">
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src="taskly.png"
                      alt="Design System"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Design System
                    </h3>
                    <p className="text-white/80 mb-4">
                      Comprehensive UI component library
                    </p>
                    <div className="flex gap-3">
                      <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-white">
                        React
                      </span>
                      <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-white">
                        TypeScript
                      </span>
                    </div>
                  </div>
                </Card>

                <Card className="bg-black overflow-hidden cursor-pointer">
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src="chatai.png"
                      alt="Design System"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Design System
                    </h3>
                    <p className="text-white/80 mb-4">
                      Comprehensive UI component library
                    </p>
                    <div className="flex gap-3">
                      <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-white">
                        React
                      </span>
                      <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-white">
                        TypeScript
                      </span>
                    </div>
                  </div>
                </Card>
              </CardSwap>
            </div>
            Tablet version - hidden on mobile and desktop
            <div className="hidden md:block lg:hidden relative w-full max-w-[350px] h-[300px] flex-shrink-0 mx-auto">
              <CardSwap
                width={320}
                height={260}
                cardDistance={30}
                verticalDistance={35}
                delay={6000}
                onFrontChange={setActiveCard}
              >
                <Card className="bg-black overflow-hidden cursor-pointer">
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src="taskly.png"
                      alt="Design System"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Design System
                    </h3>
                    <p className="text-white/80 mb-4">
                      Comprehensive UI component library
                    </p>
                    <div className="flex gap-3">
                      <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-white">
                        React
                      </span>
                      <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-white">
                        TypeScript
                      </span>
                    </div>
                  </div>
                </Card>

                <Card className="bg-black overflow-hidden cursor-pointer">
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src="chatai.png"
                      alt="Design System"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Design System
                    </h3>
                    <p className="text-white/80 mb-4">
                      Comprehensive UI component library
                    </p>
                    <div className="flex gap-3">
                      <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-white">
                        React
                      </span>
                      <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-white">
                        TypeScript
                      </span>
                    </div>
                  </div>
                </Card>
              </CardSwap>
            </div>
            Mobile version - hidden on tablet and desktop
            <div className="block md:hidden relative w-full max-w-[280px] h-[240px] flex-shrink-0 mx-auto">
              <CardSwap
                width={250}
                height={200}
                cardDistance={20}
                verticalDistance={25}
                delay={6000}
              >
                <Card className="bg-gradient-to-br from-blue-600 to-purple-600 border-white/20 overflow-hidden cursor-pointer">
                  <div className="p-3 h-full flex flex-col justify-between">
                    <div>
                      <div className="w-8 h-8 bg-white/20 rounded-lg mb-2 flex items-center justify-center">
                        <span className="text-lg">🎨</span>
                      </div>
                      <h3 className="text-base font-bold text-white mb-1">
                        Design System
                      </h3>
                      <p className="text-xs text-white/80 mb-2">
                        Comprehensive UI component library
                      </p>
                    </div>
                    <div className="flex gap-1.5">
                      <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs text-white">
                        React
                      </span>
                      <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs text-white">
                        TypeScript
                      </span>
                    </div>
                  </div>
                </Card>

                <Card className="bg-gradient-to-br from-green-600 to-teal-600 border-white/20 overflow-hidden cursor-pointer">
                  <div className="p-3 h-full flex flex-col justify-between">
                    <div>
                      <div className="w-8 h-8 bg-white/20 rounded-lg mb-2 flex items-center justify-center">
                        <span className="text-lg">📊</span>
                      </div>
                      <h3 className="text-base font-bold text-white mb-1">
                        Analytics Dashboard
                      </h3>
                      <p className="text-xs text-white/80 mb-2">
                        Real-time data visualization platform
                      </p>
                    </div>
                    <div className="flex gap-1.5">
                      <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs text-white">
                        Next.js
                      </span>
                      <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs text-white">
                        D3.js
                      </span>
                    </div>
                  </div>
                </Card>
              </CardSwap>
            </div> */}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
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
            {/* <div className="inline-flex items-center justify-center gap-2 mb-3 sm:mb-4 border border-purple-400/20 rounded-full px-3 py-1.5 sm:px-4 sm:py-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-400 text-xs sm:text-sm">
                Available for work
              </span>
            </div> */}
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
              looking for someone to bring clarity, creativity, and clean code
              to your team — let's connect.
            </p>

            <div className="flex justify-center mt-6 sm:mt-8">
              <a
                href="https://www.linkedin.com/in/jem-garcia/" // change this to your link
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-1 font-semibold cursor-pointer border-none bg-transparent p-0 m-0"
              >
                {/* Text with overlay effect */}
                <span className="relative inline-block text-xs">
                  <span className="text-gray-400 group-hover:text-transparent transition-colors duration-300">
                    Get in Touch
                  </span>
                  <span className="absolute left-0 top-0 overflow-hidden text-white font-bold w-0 group-hover:w-full transition-all duration-300 ease-out whitespace-nowrap ">
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
      {/* <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 md:w-96 h-32 sm:h-40 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 blur-3xl opacity-15 animate-pulse rounded-full" /> */}
      {/* Footer */}
      <footer className="py-6 sm:py-10 border-t border-gray-800 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Mobile: Stacked but compact */}
          <div className="flex flex-col gap-3 sm:hidden relative z-10">
            {/* Logo */}
            <div className="flex items-center justify-center gap-1">
              <img
                src="logo.png"
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
                src="logo.png"
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
    </div>
  );
};

export default Portfolio;
