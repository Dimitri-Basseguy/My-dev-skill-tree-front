import React from 'react';

import { imgPath } from 'src/utils/ranking';

import './rank.scss';

const Rank = ({ level }) => {

  const className = (defaultClass) => {
    let cName = defaultClass;
    if ('todo') {
      cName += ' todoAnim';
      return cName;
    }
    return cName;
  };

  return (
    <div className={className('skill-rank-img')}>
      <img src={`${imgPath + level}.png`} alt={`level${level}`} />
    </div>
  );
};

export default Rank;
