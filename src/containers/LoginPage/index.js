import { connect } from 'react-redux';

import { changeField, login } from 'src/actions/user';

import LoginPage from 'src/components/LoginPage';

const mapStateToProps = (state) => ({
  // nom de la prop à remplir: donnée à récupérer dans le state
  username: state.user.username,
  password: state.user.password,
});

const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: callback qui contient un appel à dispatch
  changeField: (newValue, identifier) => {
    dispatch(changeField(newValue, identifier));
  },
  handleLogin: () => {
    dispatch(login());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage);
