import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { xpMax } from 'src/utils/ranking';

import './profileTree.scss';

import Avatar from 'src/components/Profile/Avatar';

const ProfileTree = ({ typeName }) => {

  const user = useSelector((s) => s.app.selectedUser);
  const [xp, setXp] = useState({ userXp: 0, total: 100 });

  useEffect(() => {
    if (user.id !== null) {
      switch (typeName) {
        case ('Front'):
          setXp({ userXp: user.xpFront, total: xpMax.front });
          break;
        case ('Back'):
          setXp({ userXp: user.xpBack, total: xpMax.back });
          break;
        case ('Full'):
          setXp({ userXp: user.xpFull, total: 100 });
          break;
        default:
          break;
      }
    }
  }, [user, typeName]);


  const calcPercent = (xp, totalXp) => {
    if (xp === undefined) {
      xp = 0;
    }
    const result = (xp / totalXp) * 100;
    return result.toFixed(1);
  };

  const fillXp = () => {
    const percent = calcPercent(xp.userXp, xp.total);
    if (xp) {
      return `${percent}, 100`;
    }
    return '0, 100';
  };

  return (
    <div className="profile-tree">
      <div className="content">
        {user.id !== null && (
          <>
            <Avatar img={user.avatar} />
            <span>{user.pseudonym}</span>
            <span>{xp.userXp} / {xp.total}</span>
          </>
        )}
      </div>

      <svg className="chart" viewBox="0 0 36 36">
        <path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          strokeWidth="1.5"
          fillOpacity="0"
        />
        <path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          strokeWidth="1.55"
          fillOpacity="0"
          strokeDasharray={fillXp()}
        />
      </svg>
    </div>
  );
};

ProfileTree.defaultProps = {
  avatar: 'loading',
};

export default React.memo(ProfileTree);
