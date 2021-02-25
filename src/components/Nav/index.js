import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from 'src/components/Button';
import './nav.scss';

import { history } from 'src/utils/history';

import logo from 'src/assets/images/logo.png';

const Nav = ({ checkLogged, handleLogout }) => {
  const [open, isOpen] = useState(false);
  const [active, setActive] = useState();

  const username = useSelector((s) => s.user.user.pseudonym);

  const handleOnClick = () => {
    isOpen(!open);
  };

  return (
    <nav className="main-navigation">
      <div onClick={handleOnClick} className={open ? 'bm-burger-button cross' : 'bm-burger-button'}>
        <span className="bm-burger-bars" /><span className="bm-burger-bars" /><span className="bm-burger-bars" />
      </div>
      <ul className={`mainmenu ${open ? 'open' : 'close'}`}>
        <li><NavLink to="/" onClick={handleOnClick}><img src={logo} alt="logo" /></NavLink></li>
        {checkLogged && (
        <>
          <li>
            <NavLink exact to={`/${username}/tree`} onClick={handleOnClick}>
              My Dev Skill Tree
            </NavLink>
          </li>
          <li>
            <NavLink exact to={`/${username}`} onClick={handleOnClick}>
              Profile
            </NavLink>
          </li>
        </>
        )}
        <li>
          <NavLink to="/leaderboard" onClick={handleOnClick}>
            Leaderboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/team" onClick={handleOnClick}>
            Team
          </NavLink>
        </li>
        <li>
          <NavLink to="/faq" onClick={handleOnClick}>
            FAQ
          </NavLink>
        </li>
        {!checkLogged && (
        <li className="systemLogin">
          <ul>
            <li>
              <NavLink to="/login" onClick={handleOnClick}>
                Connexion
              </NavLink>
            </li>
            <li>
              <NavLink to="/signin" onClick={handleOnClick}>
                <Button
                  key="inscription"
                  onClick={
                    handleOnClick
                  }
                  content="Inscription"
                  active={active}
                  fill={false}
                  classPerso="registerNav"
                />
              </NavLink>
            </li>
          </ul>
        </li>
        )}
        {checkLogged && (
        <li>
          <Link
            to="/"
            onClick={() => {
              handleOnClick();
              handleLogout();
              history.push('/');
            }}
          >
            Logout
          </Link>
        </li>
        )}
      </ul>
    </nav>
  );
};


export default Nav;
