import React, { useState } from "react";
import { Layers, Briefcase, GraduationCap } from "lucide-react";
import ShinyText from "../ShinyText";

interface TimelineItem {
  type: "experience" | "education";
  date: string;
  title: string;
  organization: string;
  logo: string;
  description: string[];
  skills: string[];
}

const timelineData: TimelineItem[] = [
  {
    type: "experience",
    date: "FEB 2025 - MAY 2025",
    title: "Full Stack Developer",
    organization: "Hyper Future Ecommerce",
    logo: "./hyper.webp",
    description: [
      "Built a full-stack Inventory Management System",
      "Implemented secure token-based authentication with roles and email verification.",
      "Built CRUD with filtering and spreadsheet import/export for inventory management.",
      "Centralized workflows to improve accuracy, reduce errors, and save time.",
      "Used GitHub for version control with best branching and commit practices.",
    ],
    skills: ["PHP", "XAMPP", "Javascript", "CSS", "Github"],
  },
  {
    type: "education",
    date: "SEP 2021 - AUG 2025",
    title: "Bachelor of Science in Information Technology",
    organization: "Don Honorio Ventura State University - Bacolor, Pampanga",
    logo: "./dabsu.webp",
    description: [
      "Learned C++ to understand programming fundamentals and problem-solving.",
      "Gained experience in PHP to build and deploy dynamic websites.",
      "Studied the basics of Cisco networking to understand network communication.",
      "Explored Python for scripting and general-purpose programming.",
      "Used OpenCV to train an image recognition model for tracking and analyzing images.",
      "Learned JavaScript to create interactive and user-friendly web experiences.",
      "Designed and developed a thesis project integrating a website with Arduino-based sensors.",
      "Used B4A and MIT App Inventor for mobile application development.",
      "Built advanced web applications with Laravel and React.",
      "Worked with databases including MySQL, PostgreSQL, and MongoDB for efficient data management.",
    ],
    skills: [
      "PHP",
      "Laravel",
      "Python",
      "Opencv",
      "Cisco",
      "React",
      "PostgreSQL",
    ],
  },
];

type FilterType = "all" | "experience" | "education";

const AboutSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFilterChange = (newFilter: FilterType) => {
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

  return (
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
            <div className="w-24 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
          </div>

          {/* Professional Frame */}
          <div className="p-4 sm:p-6 md:p-8 lg:p-12">
            {/* Navigation */}
            <div className="flex justify-center mb-8 sm:mb-10 md:mb-12">
              <div className="inline-flex gap-2">
                <button
                  onClick={() => handleFilterChange("all")}
                  disabled={isAnimating}
                  className={`relative flex items-center px-2 py-2 sm:py-2 rounded-md transition-all duration-300 overflow-hidden ${
                    activeFilter === "all"
                      ? "bg-white/10 text-white border-1 border-white/20 backdrop-blur-sm"
                      : "bg-transparent text-gray-400 border-1 border-white/20 backdrop-blur-sm hover:bg-white/10 hover:text-white"
                  } ${isAnimating ? "opacity-50 cursor-not-allowed" : ""} ${
                    activeFilter !== "all" ? "group" : ""
                  }`}
                >
                  {activeFilter !== "all" && (
                    <span className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-300 pointer-events-none" />
                  )}
                  <Layers className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 relative z-10" />
                  <span className="relative z-10 text-sm">Timeline</span>
                </button>
                <button
                  onClick={() => handleFilterChange("experience")}
                  disabled={isAnimating}
                  className={`relative flex items-center px-2 py-2 sm:py-3 rounded-md transition-all duration-300 overflow-hidden ${
                    activeFilter === "experience"
                      ? "bg-white/10 text-white border-1 border-white/20 backdrop-blur-sm"
                      : "bg-transparent text-gray-400 border-1 border-white/20 backdrop-blur-sm hover:bg-white/10 hover:text-white"
                  } ${isAnimating ? "opacity-50 cursor-not-allowed" : ""} ${
                    activeFilter !== "experience" ? "group" : ""
                  }`}
                >
                  {activeFilter !== "experience" && (
                    <span className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-300 pointer-events-none" />
                  )}
                  <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 relative z-10" />
                  <span className="relative z-10 text-sm">Experience</span>
                </button>
                <button
                  onClick={() => handleFilterChange("education")}
                  disabled={isAnimating}
                  className={`relative flex items-center px-2 py-2 sm:py-3 rounded-md transition-all duration-300 overflow-hidden ${
                    activeFilter === "education"
                      ? "bg-white/10 text-white border-1 border-white/20 backdrop-blur-sm"
                      : "bg-transparent text-gray-400 border-1 border-white/20 backdrop-blur-sm hover:bg-white/10 hover:text-white"
                  } ${isAnimating ? "opacity-50 cursor-not-allowed" : ""} ${
                    activeFilter !== "education" ? "group" : ""
                  }`}
                >
                  {activeFilter !== "education" && (
                    <span className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-300 pointer-events-none" />
                  )}
                  <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 relative z-10" />
                  <span className="relative z-10 text-sm">Education</span>
                </button>
              </div>
            </div>

            {/* Timeline */}
            <div className="h-[80vh] sm:h-[50vh] overflow-y-auto scrollbar-minimal flex justify-center pt-2 pb-2">
              <div className="relative max-w-3xl w-full px-4 sm:px-6">
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
                      <div className="absolute left-4 sm:left-6 w-2 sm:w-3 h-2 sm:h-3 bg-white rounded-full -translate-x-1/2 mt-2 animate-pulse"></div>

                      {/* Mobile Layout - Stacked vertically */}
                      <div className="flex-1 pl-8 sm:hidden">
                        {/* Date */}
                        <div className="mb-3">
                          <span className="text-white text-xs">
                            {item.date}
                          </span>
                        </div>

                        {/* Role/Title */}
                        <h3 className="text-md font-semibold text-white mb-3">
                          {item.title}
                        </h3>

                        {/* Organization */}
                        <div className="flex items-center mb-3 gap-1">
                          <img
                            src={item.logo}
                            alt={`${item.organization} logo`}
                            className="w-5 h-5 object-contain"
                          />
                          <p className="text-gray-400 text-xs">
                            {item.organization}
                          </p>
                        </div>

                        {/* Description */}
                        <ul className="text-gray-300 leading-relaxed mb-4 text-sm space-y-2">
                          {item.description.map((point, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <span className="text-white-400">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-1.5">
                          {item.skills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="px-4 py-1 text-gray-200 rounded-full text-xs border border-gray-600"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Desktop Layout - Original horizontal layout */}
                      <div className="hidden sm:flex flex-1">
                        {/* Date */}
                        <div className="flex pl-10 w-28 md:w-32 flex-shrink-0 mt-1">
                          <span className="text-white text-xs">
                            {item.date}
                          </span>
                        </div>

                        {/* Details */}
                        <div className="flex-1 ml-6 md:ml-8">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 sm:mb-4">
                            <div className="flex-1">
                              <h3 className="text-md sm:text-xl font-semibold text-white mb-2">
                                {item.title}
                              </h3>
                              <div className="flex items-center mb-3 sm:mb-4 gap-1">
                                <img
                                  src={item.logo}
                                  alt={`${item.organization} logo`}
                                  className="w-5 h-5 object-contain"
                                />
                                <p className="text-gray-400 text-xs">
                                  {item.organization}
                                </p>
                              </div>
                            </div>
                          </div>
                          <ul className="text-gray-300 leading-relaxed mb-4 sm:mb-6 text-sm space-y-2">
                            {item.description.map((point, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <span className="text-white-400">•</span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="flex flex-wrap gap-1.5">
                            {item.skills.map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className="px-4 py-1 text-gray-200 rounded-full text-xs border border-gray-600"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
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
  );
};

export default AboutSection;
