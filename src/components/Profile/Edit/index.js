import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { history } from 'src/utils/history';
import { editProfile } from 'src/actions/user';

import Avatar from 'src/components/Profile/Avatar';
import Loader from 'react-loader-spinner';
import Button from 'src/components/Button';
import Field from 'src/components/Field';
import TextArea from 'src/components/Field/textarea';

import './edit.scss';

const Edit = () => {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.user.user);
  const editing = useSelector(s => s.user.editing);

  const [inputs, setInputs] = useState({
    username: user.pseudonym,
    firstname: user.fisrtName,
    lastname: user.lastName,
    email: user.email,
    avatar: user.avatar,
    bio: user.bio,
    github: user.github,
    linkedin: user.linkedin,
    visibility: user.visibility,
  });

  const { username, firstname, lastname, email, avatar, bio, github, linkedin, visibility } = inputs;

  const handleOnChange = (e) => {
    if (e.target.type === 'checkbox') {
      const { name, checked } = e.target;
      setInputs({ ...inputs, [name]: checked });
    }
    else {
      const { name, value } = e.target;
      setInputs({ ...inputs, [name]: value });
    }
  };

  const url = useParams(username).username;

  if (user.pseudonym !== url) {
    history.push('/');
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log('Edit');
    dispatch(editProfile(inputs));
  };

  return (
    <div className="container">
      <div className="user-edit-page">
        <h2 className="title">Edit</h2>
        <form className="form" action="" onSubmit={handleOnSubmit}>
          <div className="avatar-container">
            <Avatar img={avatar} />
          </div>
          <Field
            label="Avatar"
            name="avatar"
            id="avatar"
            type="text"
            onChange={handleOnChange}
            value={avatar}
          />
          <Field
            label="Pseudo"
            name="username"
            id="username"
            type="text"
            onChange={handleOnChange}
            value={username}
          />
          <Field
            label="Prénom"
            name="firstname"
            id="firstname"
            type="text"
            onChange={handleOnChange}
            value={firstname}
          />
          <Field
            label="Nom"
            name="lastname"
            id="lastname"
            type="text"
            onChange={handleOnChange}
            value={lastname}
          />
          <Field
            label="Email"
            name="email"
            id="email"
            type="text"
            onChange={handleOnChange}
            value={email}
          />
          <TextArea
            label="Biography"
            name="bio"
            id="bio"
            type="textarea"
            onChange={handleOnChange}
            value={bio}
          />
          <Field
            label="Github"
            name="github"
            id="github"
            type="text"
            required={false}
            onChange={handleOnChange}
            value={github}
          />
          <Field
            label="LinkedIn"
            name="linkedin"
            id="linkedin"
            type="text"
            required={false}
            onChange={handleOnChange}
            value={linkedin}
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
            {editing
              ? (
                <Loader
                  type="TailSpin"
                  color="#FF0093"
                  height={30}
                  width={30}
                  className="loader"
                />
              ) : (
                <Button type="submit" content="Sauvegarder" />
              )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
