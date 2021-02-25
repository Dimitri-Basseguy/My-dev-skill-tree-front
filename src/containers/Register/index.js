import { connect } from 'react-redux';

import { changeField, addUser, checkAttribute } from 'src/actions/app';

import Register from 'src/components/Register';

const mapStateToProps = (state) => ({
  // nom de la prop à remplir: donnée à récupérer dans le state
  username: state.app.register.username,
  firstname: state.app.register.firstname,
  lastname: state.app.register.lastname,
  email: state.app.register.email,
  password: state.app.register.password,
  visibility: state.app.register.visibility,
});

const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: callback qui contient un appel à dispatch
  changeField: (newValue, identifier) => {
    dispatch(changeField(newValue, identifier));
  },
  onAttributeUpdate: () => {
    dispatch(checkAttribute());
  },
  handleRegister: () => {
    dispatch(addUser());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);
