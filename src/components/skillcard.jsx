import React from "react";

const SkillCard = ({ skill }) => {
  return (
    <div className="bg-white/70 dark:bg-white/5 rounded-xl text-center border border-zinc-300/70 dark:border-white/20 p-6 space-y-3 hover:bg-white/90 dark:hover:bg-white/10 transition-colors">
      <div className="w-12 h-12 bg-neutral-200 dark:bg-neutral-700 rounded-lg mx-auto"></div>
      <p className="font-semibold">{skill}</p>
    </div>
  );
};

export default SkillCard;