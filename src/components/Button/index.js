/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';

import './button.scss';

const Button = ({ onClick, type, content, fill, active, classPerso,
}) => {
  let cName = '';
  const className = () => {
    cName = classPerso;
    if (fill) {
      cName += ' fill';
    }
    if (active) {
      cName += ' activeButton';
    }
    return cName;
  };


  return (
    <button onClick={onClick} type={type} className={className()}>
      {content}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  content: PropTypes.string,
  fill: PropTypes.bool,
  classPerso: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  content: 'button',
  fill: true,
  classPerso: 'button',
};

export default Button;
