import React from 'react';

import PropTypes from 'prop-types';

const ProgresseBarre = ({ itemsValide, itemsNb }) => {
  const progressionWidthComputed = () => {
    const widthProgress = (itemsValide / itemsNb) * 100;
    return widthProgress;
  };

  const progressionWidth = progressionWidthComputed();
  return (
    <span className="item-progress">
      <span className="--fill" style={{ width: `${progressionWidth}%` }} />
    </span>
  );
};

ProgresseBarre.propTypes = {
  itemsValide: PropTypes.number.isRequired,
  itemsNb: PropTypes.number.isRequired,
};

export default ProgresseBarre;
