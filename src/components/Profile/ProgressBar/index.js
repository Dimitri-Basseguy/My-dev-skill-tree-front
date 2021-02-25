import React from 'react';
import PropTypes from 'prop-types';

import './progressbar.scss';

const calcPercent = (xp, totalXp) => {
  const result = (xp / totalXp) * 100;
  return `${result.toFixed(1)}%`;
};

const ProgressBar = ({ xp, totalXp, showPercent }) => {

  const showPercentFunc = () => {
    if (showPercent) {
      return calcPercent(xp, totalXp);
    }
    return '';
  };

  return (
    <span className="user-progress" percent={showPercentFunc()}> 
      <span className="--fill" style={{ width: calcPercent(xp, totalXp) }} />
    </span>
  );
};

ProgressBar.propTypes = {
  xp: PropTypes.number.isRequired,
  totalXp: PropTypes.number.isRequired,
  showPercent: PropTypes.bool,
};

ProgressBar.defaultProps = {
  showPercent: false,
};

export default ProgressBar;
