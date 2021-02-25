import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Router, Redirect, Route, Switch } from 'react-router-dom';
import { history } from 'src/utils/history';
import { clear } from 'src/actions/alert';

import Loader from 'react-loader-spinner';

import PrivateRoute from 'src/components/_components/PrivateRoute';
import Tree from 'src/components/Tree';
import Homepage from 'src/components/HomePage';
import Nav from 'src/containers/Nav';
import LoginPage from 'src/components/LoginPage';
import Profile from 'src/containers/Profile';
import Edit from 'src/components/Profile/Edit';
import Register from 'src/components/Register';
import Leaderboard from 'src/containers/Leaderboard';
import Faq from 'src/components/Faq';
import Team from 'src/containers/Team';
// import Footer from 'src/components/Footer';


import './app.scss';
import bg from 'src/assets/images/bg.jpg';

const App = ({ loading, user, checkLogged }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    // Vérifie si l'utilisateur est loggé au chargement de la page
    checkLogged();
    // Efface les messages automatiquement à chaque changement de page
    history.listen((location, action) => {
      dispatch(clear());
    });
  }, []);

  // Si une alert s'ajoute dans le store, elle s'affiche à l'écran.
  const alerts = useSelector((state) => state.app.alert);

  if (loading) {
    return (
      <div className="app">
        <div className="bgImg" style={{ backgroundImage: `url(${bg})` }} />
        <div className="bg">
          <div className="container">
            <div className="main-loader">
              <Loader
                type="TailSpin"
                color="#FF0093"
                height={64}
                width={64}
                className="loader"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="app">
      <div className="bgImg" style={{ backgroundImage: `url(${bg})` }} />
      <div className="bg" />
      <Router history={history}>
        {alerts.length > 0 && (
          <div className="alert-error-list">
            { alerts.map((alert, index) =>
              (<div key={index} className="alert-error">{alert}</div>),
            )}
          </div>
        )}
        <Nav checkLogged={user.isLogged} />
        <Switch>
          {!user.isLogged && (
            <Route path="/login">
              <LoginPage checkLogged={user.isLogged} />
            </Route>
          )}
          <Route path="/signin">
            <Register />
          </Route>
          <Route exact path="/leaderboard">
            <Leaderboard />
          </Route>
          <Route exact path="/team">
            <Team />
          </Route>
          <Route exact path="/faq">
            <Faq />
          </Route>
          <Route exact path="/:username">
            <Profile />
          </Route>
          <Route path="/:username/edit">
            <Edit />
          </Route>
          <Route path="/:username/tree">
            <Tree />
          </Route>
          <Route exact path="/">
            <Homepage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
