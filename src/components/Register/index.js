import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from 'react-loader-spinner';
import { useHistory } from "react-router-dom";

import { register } from 'src/actions/user';

import Button from 'src/components/Button';
import Field from 'src/components/Field';
import Quote from 'src/components/Quote';

const Register = () => {
  document.title = 'Inscription | My Dev Skill Tree';
  const [loader, showLoader] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const registering = useSelector(s => s.user.registering);
  const [submitted, setSubmitted] = useState(false);
  const [user, setUser] = useState({
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    visibility: true,
  });

  const {
    username,
    firstname,
    lastname,
    email,
    password,
    visibility,
  } = user;

  // Handle field changes
  const handleOnChange = (e) => {
    if (e.target.type === 'checkbox') {
      const { name, checked } = e.target;
      setUser({ ...user, [name]: checked });
    }
    else {
      const { name, value } = e.target;
      setUser({ ...user, [name]: value });
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log('Register');
    // TODO // Add conditions before dispatching
    dispatch(register(user));
  };

  return (
    <div className="container">
      <div className="signin">
        <h2 className="title">Inscription</h2>
        <Quote />
        <form className="form" action="" onSubmit={handleOnSubmit}>
          <Field
            name="username"
            id="name"
            label="Username"
            type="text"
            placeholder=""
            onChange={handleOnChange}
            value={username}
          />
          <Field
            name="firstname"
            id="firstname"
            label="Firstname"
            type="text"
            placeholder=""
            onChange={handleOnChange}
            value={firstname}
          />
          <Field
            name="lastname"
            id="lastname"
            label="Lastname"
            type="text"
            placeholder=""
            onChange={handleOnChange}
            value={lastname}
          />
          <Field
            name="email"
            id="email"
            label="Email"
            type="text"
            placeholder=""
            onChange={handleOnChange}
            value={email}
          />
          <Field
            name="password"
            id="password"
            label="Password"
            type="password"
            placeholder=""
            onChange={handleOnChange}
            value={password}
          />
          <Field
            name="visibility"
            id="visibility"
            label="Je souhaite être visible dans le leaderboard"
            type="checkbox"
            required={false}
            onChange={handleOnChange}
            value={visibility}
          />
          <div className="form-submit">
            {registering
              ? (
                <Loader
                  type="TailSpin"
                  color="#FF0093"
                  height={30}
                  width={30}
                  className="loader"
                />
              ) : (
                <Button type="submit" content="S'inscrire !" />
              )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
