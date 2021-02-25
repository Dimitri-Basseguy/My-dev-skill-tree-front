import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './leaderboard.scss';

import { getAllUsers } from 'src/actions/user';

import { dynamicSort } from 'src/utils/sort';
import Button from 'src/components/Button';
import User from './User';
import Footer from 'src/components/Footer';


const Leaderboard = () => {
  const dispatch = useDispatch();
  const users = useSelector(s => s.app.users);
  const usersLoading = useSelector(s => s.app.usersLoading);

  const [order, setOrder] = useState('xpFront');
  const [active, setActive] = useState('Front');
  document.title = `Leaderboard ${active} | My Dev Skill Tree`;
  const buttons = ['Front', 'Back'];

  useEffect(() => {
    if (users !== []) {
      dispatch(getAllUsers());
    }
  }, []);

  const handleClick = (e) => {
    switch (e.target.innerText) {
      case ('Front'):
        setOrder('xpFront');
        break;
      case ('Back'):
        setOrder('xpBack');
        break;
      case ('Full'):
        setOrder('xpFull');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  let rankOrder = 0;

  users.sort(dynamicSort(`${order}`, 'desc'));
  return (
    <div className="container">
      <div className="leaderboard-page">
        <div className="leaderboard">
          <h2 className="title">Leaderboard</h2>
          <div className="leaderboard-order-btn">
          <span>Trier par :</span>
            {buttons.map((button) => (
              <Button
                key={button}
                onClick={(e) => {
                  setActive(button);
                  handleClick(e);
                }}
                content={button}
                active={active === button}
                fill={false}
                classPerso="buttonLead"
              />
            ))}
          </div>
          {users.map((user) => {
            rankOrder += 1;
            if (user.visibility) {
              return (
              <Link key={user.id} to={`/${user.pseudonym}`}><User key={user.id} orderedBy={order} rankPlace={rankOrder} user={user} /></Link>
              );
            }
          })}
        </div>
        <Footer />
      </div>
    </div>
  );
};


export default Leaderboard;
