import React, { useState } from 'react';

import Rank from '../Rank/rank';
import ProgressBar from '../ProgressBar';

import './skill.scss';

const Skill = ({ name, level, rank, xp, totalXp}) => {
  const [enter, setEnter] = useState(false);

  const calcPercent = (xp, totalXp) => {
    const result = (xp / totalXp) * 100;
    return result.toFixed(1) + '%';
  };
  const handleMouseEnter = () => {
    setEnter(!enter);
  };
  return (
    <div className="skill" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseEnter}>
      <div className="skill-name">{name}</div>
      <div className="skill-level">Level : {level}</div>
      <Rank level={level} />
      <div className="skill-rank">{rank}</div>
      <div className="skill-xp">{xp} / {totalXp}</div>
      <ProgressBar xp={xp} totalXp={totalXp} showPercent />
    </div>
  );
};

export default Skill;
