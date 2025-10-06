import React, { useState, useEffect } from "react";
import ContactSection from "./components/sections/contact-section";
import HeroSection from "./components/sections/hero-section";
import AboutSection from "./components/sections/about-section";
import FooterSection from "./components/sections/footer";
import Starfield from "./components/bg/star-field";
import NavigationSection from "./components/sections/navigation";
import ProjectSection from "./components/sections/project";

const Portfolio: React.FC = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

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
      const scrollPosition = window.scrollY + 200;

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

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          setActiveSection(hash);
        }
      }, 100);
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  return (
    <div
      className="min-h-screen bg-black text-white relative overflow-x-hidden"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      {/* <Starfield /> */}
      <NavigationSection
        scrolled={scrolled}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />
      <HeroSection />
      <AboutSection />
      <ProjectSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
};

export default Portfolio;
