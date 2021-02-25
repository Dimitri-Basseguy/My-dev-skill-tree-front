import { connect } from 'react-redux';

import { getAllUsers } from 'src/actions/app';

import Leaderboard from 'src/components/Leaderboard';

const mapStateToProps = (state) => ({
  // nom de la prop à remplir: donnée à récupérer dans le state
  users: state.app.users,
});

const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: callback qui contient un appel à dispatch
  getAllUsers: () => {
    dispatch(getAllUsers());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Leaderboard);
