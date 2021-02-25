import React from 'react';
import propTypes from 'prop-types';

import './avatar.scss';

const Avatar = ({ img }) => (
  <span className="user-avatar" style={{ backgroundImage: `url(${img})` }} />
);

Avatar.propTypes = {
  img: propTypes.string,
};

Avatar.defaultProps = {
  img: 'https://www.dimitri-basseguy.fr/projet-my-dev-skill-tree-back/public/assets/img/avatar.svg',
};

export default Avatar;
