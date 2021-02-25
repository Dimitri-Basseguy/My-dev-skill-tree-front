import { connect } from 'react-redux';

import { getAdmin, admins } from 'src/actions/app';

import Team from 'src/components/Team';

const mapStateToProps = (state) => ({
  // nom de la prop à remplir: donnée à récupérer dans le state
  admins : state.app.admins,
});

const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: callback qui contient un appel à dispatch
  getAdmin: () => {
    dispatch(getAdmin());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Team);
