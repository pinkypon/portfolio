import React from "react";
import SkillCard from "@/SkillCard";

const SectionSkills = () => {
  return (
    <section className="py-16" id="skills">
      <div className="text-center space-y-12">
        <div className="space-y-4">
          <p className="text-3xl font-bold lg:text-4xl">Technologies & Skills</p>
          <p className="text-gray-700/80 mx-auto dark:text-neutral-300/80 max-w-2xl">I work with modern technologies to build scalable and performant web applications.</p>
        </div>
        <div className="md:grid-cols-3 lg:grid-cols-4 grid grid-cols-2 gap-6">
          {[
            "React.js",
            "Node.js",
            "TypeScript",
            "Next.js",
            "Vue.js",
            "MongoDB",
            "Tailwind CSS",
            "GraphQL"
          ].map((skill, index) => (
            <SkillCard key={index} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionSkills;