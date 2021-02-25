import React, { useState } from 'react';

import { imgPath } from 'src/utils/ranking';

const Skills = ({ name, level, rank, xp, totalXp}) => {
  const [enter, setEnter] = useState(false);

  const calcPercent = (xp, totalXp) => {
    const result = (xp / totalXp) * 100;
    return result.toFixed(1) + '%';
  };
  const handleMouseEnter = () => {
    setEnter(!enter);
  };

  return (
    <div className="skills" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseEnter}>
      <div className="skills-level">Level: {level}</div>
    </div>
  );
};

export default Skills;
