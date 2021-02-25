import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import RankIcon from 'src/components/Profile/Rank/rank';
import ProgressBar from 'src/components/Profile/ProgressBar';
import Footer from 'src/components/Footer';
import { calculateRank } from 'src/utils/ranking';

import './team.scss';

const Team = ({ getAdmin, admins }) => {
  document.title = 'Team | My Dev Skill Tree';
  useEffect(() => {
    getAdmin();
  }, []);

  return (
    <div className="container">
      <div className="team-page">
        <div className="team">
          <h1 className="title">Présentation de l'équipe</h1>
          <div className="members">
            {admins.map((admin) => {
              return (
                <div key={admin.id} className="membres borders">
                  <div className="Profil">
                    <span className="avatar" style={{ backgroundImage:`url(${admin.avatar})`}} />
                    <div className="Profil-logo">
                      {admin.github !== null && 
                      (<li><a href={admin.github} target="_blank"><svg className="githubLogo" width="1024" height="1024" viewBox="0 0 1024 1024" fill="none"><path /></svg></a></li>)
                      }
                      {admin.linkedin !== null && 
                      (<li><a href={admin.linkedin} target="_blank"><svg className="linkedinLogo" width="24" height="24" viewBox="0 0 24 24" fill="none"><path /></svg></a></li>)
                      }
                    </div>
                  </div>
                  <p className="pseudonym"><Link to={`${admin.pseudonym}`}>{admin.pseudonym} / <span className="spe">{admin.team}</span></Link></p>
                  <div className="Levels" >
                    <div className="Front" >
                      <RankIcon level={calculateRank(admin, 'xpFront').level}/>
                      <div className="skillls-level">Front: {calculateRank(admin, 'xpFront').level}</div>
                      <ProgressBar xp={admin.xpFront} totalXp={29250} />
                    </div>
                    <div className="Back" >
                      <RankIcon level={calculateRank(admin, 'xpBack').level}/>
                      <div className="skillls-level">Back: {calculateRank(admin, 'xpBack').level}</div>
                      <ProgressBar xp={admin.xpBack} totalXp={27050} />
                    </div>
                  </div>
                  <p className="bio">{admin.bio}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Team;
