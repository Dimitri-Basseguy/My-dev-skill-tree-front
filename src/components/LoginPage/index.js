import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';

import { login } from 'src/actions/user';

import Loader from 'react-loader-spinner';
import Button from 'src/components/Button';
import Field from 'src/components/Field';
import Quote from 'src/components/Quote';

import './loginPage.scss';

const LoginPage = () => {
  document.title = 'Connexion | My Dev Skill Tree';
  const [loader, showLoader] = useState(false);

  const dispatch = useDispatch();
  // const users = useSelector(s => s.app.users);
  // const [error, setError] = useState(true);
  const loggingIn = useSelector(s => s.user.loggingIn);
  const [submitted, setSubmitted] = useState(false);
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });

  const { username, password } = inputs;

  // Handle field changes
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  // HandleBlur for validation // TODO
  const handleBlur = (e) => {

  };

  // Submit form
  const handleOnSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    dispatch(login(username, password));
  };

  return (
    <div className="container">
      <div className="login">
        <h2 className="title">Connexion</h2>
        <Quote />
        <form className="form" action="/" onSubmit={handleOnSubmit}>
          <Field
            name="username"
            id="username"
            label="Username"
            type="text"
            placeholder=""
            onChange={handleOnChange}
            onBlur={handleBlur}
            value={username}
          />
          <Field
            name="password"
            id="password"
            label="Password"
            type="password"
            placeholder=""
            onChange={handleOnChange}
            onBlur={handleBlur}
            value={password}
          />
          <div className="form-submit">
            {loggingIn
              ? (
                <Loader
                  type="TailSpin"
                  color="#FF0093"
                  height={30}
                  width={30}
                  className="loader"
                />
              ) : (
                <Button type="submit" content="Login" />
              )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
