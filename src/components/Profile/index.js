import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from 'src/actions/user';


import './Profile.scss';
import Skill from 'src/components/Profile/Skill';
import Avatar from 'src/components/Profile/Avatar';
import Button from 'src/components/Button';
import Footer from 'src/components/Footer';

import { calculateRank, xpMax } from 'src/utils/ranking';


const Profile = ({ url }) => {
  const { username } = useParams(url);

  const dispatch = useDispatch();

  const me = useSelector((s) => s.user.user);
  const user = useSelector((s) => s.app.selectedUser);
  const loading = useSelector((s) => s.app.userLoading);

  useEffect(() => {
    dispatch(getUserProfile(username));
    document.title = `${username} | My Dev Skill Tree`;
  }, [useParams(username).username], loading);

  const [edit, setEdit] = useState(false);

  const handleOnClick = () => {
    setEdit(!edit);
    if (edit) {
      submitProfile();
    }
  };

  if (user === null) {
    return (
      <div className="container">
        <div className="user">
          Unknown profile.
        </div>
      </div>
    );
  }

  /**
   * Calculate user rank
   * @return object with user rank
   */
  const rankFront = calculateRank(user, 'xpFront');
  const rankBack = calculateRank(user, 'xpBack');

  return (
    <div className="container">
      <div className={loading ? 'user loading' : 'user'}>
        {!loading && (
          <>
            {me.pseudonym === user.pseudonym ? (
              <div className="user-edit"><Link to={`${username}/edit`}><Button content="Edit" /></Link></div>
            ) :
              ( '' )}
              <div className="user-header">
                <Avatar img={user.avatar} />
                <div className="user-header-content">
                  <div className="user-name">
                    <span>{user.fisrtName} {user.lastName}</span>
                    <span>@{user.pseudonym}</span>
                  </div>
                  <ul className="user-links">
                    <li><a href={user.github} target="_blank"><svg className="githubLogo" width="1024" height="1024" viewBox="0 0 1024 1024" fill="none"><path /></svg></a></li>
                    <li><a href={user.linkedin} target="_blank"><svg className="linkedinLogo" width="24" height="24" viewBox="0 0 24 24" fill="none"><path /></svg></a></li>
                  </ul>
                </div>
              </div>
            <div className="user-bio">Bio:
              <p>{user.bio}</p>
            </div>
            <div className="user-skills">
              <Skill name="Frontend" level={rankFront.level} rank={rankFront.rank} xp={user.xpFront} totalXp={xpMax.front} />
              <Skill name="Backend" level={rankBack.level} rank={rankBack.rank} xp={user.xpBack} totalXp={xpMax.back} />
            </div>
            <div className="user-tree-btn">
              <Link to={`${username}/tree`}><Button content="My Skill Tree" /></Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

Profile.propTypes = {
  pseudonym: PropTypes.string,
  fisrtName: PropTypes.string,
  lastName: PropTypes.string,
  bio: PropTypes.string,
  slug: PropTypes.string,
  email: PropTypes.string,
  avatar: PropTypes.string,
  linkedin: PropTypes.string,
  github: PropTypes.string,
  xpFront: PropTypes.number,
  xpBack: PropTypes.number,
  xpFull: PropTypes.number,
  visibility: PropTypes.bool,
};

// Données en dur pour le developpement
Profile.defaultProps = {
  pseudonym: '',
  fisrtName: '',
  lastName: '',
  bio: '',
  slug: '',
  email: '',
  avatar: '',
  linkedin: 'http://linkedin.com/',
  github: 'http://github.com/',
  xpFront: 0,
  xpBack: 0,
  xpFull: 0,
  visibility: false,
};

export default Profile;
