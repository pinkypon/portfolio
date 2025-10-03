import React from "react";
import SectionHero from "@/SectionHero";
import SectionProjects from "@/SectionProjects";
import SectionSkills from "@/SectionSkills";
import SectionContact from "@/SectionContact";

const Main = () => {
  return (
    <main className="mx-auto px-8 relative z-20 max-w-7xl">
      <SectionHero />
      <SectionProjects />
      <SectionSkills />
      <SectionContact />
    </main>
  );
};

export default Main;