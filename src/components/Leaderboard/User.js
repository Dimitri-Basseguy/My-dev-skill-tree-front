import React, { useEffect, useState } from 'react';
import './leaderboard.scss';

import Avatar from 'src/components/Profile/Avatar';
import RankIcon from 'src/components/Profile/Rank/rank';
import ProgressBar from 'src/components/Profile/ProgressBar';

import { calculateRank } from 'src/utils/ranking';


const User = ({ orderedBy, user, rankPlace }) => {
  const [rank, setRank] = useState(calculateRank(user, `${orderedBy}`));

  useEffect(() => {
    switch (orderedBy) {
      case ('xpFront'):
        setRank(calculateRank(user, 'xpFront'));
        break;
      case ('xpBack'):
        setRank(calculateRank(user, 'xpBack'));
        break;
      case ('xpFull'):
        setRank(calculateRank(user, 'xpFull'));
        break;
      default:
        break;
    }
  }, [orderedBy]);

  return (
    <div className="container-board borders">
      <div className="container-avatar">
        <div className="board-rankPlace">{rankPlace}</div>
        <Avatar img={user.avatar} />
        <h1 className="user-name"> {user.pseudonym}</h1>
      </div>
      <RankIcon level={rank.level} />
      <div className="skills">
        <div className="skills-level">Level: {rank.level}</div>
        <ProgressBar xp={user[orderedBy]} totalXp={29250} />
      </div>
    </div>
  );
};

export default User;
