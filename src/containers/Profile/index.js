import { connect } from 'react-redux';

import { changeFieldProfile, editUser } from 'src/actions/user';
import { getSelectedUser } from 'src/actions/app';

import Profile from 'src/components/Profile';

const mapStateToProps = (state) => {
  const { selectedUser } = state.app;
  const s = state.user.user;
  return ({
    // nom de la prop à remplir: donnée à récupérer dans le state
    user: selectedUser,
    username: s.pseudonym,
    firstname: s.fisrtName,
    lastname: s.lastName,
    email: s.email,
    avatar: s.avatar,
    github: s.github,
    linkedin: s.linkedin,
    bio: s.bio,
    visibility: s.visibility,
    password: s.password,
  });
};

const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: callback qui contient un appel à dispatch
  getSelectedUser: () => {
    dispatch(getSelectedUser());
  },
  changeField: (newValue, identifier) => {
    dispatch(changeFieldProfile(newValue, identifier));
  },
  submitProfile: () => {
    dispatch(editUser());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
