import { connect } from 'react-redux';

import { checkLogged } from 'src/actions/user';
import { getAllUsers, getAdmin } from 'src/actions/app';

import App from 'src/components/App';

const mapStateToProps = (state) => ({
  // nom de la prop à remplir: donnée à récupérer dans le state
  loading: state.app.loading,
  user: state.user,
  admins : state.admins
});

const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: callback qui contient un appel à dispatch
  getAllUsers: () => {
    dispatch(getAllUsers());
  },
  getAdmin: () => {
    dispatch(getAdmin());
  },
  checkLogged: () => {
    dispatch(checkLogged());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
